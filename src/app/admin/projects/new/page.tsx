import ProjectForm from '@/components/ProjectForm';
import { createProject } from '@/actions/projects';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nouveau Projet</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
