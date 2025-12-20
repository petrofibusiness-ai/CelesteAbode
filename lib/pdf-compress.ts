// PDF compression utility using Ghostscript
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink, readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = promisify(exec);

/**
 * Compress PDF using Ghostscript with /ebook preset
 * This provides good compression suitable for brochures and downloadable documents
 * @param file - PDF file to compress
 * @returns Compressed PDF file
 */
export async function compressPDF(file: File): Promise<File> {
  // Check if Ghostscript is available before attempting compression
  const gsAvailable = await isGhostscriptAvailable();
  if (!gsAvailable) {
    console.warn("Ghostscript (gs) is not installed or not in PATH. Skipping PDF compression. Install Ghostscript to enable compression.");
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

    // Ghostscript command with /ebook preset
    // /ebook provides good balance between quality and file size for web distribution
    // -dNOPAUSE -dBATCH: non-interactive mode
    // -sDEVICE=pdfwrite: output PDF
    // -dCompatibilityLevel=1.4: PDF 1.4 compatibility
    // -dPDFSETTINGS=/ebook: compression preset (screen < ebook < printer < prepress)
    // -dDetectDuplicateImages=true: detect and reuse duplicate images
    // -dColorImageDownsampleType=/Bicubic: downsample color images
    // -dColorImageResolution=150: 150 DPI for color images
    // -dGrayImageDownsampleType=/Bicubic: downsample grayscale images
    // -dGrayImageResolution=150: 150 DPI for grayscale images
    // Determine which Ghostscript command to use (Windows uses gswin64c/gswin32c)
    let gsCommandName = "gs";
    try {
      await execAsync("gs -version", { timeout: 1000 });
    } catch {
      try {
        await execAsync("gswin64c -version", { timeout: 1000 });
        gsCommandName = "gswin64c";
      } catch {
        try {
          await execAsync("gswin32c -version", { timeout: 1000 });
          gsCommandName = "gswin32c";
        } catch {
          // If none work, return original file
          await unlink(inputPath).catch(() => {});
          return file;
        }
      }
    }

    const gsCommand = [
      gsCommandName,
      "-dNOPAUSE",
      "-dBATCH",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dDetectDuplicateImages=true",
      "-dColorImageDownsampleType=/Bicubic",
      "-dColorImageResolution=150",
      "-dGrayImageDownsampleType=/Bicubic",
      "-dGrayImageResolution=150",
      "-dMonoImageResolution=300",
      "-sOutputFile=" + outputPath,
      inputPath
    ].join(" ");

    // Execute Ghostscript compression
    const { stdout, stderr } = await execAsync(gsCommand, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      timeout: 10000, // 10 second timeout
    });

    // Check if output file exists and is smaller
    const outputStats = await import("fs/promises").then(fs => fs.stat(outputPath));
    const originalSize = file.size;
    const compressedSize = outputStats.size;

    // If compression didn't help (or made it larger), return original
    if (compressedSize >= originalSize) {
      console.log(
        `PDF compression didn't reduce size (${(originalSize / 1024 / 1024).toFixed(2)}MB), using original`
      );
      await unlink(outputPath).catch(() => {});
      return file;
    }

    const reduction = ((originalSize - compressedSize) / originalSize) * 100;
    console.log(
      `PDF compressed: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${reduction.toFixed(1)}% reduction)`
    );

    // Read compressed file
    const compressedBuffer = await readFile(outputPath);
    const compressedBlob = new Blob([compressedBuffer], { type: "application/pdf" });
    const compressedFile = new File([compressedBlob], file.name, {
      type: "application/pdf",
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

    // Check if error is due to Ghostscript not being found
    if (error?.message?.includes("not recognized") || error?.message?.includes("command not found") || error?.code === 1) {
      console.warn("Ghostscript (gs) is not installed or not in PATH. Skipping PDF compression. Install Ghostscript to enable compression.");
    } else {
      console.error("PDF compression error:", error);
    }
    // If compression fails, return original file
    return file;
  }
}

/**
 * Fast, lossless PDF compression using qpdf (optional)
 * Use this when you need lossless compression
 */
export async function compressPDFLossless(file: File): Promise<File> {
  const tempDir = tmpdir();
  const inputPath = join(tempDir, `input_${Date.now()}_${file.name}`);
  const outputPath = join(tempDir, `output_${Date.now()}_${file.name}`);

  try {
    // Write input file to temp directory
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // qpdf command for lossless compression
    // --linearize: optimize for web streaming
    // --compress-streams=y: compress streams
    // --object-streams=generate: use object streams
    const qpdfCommand = [
      "qpdf",
      "--linearize",
      "--compress-streams=y",
      "--object-streams=generate",
      inputPath,
      outputPath
    ].join(" ");

    // Execute qpdf compression
    await execAsync(qpdfCommand, {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 5000, // 5 second timeout
    });

    // Check if output file exists and is smaller
    const outputStats = await import("fs/promises").then(fs => fs.stat(outputPath));
    const originalSize = file.size;
    const compressedSize = outputStats.size;

    // If compression didn't help, return original
    if (compressedSize >= originalSize) {
      await unlink(outputPath).catch(() => {});
      return file;
    }

    // Read compressed file
    const compressedBuffer = await readFile(outputPath);
    const compressedBlob = new Blob([compressedBuffer], { type: "application/pdf" });
    const compressedFile = new File([compressedBlob], file.name, {
      type: "application/pdf",
      lastModified: Date.now(),
    });

    // Cleanup temp files
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return compressedFile;
  } catch (error) {
    // Cleanup temp files on error
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    console.error("PDF lossless compression error:", error);
    // If qpdf is not available or fails, fall back to Ghostscript
    return compressPDF(file);
  }
}

/**
 * Check if Ghostscript is available on the system
 */
export async function isGhostscriptAvailable(): Promise<boolean> {
  try {
    // Try 'gs' command (works on Unix and Windows if in PATH)
    await execAsync("gs -version", { timeout: 3000 });
    return true;
  } catch {
    // If 'gs' fails, try 'gswin64c' or 'gswin32c' (Windows Ghostscript)
    try {
      await execAsync("gswin64c -version", { timeout: 3000 });
      return true;
    } catch {
      try {
        await execAsync("gswin32c -version", { timeout: 3000 });
        return true;
      } catch {
        return false;
      }
    }
  }
}

/**
 * Check if qpdf is available on the system
 */
export async function isQpdfAvailable(): Promise<boolean> {
  try {
    await execAsync("qpdf --version");
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if PDF needs compression (if size is above threshold)
 */
export function shouldCompressPDF(file: File, thresholdMB: number = 5): boolean {
  const sizeMB = file.size / (1024 * 1024);
  return sizeMB > thresholdMB;
}
