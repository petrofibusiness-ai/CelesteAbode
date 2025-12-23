// Video compression utility using FFmpeg
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink, readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = promisify(exec);

/**
 * Compress video using FFmpeg with H.264 codec and web-optimized settings
 * @param file - Video file to compress
 * @returns Compressed video file
 */
export async function compressVideo(file: File): Promise<File> {
  // Check if FFmpeg is available before attempting compression
  const ffmpegAvailable = await isFFmpegAvailable();
  if (!ffmpegAvailable) {
    console.warn("FFmpeg is not installed or not in PATH. Skipping video compression. Install FFmpeg to enable compression.");
    return file;
  }

  const tempDir = tmpdir();
  const inputPath = join(tempDir, `input_${Date.now()}_${file.name}`);
  const outputPath = join(tempDir, `output_${Date.now()}_${file.name}`);

  try {
    // Write input file to temp directory
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // FFmpeg command for web-optimized H.264 compression
    // CRF 23 provides good balance between quality and file size
    // Preset 'medium' balances speed and compression
    // Profile 'high' ensures compatibility
    // Level 4.0 is widely supported
    const ffmpegCommand = [
      "ffmpeg",
      "-i", inputPath,
      "-c:v", "libx264",           // H.264 codec
      "-preset", "medium",          // Encoding speed vs compression
      "-crf", "23",                 // Quality (18-28, lower = better quality, larger file)
      "-profile:v", "high",         // H.264 profile for compatibility
      "-level", "4.0",              // H.264 level
      "-movflags", "+faststart",    // Web optimization (moov atom at beginning)
      "-c:a", "aac",                // Audio codec
      "-b:a", "128k",               // Audio bitrate
      "-y",                         // Overwrite output file
      outputPath
    ].join(" ");

    // Execute FFmpeg compression
    const { stdout, stderr } = await execAsync(ffmpegCommand, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large outputs
      timeout: 300000, // 5 minute timeout
    });

    // Check if output file exists and is smaller
    const outputStats = await import("fs/promises").then(fs => fs.stat(outputPath));
    const originalSize = file.size;
    const compressedSize = outputStats.size;

    // If compression didn't help (or made it larger), return original
    if (compressedSize >= originalSize) {
      console.log(
        `Video compression didn't reduce size (${(originalSize / 1024 / 1024).toFixed(2)}MB), using original`
      );
      await unlink(outputPath).catch(() => {});
      return file;
    }

    const reduction = ((originalSize - compressedSize) / originalSize) * 100;
    console.log(
      `Video compressed: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${reduction.toFixed(1)}% reduction)`
    );

    // Read compressed file
    const compressedBuffer = await readFile(outputPath);
    const compressedBlob = new Blob([compressedBuffer], { type: file.type });
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    // Cleanup temp files
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return compressedFile;
  } catch (error: any) {
    // Cleanup temp files on error
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    // Check if error is due to FFmpeg not being found
    if (error?.message?.includes("not recognized") || error?.message?.includes("command not found") || error?.code === 1) {
      console.warn("FFmpeg is not installed or not in PATH. Skipping video compression. Install FFmpeg to enable compression.");
    } else {
      console.error("Video compression error:", error);
    }
    // If compression fails, return original file
    return file;
  }
}

/**
 * Check if FFmpeg is available on the system
 */
export async function isFFmpegAvailable(): Promise<boolean> {
  try {
    // Try 'ffmpeg' command (works on Unix and Windows if in PATH)
    await execAsync("ffmpeg -version", { timeout: 3000 });
    return true;
  } catch {
    // On Windows, might be 'ffmpeg.exe'
    try {
      await execAsync("ffmpeg.exe -version", { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Check if video needs compression (if size is above threshold)
 */
export function shouldCompressVideo(file: File, thresholdMB: number = 10): boolean {
  const sizeMB = file.size / (1024 * 1024);
  return sizeMB > thresholdMB;
}

