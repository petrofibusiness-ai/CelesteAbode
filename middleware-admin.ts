// Middleware to protect admin routes
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, encodedKey);
    return true;
  } catch {
    return false;
  }
}

export function adminMiddleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Token verification will be done in the route handler
  return NextResponse.next();
}

