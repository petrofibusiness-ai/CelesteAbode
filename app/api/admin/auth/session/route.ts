import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth-guard';

export async function GET(request: NextRequest) {
  try {
    // Strict authentication check using centralized guard
    const auth = await requireAdminAuth(request);
    if (!auth.authenticated) {
      return auth.response!;
    }

    const user = auth.user;

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
