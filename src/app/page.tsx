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
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Salut, je suis <span className="text-blue-600">Développeur</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            Bienvenue sur mon portfolio. Je construis des applications web modernes, performantes et accessibles.
          </p>
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
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
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
