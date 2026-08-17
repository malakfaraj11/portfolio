import { getProjects } from '@/actions/projects';
import { getCertificates } from '@/actions/certificates';
import ProjectCard from '@/components/ProjectCard';
import CertificateCard from '@/components/CertificateCard';
import PreloaderWrapper from '@/components/PreloaderWrapper';

export default async function Home() {
  const projects = await getProjects();
  const certificates = await getCertificates();

  return (
    <PreloaderWrapper>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0A0A] dark:text-gray-100 font-sans relative selection:bg-blue-500/30 transition-colors duration-500">
        
        {/* Ambient Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 dark:bg-blue-900/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-300/30 dark:bg-purple-900/20 blur-[120px]" />
        </div>
      {/* Hero Section */}
      <section className="relative z-10 border-b border-gray-200 dark:border-white/5 min-h-[80vh] flex flex-col justify-center transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32 w-full">
          {/* Note: In a Server Component, we cannot use framer-motion's <motion.div> directly unless it's a Client Component. 
              Since page.tsx is async, we'll create a client wrapper for the hero text or just use standard CSS animations for now 
              to keep the server component clean. Let's use Tailwind animate classes. */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-500">
              Salut, je suis <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 dark:from-fuchsia-500 dark:to-violet-500 bg-clip-text text-transparent">
                Développeur Web.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed transition-colors duration-500">
              Je transforme des idées complexes en interfaces élégantes, fluides et performantes. Bienvenue dans mon univers numérique.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-full font-bold hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors">
                Voir mes projets
              </a>
              <a href="mailto:contact@example.com" className="px-8 py-4 border border-slate-300 text-slate-900 dark:border-white/20 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                Me contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        
        {/* Projects Section */}
        <section id="projects">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Mes Projets</h2>
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 bg-white p-8 rounded-xl border border-gray-100 text-center">
              Aucun projet pour le moment. Allez dans l'espace admin pour en ajouter !
            </p>
          )}
        </section>

        {/* Certificates Section */}
        <section id="certificates">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Certifications & Formations</h2>
          </div>
          
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 bg-white p-8 rounded-xl border border-gray-100 text-center">
              Aucune certification pour le moment. Allez dans l'espace admin pour en ajouter !
            </p>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.</p>
          <a href="/admin/projects" className="hover:text-blue-600 transition-colors">
            Accès Admin
          </a>
        </div>
      </footer>
    </div>
    </PreloaderWrapper>
  );
}
