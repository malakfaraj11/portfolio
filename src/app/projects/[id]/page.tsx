import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Globe, Check, LayoutGrid, Zap, Flag, Target, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
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
    <div className="min-h-screen font-sans bg-white dark:bg-[#050505] selection:bg-fuchsia-500/30">
      
      {/* HEADER SECTION */}
      <section className="relative pt-40 pb-24 px-6 max-w-5xl mx-auto overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-fuchsia-500/10 dark:bg-fuchsia-900/20 blur-[120px] rounded-[100%] pointer-events-none -z-10" />
        
        <ScrollReveal>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 group bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.categories?.map((cat: string) => (
              <span key={cat} className="text-xs font-bold uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-100 dark:border-fuchsia-500/20">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[1.05]">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed font-medium">
            {project.subtitleFr || project.resumeFr}
          </p>
        </ScrollReveal>
      </section>

      {/* HERO IMAGE */}
      {project.imageUrl && (
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ScrollReveal delay={0.2} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-full h-[50vh] md:h-[75vh] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-[#111111] border border-slate-200/50 dark:border-white/10 shadow-2xl">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
              />
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* PROJECT DETAILS */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10 py-10 border-y border-slate-200 dark:border-white/10 mb-24">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-0 md:px-8 first:pt-0 first:md:pl-0 last:pb-0 last:md:pr-0">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-fuchsia-500" /> Rôle
              </h3>
              <p className="text-xl font-bold text-slate-900 dark:text-white">Développement Complet</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-0 md:px-8">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-fuchsia-500" /> Technologies
              </h3>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{project.categories?.[0] || 'Fullstack'}</p>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-0 md:px-8">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Flag className="w-4 h-4 text-fuchsia-500" /> Statut
              </h3>
              <p className="text-xl font-bold text-slate-900 dark:text-white">Projet finalisé</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-32">
          {/* THE CHALLENGE */}
          {project.problemFr && (
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-4 sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-slate-300 dark:bg-gray-600" />
                    <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Le Contexte</h3>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Le Défi</h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-2xl text-slate-700 dark:text-gray-300 leading-relaxed font-serif italic">
                    "{project.problemFr}"
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* THE SOLUTION */}
          {project.solutionFr && (
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-4 sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-slate-300 dark:bg-gray-600" />
                    <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">L'Approche</h3>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">La Solution</h2>
                </div>
                <div className="lg:col-span-8">
                  <div className="bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 mb-8">
                    <div className="w-12 h-12 bg-fuchsia-500/10 text-fuchsia-500 rounded-xl flex items-center justify-center mb-8">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <p className="text-xl text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                      {project.solutionFr}
                    </p>
                  </div>
                  
                  {project.archFr && project.archFr.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-fuchsia-500" /> Stack Technique Utilisée
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.archFr.map((arch: string, i: number) => (
                          <span key={i} className="px-5 py-2.5 bg-white dark:bg-[#1a1a1d] text-slate-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm border border-slate-200 dark:border-white/10 hover:border-fuchsia-500/50 transition-colors cursor-default">
                            {arch}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* GOALS & RESULTS */}
          {((project.goalsFr && project.goalsFr.length > 0) || (project.resultsFr && project.resultsFr.length > 0)) && (
            <ScrollReveal>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t border-slate-200 dark:border-white/10">
                 {project.goalsFr && project.goalsFr.length > 0 && (
                   <SpotlightCard className="p-8 md:p-12 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[2rem]">
                     <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Objectifs Initiaux</h2>
                     <ul className="space-y-6">
                       {project.goalsFr.map((goal: string, i: number) => (
                         <li key={i} className="flex gap-4 items-start">
                           <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mt-1">
                             {i + 1}
                           </span>
                           <span className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-medium">{goal}</span>
                         </li>
                       ))}
                     </ul>
                   </SpotlightCard>
                 )}
                 {project.resultsFr && project.resultsFr.length > 0 && (
                   <SpotlightCard className="p-8 md:p-12 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[2rem]">
                     <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Impacts & Résultats</h2>
                     <ul className="space-y-6">
                       {project.resultsFr.map((result: string, i: number) => (
                         <li key={i} className="flex gap-4 items-start">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center mt-1">
                             <Check className="w-5 h-5" />
                           </div>
                           <span className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-medium">{result}</span>
                         </li>
                       ))}
                     </ul>
                   </SpotlightCard>
                 )}
               </div>
            </ScrollReveal>
          )}
        </div>

        {/* CTA BUTTONS */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-40">
            {project.linkUrl && (
              <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 rounded-full font-black hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl">
                <Globe className="w-5 h-5" /> Visiter le site
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Code Source
              </a>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* MINIMAL FOOTER */}
      <section className="border-t border-slate-200 dark:border-white/10 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retourner à la page d'accueil
          </Link>
          <div className="text-sm font-medium text-slate-400 dark:text-gray-600">
            © {new Date().getFullYear()} — Portfolio
          </div>
        </div>
      </section>
    </div>
  );
}
