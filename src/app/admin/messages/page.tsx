import { getMessages, deleteMessage } from '@/actions/content';
import { Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import MessageCard from '@/components/MessageCard';

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
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg: any) => (
            <MessageCard key={msg.id} msg={msg} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
