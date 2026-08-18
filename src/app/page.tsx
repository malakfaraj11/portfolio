import PreloaderWrapper from '@/components/PreloaderWrapper';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MagneticButton } from '@/components/MagneticButton';
import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function Home() {
  const profile = await prisma.profile.findFirst({ include: { metrics: true } });
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  // Default values if DB is empty
  const defaultProfile = {
    tagline: 'CREATIVE DEVELOPER',
    bio: 'Je construis des solutions innovantes à l\'intersection du développement web, du design interactif et de l\'expérience utilisateur.',
    status: 'Available for work',
    location: 'Paris, FR',
    visionTitle: 'Ma Vision',
    visionText: 'Mon travail connecte les besoins métiers, l\'expérience utilisateur intuitive et les architectures front-end modernes de haute performance.',
    photoUrl: null,
    cvUrl: null,
  };

  const currentProfile = profile || defaultProfile;

  return (
    <PreloaderWrapper>
      <div className="min-h-screen font-sans relative">
        
        {/* HERO SECTION */}
        <section id="about" className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-24 pb-12 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Available Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-8 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-400 uppercase">{currentProfile.status}</span>
              </div>

              {/* Massive Title */}
              <h1 className="text-7xl sm:text-8xl lg:text-[140px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-gray-500 mb-6 leading-[0.85] uppercase select-none">
                {currentProfile.tagline.split(' ').map((word, i) => (
                  <span key={i}>{word} <br/></span>
                ))}
              </h1>

              {/* Skill Tags - Using Spotlight */}
              <div className="flex flex-wrap gap-3 mb-10">
                {skills.length > 0 ? skills.slice(0, 4).map(skill => (
                  <SpotlightCard key={skill.id} className="px-4 py-2" spotlightColor="rgba(59, 130, 246, 0.2)">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-gray-300 uppercase">{skill.name}</span>
                  </SpotlightCard>
                )) : (
                  <SpotlightCard className="px-4 py-2" spotlightColor="rgba(59, 130, 246, 0.2)">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-gray-300 uppercase">AJOUTER DES SKILLS EN ADMIN</span>
                  </SpotlightCard>
                )}
              </div>

              {/* Bio */}
              <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                {currentProfile.bio}
              </p>

              {/* CTA Buttons - Magnetic */}
              <div className="flex flex-wrap gap-6 items-center">
                <MagneticButton
                  as="a"
                  href="#contact" 
                  className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Démarrer un projet
                </MagneticButton>
                {currentProfile.cvUrl && (
                  <a href={currentProfile.cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-mono font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors underline decoration-dashed underline-offset-4 interactive">
                    Ouvrir le CV
                  </a>
                )}
              </div>
            </div>

            {/* Right Portrait Area */}
            <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 hidden lg:block">
              <ScrollReveal delay={0.2} className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group">
                {currentProfile.photoUrl ? (
                  <img src={currentProfile.photoUrl} alt="Portrait" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-slate-900 dark:bg-black/80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-black/90 to-transparent z-10 flex flex-col justify-end p-8 pointer-events-none">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs font-mono text-emerald-400 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> STATUS: ONLINE<br/>
                        UPLINK: STABLE
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-gray-600">SYS.01 // REC</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-24 space-y-32 relative z-10">
          
          {/* AT A GLANCE SECTION */}
          <section className="flex flex-col items-center gap-12">
            <div className="max-w-3xl text-center">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                  {currentProfile.visionTitle}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-8 mx-auto">
                  {currentProfile.visionText}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm font-bold text-slate-900 dark:text-white">
                  <div className="w-12 h-[1px] bg-fuchsia-500" />
                  Localisation : {currentProfile.location}
                  <div className="w-12 h-[1px] bg-fuchsia-500" />
                </div>
              </ScrollReveal>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
              {/* Bento Card 1: Technologies / Skills */}
              <ScrollReveal delay={0.1}>
                <SpotlightCard className="p-8 h-full">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs opacity-30">01</div>
                  <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 mb-4 uppercase tracking-wider">Stack Technique</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill.id} className="text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
                        {skill.name}
                      </span>
                    ))}
                    {skills.length === 0 && <span className="text-xs text-slate-500">Ajouter des technos dans l&apos;admin</span>}
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              {/* Bento Card 2: Current / Latest Experience */}
              <ScrollReveal delay={0.2}>
                <SpotlightCard className="p-8 h-full" spotlightColor="rgba(59, 130, 246, 0.15)">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs opacity-30">02</div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">Expérience Actuelle</h3>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">Current</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                    {experiences.length > 0 ? `${experiences[0].role} @ ${experiences[0].company}` : 'Développeur Indépendant'}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="text-blue-600 dark:text-blue-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">Sélection de Projets</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white max-w-xl leading-tight">
                    Projets à travers plusieurs disciplines.
                  </h2>
                </div>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.length > 0 ? projects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 0.1}>
                  <div className="group block h-full">
                    <SpotlightCard className="p-6 h-full flex flex-col interactive" spotlightColor="rgba(236, 72, 153, 0.15)">
                      <div className="aspect-video w-full bg-slate-100 dark:bg-black/50 rounded-lg mb-6 overflow-hidden relative">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center font-mono text-slate-400">NO IMAGE</div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.categories.map(cat => (
                          <span key={cat} className="text-[10px] font-mono font-bold px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-fuchsia-500 transition-colors">{project.title}</h3>
                      <h4 className="text-sm font-mono text-slate-500 mb-4">{project.subtitleFr}</h4>
                      <p className="text-slate-600 dark:text-gray-400 mb-6 flex-grow">{project.resumeFr}</p>
                      
                      <details className="mt-4 border-t border-slate-200 dark:border-white/10 pt-4 group/details">
                        <summary className="text-sm font-bold text-blue-600 dark:text-blue-400 cursor-pointer list-none flex items-center gap-2">
                          Voir les détails <span className="group-open/details:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                          {project.problemFr && (
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Le Problème :</strong>
                              <p>{project.problemFr}</p>
                            </div>
                          )}
                          {project.goalsFr && project.goalsFr.length > 0 && (
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Objectifs :</strong>
                              <ul className="list-disc pl-4 space-y-1">
                                {project.goalsFr.map((g, i) => <li key={i}>{g}</li>)}
                              </ul>
                            </div>
                          )}
                          {project.solutionFr && (
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">La Solution :</strong>
                              <p>{project.solutionFr}</p>
                            </div>
                          )}
                          {project.archFr && project.archFr.length > 0 && (
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Architecture Technique :</strong>
                              <ul className="list-disc pl-4 space-y-1">
                                {project.archFr.map((a, i) => <li key={i}>{a}</li>)}
                              </ul>
                            </div>
                          )}
                          {project.resultsFr && project.resultsFr.length > 0 && (
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Résultats :</strong>
                              <ul className="list-disc pl-4 space-y-1">
                                {project.resultsFr.map((r, i) => <li key={i}>{r}</li>)}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-white/10 mt-4">
                            {project.linkUrl && (
                              <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold text-fuchsia-500 hover:underline">
                                Visiter le site &rarr;
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold text-slate-500 hover:underline">
                                Code Source (GitHub)
                              </a>
                            )}
                          </div>
                        </div>
                      </details>
                    </SpotlightCard>
                  </div>
                </ScrollReveal>
              )) : (
                <div className="col-span-full py-20 text-center text-slate-500 font-mono">
                  [AUCUN PROJET - AJOUTEZ-EN DEPUIS L'ADMIN]
                </div>
              )}
            </div>
          </section>

          {/* JOURNEY / TIMELINE SECTION */}
          <section id="journey">
             <ScrollReveal className="text-center mb-20">
                <span className="text-indigo-600 dark:text-indigo-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">Parcours</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight">
                  Progression en développement et IA.
                </h2>
            </ScrollReveal>
            
            <div className="max-w-3xl mx-auto space-y-12">
              {experiences.length > 0 ? experiences.map((exp, idx) => (
                <ScrollReveal key={exp.id} delay={idx * 0.1} className="relative pl-8 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                    <div className="hidden md:block col-span-1 pt-1 text-right">
                      <span className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 tracking-widest">{exp.startDate} &mdash; {exp.endDate}</span>
                    </div>
                    <div className="col-span-4 relative">
                      <div className="absolute -left-[41px] md:-left-12 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0f0f11] border-4 border-fuchsia-500 z-10 shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                      <h4 className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm tracking-wider uppercase mb-4">{exp.company}</h4>
                      <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map(tech => (
                          <span key={tech} className="text-[10px] font-mono border border-slate-200 dark:border-white/10 px-2 py-1 rounded text-slate-500 dark:text-gray-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )) : (
                <div className="text-center text-slate-500 font-mono py-10">
                  [AUCUNE EXPÉRIENCE - AJOUTEZ-EN DEPUIS L&apos;ADMIN]
                </div>
              )}
            </div>
            
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-white/5 py-12 mt-32 relative z-10 transition-colors">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-gray-500 text-sm gap-4">
            <p>© {new Date().getFullYear()} Malak Faraj. Tous droits réservés.</p>
            <div className="flex gap-6 font-mono font-medium">
              <a href="#about" className="hover:text-fuchsia-500 transition-colors">Accueil</a>
              <a href="#contact" className="hover:text-fuchsia-500 transition-colors">Contact</a>
              <a href="/admin/projects" className="hover:text-fuchsia-500 transition-colors">Admin</a>
            </div>
          </div>
        </footer>
      </div>
    </PreloaderWrapper>
  );
}
