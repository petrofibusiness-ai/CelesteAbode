// Middleware to protect admin routes
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.ADMIN_JWT_SECRET;

if (!secretKey) {
  throw new Error('ADMIN_JWT_SECRET environment variable must be set. Admin panel cannot start without a secure secret.');
}

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

