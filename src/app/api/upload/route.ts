import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Session expired or unauthorized. Please log into the admin panel again.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'vrinda_realestate';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type: video or image
    const mimeType = file.type || '';
    const isVideo = mimeType.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';

    const cloudinaryResult = await uploadToCloudinary(buffer, folder, resourceType);
    return NextResponse.json({
      success: true,
      url: cloudinaryResult.secure_url || cloudinaryResult.url,
      public_id: cloudinaryResult.public_id,
      resource_type: cloudinaryResult.resource_type || resourceType,
    });
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return NextResponse.json({ 
      error: err.message || 'Cloudinary upload failed. Check Vercel environment variables.' 
    }, { status: 500 });
  }
}
