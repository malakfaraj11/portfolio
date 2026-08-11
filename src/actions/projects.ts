'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export type Project = {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  github_url: string;
  live_url: string;
  technologies: string[];
  created_at: string;
};

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data as Project[];
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }
  return data as Project;
}

export async function createProject(formData: FormData) {
  const technologies = formData.get('technologies')?.toString().split(',').map((t) => t.trim()) || [];

  const newProject = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
    github_url: formData.get('github_url') as string,
    live_url: formData.get('live_url') as string,
    technologies,
  };

  const { error } = await supabase.from('projects').insert([newProject]);

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function updateProject(id: string, formData: FormData) {
  const technologies = formData.get('technologies')?.toString().split(',').map((t) => t.trim()) || [];

  const updatedProject = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
    github_url: formData.get('github_url') as string,
    live_url: formData.get('live_url') as string,
    technologies,
  };

  const { error } = await supabase
    .from('projects')
    .update(updatedProject)
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
}
