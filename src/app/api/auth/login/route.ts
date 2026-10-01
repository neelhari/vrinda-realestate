import { NextResponse } from 'next/server';
import { verifyAdminCredentials, createSessionToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const adminEmail = (email || 'vrindarealestates0@gmail.com').trim();
    const isValid = await verifyAdminCredentials(adminEmail, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = createSessionToken(adminEmail);
    const cookieStore = await cookies();
    cookieStore.set('vrinda_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({
      success: true,
      user: {
        email: adminEmail,
        name: 'Bejapur Ayyappa Sai',
        role: 'admin'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
