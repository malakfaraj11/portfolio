import { getProjects, createProject, deleteProject } from '@/actions/content';
import ToggleForm from '@/components/ToggleForm';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  async function handleCreate(formData: FormData) {
    'use server';
    const splitByLine = (text: string) => text.split('\n').map(t => t.trim()).filter(Boolean);
    const splitByComma = (text: string) => text.split(',').map(t => t.trim()).filter(Boolean);

    let finalImageUrl = null;
    const imageFile = formData.get('imageFile') as File | null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `project-${Date.now()}.${imageFile.name.split('.').pop()}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      finalImageUrl = `/uploads/${filename}`;
    }

    await createProject({
      title: formData.get('title') as string,
      subtitleFr: formData.get('subtitleFr') as string,
      subtitleEn: formData.get('subtitleEn') as string,
      resumeFr: formData.get('resumeFr') as string,
      resumeEn: formData.get('resumeEn') as string,
      problemFr: formData.get('problemFr') as string,
      problemEn: formData.get('problemEn') as string,
      goalsFr: splitByLine(formData.get('goalsFr') as string),
      goalsEn: splitByLine(formData.get('goalsEn') as string),
      solutionFr: formData.get('solutionFr') as string,
      solutionEn: formData.get('solutionEn') as string,
      archFr: splitByLine(formData.get('archFr') as string),
      archEn: splitByLine(formData.get('archEn') as string),
      resultsFr: splitByLine(formData.get('resultsFr') as string),
      resultsEn: splitByLine(formData.get('resultsEn') as string),
      categories: splitByComma(formData.get('categories') as string),
      imageUrl: finalImageUrl,
      linkUrl: formData.get('linkUrl') as string || null,
      githubUrl: formData.get('githubUrl') as string || null,
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteProject(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Projets (Portfolio)</h1>

      <ToggleForm title="Ajouter un nouveau projet">
        <form action={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre *</label>
              <input type="text" name="title" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>

            {/* Sous-titres */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Sous-titre FR</label>
              <input type="text" name="subtitleFr" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Sous-titre EN</label>
              <input type="text" name="subtitleEn" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>

            {/* Résumé */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résumé court FR</label>
              <textarea name="resumeFr" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résumé court EN</label>
              <textarea name="resumeEn" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Problème */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Le Problème FR</label>
              <textarea name="problemFr" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Le Problème EN</label>
              <textarea name="problemEn" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Objectifs */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Objectifs FR (un par ligne)</label>
              <textarea name="goalsFr" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Objectifs EN (un par ligne)</label>
              <textarea name="goalsEn" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Solution */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">La Solution FR</label>
              <textarea name="solutionFr" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">La Solution EN</label>
              <textarea name="solutionEn" rows={3} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Architecture */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Architecture FR (une par ligne)</label>
              <textarea name="archFr" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Architecture EN (une par ligne)</label>
              <textarea name="archEn" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Résultats */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résultats FR (un par ligne)</label>
              <textarea name="resultsFr" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résultats EN (un par ligne)</label>
              <textarea name="resultsEn" rows={4} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white"></textarea>
            </div>

            {/* Links and Metadata */}
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Catégories Technologies (séparées par des virgules)</label>
              <input type="text" name="categories" placeholder="React, Node.js, Prisma" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Lien GitHub</label>
              <input type="url" name="githubUrl" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Lien Live (URL) - Optionnel</label>
              <input type="url" name="linkUrl" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Image de couverture (JPG/PNG) - Optionnelle</label>
              <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-white/5">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Ajouter le projet
            </button>
          </div>
        </form>
      </ToggleForm>

      <div className="mb-6">
        <h2 className="text-xl font-bold dark:text-white mb-4">Projets existants ({projects.length})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-[#151518] p-5 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col gap-4 group">
            {project.imageUrl && (
              <div className="w-full h-32 bg-slate-100 dark:bg-black/50 rounded-lg overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg dark:text-white mb-1">{project.title}</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2">{project.resumeFr || project.subtitleFr}</p>
              </div>
              <form action={handleDelete}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="text-slate-400 hover:text-red-500 text-sm font-bold opacity-50 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-500/10" title="Supprimer">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.categories.map(cat => (
                <span key={cat} className="text-[10px] font-mono border border-slate-200 dark:border-white/10 px-2 py-1 rounded text-slate-500 dark:text-gray-500">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
            Aucun projet ajouté. Utilisez le formulaire ci-dessus.
          </div>
        )}
      </div>
    </div>
  );
}
