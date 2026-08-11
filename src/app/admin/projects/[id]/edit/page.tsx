import ProjectForm from '@/components/ProjectForm';
import { getProject, updateProject } from '@/actions/projects';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const updateAction = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier le Projet: {project.title}</h1>
      <ProjectForm project={project} action={updateAction} />
    </div>
  );
}
