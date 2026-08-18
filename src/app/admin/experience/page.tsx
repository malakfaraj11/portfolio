import { getExperiences, createExperience, deleteExperience } from '@/actions/content';
import ToggleForm from '@/components/ToggleForm';

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  async function handleCreate(formData: FormData) {
    'use server';
    await createExperience({
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      description: formData.get('description') as string,
      techStack: (formData.get('techStack') as string).split(',').map(t => t.trim()).filter(Boolean),
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
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Rôle / Poste</label>
              <input type="text" name="role" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Entreprise</label>
              <input type="text" name="company" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de début (ex: Jan 2022)</label>
              <input type="text" name="startDate" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de fin (ex: Présent)</label>
              <input type="text" name="endDate" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Description</label>
            <textarea name="description" required rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Technologies (séparées par des virgules)</label>
            <input type="text" name="techStack" placeholder="React, Node.js, TypeScript" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" />
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
                <h3 className="font-bold text-xl dark:text-white">{exp.role}</h3>
                <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded">
                  {exp.company}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mb-3">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-3 line-clamp-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map(tech => (
                  <span key={tech} className="text-[10px] font-mono border border-slate-200 dark:border-white/10 px-2 py-1 rounded text-slate-500 dark:text-gray-500">
                    {tech}
                  </span>
                ))}
              </div>
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
