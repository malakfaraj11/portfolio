import { getMessages, deleteMessage } from '@/actions/content';
import { Mail, Trash2, Calendar, User, AlignLeft } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminMessages() {
  const messages = await getMessages();

  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await deleteMessage(id);
    revalidatePath('/admin/messages');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Boîte de réception</h1>
        <p className="text-slate-600 dark:text-gray-400">Consultez les messages reçus depuis votre formulaire de contact.</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-slate-50 dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <Mail className="w-12 h-12 text-slate-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aucun message</h3>
          <p className="text-slate-500 dark:text-gray-400">Votre boîte de réception est vide pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg: any) => (
            <div key={msg.id} className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    {msg.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {msg.name} <a href={`mailto:${msg.email}`} className="text-fuchsia-500 hover:underline">({msg.email})</a></span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {msg.createdAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button type="submit" className="text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100">
                    <Trash2 className="w-4 h-4" /> <span className="md:hidden">Supprimer</span>
                  </button>
                </form>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <p className="text-slate-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed flex items-start gap-3">
                  <AlignLeft className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
