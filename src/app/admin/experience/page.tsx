import { getExperiences, createExperience, deleteExperience } from '@/actions/content';

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  async function handleCreate(formData: FormData) {
    'use server';
    const techStack = formData.get('techStack')?.toString().split(',').map((t) => t.trim()) || [];

    await createExperience({
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      description: formData.get('description') as string,
      techStack,
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteExperience(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Parcours & Expériences</h1>

      <div className="bg-white dark:bg-[#151518] p-8 rounded-xl border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Nouvelle Expérience</h2>
        <form action={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="role" placeholder="Rôle (ex: Développeur Frontend)" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
            <input type="text" name="company" placeholder="Entreprise / Client" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="startDate" placeholder="Date de début (ex: 2023)" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
            <input type="text" name="endDate" placeholder="Date de fin (ex: PRESENT)" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          </div>
          <textarea name="description" placeholder="Description de la mission" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white h-24" />
          <input type="text" name="techStack" placeholder="Technologies utilisées (séparées par des virgules)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors">
            Ajouter l'expérience
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-[#151518] p-6 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg dark:text-white">{exp.role} @ {exp.company}</h3>
              <p className="text-xs font-mono text-slate-500 mb-2">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm text-slate-700 dark:text-gray-300">{exp.description}</p>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={exp.id} />
              <button type="submit" className="text-red-500 hover:text-red-600 font-bold px-4 py-2 bg-red-50 dark:bg-red-500/10 rounded-lg ml-4">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
