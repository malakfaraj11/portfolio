import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/actions/content';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import CertClient from './CertClient';

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  async function serverAction(formData: FormData, editingId: string | null) {
    'use server';
    
    // Parse date if provided
    const dateStr = formData.get('date') as string;
    const date = dateStr ? new Date(dateStr) : undefined;
    
    let finalUrl = formData.get('url') as string || null;
    
    const pdfFile = formData.get('pdfFile') as File | null;
    if (pdfFile && pdfFile.size > 0) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `cert-${Date.now()}.${pdfFile.name.split('.').pop()}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      finalUrl = `/uploads/${filename}`;
    } else if (editingId && !finalUrl) {
       // if editing and no new file or url, keep the old one
       const existing = certifications.find((c: any) => c.id === editingId);
       if (existing) {
         finalUrl = existing.url;
       }
    }
    
    const data = {
      name: formData.get('name') as string,
      issuer: formData.get('issuer') as string,
      url: finalUrl,
      ...(date ? { date } : {})
    };

    if (editingId) {
      await updateCertification(editingId, data);
    } else {
      await createCertification(data);
    }
  }

  async function deleteAction(id: string) {
    'use server';
    await deleteCertification(id);
  }

  return (
    <CertClient 
      certifications={certifications} 
      serverAction={serverAction} 
      deleteAction={deleteAction} 
    />
  );
}
