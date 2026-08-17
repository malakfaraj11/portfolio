import { getProjects, deleteProject } from '@/actions/projects';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">Gérer les Projets</h1>
        <Link
          href="/admin/projects/new"
          className="bg-slate-900 dark:bg-white text-white dark:text-black font-bold px-6 py-3 rounded-full hover:bg-fuchsia-500 dark:hover:bg-fuchsia-400 hover:text-white transition-all shadow-lg"
        >
          + Nouveau Projet
        </Link>
      </div>

      <div className="bg-white/70 dark:bg-[#0f0f11]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-white/10">
          <thead className="bg-slate-50/50 dark:bg-black/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Titre
              </th>
              <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-mono font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{project.title}</div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm font-mono text-slate-500 dark:text-gray-400">
                    {new Date(project.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-bold">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 mr-6 transition-colors"
                  >
                    Modifier
                  </Link>
                  <DeleteButton 
                    action={deleteProject.bind(null, project.id)} 
                    itemType="projet" 
                  />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center font-mono text-slate-500 dark:text-gray-500">
                  Aucun projet trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
