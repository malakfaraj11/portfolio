import { getExperiences, createExperience, deleteExperience } from '@/actions/content';
import ToggleForm from '@/components/ToggleForm';

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  async function handleCreate(formData: FormData) {
    'use server';
    await createExperience({
      type: formData.get('type') as string,
      titleFr: formData.get('titleFr') as string,
      titleEn: formData.get('titleEn') as string,
      descFr: formData.get('descFr') as string || null,
      descEn: formData.get('descEn') as string || null,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null,
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteExperience(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Parcours (Expériences)</h1>

      <ToggleForm title="Ajouter une nouvelle expérience">
        <form action={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Type *</label>
              <select name="type" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none">
                <option value="Expérience">Expérience</option>
                <option value="Organisation">Organisation</option>
                <option value="Formation">Formation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre FR *</label>
              <input type="text" name="titleFr" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre EN *</label>
              <input type="text" name="titleEn" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de début * (jj/mm/aaaa)</label>
              <input type="date" name="startDate" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de fin prévue ou effective (jj/mm/aaaa) (Laisser vide si en cours)</label>
              <input type="date" name="endDate" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Description FR</label>
              <textarea name="descFr" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Description EN</label>
              <textarea name="descEn" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Ajouter
            </button>
          </div>
        </form>
      </ToggleForm>

      <div className="mb-6">
        <h2 className="text-xl font-bold dark:text-white mb-4">Expériences existantes ({experiences.length})</h2>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-[#151518] p-6 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-start group">
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-xl dark:text-white">{exp.titleFr}</h3>
                <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded">
                  {exp.type}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mb-3">
                {exp.startDate.toLocaleDateString('fr-FR')} - {(!exp.endDate || exp.endDate > new Date()) ? 'En cours' : exp.endDate.toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-3 line-clamp-2">{exp.descFr}</p>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={exp.id} />
              <button type="submit" className="text-slate-400 hover:text-red-500 text-sm font-bold opacity-50 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-500/10" title="Supprimer">
                ✕
              </button>
            </form>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="py-10 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
            Aucune expérience ajoutée. Utilisez le formulaire ci-dessus.
          </div>
        )}
      </div>
    </div>
  );
}
