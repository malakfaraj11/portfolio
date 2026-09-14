'use client';

import { useState } from 'react';
import { createMessage } from '@/actions/content';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await createMessage(data);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 mb-2" />
        <h3 className="text-2xl font-bold">Message envoyé avec succès !</h3>
        <p className="text-sm">Merci de m&apos;avoir contactée. Je vous répondrai dans les plus brefs délais.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nom complet *</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required 
            placeholder="John Doe"
            className="w-full bg-slate-50 dark:bg-[#161618] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Adresse Email *</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required 
            placeholder="john@example.com"
            className="w-full bg-slate-50 dark:bg-[#161618] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all shadow-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Objet du message *</label>
        <input 
          type="text" 
          id="subject"
          name="subject" 
          required 
          placeholder="Proposition de mission, opportunité..."
          className="w-full bg-slate-50 dark:bg-[#161618] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Votre Message *</label>
        <textarea 
          id="message"
          name="message" 
          required 
          rows={5}
          placeholder="Bonjour Malak, je vous contacte pour..."
          className="w-full bg-slate-50 dark:bg-[#161618] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all shadow-sm resize-y"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span className="animate-pulse">Envoi en cours...</span>
        ) : (
          <>
            Envoyer le message <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
