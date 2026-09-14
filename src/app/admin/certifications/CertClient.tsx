'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, X, Award } from 'lucide-react';

type Certification = any; // Typing as any for simplicity

export default function CertClient({ certifications, serverAction, deleteAction }: { certifications: Certification[], serverAction: (formData: FormData, editingId: string | null) => Promise<void>, deleteAction: (id: string) => Promise<void> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentCert, setCurrentCert] = useState<Certification | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleEdit = (cert: Certification) => {
    setCurrentCert(cert);
    setEditingId(cert.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setCurrentCert(null);
    setEditingId(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentCert(null);
    setEditingId(null);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await serverAction(formData, editingId);
      toast.success(editingId ? "Certification mise à jour !" : "Certification ajoutée !");
      setIsEditing(false);
      setEditingId(null);
      setCurrentCert(null);
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette certification ?")) {
      try {
        await deleteAction(id);
        toast.success("Certification supprimée.");
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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Certifications ({certifications.length})</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Gérez vos diplômes et certificats officiels.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Certification
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={handleCancel} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {editingId ? "Modifier la certification" : "Ajouter une certification"}
          </h2>
          
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nom de la certification *</label>
                <input type="text" name="name" required defaultValue={currentCert?.name} placeholder="ex: AWS Certified Developer" className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Organisme *</label>
                <input type="text" name="issuer" required defaultValue={currentCert?.issuer} placeholder="ex: Amazon Web Services" className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Date d'obtention</label>
                <input type="date" name="date" defaultValue={currentCert?.date ? new Date(currentCert.date).toISOString().split('T')[0] : ''} className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Lien de vérification (URL)</label>
                <input type="url" name="url" defaultValue={currentCert?.url} placeholder="https://..." className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow" />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Ou fichier justificatif (PDF/Image)</label>
                <input type="file" name="pdfFile" accept="application/pdf, image/jpeg, image/png" className="w-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-fuchsia-50 dark:file:bg-fuchsia-500/10 file:text-fuchsia-700 dark:file:text-fuchsia-400 cursor-pointer" />
                {currentCert?.url && currentCert.url.startsWith('/uploads') && (
                  <p className="text-xs text-slate-500 mt-2 font-mono">Fichier actuel : {currentCert.url}</p>
                )}
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
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-fuchsia-500/50 transition-colors group shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-fuchsia-500 uppercase tracking-widest bg-fuchsia-500/10 px-2 py-1 rounded inline-block mb-2">
                    {cert.issuer}
                  </span>
                  <h3 className="font-bold text-xl dark:text-white">{cert.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    {cert.date && (
                      <p className="text-sm text-slate-500 font-medium">
                        {new Date(cert.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">
                        Voir la certification &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button onClick={() => handleEdit(cert)} className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors" title="Modifier">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(cert.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Supprimer">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {certifications.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a]">
              <p className="font-mono text-sm uppercase tracking-widest">Aucune certification</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
