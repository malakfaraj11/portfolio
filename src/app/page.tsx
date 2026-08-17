import { getProjects } from '@/actions/projects';
import { getCertificates } from '@/actions/certificates';
import ProjectCard from '@/components/ProjectCard';
import CertificateCard from '@/components/CertificateCard';
import PreloaderWrapper from '@/components/PreloaderWrapper';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MagneticButton } from '@/components/MagneticButton';
import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

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
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-400 uppercase">Available for work</span>
              </div>

              {/* Massive Title */}
              <h1 className="text-7xl sm:text-8xl lg:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-gray-500 mb-6 leading-[0.8] uppercase select-none">
                MALAK <br/> FARAJ
              </h1>

              {/* Skill Tags - Using Spotlight */}
              <div className="flex flex-wrap gap-3 mb-10">
                <SpotlightCard className="px-4 py-2" spotlightColor="rgba(59, 130, 246, 0.2)">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-gray-300 uppercase">FRONTEND</span>
                </SpotlightCard>
                <SpotlightCard className="px-4 py-2" spotlightColor="rgba(236, 72, 153, 0.2)">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-gray-300 uppercase">UX/UI DESIGN</span>
                </SpotlightCard>
                <SpotlightCard className="px-4 py-2" spotlightColor="rgba(99, 102, 241, 0.2)">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-gray-300 uppercase">FULLSTACK</span>
                </SpotlightCard>
              </div>

              {/* Bio */}
              <p className="text-xl text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed mb-10">
                Je construis des solutions innovantes à l'intersection du <span className="text-slate-900 dark:text-white font-semibold">développement web</span>, du design interactif et de l'expérience utilisateur.
              </p>

              {/* CTA Buttons - Magnetic */}
              <div className="flex flex-wrap gap-6 items-center">
                <MagneticButton
                  as="a"
                  href="#contact" 
                  className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Démarrer un projet <ArrowRight className="w-4 h-4 ml-2 inline" />
                </MagneticButton>
                <a href="/cv.pdf" className="text-sm font-mono font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors underline decoration-dashed underline-offset-4 interactive">
                  Ouvrir le CV
                </a>
              </div>
            </div>

            {/* Right Portrait Area */}
            <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 hidden lg:block">
              {/* Tech Frame Background */}
              <div className="absolute -inset-4 border border-slate-200 dark:border-white/10 rounded-3xl opacity-50">
                <div className="absolute top-8 -left-2 w-4 h-[1px] bg-fuchsia-500" />
                <div className="absolute bottom-16 -right-2 w-4 h-[1px] bg-blue-500" />
              </div>
              
              {/* Portrait Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md group shadow-2xl">
                {/* Place holder for user's image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-gray-500">
                   <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-gray-800 dark:to-gray-900 opacity-50 group-hover:opacity-70 transition-opacity" />
                   <span className="absolute text-sm font-mono tracking-widest">[PHOTO PROFIL]</span>
                </div>

                {/* Tech Overlays */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500 dark:text-gray-400 leading-tight bg-slate-100/80 dark:bg-black/40 px-2 py-1 rounded backdrop-blur-md">
                  STATUS: <span className="text-emerald-500">ONLINE</span><br/>
                  UPLINK: <span className="text-blue-500">STABLE</span>
                </div>
                
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 dark:text-gray-500">
                  SYS.01 // REC
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-24 space-y-32 relative z-10">
          
          {/* AT A GLANCE SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left" className="sticky top-32">
              <span className="text-fuchsia-600 dark:text-fuchsia-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">Aperçu du Profil</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 dark:text-white mb-6">
                Une passion pour le code, renforcée par <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">la pratique</span>.
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                Mon travail connecte les besoins métiers, l'expérience utilisateur intuitive et les architectures front-end modernes de haute performance.
              </p>
            </ScrollReveal>
            
            <div className="flex flex-col gap-6">
              {/* Bento Card 1 */}
              <ScrollReveal delay={0.1}>
                <SpotlightCard className="p-8 h-full">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs opacity-30">01</div>
                  <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 mb-2 uppercase tracking-wider">Formation</h3>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Ingénierie Informatique / Développement Web</p>
                </SpotlightCard>
              </ScrollReveal>

              {/* Bento Card 2 */}
              <ScrollReveal delay={0.2}>
                <SpotlightCard className="p-8 h-full" spotlightColor="rgba(59, 130, 246, 0.15)">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs opacity-30">02</div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">Expérience Actuelle</h3>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">Current</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Développeuse Frontend & UI Designer</p>
                </SpotlightCard>
              </ScrollReveal>

              {/* Bento Card 3 */}
              <ScrollReveal delay={0.3}>
                <SpotlightCard className="p-8 h-full" spotlightColor="rgba(236, 72, 153, 0.15)">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs opacity-30">03</div>
                  <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 mb-4 uppercase tracking-wider">Langues</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">Français (Natif)</span>
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">Anglais (Bilingue)</span>
                  </div>
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
                <a href="/projects" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-lg font-mono text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors whitespace-nowrap shadow-sm">
                  VOIR TOUS LES PROJETS &rarr;
                </a>
              </div>
            </ScrollReveal>
            
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 3).map((project, idx) => (
                  <ScrollReveal key={project.id} delay={idx * 0.1}>
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-gray-400 bg-white dark:bg-[#0f0f11]/80 p-12 rounded-2xl border border-slate-200 dark:border-white/5 text-center transition-colors backdrop-blur-xl">
                Aucun projet pour le moment. Allez dans l'espace admin pour en ajouter !
              </p>
            )}
          </section>

          {/* JOURNEY / TIMELINE SECTION */}
          <section id="journey">
             <ScrollReveal className="text-center mb-20">
                <span className="text-indigo-600 dark:text-indigo-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">Parcours</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight">
                  Progression en développement et IA.
                </h2>
            </ScrollReveal>
            
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 transform md:-translate-x-1/2" />
              
              {/* Timeline Item 1 */}
              <ScrollReveal delay={0.1} className="relative flex flex-col md:flex-row items-center justify-between mb-24 group">
                <div className="hidden md:block w-5/12 text-right pr-12">
                  <p className="text-fuchsia-600 dark:text-fuchsia-500 font-mono text-sm font-bold tracking-wider">2023 — PRESENT</p>
                </div>
                
                {/* Icon */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-white/20 flex items-center justify-center transform -translate-x-1/2 z-10 text-fuchsia-600 dark:text-fuchsia-500 shadow-xl shadow-fuchsia-500/10 group-hover:scale-110 group-hover:border-fuchsia-500 transition-all duration-300">
                  <Briefcase className="w-5 h-5" />
                </div>
                
                <div className="w-full md:w-5/12 pl-20 md:pl-12">
                  <p className="text-fuchsia-600 dark:text-fuchsia-500 font-mono text-sm font-bold md:hidden mb-2 tracking-wider">2023 — PRESENT</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Développeuse Web Freelance</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 block">Expérience</span>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">Création d'applications web sur mesure pour divers clients internationaux. Focus sur la performance et l'accessibilité.</p>
                </div>
              </ScrollReveal>

              {/* Timeline Item 2 */}
              <ScrollReveal delay={0.2} className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="w-full md:w-5/12 pl-20 md:pl-0 md:text-right md:pr-12 order-2 md:order-1 mt-2 md:mt-0">
                  <p className="text-blue-600 dark:text-blue-500 font-mono text-sm font-bold md:hidden mb-2 tracking-wider">2021 — 2023</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Diplôme en Informatique</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 block">Formation</span>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">Spécialisation en développement logiciel, architecture des systèmes et design d'interfaces utilisateur.</p>
                </div>
                
                {/* Icon */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-slate-50 dark:bg-[#0A0A0A] border border-slate-300 dark:border-white/20 flex items-center justify-center transform -translate-x-1/2 z-10 text-blue-600 dark:text-blue-500 shadow-xl shadow-blue-500/10 order-1 md:order-2 group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                
                <div className="hidden md:block w-5/12 pl-12 order-3">
                   <p className="text-blue-600 dark:text-blue-500 font-mono text-sm font-bold tracking-wider">2021 — 2023</p>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Fallback to display certificates inside journey if there are any */}
            {certificates.length > 0 && (
              <div className="mt-32">
                <h3 className="text-center text-xl font-bold text-slate-900 dark:text-white mb-10">Certifications Obtenues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {certificates.map((cert) => (
                    <CertificateCard key={cert.id} certificate={cert} />
                  ))}
                </div>
              </div>
            )}
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
