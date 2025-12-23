# Cloudflare R2 Setup Guide

## ✅ Implementation Complete

All upload routes have been updated to use Cloudflare R2 with property-based folder organization.

## 📋 Environment Variables Setup

Create or update your `.env.local` file in the project root with the following:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=f916d699a0073dec95bb94682fb1ee4d
R2_ACCESS_KEY_ID=516a3e59084b63d35e97e7a76278a2d1
R2_SECRET_ACCESS_KEY=5dd9c0e43fbba9a7744a9618261afcc6bb1fd7dcd6fb0ce53f75475c3343200b
R2_BUCKET_NAME=celesta-abode
R2_PUBLIC_URL=https://f916d699a0073dec95bb94682fb1ee4d.r2.cloudflarestorage.com/celesta-abode

# Admin Authentication (if not already set)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## 📁 Folder Structure

Files are organized by property slug in R2:

```
celesta-abode/
├── {property-slug}/
│   ├── hero.jpg (or .png, .webp, etc.)
│   ├── brochure.pdf
│   ├── images/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── videos/
│       ├── video1.mp4
│       ├── video2.mp4
│       └── ...
```

**Example:**
- Property slug: `arihant-abode`
- Hero image: `arihant-abode/hero.jpg`
- Brochure: `arihant-abode/brochure.pdf`
- Gallery images: `arihant-abode/images/image1.jpg`, `arihant-abode/images/image2.jpg`
- Videos: `arihant-abode/videos/video1.mp4`

## 🔧 What Was Updated

### 1. New R2 Upload Utility (`lib/r2-upload.ts`)
- Direct R2 upload using AWS S3-compatible API
- Property-based folder organization
- Support for hero images, brochures, gallery images, and videos
- Original filename preservation
- Automatic content-type detection

### 2. Updated Upload Routes
- ✅ `app/api/admin/upload/image/route.ts` - Now uses R2
- ✅ `app/api/admin/upload/video/route.ts` - Now uses R2
- ✅ `app/api/admin/upload/pdf/route.ts` - Now uses R2

### 3. Updated Property Form
- ✅ Passes property slug to all upload endpoints
- ✅ Validates slug exists before upload
- ✅ Organizes files automatically by property

## 🚀 Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access admin panel:**
   - Go to `http://localhost:3000/admin/login`
   - Login with your admin credentials

3. **Test uploads:**
   - Create a new property or edit existing one
   - Enter a property slug first (required for uploads)
   - Upload hero image → Should save to `{slug}/hero.{ext}`
   - Upload brochure → Should save to `{slug}/brochure.pdf`
   - Upload gallery images → Should save to `{slug}/images/{filename}`
   - Upload videos → Should save to `{slug}/videos/{filename}`

## 🔒 Security Notes

1. **Bucket Permissions:**
   - Ensure your R2 bucket is configured for public read access
   - Or set up a custom domain with proper CORS settings

2. **Environment Variables:**
   - Never commit `.env.local` to version control
   - Keep R2 credentials secure
   - Rotate keys periodically

3. **File Validation:**
   - All uploads validate file types
   - Images: `image/*`
   - Videos: `video/*`
   - PDFs: `application/pdf`

## 📝 Public URL Format

The public URL format is:
```
https://{account-id}.r2.cloudflarestorage.com/{bucket-name}/{property-slug}/{file-path}
```

**Example:**
```
https://f916d699a0073dec95bb94682fb1ee4d.r2.cloudflarestorage.com/celesta-abode/arihant-abode/hero.jpg
```

## 🔄 Switching to Custom Domain (Future)

When you're ready to use a custom domain:

1. Set up custom domain in Cloudflare R2 dashboard
2. Update `R2_PUBLIC_URL` in `.env.local`:
   ```env
   R2_PUBLIC_URL=https://cdn.celesteabode.com
   ```
3. Restart the development server
4. All existing URLs will automatically use the new domain

## 🐛 Troubleshooting

### Upload fails with "R2 configuration is missing"
- Check that all R2 environment variables are set in `.env.local`
- Restart the development server after adding variables

### Upload fails with "Property slug is required"
- Make sure you've entered a property slug in the form before uploading
- Slug must be non-empty

### Files not accessible via public URL
- Verify bucket is set to public access
- Check bucket name matches `R2_BUCKET_NAME`
- Verify R2 credentials are correct

### CORS errors
- If using custom domain, configure CORS in Cloudflare dashboard
- Allow origin: `https://www.celesteabode.com` (or your domain)

## 📦 Dependencies

- `@aws-sdk/client-s3` - For R2 S3-compatible API (already installed)

## ✅ Next Steps

1. Create `.env.local` with the credentials above
2. Restart development server
3. Test uploads in admin panel
4. Verify files appear in R2 bucket with correct folder structure

