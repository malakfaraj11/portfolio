'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfileForm({ profile, action }: { profile: any, action: (formData: FormData) => Promise<void> }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await action(formData);
      toast.success("Profil mis à jour avec succès !");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 bg-white dark:bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
      
      {/* Header Form */}
      <div className="border-b border-slate-100 dark:border-white/5 pb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Informations Générales</h2>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Gérez vos informations de contact et votre bio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-full">
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Phrase d&apos;accroche (Tagline)</label>
          <input 
            type="text" 
            name="tagline" 
            defaultValue={profile?.tagline || 'Creative Developer & UI Engineer'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Photo de profil (JPG/PNG)</label>
          <input 
            type="file" 
            name="photoFile" 
            accept="image/png, image/jpeg, image/webp"
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-fuchsia-50 dark:file:bg-fuchsia-500/10 file:text-fuchsia-700 dark:file:text-fuchsia-400 hover:file:bg-fuchsia-100 dark:hover:file:bg-fuchsia-500/20 transition-all cursor-pointer" 
          />
          {profile?.photoUrl && <p className="text-xs text-slate-500 mt-2 font-mono truncate">Actuelle: {profile.photoUrl}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Fichier CV (PDF)</label>
          <input 
            type="file" 
            name="cvFile" 
            accept="application/pdf"
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 dark:file:bg-blue-500/10 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-500/20 transition-all cursor-pointer" 
          />
          {profile?.cvUrl && <p className="text-xs text-slate-500 mt-2 font-mono truncate">Actuel: {profile.cvUrl}</p>}
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Bio courte</label>
          <textarea 
            name="bio" 
            defaultValue={profile?.bio || 'Je construis des solutions innovantes...'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white h-28 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none transition-shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Statut de disponibilité</label>
          <input 
            type="text" 
            name="status" 
            defaultValue={profile?.status || 'Disponible pour des missions'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Localisation</label>
          <input 
            type="text" 
            name="location" 
            defaultValue={profile?.location || 'Paris, FR'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow"
          />
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-white/5 pt-8 pb-6 mt-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Section &quot;Ma Vision&quot;</h2>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Personnalisez le contenu de la section À Propos.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre de la Vision</label>
          <input 
            type="text" 
            name="visionTitle" 
            defaultValue={profile?.visionTitle || 'Ma Vision'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Texte de la Vision</label>
          <textarea 
            name="visionText" 
            defaultValue={profile?.visionText || 'Mon approche connecte les besoins métiers...'} 
            className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white h-40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none transition-shadow"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-white/5">
        <button 
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl border border-transparent dark:border-white/10 hover:bg-slate-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-400 dark:border-slate-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
              Enregistrement...
            </>
          ) : (
            'Sauvegarder le Profil'
          )}
        </button>
      </div>
    </form>
  );
}
