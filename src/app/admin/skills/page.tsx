import { getSkills, createSkill, deleteSkill } from '@/actions/content';

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  async function handleCreate(formData: FormData) {
    'use server';
    await createSkill({
      name: formData.get('name') as string,
      category: formData.get('category') as string,
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteSkill(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Écosystème (Stack)</h1>

      <div className="bg-white dark:bg-[#151518] p-8 rounded-xl border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Ajouter une technologie</h2>
        <form action={handleCreate} className="flex gap-4">
          <input type="text" name="name" placeholder="Nom (ex: React, Next.js)" required className="flex-1 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          <select name="category" required className="bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">UX/UI Design</option>
            <option value="Tools">Outils</option>
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Ajouter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white dark:bg-[#151518] p-4 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{skill.category}</span>
              <h3 className="font-bold text-lg dark:text-white">{skill.name}</h3>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={skill.id} />
              <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-bold">
                ✕
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
