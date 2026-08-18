import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen font-sans relative bg-white dark:bg-[#0f0f11]">
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-12 relative z-10">
        
        <div className="mb-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Tous les Projets
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl">
            L'ensemble des projets réalisés. De l'architecture back-end aux interfaces interactives front-end.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1}>
              <div className="group block h-full">
                <SpotlightCard className="p-6 h-full flex flex-col interactive overflow-hidden border border-slate-200/50 dark:border-white/5 hover:border-fuchsia-500/30 transition-colors" spotlightColor="rgba(236, 72, 153, 0.15)">
                  <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-black rounded-lg mb-6 overflow-hidden relative group/image">
                    {project.imageUrl ? (
                      <>
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
                        <Code2 className="w-8 h-8 mb-2 opacity-50" />
                        <span className="font-mono text-xs tracking-widest uppercase font-bold">Workspace</span>
                      </div>
                    )}
                    
                    {project.linkUrl && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.slice(0, 3).map(cat => (
                      <span key={cat} className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-full border border-slate-200/50 dark:border-white/5">
                        {cat}
                      </span>
                    ))}
                    {project.categories.length > 3 && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-full border border-slate-200/50 dark:border-white/5">
                        +{project.categories.length - 3}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-fuchsia-500 transition-colors">{project.title}</h3>
                  <h4 className="text-xs font-mono text-slate-500 mb-4 line-clamp-1">{project.subtitleFr}</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">{project.resumeFr}</p>
                  
                  <div className="mt-4 pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between items-center mt-auto">
                    <Link href={`/projects/${project.id}`} className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 flex items-center gap-2 group/link interactive">
                      Voir les détails
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
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
