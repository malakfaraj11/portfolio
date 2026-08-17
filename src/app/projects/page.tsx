import { getProjects } from '@/actions/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Tous mes Projets | Malak Faraj',
  description: 'Découvrez tous mes projets en développement web, design, et architecture.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen pt-32 pb-24 font-sans relative">
      <div className="max-w-6xl mx-auto px-6">
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
      </div>
    </div>
  );
}
