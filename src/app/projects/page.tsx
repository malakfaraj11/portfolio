import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import TiltCard from '@/components/TiltCard';
import { TextReveal } from '@/components/TextReveal';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen font-sans relative selection:bg-fuchsia-500/30">
      {/* Hero Header Minimaliste & Pur */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-fuchsia-900/10 dark:via-[#0f0f11] dark:to-[#0f0f11]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group bg-slate-100 dark:bg-[#161618] px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </ScrollReveal>
          
          <TextReveal delay={0.1} text="L'Atelier." className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter" />

          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Découvrez l&apos;ensemble des architectures backend et des interfaces interactives conçues avec passion.
            </p>
          </ScrollReveal>
        </div>
      </section>
        
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? projects.map((project, idx) => {
            // Le premier projet est mis en avant (Featured) et prend toute la largeur
            const isFeatured = idx === 0;

            return (
              <ScrollReveal 
                key={project.id} 
                delay={idx * 0.1} 
                className={isFeatured ? 'md:col-span-2 lg:col-span-3' : 'col-span-1'}
              >
                <TiltCard className="group block h-full" intensity={isFeatured ? 5 : 10}>
                  <SpotlightCard 
                    className={`h-full flex ${isFeatured ? 'flex-col lg:flex-row' : 'flex-col'} interactive overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161618] hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 rounded-[32px] p-2 md:p-3`} 
                    spotlightColor="rgba(150, 150, 150, 0.1)"
                  >
                    
                    {/* Image Container */}
                    <div className={`${isFeatured ? 'lg:w-2/3 h-[300px] lg:h-[500px]' : 'aspect-[4/3] w-full'} bg-slate-50 dark:bg-[#0a0a0c] rounded-[24px] overflow-hidden relative border border-slate-100 dark:border-white/5 flex items-center justify-center p-6 shrink-0`}>
                      {/* Effet Ambient Blur sur le Featured */}
                      {isFeatured && project.imageUrl && (
                        <div className="absolute inset-0 z-0">
                           <img src={project.imageUrl} alt="ambient" className="w-full h-full object-cover blur-3xl opacity-20 scale-150 saturate-200" />
                        </div>
                      )}

                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 relative z-10">
                          <Code2 className="w-12 h-12 mb-4 opacity-50" />
                          <span className="font-mono text-sm tracking-widest uppercase font-bold">Workspace</span>
                        </div>
                      )}
                      
                      {project.linkUrl && (
                        <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 dark:bg-[#161618]/90 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-xl z-20">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex flex-col flex-grow ${isFeatured ? 'lg:w-1/3 p-8 lg:p-12 justify-center' : 'p-6'}`}>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.categories?.slice(0, isFeatured ? 5 : 3).map((cat: string) => (
                          <span key={cat} className="text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-full border border-slate-200 dark:border-white/10">
                            {cat}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className={`${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl'} font-black text-slate-900 dark:text-white mb-4 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors tracking-tight`}>
                        {project.title}
                      </h3>
                      
                      <h4 className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                        {project.subtitleFr}
                      </h4>
                      
                      <p className={`text-slate-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed ${isFeatured ? 'text-lg line-clamp-4' : 'text-sm line-clamp-3'}`}>
                        {project.resumeFr}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/10">
                        <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold group/link hover:scale-105 active:scale-95 transition-all w-full justify-center shadow-lg shadow-black/5 dark:shadow-white/5">
                          Découvrir le projet
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </ScrollReveal>
            );
          }) : (
            <div className="col-span-full py-32 text-center">
              <Code2 className="w-16 h-16 text-slate-300 dark:text-white/10 mx-auto mb-6" />
              <p className="text-xl font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">Aucun projet trouvé</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
