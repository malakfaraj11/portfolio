import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/actions/content';
import ExpClient from './ExpClient';

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  async function serverAction(formData: FormData, editingId: string | null) {
    'use server';
    const data = {
      type: formData.get('type') as string,
      titleFr: formData.get('titleFr') as string,
      titleEn: formData.get('titleEn') as string,
      descFr: formData.get('descFr') as string || null,
      descEn: formData.get('descEn') as string || null,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null,
    };

    if (editingId) {
      await updateExperience(editingId, data);
    } else {
      await createExperience(data);
    }
  }

  async function deleteAction(id: string) {
    'use server';
    await deleteExperience(id);
  }

  return (
    <ExpClient 
      experiences={experiences} 
      serverAction={serverAction} 
      deleteAction={deleteAction} 
    />
  );
}
