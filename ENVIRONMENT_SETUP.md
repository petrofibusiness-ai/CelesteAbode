# Environment Setup Instructions

## Create .env.local file

Create a file named `.env.local` in the root directory with the following content:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=your-email@gmail.com

# Phone Number
PHONE_NUMBER=+919818735258

# Website Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Celeste Abode

# Database (if needed in future)
# DATABASE_URL=your-database-url

# Google Analytics (GA4)
# Get your Measurement ID from: https://analytics.google.com/
# Format: G-XXXXXXXXXX
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
# Get your Pixel ID from: https://business.facebook.com/events_manager2
# Format: 1234567890123456 (numeric)
# NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

## Setup Instructions

### 1. Email Configuration (Gmail)
- **EMAIL_USER**: Your Gmail address (e.g., yourname@gmail.com)
- **EMAIL_PASS**: Your Gmail App Password (16-character password, NOT your regular Gmail password)
- **ADMIN_EMAIL**: Email where form submissions will be sent (usually same as EMAIL_USER)

### 2. Gmail App Password Setup
1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-Factor Authentication (required for App Passwords)
3. Go to Security → 2-Step Verification → App passwords
4. Select "Mail" as the app and "Other" as the device
5. Generate a new 16-character app password
6. Copy the 16-character password (no spaces) and use it as EMAIL_PASS
7. **Important**: Use the App Password, NOT your regular Gmail password

### 3. Phone Number
- Update PHONE_NUMBER with your business phone number
- Format: +919818735258 (with country code)

### 4. Website Configuration
- **NEXT_PUBLIC_SITE_URL**: Your website URL
- **NEXT_PUBLIC_SITE_NAME**: Your website name

### 5. Google Analytics Setup
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (if you don't have one)
3. Go to Admin → Data Streams → Web
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
6. Restart your development server
7. **Note**: Google Analytics component is already installed in the codebase - just needs the ID to activate

### 6. Facebook Pixel Setup
1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to Events Manager → Data Sources → Pixels
3. Create a new Pixel (if you don't have one)
4. Copy your **Pixel ID** (numeric, e.g., `1234567890123456`)
5. Add it to `.env.local` as `NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456`
6. Restart your development server
7. **Note**: Facebook Pixel component is now installed - just needs the ID to activate

## Important Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Restart your development server after creating the file
- All environment variables are automatically loaded by Next.js

## Testing Email Functionality

After setting up the environment variables:
1. Start your development server: `npm run dev`
2. Go to `/advisory-session`
3. Fill out the form and submit
4. Check your email for the advisory session request
5. Check the client's email for the confirmation

## Troubleshooting

### Email not sending?
- Verify EMAIL_USER and EMAIL_PASS are correct
- **CRITICAL**: Make sure you're using Gmail App Password, NOT your regular Gmail password
- Ensure 2-Factor Authentication is enabled on your Google account
- Verify the App Password was generated correctly (16 characters, no spaces)
- Check that EMAIL_USER is your full Gmail address (e.g., yourname@gmail.com)
- Make sure the App Password hasn't been revoked or regenerated
- Check Gmail security settings to ensure "Less secure app access" is not blocking (though App Passwords should bypass this)

### Form not submitting?
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API call status
