import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { Testimonial } from '@/lib/types';

export async function GET() {
  const testimonials = await db.fetchTestimonials();
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item: Testimonial = {
      id: body.id || `test-${Date.now()}`,
      name: body.name,
      location: body.location || 'Ongole',
      role: body.role || 'Property Owner',
      rating: Number(body.rating) || 5,
      comment: body.comment,
      propertyName: body.propertyName || '',
      avatarUrl: body.avatarUrl || '',
      isPublished: body.isPublished !== false,
      createdAt: new Date().toISOString()
    };

    const saved = await db.saveTestimonial(item);
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

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    const deleted = await db.deleteTestimonial(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
