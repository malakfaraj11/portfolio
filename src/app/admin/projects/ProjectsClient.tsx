'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';

type Project = any; // Typing as any for simplicity, usually import from Prisma

export default function ProjectsClient({ projects, serverAction, deleteAction }: { projects: Project[], serverAction: (formData: FormData, editingId: string | null) => Promise<void>, deleteAction: (id: string) => Promise<void> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setEditingId(project.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setCurrentProject(null);
    setEditingId(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setEditingId(null);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await serverAction(formData, editingId);
      toast.success(editingId ? "Projet mis à jour avec succès !" : "Projet créé avec succès !");
      setIsEditing(false);
      setEditingId(null);
      setCurrentProject(null);
      router.refresh();
    } catch (error) {
      toast.error("Une erreur s'est produite.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteAction(id);
        toast.success("Projet supprimé.");
        router.refresh();
      } catch (e) {
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Projets ({projects.length})</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Gérez vos réalisations affichées dans l'Atelier.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouveau Projet
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={handleCancel} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {editingId ? "Modifier le projet" : "Ajouter un nouveau projet"}
          </h2>
          
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre du Projet *</label>
                <input type="text" name="title" required defaultValue={currentProject?.title} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Sous-titre (FR)</label>
                <input type="text" name="subtitleFr" defaultValue={currentProject?.subtitleFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Sous-titre (EN)</label>
                <input type="text" name="subtitleEn" defaultValue={currentProject?.subtitleEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résumé court (FR)</label>
                <textarea name="resumeFr" rows={3} defaultValue={currentProject?.resumeFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résumé court (EN)</label>
                <textarea name="resumeEn" rows={3} defaultValue={currentProject?.resumeEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Le Problème (FR)</label>
                <textarea name="problemFr" rows={3} defaultValue={currentProject?.problemFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Le Problème (EN)</label>
                <textarea name="problemEn" rows={3} defaultValue={currentProject?.problemEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Objectifs FR (1 par ligne)</label>
                <textarea name="goalsFr" rows={3} defaultValue={currentProject?.goalsFr?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Objectifs EN (1 par ligne)</label>
                <textarea name="goalsEn" rows={3} defaultValue={currentProject?.goalsEn?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">La Solution (FR)</label>
                <textarea name="solutionFr" rows={3} defaultValue={currentProject?.solutionFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">La Solution (EN)</label>
                <textarea name="solutionEn" rows={3} defaultValue={currentProject?.solutionEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Architecture FR (1 par ligne)</label>
                <textarea name="archFr" rows={3} defaultValue={currentProject?.archFr?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Architecture EN (1 par ligne)</label>
                <textarea name="archEn" rows={3} defaultValue={currentProject?.archEn?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résultats FR (1 par ligne)</label>
                <textarea name="resultsFr" rows={3} defaultValue={currentProject?.resultsFr?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Résultats EN (1 par ligne)</label>
                <textarea name="resultsEn" rows={3} defaultValue={currentProject?.resultsEn?.join('\n')} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"></textarea>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Catégories Technologies (séparées par des virgules)</label>
                <input type="text" name="categories" defaultValue={currentProject?.categories?.join(', ')} placeholder="React, Node.js, Prisma" className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
              </div>
              
              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Lien Live (Optionnel)</label>
                <input type="url" name="linkUrl" defaultValue={currentProject?.linkUrl} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Image de couverture (JPG/PNG)</label>
                <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-fuchsia-50 dark:file:bg-fuchsia-500/10 file:text-fuchsia-700 dark:file:text-fuchsia-400 cursor-pointer" />
                {currentProject?.imageUrl && <p className="text-xs text-slate-500 mt-2 font-mono">Image actuelle : {currentProject.imageUrl}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4 justify-end">
              <button type="button" onClick={handleCancel} className="px-6 py-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={isPending} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center gap-2">
                {isPending && <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />}
                {editingId ? 'Mettre à jour' : 'Ajouter le projet'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col gap-5 hover:border-fuchsia-500/50 transition-colors group shadow-sm">
              {project.imageUrl ? (
                <div className="w-full h-40 bg-slate-100 dark:bg-[#161618] rounded-2xl overflow-hidden relative">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="w-full h-40 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-700">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">{project.title}</h3>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEdit(project)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors" title="Modifier">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">{project.resumeFr || project.subtitleFr}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                {project.categories?.slice(0, 4).map((cat: string) => (
                  <span key={cat} className="text-[10px] font-mono font-bold uppercase tracking-wider border border-slate-200 dark:border-white/10 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-gray-400">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a]">
              <p className="font-mono text-sm uppercase tracking-widest">Aucun projet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
