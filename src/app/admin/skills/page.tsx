import { getSkills, createSkill, deleteSkill } from '@/actions/content';
import ToggleForm from '@/components/ToggleForm';

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

      <ToggleForm title="Ajouter une nouvelle technologie">
        <form action={handleCreate} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Nom (ex: React, Next.js)" 
            required 
            className="flex-1 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" 
          />
          
          <input 
            type="text" 
            name="category" 
            list="category-list"
            placeholder="Catégorie (choisir ou taper)" 
            required 
            className="bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
          />
          <datalist id="category-list">
            <option value="Frontend" />
            <option value="Backend" />
            <option value="UX/UI Design" />
            <option value="Outils" />
            <option value="Langages" />
            <option value="Base de données" />
          </datalist>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Ajouter
          </button>
        </form>
      </ToggleForm>

      <div className="mb-6">
        <h2 className="text-xl font-bold dark:text-white mb-4">Technologies existantes ({skills.length})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white dark:bg-[#151518] p-5 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-start group">
            <div>
              <span className="text-[10px] font-mono font-bold text-fuchsia-500 uppercase tracking-widest bg-fuchsia-500/10 px-2 py-1 rounded inline-block mb-2">
                {skill.category}
              </span>
              <h3 className="font-bold text-lg dark:text-white">{skill.name}</h3>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={skill.id} />
              <button type="submit" className="text-slate-400 hover:text-red-500 text-sm font-bold opacity-50 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-500/10">
                ✕
              </button>
            </form>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
            Aucune technologie ajoutée. Utilisez le formulaire ci-dessus.
          </div>
        )}
      </div>
    </div>
  );
}
