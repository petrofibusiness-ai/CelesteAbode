// Frontend upload utilities with retry logic and progress tracking
// Handles direct R2 uploads using signed URLs

export interface UploadProgress {
  fileIndex: number;
  fileName: string;
  bytesUploaded: number;
  totalBytes: number;
  percentage: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  retryCount?: number;
}

export interface UploadResult {
  success: boolean;
  publicUrl: string;
  key: string;
  correlationId?: string;
  error?: string;
}

export interface UploadOptions {
  maxRetries?: number;
  retryDelay?: number; // milliseconds
  onProgress?: (progress: UploadProgress) => void;
  correlationId?: string;
}

const DEFAULT_OPTIONS: Required<UploadOptions> = {
  maxRetries: 3,
  retryDelay: 1000,
  onProgress: () => {},
  correlationId: crypto.randomUUID(),
};

/**
 * Upload file directly to R2 using signed URL
 * Includes retry logic with exponential backoff
 */
export async function uploadFileToR2(
  file: File,
  signedUrl: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  // Get CSRF token from cookie
  const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find(c => c.trim().startsWith('__csrf_token='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  };

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      // Report progress
      opts.onProgress({
        fileIndex: 0,
        fileName: file.name,
        bytesUploaded: 0,
        totalBytes: file.size,
        percentage: 0,
        status: attempt > 0 ? 'uploading' : 'uploading',
        retryCount: attempt,
      });

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      const uploadPromise = new Promise<UploadResult>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentage = Math.round((e.loaded / e.total) * 100);
            opts.onProgress({
              fileIndex: 0,
              fileName: file.name,
              bytesUploaded: e.loaded,
              totalBytes: e.total,
              percentage,
              status: 'uploading',
              retryCount: attempt,
            });
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Extract public URL from response or use signed URL base
            // R2 returns 200 on successful upload
            const publicUrl = signedUrl.split('?')[0]; // Remove query params
            resolve({
              success: true,
              publicUrl,
              key: publicUrl.split('/').pop() || '',
              correlationId: opts.correlationId,
            });
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload aborted'));
        });

        // Start upload
        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });

      const result = await uploadPromise;

      // Report success
      opts.onProgress({
        fileIndex: 0,
        fileName: file.name,
        bytesUploaded: file.size,
        totalBytes: file.size,
        percentage: 100,
        status: 'success',
        retryCount: attempt,
      });

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown upload error');

      // Report error
      opts.onProgress({
        fileIndex: 0,
        fileName: file.name,
        bytesUploaded: 0,
        totalBytes: file.size,
        percentage: 0,
        status: 'error',
        error: lastError.message,
        retryCount: attempt,
      });

      // If not last attempt, wait and retry
      if (attempt < opts.maxRetries) {
        const delay = opts.retryDelay * Math.pow(2, attempt); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  // All retries failed
  return {
    success: false,
    publicUrl: '',
    key: '',
    correlationId: opts.correlationId,
    error: lastError?.message || 'Upload failed after all retries',
  };
}

/**
 * Generate signed URL from backend
 */
export async function generateSignedUrl(
  propertyId: string,
  propertySlug: string,
  file: File,
  fileType: 'hero' | 'brochure' | 'image' | 'video',
  csrfToken: string
): Promise<{ uploadUrl: string; publicUrl: string; key: string; correlationId: string }> {
  const response = await fetch('/api/admin/upload/signed-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify({
      propertyId,
      propertySlug,
      fileName: file.name,
      fileType,
      contentType: file.type,
      fileSize: file.size,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to generate upload URL' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return await response.json();
}

/**
 * Upload multiple files in parallel with concurrency limit
 */
export async function uploadFilesParallel(
  files: Array<{ file: File; fileType: 'hero' | 'brochure' | 'image' | 'video' }>,
  propertyId: string,
  propertySlug: string,
  csrfToken: string,
  options: UploadOptions & { concurrency?: number } = {}
): Promise<Array<UploadResult>> {
  const concurrency = options.concurrency || 3; // Upload 3 files at a time
  const results: UploadResult[] = [];
  const queue = [...files];

  // Process files in batches
  while (queue.length > 0) {
    const batch = queue.splice(0, concurrency);
    const batchPromises = batch.map(async (item, index) => {
      const fileIndex = files.length - queue.length - batch.length + index;
      
      try {
        // Generate signed URL
        const signedUrlData = await generateSignedUrl(
          propertyId,
          propertySlug,
          item.file,
          item.fileType,
          csrfToken
        );

        // Upload file
        const result = await uploadFileToR2(item.file, signedUrlData.uploadUrl, {
          ...options,
          onProgress: (progress) => {
            if (options.onProgress) {
              options.onProgress({
                ...progress,
                fileIndex,
              });
            }
          },
          correlationId: signedUrlData.correlationId,
        });

        return result;
      } catch (error) {
        return {
          success: false,
          publicUrl: '',
          key: '',
          error: error instanceof Error ? error.message : 'Upload failed',
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

/**
 * Upload files sequentially (for critical files like hero image)
 */
export async function uploadFilesSequential(
  files: Array<{ file: File; fileType: 'hero' | 'brochure' | 'image' | 'video' }>,
  propertyId: string,
  propertySlug: string,
  csrfToken: string,
  options: UploadOptions = {}
): Promise<Array<UploadResult>> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    
    try {
      // Generate signed URL
      const signedUrlData = await generateSignedUrl(
        propertyId,
        propertySlug,
        item.file,
        item.fileType,
        csrfToken
      );

      // Upload file
      const result = await uploadFileToR2(item.file, signedUrlData.uploadUrl, {
        ...options,
        onProgress: (progress) => {
          if (options.onProgress) {
            options.onProgress({
              ...progress,
              fileIndex: i,
            });
          }
        },
        correlationId: signedUrlData.correlationId,
      });

      results.push(result);

      // If critical file fails, stop
      if (!result.success && (item.fileType === 'hero')) {
        break;
      }
    } catch (error) {
      results.push({
        success: false,
        publicUrl: '',
        key: '',
        error: error instanceof Error ? error.message : 'Upload failed',
      });

      // If critical file fails, stop
      if (item.fileType === 'hero') {
        break;
      }
    }
  }

  return results;
}

