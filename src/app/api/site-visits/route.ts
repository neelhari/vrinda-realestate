import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, whatsapp, email, propertyName, preferredDate, preferredTime, attendeesCount, message } = body;

    if (!name || !phone || !preferredDate) {
      return NextResponse.json({ error: 'Name, Phone number, and Preferred Date are required' }, { status: 400 });
    }

    const visit = await db.addSiteVisit({
      name,
      phone,
      whatsapp: whatsapp || phone,
      email: email || '',
      propertyName: propertyName || 'Vrinda Green Meadows, Koppolu',
      preferredDate,
      preferredTime: preferredTime || 'Morning (10:00 AM - 12:00 PM)',
      attendeesCount: attendeesCount ? Number(attendeesCount) : 1,
      pickupRequired: false,
      message: message || '',
      status: 'Requested',
      notes: ''
    });

    // Also automatically register as a lead
    await db.addLead({
      name,
      phone,
      whatsapp: whatsapp || phone,
      email: email || '',
      interestedPropertyName: propertyName || 'Vrinda Green Meadows, Koppolu',
      propertyType: 'Site Visit Booking',
      source: 'Site Visit Scheduler',
      message: `Scheduled site visit on ${preferredDate} at ${preferredTime || 'Morning'}. ${message || ''}`,
      status: 'Site Visit Scheduled',
      notes: 'Automated entry from site visit booking form.'
    });

    return NextResponse.json({ success: true, visit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error booking site visit' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const visits = await db.fetchSiteVisits();
  return NextResponse.json({ success: true, visits });
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Visit ID is required' }, { status: 400 });
    }

    const updated = await db.updateSiteVisit(id, updates);
    return NextResponse.json({ success: true, visit: updated });
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
      return NextResponse.json({ error: 'Visit ID is required' }, { status: 400 });
    }

    const deleted = await db.deleteSiteVisit(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
