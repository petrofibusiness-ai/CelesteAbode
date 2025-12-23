/**
 * Script to create admin user in Supabase
 * Run this once to create the admin user with:
 * - Email: admin@admin.celesteabode.com
 * - Password: admin123
 * 
 * Usage:
 *   npx tsx scripts/create-admin-user.ts
 * 
 * Or with ts-node:
 *   ts-node scripts/create-admin-user.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Supabase environment variables are not set');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUser() {
  const email = 'admin@admin.celesteabode.com';
  const password = 'admin123';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);

  try {
    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find((u) => u.email === email);

    if (existingUser) {
      console.log('Admin user already exists!');
      console.log(`User ID: ${existingUser.id}`);
      console.log('You can reset the password in Supabase Dashboard if needed.');
      return;
    }

    // Create new admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: 'Admin',
        role: 'admin',
      },
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      process.exit(1);
    }

    if (data.user) {
      console.log('✅ Admin user created successfully!');
      console.log(`User ID: ${data.user.id}`);
      console.log(`Email: ${data.user.email}`);
      console.log('\nYou can now login with:');
      console.log('  Login ID: admin');
      console.log('  Password: admin123');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

createAdminUser();

