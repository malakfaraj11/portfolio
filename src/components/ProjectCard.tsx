import { Project } from '@/actions/projects';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white/70 dark:bg-white/5 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/10 backdrop-blur-md">
      <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100/50 text-blue-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 text-xs font-medium rounded-full border border-blue-200 dark:border-fuchsia-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-white/10">
          {project.github_url && (
            <a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          )}
          {project.live_url && (
            <a 
              href={project.live_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-fuchsia-400 hover:text-blue-800 dark:hover:text-fuchsia-300 text-sm font-medium transition-colors"
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
