import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminUser } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session')?.value;

    if (!session || session !== 'authenticated') {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = getAdminUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

