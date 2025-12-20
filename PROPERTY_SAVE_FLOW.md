# Property Data Save Flow Documentation

## Overview

This document describes the complete data-save flow for the Properties module, ensuring data integrity, proper asset management, and atomic operations.

## Flow Diagram

```
1. Form Submission
   ↓
2. Client-Side Validation
   ↓
3. Asset Upload to Cloudflare R2
   ├── Hero Image (Required)
   ├── Brochure PDF (Optional)
   ├── Gallery Images (Optional)
   └── Videos (Optional)
   ↓
4. Upload Validation
   ├── Verify all critical uploads succeeded
   └── Collect non-critical upload errors
   ↓
5. Data Preparation
   ├── Format JSONB fields (arrays, objects)
   ├── Sanitize and validate all fields
   └── Ensure boolean values are correct
   ↓
6. Server-Side Validation
   ├── Validate required fields
   ├── Validate data types
   └── Validate URLs
   ↓
7. Save to Supabase
   ├── Convert camelCase → snake_case
   ├── Insert into properties table
   └── Handle errors gracefully
   ↓
8. Success Response
   ├── Convert snake_case → camelCase
   └── Return created property
```

## Detailed Steps

### Step 1: Form Submission

**Location**: `components/admin/property-form.tsx` → `handleSubmit()`

**Process**:
- User clicks "Save Property" button
- Form validation runs client-side
- Required fields are checked:
  - `slug` (required)
  - `projectName` (required)
  - `developer` (required)
  - `location` (required)
  - `status` (required)
  - `sizes` (required)
  - `description` (required)
  - `heroImage` (required - either existing or new upload)

### Step 2: Asset Upload to Cloudflare R2

**Location**: `components/admin/property-form.tsx` → `uploadFileToR2()`

**Upload Sequence**:
1. **Hero Image** (Required)
   - Path: `{slug}/{slug}_hero.{ext}`
   - If upload fails → **Abort entire operation**
   
2. **Brochure PDF** (Optional)
   - Path: `{slug}/{slug}_brochure.pdf`
   - Compressed before upload
   - If upload fails → Continue (non-critical)
   
3. **Gallery Images** (Optional)
   - Path: `{slug}/images/{slug}_{originalFilename}`
   - Uploaded sequentially
   - If individual image fails → Continue with others
   
4. **Videos** (Optional)
   - Path: `{slug}/videos/{slug}_{originalFilename}`
   - Uploaded sequentially
   - If individual video fails → Continue with others

**Error Handling**:
- Critical errors (hero image) → Abort operation
- Non-critical errors → Log warning, continue

### Step 3: Upload Validation

**Checks**:
- Hero image URL is valid and non-empty
- All uploaded URLs are valid HTTP/HTTPS URLs
- No critical uploads failed

**If validation fails**:
- Show error message to user
- Do NOT proceed to database save
- User can retry upload

### Step 4: Data Preparation

**JSONB Fields Formatting**:
```typescript
{
  unitTypes: string[]        // → unit_types JSONB array
  images: string[]            // → images JSONB array
  videos: Array<{...}>        // → videos JSONB array
  amenities: string[]         // → amenities JSONB array
  seo: {...}                 // → seo JSONB object
}
```

**Data Sanitization**:
- Trim all string fields
- Ensure arrays are never null/undefined
- Ensure objects are properly formatted
- Convert boolean values explicitly

### Step 5: Server-Side Validation

**Location**: `app/api/admin/properties/route.ts` → `POST()`

**Validations**:
1. **Required Fields Check**:
   - `slug`, `projectName`, `developer`, `location`, `status`, `sizes`, `description`, `heroImage`
   
2. **Data Type Validation**:
   - Arrays are actually arrays
   - Objects are actually objects
   - Strings are non-empty after trim
   
3. **URL Validation**:
   - Hero image URL must start with `http://` or `https://`
   
4. **Slug Validation**:
   - Must be unique (checked by Supabase constraint)

### Step 6: Save to Supabase

**Location**: `app/api/admin/properties/route.ts` → `POST()`

