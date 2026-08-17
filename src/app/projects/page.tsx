import { getProjects } from '@/actions/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Tous mes Projets | Malak Faraj',
  description: 'Découvrez tous mes projets en développement web, design, et architecture.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#d9e2ec] text-slate-900 dark:from-[#060C21] dark:via-[#091330] dark:to-[#020510] dark:text-gray-100 font-sans relative selection:bg-fuchsia-500/30 transition-colors duration-500 overflow-hidden pt-32 pb-24">
      
      {/* Ambient Complex Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/30 dark:bg-blue-600/15 blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-300/40 dark:bg-cyan-800/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-300/30 dark:bg-indigo-900/15 blur-[100px]" />
        
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" 
          }} 
        />
      </div>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-sm font-bold tracking-widest uppercase mb-4 block">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Tous mes projets
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl">
            Explorez l'ensemble de mes réalisations, des interfaces front-end élégantes aux systèmes de back-office complexes.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-gray-400 bg-white/70 dark:bg-[#0f0f11]/80 p-12 rounded-2xl border border-slate-200 dark:border-white/5 text-center transition-colors backdrop-blur-xl">
            Aucun projet pour le moment.
          </p>
        )}
      </main>
    </div>
  );
}
