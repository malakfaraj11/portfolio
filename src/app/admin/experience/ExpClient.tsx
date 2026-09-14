'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, X, Briefcase } from 'lucide-react';

type Experience = any; // Typing as any for simplicity

export default function ExpClient({ experiences, serverAction, deleteAction }: { experiences: Experience[], serverAction: (formData: FormData, editingId: string | null) => Promise<void>, deleteAction: (id: string) => Promise<void> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentExp, setCurrentExp] = useState<Experience | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleEdit = (exp: Experience) => {
    setCurrentExp(exp);
    setEditingId(exp.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setCurrentExp(null);
    setEditingId(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentExp(null);
    setEditingId(null);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await serverAction(formData, editingId);
      toast.success(editingId ? "Élément mis à jour !" : "Élément ajouté !");
      setIsEditing(false);
      setEditingId(null);
      setCurrentExp(null);
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await deleteAction(id);
        toast.success("Élément supprimé.");
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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Parcours ({experiences.length})</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Gérez vos expériences, formations et engagements.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouveau Parcours
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={handleCancel} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {editingId ? "Modifier l'élément" : "Ajouter un élément au parcours"}
          </h2>
          
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Type *</label>
                <select name="type" required defaultValue={currentExp?.type || "Expérience"} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow">
                  <option value="Expérience">Expérience</option>
                  <option value="Organisation">Organisation</option>
                  <option value="Formation">Formation</option>
                </select>
              </div>

              <div className="col-span-full md:col-span-1">
                <div className="hidden md:block h-[74px]"></div> {/* Spacer pour alignement */}
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre FR *</label>
                <input type="text" name="titleFr" required defaultValue={currentExp?.titleFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Titre EN *</label>
                <input type="text" name="titleEn" required defaultValue={currentExp?.titleEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de début *</label>
                <input type="date" name="startDate" required defaultValue={currentExp?.startDate ? new Date(currentExp.startDate).toISOString().split('T')[0] : ''} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date de fin (vide = en cours)</label>
                <input type="date" name="endDate" defaultValue={currentExp?.endDate ? new Date(currentExp.endDate).toISOString().split('T')[0] : ''} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Description FR</label>
                <textarea name="descFr" rows={4} defaultValue={currentExp?.descFr} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none transition-shadow"></textarea>
              </div>
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Description EN</label>
                <textarea name="descEn" rows={4} defaultValue={currentExp?.descEn} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none transition-shadow"></textarea>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4 justify-end">
              <button type="button" onClick={handleCancel} className="px-6 py-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={isPending} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center gap-2">
                {isPending && <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />}
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 hover:border-fuchsia-500/50 transition-colors group shadow-sm">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center shrink-0 mt-1">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl dark:text-white">{exp.titleFr}</h3>
                    <span className="text-[10px] font-mono font-bold text-fuchsia-500 uppercase tracking-widest bg-fuchsia-500/10 px-2 py-1 rounded">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-3">
                    {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })} - 
                    {(!exp.endDate || new Date(exp.endDate) > new Date()) ? ' En cours' : ` ${new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}`}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2">{exp.descFr}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button onClick={() => handleEdit(exp)} className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors" title="Modifier">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Supprimer">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a]">
              <p className="font-mono text-sm uppercase tracking-widest">Aucun parcours</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
