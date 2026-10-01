import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // 1. Primary: Upload to Cloudinary
    try {
      const cloudinaryResult = await uploadToCloudinary(buffer, folder, resourceType);
      return NextResponse.json({
        success: true,
        url: cloudinaryResult.secure_url || cloudinaryResult.url,
        public_id: cloudinaryResult.public_id,
        resource_type: cloudinaryResult.resource_type || resourceType,
      });
    } catch (cloudErr) {
      console.error('Cloudinary upload failed, falling back to local storage:', cloudErr);
      
      // 2. Fallback to local storage
      const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.jpg');
      const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
      const filename = `upload_${Date.now()}_${cleanName}${ext}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ 
        success: true, 
        url: publicUrl,
        fallback: true 
      });
    }
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return NextResponse.json({ error: err.message || 'File upload failed' }, { status: 500 });
  }
}
