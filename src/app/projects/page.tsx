import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { TextReveal } from '@/components/TextReveal';
import { ArrowLeft, ArrowRight, Code2, Globe } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen font-sans relative bg-[#FAFAFA] dark:bg-[#050505] selection:bg-fuchsia-500/30">
      
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-20 border-b border-slate-300 dark:border-white/5">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-fuchsia-500/10 dark:bg-fuchsia-600/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 group bg-white dark:bg-white/5 px-6 py-2.5 rounded-full border border-slate-300 dark:border-white/10 shadow-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </ScrollReveal>
          
          <TextReveal delay={0.1} text="Tous les Projets" className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase" />

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Une collection complète de mes architectures backend, interfaces front-end et expériences interactives.
            </p>
          </ScrollReveal>
        </div>
      </section>
        
      {/* GALLERY SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.length > 0 ? projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1}>
              <SpotlightCard 
                className="group h-full flex flex-col interactive overflow-hidden bg-white dark:bg-[#0f0f11] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-colors rounded-3xl" 
                spotlightColor="rgba(255, 255, 255, 0.05)"
              >
                
                {/* IMAGE CONTAINER (Fixed Aspect Ratio) */}
                <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-[#1a1a1a] overflow-hidden border-b border-slate-200 dark:border-white/5">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700">
                      <Code2 className="w-12 h-12 mb-4" />
                    </div>
                  )}
                  
                  {/* Live Badge Overlay */}
                  {project.linkUrl && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 flex items-center gap-2 z-10 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </div>
                  )}
                </div>
                
                {/* CONTENT CONTAINER */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.categories?.slice(0, 3).map((cat: string) => (
                      <span key={cat} className="text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-lg border border-slate-300 dark:border-white/10">
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <h4 className="text-xs font-mono font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-6 uppercase tracking-widest">
                    {project.subtitleFr}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-4">
                    {project.resumeFr}
                  </p>
                  
                  {/* Actions */}
                  <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
                    <Link href={`/projects/${project.id}`} className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors group/btn">
                      Détails
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    {project.linkUrl && (
                      <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors hover:text-slate-900 dark:hover:text-white">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                
              </SpotlightCard>
            </ScrollReveal>
          )) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-white/10 rounded-3xl bg-white dark:bg-white/5">
              <Code2 className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <p className="text-sm font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">L'Atelier est vide</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
