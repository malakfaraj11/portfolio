'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- PROFILE ---
export async function getProfile() {
  return await prisma.profile.findFirst({
    include: { metrics: true }
  });
}

export async function updateProfile(id: string, data: any) {
  await prisma.profile.update({
    where: { id },
    data
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function createProfile(data: any) {
  await prisma.profile.create({
    data
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

// --- SKILLS ---
export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function createSkill(data: any) {
  await prisma.skill.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

// --- EXPERIENCE ---
export async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function createExperience(data: any) {
  await prisma.experience.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

// --- PROJECTS ---
export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function createProject(data: any) {
  await prisma.project.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}
