# Windows Installation Guide for Compression Tools

## Quick Answer

**You don't need to install these tools** - your uploads will work fine without them. However, if you want to enable automatic file compression to reduce file sizes, you'll need to install FFmpeg (for videos) and Ghostscript (for PDFs).

## Installation Steps for Windows

### Option 1: Using Chocolatey (Recommended - Easiest)

If you have Chocolatey package manager installed:

```powershell
# Install FFmpeg
choco install ffmpeg

# Install Ghostscript
choco install ghostscript
```

### Option 2: Manual Installation

#### Installing FFmpeg

1. **Download FFmpeg:**
   - Go to https://www.gyan.dev/ffmpeg/builds/
   - Download "ffmpeg-release-essentials.zip" (or latest version)
   - Extract the ZIP file to a folder (e.g., `C:\ffmpeg`)

2. **Add to PATH:**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path", then click "Edit"
   - Click "New" and add the path to the `bin` folder (e.g., `C:\ffmpeg\bin`)
   - Click "OK" on all dialogs

3. **Verify Installation:**
   - Open a new Command Prompt or PowerShell window
   - Run: `ffmpeg -version`
   - You should see version information

#### Installing Ghostscript

1. **Download Ghostscript:**
   - Go to https://www.ghostscript.com/download/gsdnld.html
   - Download the Windows installer (e.g., "Ghostscript 10.x.x for Windows")
   - Run the installer

2. **Add to PATH (if not done automatically):**
   - The installer usually adds Ghostscript to PATH automatically
   - If not, add `C:\Program Files\gs\gs10.x.x\bin` to your PATH (version number may vary)

3. **Verify Installation:**
   - Open a new Command Prompt or PowerShell window
   - Run: `gswin64c -version` (or `gswin32c -version` for 32-bit)
   - You should see version information

### Option 3: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
# Install FFmpeg
winget install Gyan.FFmpeg

# Install Ghostscript
winget install ArtifexSoftware.Ghostscript
```

## After Installation

1. **Restart your development server** (if it's running)
   - The tools need to be in PATH when Node.js starts

2. **Test the installation:**
   - Try uploading a PDF or video file
   - Check the console logs - you should see compression messages if it's working
   - If tools are detected, you'll see logs like: "PDF compressed: X MB → Y MB (Z% reduction)"

## Troubleshooting

### "Command not recognized" after installation

1. **Restart your terminal/IDE** - PATH changes require a restart
2. **Restart your development server** - Node.js needs to see the updated PATH
3. **Verify PATH:**
   - Open Command Prompt
   - Run: `echo %PATH%` and check if the tool paths are included
   - Or run: `where ffmpeg` and `where gswin64c` to find the executables

### Still not working?

- Make sure you installed the correct version (64-bit vs 32-bit)
- Check that the `bin` folder is in PATH, not the root folder
- Try using the full path in the compression functions (not recommended for production)

## What Happens Without the Tools?

- ✅ Files upload successfully
- ✅ All functionality works normally
- ⚠️ Files are uploaded at their original size (no compression)
- ℹ️ You'll see warning messages in the console, but no errors

## Benefits of Installing

- **Smaller file sizes** - Reduced storage costs
- **Faster downloads** - Better user experience
- **Bandwidth savings** - Especially important for large files
- **Automatic compression** - No manual steps needed

## Recommendation

For **development/testing**: You can skip installation - everything works fine.

For **production**: Install the tools to enable compression and reduce file sizes.

