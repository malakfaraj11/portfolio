import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen font-sans relative bg-white dark:bg-[#0f0f11]">
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-fuchsia-900/10 dark:via-[#0f0f11] dark:to-[#0f0f11]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Tous les Projets
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            L&apos;ensemble des projets réalisés. De l&apos;architecture back-end aux interfaces interactives front-end.
          </p>
        </div>
      </section>
        
        <main className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.1}>
                <div className="group block h-full">
                  <SpotlightCard className="p-2 h-full flex flex-col interactive overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161618] hover:border-fuchsia-500/30 transition-all duration-300 rounded-[24px]" spotlightColor="rgba(236, 72, 153, 0.1)">
                    
                    {/* Image Container */}
                    <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-[#0a0a0c] rounded-[18px] mb-6 overflow-hidden relative border border-slate-100 dark:border-white/5 flex items-center justify-center p-4">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                          <Code2 className="w-8 h-8 mb-2 opacity-50" />
                          <span className="font-mono text-xs tracking-widest uppercase font-bold">Workspace</span>
                        </div>
                      )}
                      
                      {project.linkUrl && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-[#161618]/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="px-4 pb-4 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.categories.slice(0, 3).map((cat: string) => (
                          <span key={cat} className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-full border border-fuchsia-500/20">
                            {cat}
                          </span>
                        ))}
                        {project.categories.length > 3 && (
                          <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 rounded-full border border-slate-200 dark:border-white/5">
                            +{project.categories.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-fuchsia-500 transition-colors">{project.title}</h3>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400 mb-4 line-clamp-1">{project.subtitleFr}</h4>
                      <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 flex-grow line-clamp-3 leading-relaxed">{project.resumeFr}</p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
                        <Link href={`/projects/${project.id}`} className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 group/link interactive">
                          Voir l&apos;étude de cas
                          <ArrowRight className="w-4 h-4 text-fuchsia-500 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
              </div>
            </ScrollReveal>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-500 font-mono">
              [AUCUN PROJET]
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
