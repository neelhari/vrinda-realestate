import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { Property } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const location = searchParams.get('location');
  const featured = searchParams.get('featured');

  let properties = db.getProperties();

  if (type && type !== 'all') {
    properties = properties.filter((p) => p.type === type);
  }

  if (location && location !== 'all') {
    properties = properties.filter((p) => 
      p.location.toLowerCase().includes(location.toLowerCase()) || 
      p.address.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (featured === 'true') {
    properties = properties.filter((p) => p.featured);
  }

  return NextResponse.json({ success: true, properties });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, type, location, address, price, priceLabel, area, areaUnit } = body;

    if (!title || !type || !location) {
      return NextResponse.json({ error: 'Title, Type, and Location are required' }, { status: 400 });
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      slug,
      title,
      type,
      status: body.status || 'available',
      featured: Boolean(body.featured),
      location,
      address: address || `${location}, Andhra Pradesh`,
      price: price ? Number(price) : 0,
      priceLabel: priceLabel || 'Contact for Price',
      area: area ? Number(area) : 0,
      areaUnit: areaUnit || 'sq.yards',
      dimensions: body.dimensions || '',
      facing: body.facing || '',
      bedrooms: body.bedrooms ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : undefined,
      description: body.description || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      amenities: Array.isArray(body.amenities) ? body.amenities : (body.amenities ? body.amenities.split('\n').filter(Boolean) : []),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : ['/images/hero-luxury-villa.jpg'],
      floorPlanUrl: body.floorPlanUrl || '',
      videoUrl: body.videoUrl || '',
      dtcpApproved: Boolean(body.dtcpApproved),
      reraApproved: Boolean(body.reraApproved),
      possessionDate: body.possessionDate || 'Immediate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = db.saveProperty(newProperty);
    return NextResponse.json({ success: true, property: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
