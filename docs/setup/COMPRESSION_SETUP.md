# Media Compression Setup Guide

This document describes the media compression pipeline integrated into the upload system.

## Overview

The upload pipeline now includes automatic compression for:
- **Videos**: Compressed using FFmpeg with H.264 codec
- **PDFs**: Compressed using Ghostscript with /ebook preset

Compression runs server-side before files are uploaded to Cloudflare R2.

## Requirements

### System Dependencies

The following tools must be installed on your server:

#### FFmpeg (for video compression)
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
# Add to PATH
```

#### Ghostscript (for PDF compression)
```bash
# Ubuntu/Debian
sudo apt-get install ghostscript

# macOS
brew install ghostscript

# Windows
# Download from https://www.ghostscript.com/download/gsdnld.html
# Add to PATH
```

#### qpdf (optional, for lossless PDF compression)
```bash
# Ubuntu/Debian
sudo apt-get install qpdf

# macOS
brew install qpdf

# Windows
# Download from https://qpdf.sourceforge.io/
# Add to PATH
```

### Verification

You can verify the tools are installed by running:
```bash
ffmpeg -version
gs -version
qpdf --version
```

## Implementation Details

### Video Compression

- **Tool**: FFmpeg
- **Codec**: H.264 (libx264)
- **Quality**: CRF 23 (balanced quality/size)
- **Preset**: medium (balance between speed and compression)
- **Profile**: high (widely compatible)
- **Level**: 4.0 (web-friendly)
- **Audio**: AAC at 128kbps
- **Optimization**: Faststart enabled for web streaming

**Expected Performance**: 5-15 seconds per minute of video, depending on server resources.

### PDF Compression

- **Tool**: Ghostscript
- **Preset**: /ebook (web-friendly compression)
- **Color Images**: 150 DPI, Bicubic downsampling
- **Grayscale Images**: 150 DPI, Bicubic downsampling
- **Monochrome Images**: 300 DPI
- **Compatibility**: PDF 1.4

**Expected Performance**: 1-3 seconds for typical brochure sizes.

### Fallback Behavior

- If compression fails, the original file is uploaded
- If compression doesn't reduce file size, the original file is used
- Compression errors are logged but don't block the upload

## File Locations

- Video compression: `lib/video-compress.ts`
- PDF compression: `lib/pdf-compress.ts`
- Video upload route: `app/api/admin/upload/video/route.ts`
- PDF upload route: `app/api/admin/upload/pdf/route.ts`

## Usage

Compression is automatic and transparent. When files are uploaded through the admin panel:

1. File is received by the API route
2. Compression is attempted (if applicable)
3. Compressed file (or original if compression failed) is uploaded to R2
4. Response includes original and compressed sizes

## Troubleshooting

### Compression not working

1. Verify FFmpeg/Ghostscript are installed: `ffmpeg -version` and `gs -version`
2. Check server logs for compression errors
3. Ensure the server has write permissions to the temp directory
4. Verify sufficient disk space for temporary files

### Compression too slow

- For videos, you can adjust the FFmpeg preset in `lib/video-compress.ts`:
  - `ultrafast` - fastest, larger files
  - `fast` - faster, slightly larger files
  - `medium` - balanced (default)
  - `slow` - slower, smaller files
  - `veryslow` - slowest, smallest files

### Compression not reducing size

- Some files are already optimized and won't compress further
- Very small files may not benefit from compression
- The system automatically uses the original if compression doesn't help

## Performance Considerations

- Compression runs synchronously in the API route
- For very large files (>100MB), consider implementing a background job queue
- Temporary files are automatically cleaned up after compression
- Compression timeout is set to 5 minutes for videos, 10 seconds for PDFs

## Security

- Temporary files are created in the system temp directory
- Files are automatically deleted after processing
- No user data is persisted beyond the upload process
- Compression commands use safe, parameterized arguments

