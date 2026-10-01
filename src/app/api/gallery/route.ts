import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { GalleryItem } from '@/lib/types';

export async function GET() {
  const gallery = await db.fetchGallery();
  return NextResponse.json({ success: true, gallery });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item: GalleryItem = {
      id: body.id || `gal-${Date.now()}`,
      title: body.title,
      category: body.category || 'plots',
      imageUrl: body.imageUrl || '/images/category-plots.jpg',
      caption: body.caption || '',
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString()
    };

    const saved = await db.saveGalleryItem(item);
    return NextResponse.json({ success: true, item: saved });
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
      return NextResponse.json({ error: 'Gallery ID is required' }, { status: 400 });
    }

    const deleted = await db.deleteGalleryItem(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
