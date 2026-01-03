import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { requireAdminAuth } from '@/lib/admin-auth-guard';
import { signOut } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Require authentication to logout
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    await signOut();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[INTERNAL] Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
