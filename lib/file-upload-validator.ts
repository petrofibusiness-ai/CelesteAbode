// File upload validation
// Validates file type, size, and content integrity

interface FileValidationConfig {
  allowedMimes: string[];
  maxSize: number; // bytes
  allowedExtensions?: string[]; // Additional extension validation
}

const COMMON_CONFIGS = {
  IMAGE: {
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    maxSize: 10 * 1024 * 1024, // 10 MB
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  },
  VIDEO: {
    allowedMimes: ['video/mp4', 'video/webm', 'video/quicktime'],
    maxSize: 500 * 1024 * 1024, // 500 MB
    allowedExtensions: ['.mp4', '.webm', '.mov', '.mkv'],
  },
  PDF: {
    allowedMimes: ['application/pdf'],
    maxSize: 50 * 1024 * 1024, // 50 MB
    allowedExtensions: ['.pdf'],
  },
};

/**
 * Magic numbers (file signatures) for common file types
 * Used to verify actual file type matches declared MIME type
 */
const MAGIC_NUMBERS: Record<string, Uint8Array> = {
  // JPEG: FFD8FFE
  jpeg: new Uint8Array([0xff, 0xd8, 0xff]),
  // PNG: 89504E47
  png: new Uint8Array([0x89, 0x50, 0x4e, 0x47]),
  // PDF: 25504446
  pdf: new Uint8Array([0x25, 0x50, 0x44, 0x46]),
  // WebP: RIFF...WEBP
  webp: new Uint8Array([0x52, 0x49, 0x46, 0x46]),
  // MP4: ...ftyp
  mp4: new Uint8Array([0x66, 0x74, 0x79, 0x70]),
};

/**
 * Sanitize filename to prevent directory traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove path components
  const baseName = filename.split(/[/\\]/).pop() || 'file';

  // Remove special characters except dots, hyphens, underscores
  const sanitized = baseName
    .replace(/[^a-zA-Z0-9._\-]/g, '_')
    .replace(/\.{2,}/g, '.') // Remove multiple dots
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Max filename length

  return sanitized;
}

/**
 * Validate uploaded file
 * Checks size, MIME type, and magic number signature
 */
export async function validateUploadedFile(
  file: File,
  config: FileValidationConfig
): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > config.maxSize) {
    const maxMB = Math.round(config.maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `File exceeds maximum size of ${maxMB}MB`,
    };
  }

  // Check minimum size (prevent empty files)
  if (file.size < 100) {
    return {
      valid: false,
      error: 'File is too small or empty',
    };
  }

  // Check MIME type
  if (!config.allowedMimes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${config.allowedMimes.join(', ')}`,
    };
  }

  // Check file extension if configured
  if (config.allowedExtensions) {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!config.allowedExtensions.includes(ext)) {
      return {
        valid: false,
        error: `File extension not allowed. Allowed: ${config.allowedExtensions.join(', ')}`,
      };
    }
  }

  // Verify actual file content via magic number
  const buffer = await file.arrayBuffer();
  const headerBytes = new Uint8Array(buffer, 0, Math.min(12, buffer.byteLength));

  const isValidContent = verifyMagicNumber(headerBytes, file.type);
  if (!isValidContent) {
    return {
      valid: false,
      error: 'File content does not match declared type (potential security risk)',
    };
  }

  return { valid: true };
}

/**
 * Verify file magic number (signature) matches expected MIME type
 */
function verifyMagicNumber(headerBytes: Uint8Array, mimeType: string): boolean {
  // JPEG check
  if (mimeType === 'image/jpeg') {
    return (
      headerBytes[0] === 0xff &&
      headerBytes[1] === 0xd8 &&
      headerBytes[2] === 0xff
    );
  }

  // PNG check
  if (mimeType === 'image/png') {
    return (
      headerBytes[0] === 0x89 &&
      headerBytes[1] === 0x50 &&
      headerBytes[2] === 0x4e &&
      headerBytes[3] === 0x47
    );
  }

  // PDF check
  if (mimeType === 'application/pdf') {
    return (
      headerBytes[0] === 0x25 &&
      headerBytes[1] === 0x50 &&
      headerBytes[2] === 0x44 &&
      headerBytes[3] === 0x46
    );
  }

  // WebP check
  if (mimeType === 'image/webp') {
    return (
      headerBytes[0] === 0x52 && // 'R'
      headerBytes[1] === 0x49 && // 'I'
      headerBytes[2] === 0x46 && // 'F'
      headerBytes[3] === 0x46 && // 'F'
      headerBytes[8] === 0x57 && // 'W'
      headerBytes[9] === 0x45 && // 'E'
      headerBytes[10] === 0x42 && // 'B'
      headerBytes[11] === 0x50 // 'P'
    );
  }

  // MP4/MOV check (ftyp signature)
  if (mimeType === 'video/mp4' || mimeType === 'video/quicktime') {
    // Look for 'ftyp' at offset 4
    return (
      headerBytes[4] === 0x66 && // 'f'
      headerBytes[5] === 0x74 && // 't'
      headerBytes[6] === 0x79 && // 'y'
      headerBytes[7] === 0x70 // 'p'
    );
  }

  // For unknown types, allow (will be caught by other validation)
  return true;
}

export { COMMON_CONFIGS };
