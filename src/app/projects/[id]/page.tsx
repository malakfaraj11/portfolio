import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Globe } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f11] font-sans">
      {/* Header / Cover */}
      <div className="w-full h-[50vh] md:h-[70vh] relative bg-slate-900 border-b border-slate-200 dark:border-white/10">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 opacity-20">
            <Code2 className="w-24 h-24 mb-4" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 dark:from-[#0f0f11] dark:via-[#0f0f11]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux projets
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.categories.map(cat => (
                <span key={cat} className="text-xs font-mono font-bold px-3 py-1 bg-slate-900/10 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white rounded-full border border-slate-900/20 dark:border-white/20">
                  {cat}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
              {project.title}
            </h1>
            <h2 className="text-xl md:text-2xl font-mono text-slate-600 dark:text-gray-400 max-w-2xl">
              {project.subtitleFr}
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        
        {/* Résumé & Liens */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
              {project.resumeFr}
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4 min-w-[200px]">
            {project.linkUrl && (
              <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-fuchsia-500/20">
                <Globe className="w-5 h-5" />
                Voir le Live
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl font-bold transition-colors">
                <Code2 className="w-5 h-5" />
                Code Source
              </a>
            )}
          </div>
        </div>

        {/* Détails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {project.problemFr && (
            <SpotlightCard className="p-8">
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">01. Le Problème</h3>
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                {project.problemFr}
              </p>
            </SpotlightCard>
          )}

          {project.solutionFr && (
            <SpotlightCard className="p-8">
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">02. La Solution</h3>
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                {project.solutionFr}
              </p>
            </SpotlightCard>
          )}

          {project.goalsFr && project.goalsFr.length > 0 && (
            <SpotlightCard className="p-8">
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Objectifs Clés</h3>
              <ul className="space-y-3">
                {project.goalsFr.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          )}

          {project.resultsFr && project.resultsFr.length > 0 && (
            <SpotlightCard className="p-8">
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Résultats</h3>
              <ul className="space-y-3">
                {project.resultsFr.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{result}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          )}
        </div>

        {/* Architecture */}
        {project.archFr && project.archFr.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Architecture Technique</h3>
            <div className="flex flex-wrap gap-3">
              {project.archFr.map((arch, i) => (
                <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-[#1a1a1d] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-mono font-bold">
                  {arch}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer / Next Action */}
      <div className="border-t border-slate-200 dark:border-white/10 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Prêt à découvrir d'autres projets ?</h2>
          <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">
            Retourner à la galerie <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
