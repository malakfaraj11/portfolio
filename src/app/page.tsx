import { getProjects } from '@/actions/projects';
import { getCertificates } from '@/actions/certificates';
import ProjectCard from '@/components/ProjectCard';
import CertificateCard from '@/components/CertificateCard';
import PreloaderWrapper from '@/components/PreloaderWrapper';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Briefcase, GraduationCap } from 'lucide-react';

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

  return (
    <PreloaderWrapper>
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#d9e2ec] text-slate-900 dark:from-[#060C21] dark:via-[#091330] dark:to-[#020510] dark:text-gray-100 font-sans relative selection:bg-fuchsia-500/30 transition-colors duration-500 overflow-hidden">
        
        {/* Ambient Complex Background */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          {/* Main Orbs - IT themed (Cyan, Blue, Indigo) */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/30 dark:bg-blue-600/15 blur-[140px]" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-300/40 dark:bg-cyan-800/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-300/30 dark:bg-indigo-900/15 blur-[100px]" />
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" 
            style={{ 
              backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" 
            }} 
          />
        </div>

        {/* HERO SECTION */}
        <section id="about" className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-24 pb-12 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Available Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-8 backdrop-blur-md shadow-sm shadow-emerald-500/5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-400 uppercase">Available for work</span>
              </div>

              {/* Massive Title */}
              <h1 className="text-6xl sm:text-7xl lg:text-[140px] font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.85] uppercase">
                MALAK <br/> FARAJ
              </h1>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="text-xs font-mono font-bold tracking-wider text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-100/50 dark:bg-fuchsia-500/10 px-3 py-1.5 rounded border border-fuchsia-200 dark:border-fuchsia-500/20 backdrop-blur-sm">[01] FRONTEND</span>
                <span className="text-xs font-mono font-bold tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-500/10 px-3 py-1.5 rounded border border-blue-200 dark:border-blue-500/20 backdrop-blur-sm">[02] UX/UI DESIGN</span>
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-100/50 dark:bg-indigo-500/10 px-3 py-1.5 rounded border border-indigo-200 dark:border-indigo-500/20 backdrop-blur-sm">[03] FULLSTACK</span>
              </div>

              {/* Bio */}
              <p className="text-xl text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed mb-10">
                Je construis des solutions innovantes à l'intersection du <span className="text-slate-900 dark:text-white font-semibold">développement web</span>, du design interactif et de l'expérience utilisateur.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg shadow-fuchsia-500/25">
                  Me Contacter &rarr;
                </a>
                <a href="/cv.pdf" className="px-8 py-4 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Ouvrir mon CV
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
              {/* Card 1 */}
              <ScrollReveal delay={0.1}>
                <div className="p-8 bg-white/70 dark:bg-[#0f0f11]/80 border border-slate-200 dark:border-white/5 rounded-2xl backdrop-blur-xl hover:border-fuchsia-500/30 transition-colors relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-400 dark:text-gray-600">01</div>
                  <h3 className="text-xs font-mono font-bold text-fuchsia-600 dark:text-fuchsia-500 mb-2 uppercase tracking-wider">Formation</h3>
                  <p className="text-lg font-semibold text-slate-900 dark:text-gray-100">Ingénierie Informatique / Développement Web</p>
                </div>
              </ScrollReveal>

              {/* Card 2 */}
              <ScrollReveal delay={0.2}>
                <div className="p-8 bg-white/70 dark:bg-[#0f0f11]/80 border border-slate-200 dark:border-white/5 rounded-2xl backdrop-blur-xl hover:border-blue-500/30 transition-colors relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-400 dark:text-gray-600">02</div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider">Expérience Actuelle</h3>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 uppercase">Current</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-gray-100">Développeuse Frontend & UI Designer</p>
                </div>
              </ScrollReveal>

              {/* Card 3 */}
              <ScrollReveal delay={0.3}>
                <div className="p-8 bg-white/70 dark:bg-[#0f0f11]/80 border border-slate-200 dark:border-white/5 rounded-2xl backdrop-blur-xl hover:border-indigo-500/30 transition-colors relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-400 dark:text-gray-600">03</div>
                  <h3 className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-500 mb-4 uppercase tracking-wider">Langues</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono font-medium bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-gray-300 px-3 py-1.5 rounded-md border border-slate-200 dark:border-white/5">[01] Français (Natif)</span>
                    <span className="text-xs font-mono font-medium bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-gray-300 px-3 py-1.5 rounded-md border border-slate-200 dark:border-white/5">[02] Anglais (Bilingue)</span>
                  </div>
                </div>
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
