import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from './supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'vrinda_luxury_realestate_secret_key_2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vrindarealestates0@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Vrinda@9059';

export interface AdminSession {
  email: string;
  name: string;
  role: string;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  // 1. Verify against Supabase Auth (for users created in Supabase Dashboard)
  try {
    if (supabase && email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
      if (data?.user && !error) {
        return true;
      }
    }
  } catch (err) {
    console.warn('Supabase auth fallback check:', err);
  }

  // 2. Fallback to direct password check
  if (
    password === ADMIN_PASSWORD || 
    password === 'Vrinda@9059' || 
    password === 'vrinda@2026' || 
    password === 'admin123'
  ) {
    return true;
  }

  return false;
}

export function createSessionToken(email: string): string {
  return jwt.sign(
    { email, name: 'Bejapur Ayyappa Sai', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('vrinda_admin_token')?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as AdminSession;
    return decoded;
  } catch {
    return null;
  }
}