**Process**:
1. Convert camelCase → snake_case using `propertyToSupabase()`
2. Insert into `properties` table
3. Handle database errors:
   - Unique constraint violation (slug already exists)
   - Other database errors

**Database Schema Mapping**:
```typescript
// TypeScript (camelCase) → Supabase (snake_case)
slug → slug
projectName → project_name
developer → developer
location → location
reraId → rera_id
status → status
possessionDate → possession_date
unitTypes → unit_types (JSONB)
sizes → sizes
description → description
heroImage → hero_image
brochureUrl → brochure_url
images → images (JSONB)
videos → videos (JSONB)
amenities → amenities (JSONB)
price → price
seo → seo (JSONB)
isPublished → is_published
```

### Step 7: Response Handling

**Success Response**:
- Convert snake_case → camelCase using `supabaseToProperty()`
- Return created property with all fields
- Status code: `201 Created`

**Error Response**:
- Return appropriate HTTP status code
- Include descriptive error message
- Log error details server-side

## Data Integrity Guarantees

### 1. Atomic Operations
- Property record is created **only after** all critical uploads succeed
- If any critical upload fails, no database record is created
- No partial data is saved

### 2. Validation at Multiple Levels
- **Client-side**: Form validation before submission
- **Upload validation**: Verify URLs are returned
- **Server-side**: Validate all data before database insert

### 3. Error Handling
- **Critical errors**: Abort entire operation
- **Non-critical errors**: Log warning, continue
- **Database errors**: Return specific error messages

### 4. Data Consistency
- All JSONB fields are properly formatted
- Arrays are never null (empty array if no data)
- Objects are never null (empty object if no data)
- Boolean values are explicitly set

## Error Scenarios

### Scenario 1: Hero Image Upload Fails
**Result**: Operation aborted, no database record created
**User sees**: Error message explaining hero image upload failed

### Scenario 2: Brochure Upload Fails
**Result**: Operation continues, property saved without brochure
**User sees**: Warning logged, property saved successfully

### Scenario 3: Some Gallery Images Fail
**Result**: Operation continues, property saved with successful images
**User sees**: Warning logged, property saved successfully

### Scenario 4: Database Insert Fails
**Result**: Error returned to user
**User sees**: Specific error message (e.g., "Slug already exists")

### Scenario 5: Network Error During Upload
**Result**: Operation aborted, no database record created
**User sees**: Network error message, can retry

## Testing Checklist

- [ ] Create property with all fields filled
- [ ] Create property with only required fields
- [ ] Create property with hero image upload
- [ ] Create property with brochure upload
- [ ] Create property with multiple gallery images
- [ ] Create property with videos
- [ ] Test hero image upload failure (should abort)
- [ ] Test brochure upload failure (should continue)
- [ ] Test duplicate slug (should show error)
- [ ] Test missing required fields (should show validation error)
- [ ] Test invalid hero image URL (should show error)
- [ ] Verify JSONB fields are stored correctly in Supabase
- [ ] Verify `is_published` boolean is set correctly
- [ ] Verify all asset URLs are stored correctly

## File Structure

```
components/admin/property-form.tsx
  └── handleSubmit()          # Client-side flow orchestration
      └── uploadFileToR2()     # Individual file uploads

app/api/admin/properties/route.ts
  └── POST()                   # Server-side validation & save

lib/supabase-property-mapper.ts
  └── propertyToSupabase()     # camelCase → snake_case
  └── supabaseToProperty()     # snake_case → camelCase

lib/r2-upload.ts
  └── uploadToR2()             # Cloudflare R2 upload logic
```

## Notes

1. **Folder Structure**: All assets are organized by property slug:
   - `{slug}/{slug}_hero.jpg`
   - `{slug}/{slug}_brochure.pdf`
   - `{slug}/images/{slug}_image1.jpg`
   - `{slug}/videos/{slug}_video1.mp4`

2. **JSONB Storage**: Arrays and objects are stored as JSONB in Supabase for efficient querying and indexing.

3. **Publish State**: The `is_published` field controls visibility:
   - `true` → Property is visible on the website
   - `false` → Property is hidden (draft)

4. **Timestamps**: `created_at` and `updated_at` are automatically managed by Supabase triggers.

