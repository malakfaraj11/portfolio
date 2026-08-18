'use client';

import { useState } from 'react';
import Link from 'next/link';
import { login } from '@/actions/auth';
import { ArrowLeft } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MagneticButton } from '@/components/MagneticButton';
import PreloaderWrapper from '@/components/PreloaderWrapper';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <PreloaderWrapper>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0c]">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors z-20 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour au Portfolio
        </Link>

        <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <SpotlightCard className="p-10 border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5" spotlightColor="rgba(217, 70, 239, 0.2)">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent uppercase tracking-wider mb-2">
                Accès Sécurisé
              </h1>
              <p className="text-sm font-mono text-slate-400">Authentification requise pour l&apos;administration.</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all font-mono text-sm placeholder:text-gray-600"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-400 mb-2 uppercase tracking-widest">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all font-mono text-sm placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-mono text-center animate-in shake">
                  {error}
                </div>
              )}

              <MagneticButton
                as="button"
                type="submit"
                className="w-full py-4 bg-white text-black rounded-lg font-bold hover:bg-fuchsia-500 hover:text-white transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Vérification...' : 'Connexion'}
              </MagneticButton>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </PreloaderWrapper>
  );
}
