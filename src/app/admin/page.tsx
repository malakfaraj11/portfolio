import { getProfile } from '@/actions/content';
import { updateProfile, createProfile } from '@/actions/content';

export default async function AdminProfilePage() {
  const profile = await getProfile();

  async function handleSave(formData: FormData) {
    'use server';
    const data = {
      tagline: formData.get('tagline') as string,
      bio: formData.get('bio') as string,
      status: formData.get('status') as string,
      location: formData.get('location') as string,
      visionTitle: formData.get('visionTitle') as string,
      visionText: formData.get('visionText') as string,
      photoUrl: formData.get('photoUrl') as string || null,
      cvUrl: formData.get('cvUrl') as string || null,
    };

    if (profile) {
      await updateProfile(profile.id, data);
    } else {
      await createProfile(data);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Profil & Vision</h1>
      
      <form action={handleSave} className="space-y-6 bg-white dark:bg-[#151518] p-8 rounded-xl border border-slate-200 dark:border-white/10">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Phrase d&apos;accroche (Tagline)</label>
          <input 
            type="text" 
            name="tagline" 
            defaultValue={profile?.tagline || 'Creative Developer & UI Engineer'} 
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">URL de la Photo de profil (Optionnel)</label>
            <input 
              type="url" 
              name="photoUrl" 
              defaultValue={profile?.photoUrl || ''} 
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" 
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">URL du CV (Optionnel, ex: lien PDF)</label>
            <input 
              type="url" 
              name="cvUrl" 
              defaultValue={profile?.cvUrl || ''} 
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" 
              placeholder="/cv.pdf ou https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Bio courte</label>
          <textarea 
            name="bio" 
            defaultValue={profile?.bio || 'Je construis des solutions innovantes...'} 
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Statut de disponibilité</label>
            <input 
              type="text" 
              name="status" 
              defaultValue={profile?.status || 'Disponible pour des missions'} 
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Localisation</label>
            <input 
              type="text" 
              name="location" 
              defaultValue={profile?.location || 'Paris, FR'} 
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre de la Vision</label>
          <input 
            type="text" 
            name="visionTitle" 
            defaultValue={profile?.visionTitle || 'Ma Vision'} 
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Texte de la Vision</label>
          <textarea 
            name="visionText" 
            defaultValue={profile?.visionText || 'Mon approche connecte les besoins métiers...'} 
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white h-32"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Sauvegarder le Profil
        </button>
      </form>
    </div>
  );
}
