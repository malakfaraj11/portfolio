import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Globe, CheckCircle2, LayoutGrid, Check } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TextReveal } from '@/components/TextReveal';
import { MagneticButton } from '@/components/MagneticButton';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans selection:bg-slate-200 dark:selection:bg-white/20">
      
      {/* Immersive Edge-to-Edge Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex flex-col justify-center items-center pb-12 overflow-hidden text-center">
        {/* Ambient Blurred Background - Desaturated for Premium Look */}
        <div className="absolute inset-0 z-0">
          {project.imageUrl && (
            <>
              <img 
                src={project.imageUrl} 
                className="w-full h-full object-cover blur-3xl opacity-20 dark:opacity-10 scale-125 grayscale" 
                alt="ambient background" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 dark:from-[#091330] dark:via-[#091330]/90 to-transparent" />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center mt-20">
          <ScrollReveal>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-10 group bg-slate-100/50 dark:bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à la galerie
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {project.categories?.map((cat: string) => (
                <span key={cat} className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1.5 bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                  {cat}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <TextReveal delay={0.2} text={project.title} className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[1.1] justify-center" />

          <ScrollReveal delay={0.3}>
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 dark:text-gray-400 max-w-3xl tracking-tight leading-relaxed">
              {project.subtitleFr}
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Image Showcase (Elevated over the fold) */}
      {project.imageUrl && (
        <section className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 mb-24">
          <ScrollReveal delay={0.4}>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161618] p-2 md:p-3 group">
              {/* Fake Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 mb-2 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
                <div className="px-3 py-1 bg-slate-50 dark:bg-[#0a0a0c] rounded-md flex items-center gap-2 opacity-50 max-w-[200px] sm:max-w-xs">
                  <Globe className="w-3 h-3" />
                  <span className="text-[10px] font-mono tracking-widest truncate">{project.title.toLowerCase().replace(/\s+/g, '-')}.com</span>
                </div>
                <div className="w-12" /> {/* Spacer for balance */}
              </div>
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-slate-50 dark:bg-[#0a0a0c]">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto max-h-[75vh] object-contain transform group-hover:scale-[1.01] transition-transform duration-1000" 
                />
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* TL;DR Numbers / Stats Strip - Elegant inline list */}
      <section className="max-w-5xl mx-auto px-6 mb-32 border-y border-slate-200 dark:border-white/10 py-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 text-center md:text-left">
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3">Rôle</h3>
              <p className="text-xl font-medium text-slate-900 dark:text-gray-200">Développeur Lead</p>
            </div>
            <div className="hidden md:block w-px bg-slate-200 dark:bg-white/10" />
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3">Stack Principal</h3>
              <p className="text-xl font-medium text-slate-900 dark:text-gray-200">{project.categories?.[0] || 'Fullstack'}</p>
            </div>
            <div className="hidden md:block w-px bg-slate-200 dark:bg-white/10" />
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3">Résultat</h3>
              <p className="text-xl font-medium text-slate-900 dark:text-gray-200 flex items-center justify-center md:justify-start gap-2">
                Livré avec succès
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Content Layout - Editorial Storytelling */}
      <main className="max-w-5xl mx-auto px-6 pb-32 space-y-32">
        
        {/* Le Problème (Editorial Quote) */}
        {project.problemFr && (
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-2/5">
                <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-slate-300 dark:bg-gray-600" />
                  Le Défi
                </h3>
                <h4 className="text-2xl font-semibold text-slate-900 dark:text-white leading-tight">
                  Comprendre les enjeux de ce projet.
                </h4>
              </div>
              <div className="lg:w-3/5">
                <div className="relative">
                  <div className="absolute -left-6 -top-4 text-6xl text-slate-200 dark:text-white/10 font-serif leading-none select-none">"</div>
                  <p className="text-xl md:text-2xl font-serif text-slate-700 dark:text-gray-300 leading-relaxed italic relative z-10">
                    {project.problemFr}
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Contexte</h4>
                  <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                    {project.resumeFr}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* L'Approche / La Solution */}
        {project.solutionFr && (
          <ScrollReveal>
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#121214] p-10 md:p-16">
              <div className="max-w-3xl">
                <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-slate-300 dark:bg-gray-600" />
                  La Solution
                </h3>
                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-gray-200 leading-relaxed tracking-tight mb-12">
                  {project.solutionFr}
                </p>

                {/* Architecture Technique */}
                {project.archFr && project.archFr.length > 0 && (
                  <div className="pt-10 border-t border-slate-200 dark:border-white/10">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-slate-400" />
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.archFr.map((arch: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-white dark:bg-[#1a1a1d] text-slate-600 dark:text-gray-400 rounded-lg text-xs font-mono font-semibold border border-slate-200 dark:border-white/5">
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

        {/* Objectifs & Résultats - Minimalist Lists */}
        {((project.goalsFr && project.goalsFr.length > 0) || (project.resultsFr && project.resultsFr.length > 0)) && (
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {project.goalsFr && project.goalsFr.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Objectifs</h3>
                  <ul className="space-y-6">
                    {project.goalsFr.map((goal: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-white/5 last:border-0">
                        <div className="text-slate-400 dark:text-gray-600 font-mono text-sm mt-1">
                          {(i + 1).toString().padStart(2, '0')}
                        </div>
                        <p className="text-base text-slate-700 dark:text-gray-300 leading-relaxed">{goal}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.resultsFr && project.resultsFr.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Impacts & Résultats</h3>
                  <ul className="space-y-6">
                    {project.resultsFr.map((result: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-white/5 last:border-0">
                        <Check className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                        <p className="text-base text-slate-800 dark:text-gray-200 leading-relaxed">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Boutons d'Action Premium */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-16">
            {project.linkUrl && (
              <MagneticButton as="a" href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 rounded-full font-semibold shadow-lg transition-colors text-base">
                <Globe className="w-5 h-5" />
                Voir le site en ligne
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 dark:bg-[#161618] dark:hover:bg-[#1a1a1d] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full font-semibold transition-colors text-base">
                <Code2 className="w-5 h-5" />
                Code Source
              </MagneticButton>
            )}
          </div>
        </ScrollReveal>

      </main>

      {/* Footer / Next Action */}
      <ScrollReveal>
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0a0c]">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Envie de voir plus ?</h2>
            <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#161618] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full font-semibold hover:scale-105 transition-transform shadow-sm">
              Retourner à la galerie <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
