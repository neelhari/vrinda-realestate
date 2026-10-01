import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, whatsapp, interestedPropertyName, propertyType, source, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone number are required' }, { status: 400 });
    }

    const lead = await db.addLead({
      name,
      phone,
      email: email || '',
      whatsapp: whatsapp || phone,
      interestedPropertyName: interestedPropertyName || 'General Property Enquiry',
      propertyType: propertyType || 'General',
      source: source || 'Website Contact Form',
      message: message || '',
      status: 'New',
      notes: ''
    });

    return NextResponse.json({ success: true, lead });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing lead' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await db.fetchLeads();
  return NextResponse.json({ success: true, leads });
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
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const updated = await db.updateLead(id, updates);
    return NextResponse.json({ success: true, lead: updated });
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
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const deleted = await db.deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
