import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { LocationItem } from '@/lib/types';

export async function GET() {
  const locations = await db.fetchLocations();
  return NextResponse.json({ success: true, locations });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item: LocationItem = {
      id: body.id || `loc-${Date.now()}`,
      name: body.name,
      tagline: body.tagline || '',
      description: body.description || '',
      highlights: body.highlights || [],
      imageUrl: body.imageUrl || '/images/category-plots.jpg',
      isActive: body.isActive !== false
    };

    const saved = await db.saveLocation(item);
    return NextResponse.json({ success: true, location: saved });
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
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }

    const deleted = await db.deleteLocation(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
