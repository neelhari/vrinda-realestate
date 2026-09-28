import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const testimonials = db.getTestimonials();
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item = {
      ...body,
      id: `test-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const saved = db.saveTestimonial(item);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const deleted = db.deleteTestimonial(id);
  return NextResponse.json({ success: deleted });
}
