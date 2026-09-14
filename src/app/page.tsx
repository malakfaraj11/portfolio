import PreloaderWrapper from '@/components/PreloaderWrapper';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MagneticButton } from '@/components/MagneticButton';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { ArrowRight, Code2, Mail, Award, Download, MapPin, Briefcase, Calendar } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function Home() {
  const profile = await prisma.profile.findFirst({ include: { metrics: true } });
  const certifications = await prisma.certification.findMany({ orderBy: { order: 'asc' }, take: 3 });
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' }, take: 3 });

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
        <section id="about" className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-32 pb-20 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 w-full pt-16 md:pt-32 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text */}
              <div className="animate-in fade-in slide-in-from-left-8 duration-1000 flex flex-col justify-center text-center lg:text-left">
                {/* Available Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 mb-6 shadow-sm mx-auto lg:mx-0 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-700 dark:text-gray-300 uppercase">{currentProfile.status}</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight uppercase">
                  {currentProfile.tagline}
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-slate-600 dark:text-gray-300 font-medium mb-6">
                  {currentProfile.bio}
                </h2>
                
                {/* CTA & Resume */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="#contact" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 w-full sm:w-auto justify-center">
                    Me contacter <ArrowRight className="w-4 h-4" />
                  </Link>
                  {currentProfile.cvUrl && (
                    <a href={currentProfile.cvUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-slate-400 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center group interactive">
                      <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                      Télécharger CV
                    </a>
                  )}
                </div>
              </div>
              
              {/* Right Column: Photo */}
              <div className="animate-in fade-in slide-in-from-right-8 duration-1000 flex justify-center lg:justify-end mt-12 lg:mt-0 relative">
                {/* Decorative background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                {currentProfile.photoUrl ? (
                  <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-8 border-white dark:border-[#111111] shadow-2xl relative z-10 bg-slate-100 dark:bg-[#1a1a1a]">
                    <img src={currentProfile.photoUrl} alt="Portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-8 border-white dark:border-[#111111] shadow-2xl relative z-10 bg-slate-100 dark:bg-[#1a1a1a] flex flex-col items-center justify-center text-slate-400">
                    <Code2 className="w-16 h-16 mb-4 opacity-50" />
                    <span className="font-mono text-sm tracking-widest uppercase">Espace Créatif</span>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-24 space-y-32 relative z-10">
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent my-10" />

          {/* AT A GLANCE SECTION */}
          <section className="flex flex-col lg:flex-row items-center gap-12 pt-10">
            <div className="flex-1 text-center lg:text-left">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  {currentProfile.visionTitle}
                </h2>
                <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
                  {currentProfile.visionText}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  <div className="w-8 h-[1px] bg-slate-300 dark:bg-white/20" />
                  {currentProfile.location}
                </div>
              </ScrollReveal>
            </div>
            
            <div className="w-full lg:w-1/3">
              <ScrollReveal delay={0.2}>
                <div className="p-8 h-full flex flex-col items-center text-center bg-slate-50 dark:bg-[#111111] border border-slate-300 dark:border-white/10 rounded-3xl shadow-sm">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white dark:bg-black border border-slate-300 dark:border-white/10 shadow-sm mb-4">
                    <span className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2">Actuellement</h3>
                  <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {experiences.length > 0 ? `${experiences[0].titleFr}` : 'Développeur Indépendant'}
                  </p>
                  <p className="text-slate-500 font-medium mt-1 text-sm">
                    {experiences.length > 0 ? experiences[0].type : 'Mission Flexible'}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="py-20 border-t border-slate-300 dark:border-white/5">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Projets Récents
                  </h2>
                  <p className="text-slate-600 dark:text-gray-400 max-w-xl">
                    Une sélection de mes travaux récents dans le développement et l&apos;IA.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? projects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 0.1}>
                  <div className="group block h-full">
                    <SpotlightCard className="h-full flex flex-col interactive overflow-hidden bg-white dark:bg-[#111111] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-colors rounded-2xl" spotlightColor="rgba(255, 255, 255, 0.05)">
                      
                      {/* Image Container */}
                      <div className="relative w-full aspect-video bg-slate-100 dark:bg-[#1a1a1a] overflow-hidden">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                            <Code2 className="w-8 h-8 opacity-30" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.categories.map(cat => (
                            <span key={cat} className="text-[10px] font-mono font-bold px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-md border border-slate-300 dark:border-white/10">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                        <h4 className="text-xs font-mono text-slate-500 mb-4">{project.subtitleFr}</h4>
                        <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 flex-grow">{project.resumeFr}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                          <Link href={`/projects/${project.id}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-fuchsia-500 transition-colors flex items-center gap-2">
                            Détails
                          </Link>
                          {project.linkUrl && (
                            <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                              Voir le site ↗
                            </a>
                          )}
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
            
            <div className="mt-16 text-center">
              <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-slate-400 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group interactive">
                Voir tous les projets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" className="py-20 border-t border-slate-300 dark:border-white/5">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Certifications
                  </h2>
                  <p className="text-slate-600 dark:text-gray-400 max-w-xl">
                    Validation continue de mes compétences techniques.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certifications.length > 0 ? certifications.map((cert: any, idx: number) => (
                <ScrollReveal key={cert.id} delay={idx * 0.1}>
                  <div className="group block h-full">
                    <SpotlightCard className="p-6 h-full flex flex-col justify-between interactive overflow-hidden bg-white dark:bg-[#111111] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-colors rounded-2xl" spotlightColor="rgba(255, 255, 255, 0.05)">
                      <div className="mb-6 flex-grow flex flex-col">
                        {cert.url && (cert.url.endsWith('.pdf') || cert.url.endsWith('.jpg') || cert.url.endsWith('.png') || cert.url.endsWith('.jpeg')) ? (
                          <div className="w-full h-32 mb-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-black border border-slate-300 dark:border-white/10 relative">
                            {cert.url.endsWith('.pdf') ? (
                              <object data={`${cert.url}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" className="w-full h-[200%] -mt-10 pointer-events-none overflow-hidden" />
                            ) : (
                              <img src={cert.url} alt={cert.name} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-transparent pointer-events-auto" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-slate-100 dark:bg-black text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                            <Award className="w-5 h-5" />
                          </div>
                        )}
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                          {cert.name}
                        </h3>
                        <h4 className="text-xs font-mono text-slate-500 uppercase mt-auto">
                          {cert.issuer}
                        </h4>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
                        {cert.date && (
                          <span className="text-xs text-slate-400">
                            {new Date(cert.date).getFullYear()}
                          </span>
                        )}
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4 -rotate-45" />
                          </a>
                        )}
                      </div>
                    </SpotlightCard>
                  </div>
                </ScrollReveal>
              )) : (
                <div className="col-span-full py-20 text-center text-slate-500 font-mono">
                  [AUCUNE CERTIFICATION]
                </div>
              )}
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/certifications" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group interactive">
                Voir toutes les certifications <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* JOURNEY / TIMELINE SECTION */}
          <section id="journey" className="py-20 border-t border-slate-200 dark:border-white/5">
             <ScrollReveal className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Mon Parcours
                </h2>
                <p className="text-slate-600 dark:text-gray-400 max-w-xl">
                  Expériences professionnelles et formations.
                </p>
            </ScrollReveal>
            
            <div className="max-w-4xl relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-10 top-8 bottom-8 w-px bg-slate-200 dark:bg-white/10" />

              <div className="space-y-12">
                {experiences.length > 0 ? experiences.map((exp, idx) => {
                  const now = new Date();
                  const isCurrent = !exp.endDate || exp.endDate > now;
                  
                  return (
                    <ScrollReveal key={exp.id} delay={idx * 0.1}>
                      <div className="relative pl-16 md:pl-28">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-10 top-8 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-[#050505] bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center z-10 shadow-sm">
                          <div className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-fuchsia-500 animate-pulse' : 'bg-slate-300 dark:bg-gray-600'}`} />
                        </div>
                        
                        {/* Content Card */}
                        <SpotlightCard className="p-6 md:p-8 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors rounded-3xl">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-100 dark:border-fuchsia-500/20">
                                {exp.type}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                              {exp.startDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} 
                              &nbsp;&mdash;&nbsp;
                              {isCurrent ? 'Présent' : exp.endDate?.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {exp.titleFr}
                          </h3>
                          
                          <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                            {exp.descFr}
                          </p>
                        </SpotlightCard>
                      </div>
                    </ScrollReveal>
                  );
                }) : (
                  <div className="text-center text-slate-500 font-mono py-20">
                    [AUCUNE EXPÉRIENCE]
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="py-20 border-t border-slate-200 dark:border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left: Text & Socials */}
              <div>
                <ScrollReveal>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                    Me Contacter
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-10">
                    Vous avez un projet en tête ou une proposition de mission ? N&apos;hésitez pas à m&apos;écrire via le formulaire ou sur mes réseaux.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a href="mailto:farajmalak11@gmail.com" className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform shadow-sm">
                      <Mail className="w-4 h-4" />
                      M'écrire un Email
                    </a>
                    <a href="https://www.linkedin.com/in/malak-faraj-2953bb2a6/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                    </a>
                    <a href="https://github.com/malakfaraj11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      GitHub
                    </a>
                  </div>
                </ScrollReveal>
              </div>
              
              {/* Right: Form */}
              <div>
                <ScrollReveal delay={0.2} className="h-full">
                  <div className="bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm h-full">
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
              
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
