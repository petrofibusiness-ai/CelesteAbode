// Simple authentication for admin panel (no JWT)
import { cookies } from 'next/headers';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
}

// Simple credentials check
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAdminUser(): AdminUser {
  return {
    id: '1',
    username: ADMIN_USERNAME,
    name: 'Admin',
  };
}

// Check if user is authenticated (for API routes)
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session')?.value;
    return session === 'authenticated';
  } catch {
    return false;
  }
}

