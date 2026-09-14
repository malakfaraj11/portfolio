import { getProjects, createProject, updateProject, deleteProject } from '@/actions/content';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import ProjectsClient from './ProjectsClient';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  async function serverAction(formData: FormData, editingId: string | null) {
    'use server';
    const splitByLine = (text: string) => text.split('\n').map(t => t.trim()).filter(Boolean);
    const splitByComma = (text: string) => text.split(',').map(t => t.trim()).filter(Boolean);

    let finalImageUrl = null;
    const imageFile = formData.get('imageFile') as File | null;
    
    // Si un nouveau fichier est uploadé
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `project-${Date.now()}.${imageFile.name.split('.').pop()}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      finalImageUrl = `/uploads/${filename}`;
    }

    // Récupérer l'ancienne image si on édite et qu'on n'a pas uploadé de nouvelle image
    if (editingId && !finalImageUrl) {
      const existingProject = projects.find(p => p.id === editingId);
      if (existingProject) {
        finalImageUrl = existingProject.imageUrl;
      }
    }

    const data = {
      title: formData.get('title') as string,
      subtitleFr: formData.get('subtitleFr') as string,
      subtitleEn: formData.get('subtitleEn') as string,
      resumeFr: formData.get('resumeFr') as string,
      resumeEn: formData.get('resumeEn') as string,
      problemFr: formData.get('problemFr') as string,
      problemEn: formData.get('problemEn') as string,
      goalsFr: splitByLine(formData.get('goalsFr') as string),
      goalsEn: splitByLine(formData.get('goalsEn') as string),
      solutionFr: formData.get('solutionFr') as string,
      solutionEn: formData.get('solutionEn') as string,
      archFr: splitByLine(formData.get('archFr') as string),
      archEn: splitByLine(formData.get('archEn') as string),
      resultsFr: splitByLine(formData.get('resultsFr') as string),
      resultsEn: splitByLine(formData.get('resultsEn') as string),
      categories: splitByComma(formData.get('categories') as string),
      imageUrl: finalImageUrl,
      linkUrl: formData.get('linkUrl') as string || null,
      githubUrl: formData.get('githubUrl') as string || null,
    };

    if (editingId) {
      await updateProject(editingId, data);
    } else {
      await createProject(data);
    }
  }

  async function deleteAction(id: string) {
    'use server';
    await deleteProject(id);
  }

  return (
    <ProjectsClient 
      projects={projects} 
      serverAction={serverAction} 
      deleteAction={deleteAction} 
    />
  );
}
