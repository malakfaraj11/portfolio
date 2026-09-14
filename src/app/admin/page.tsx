import { getProfile, updateProfile, createProfile } from '@/actions/content';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import ProfileForm from './ProfileForm';

export default async function AdminProfilePage() {
  const profile = await getProfile();

  async function handleSave(formData: FormData) {
    'use server';
    // Gérer l'upload de la photo
    const photoFile = formData.get('photoFile') as File | null;
    let finalPhotoUrl = profile?.photoUrl || null;
    if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `photo-${Date.now()}.${photoFile.name.split('.').pop()}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      finalPhotoUrl = `/uploads/${filename}`;
    }

    // Gérer l'upload du CV
    const cvFile = formData.get('cvFile') as File | null;
    let finalCvUrl = profile?.cvUrl || null;
    if (cvFile && cvFile.size > 0) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `cv-${Date.now()}.${cvFile.name.split('.').pop()}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      finalCvUrl = `/uploads/${filename}`;
    }

    const data = {
      tagline: formData.get('tagline') as string,
      bio: formData.get('bio') as string,
      status: formData.get('status') as string,
      location: formData.get('location') as string,
      visionTitle: formData.get('visionTitle') as string,
      visionText: formData.get('visionText') as string,
      photoUrl: finalPhotoUrl,
      cvUrl: finalCvUrl,
    };

    if (profile) {
      await updateProfile(profile.id, data);
    } else {
      await createProfile(data);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Profil & Vision</h1>
      <ProfileForm profile={profile} action={handleSave} />
    </div>
  );
}
