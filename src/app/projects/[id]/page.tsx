import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Globe, CheckCircle2, ChevronRight } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ScrollReveal } from '@/components/ScrollReveal';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f11] font-sans selection:bg-fuchsia-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-fuchsia-900/20 dark:via-[#0f0f11] dark:to-[#0f0f11]" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux projets
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {project.categories?.map((cat: string) => (
                <span key={cat} className="text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-full border border-slate-200 dark:border-white/10">
                  {cat}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {project.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
              {project.subtitleFr}
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Image Showcase (Macbook style) */}
      {project.imageUrl && (
        <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 mb-24">
          <ScrollReveal delay={0.4}>
            <div className="rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161618] p-2 md:p-4">
              {/* Fake Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 mb-2 border-b border-slate-100 dark:border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-auto object-contain rounded-xl md:rounded-[24px]" 
              />
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Content Layout */}
      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
            
            <ScrollReveal>
              <SpotlightCard className="p-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">À propos du projet</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
                  {project.resumeFr}
                </p>

                <div className="flex flex-col gap-3">
                  {project.linkUrl && (
                    <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      <span className="flex items-center gap-2"><Globe className="w-5 h-5" /> Site Live</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl font-bold transition-colors">
                      <span className="flex items-center gap-2"><Code2 className="w-5 h-5" /> Code Source</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {project.archFr && project.archFr.length > 0 && (
              <ScrollReveal>
                <div className="px-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Architecture Technique</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.archFr.map((arch: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-mono font-medium border border-slate-200 dark:border-white/5">
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

          {/* Right Column (Deep Dive) */}
          <div className="lg:col-span-8 space-y-20">
            
            {project.problemFr && (
              <ScrollReveal>
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-px bg-slate-300 dark:bg-slate-700" />
                    <h3 className="text-sm font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Le Défi</h3>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-6 -left-4 text-7xl text-slate-100 dark:text-white/5 font-serif font-black select-none">&quot;</span>
                    <p className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-gray-200 leading-snug relative z-10">
                      {project.problemFr}
                    </p>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {project.solutionFr && (
              <ScrollReveal>
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-px bg-slate-300 dark:bg-slate-700" />
                    <h3 className="text-sm font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">L&apos;Approche</h3>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 leading-relaxed">
                    <p>{project.solutionFr}</p>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {((project.goalsFr && project.goalsFr.length > 0) || (project.resultsFr && project.resultsFr.length > 0)) && (
              <ScrollReveal>
                <div className="grid md:grid-cols-2 gap-8">
                  {project.goalsFr && project.goalsFr.length > 0 && (
                    <SpotlightCard className="p-8 bg-slate-50 dark:bg-[#161618] h-full">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-black">🎯</span>
                        Objectifs Visés
                      </h3>
                      <ul className="space-y-4">
                        {project.goalsFr.map((goal: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-gray-300">
                            <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  )}

                  {project.resultsFr && project.resultsFr.length > 0 && (
                    <SpotlightCard className="p-8 bg-slate-50 dark:bg-[#161618] h-full">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">✨</span>
                        Résultats
                      </h3>
                      <ul className="space-y-4">
                        {project.resultsFr.map((result: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  )}
                </div>
              </ScrollReveal>
            )}

          </div>
        </div>
      </main>

      {/* Footer / Next Action */}
      <ScrollReveal>
        <div className="border-t border-slate-200 dark:border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">Prêt à découvrir d&apos;autres projets ?</h2>
            <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">
              Retourner à la galerie <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
