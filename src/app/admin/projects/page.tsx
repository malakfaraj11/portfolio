import { getProjects, createProject, deleteProject } from '@/actions/content';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  async function handleCreate(formData: FormData) {
    'use server';
    const tags = formData.get('tags')?.toString().split(',').map((t) => t.trim()) || [];

    await createProject({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      linkUrl: formData.get('linkUrl') as string,
      githubUrl: formData.get('githubUrl') as string,
      tags,
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteProject(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Projets</h1>

      <div className="bg-white dark:bg-[#151518] p-8 rounded-xl border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Nouveau Projet</h2>
        <form action={handleCreate} className="space-y-4">
          <input type="text" name="title" placeholder="Titre du projet" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          <textarea name="description" placeholder="Description courte" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white h-24" />
          <input type="text" name="imageUrl" placeholder="URL de l'image (ex: /projects/1.jpg)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          <input type="text" name="tags" placeholder="Tags séparés par des virgules (ex: React, Node.js)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="linkUrl" placeholder="Lien Live (Live URL)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
            <input type="text" name="githubUrl" placeholder="Lien GitHub" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white" />
          </div>

          <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition-colors">
            Ajouter le projet
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-[#151518] p-6 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg dark:text-white">{project.title}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{project.tags.join(', ')}</p>
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={project.id} />
              <button type="submit" className="text-red-500 hover:text-red-600 font-bold px-4 py-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
