'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  created_at: string;
};

export async function getCertificates() {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issue_date', { ascending: false });

  if (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
  return data as Certificate[];
}

export async function getCertificate(id: string) {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching certificate:', error);
    return null;
  }
  return data as Certificate;
}

export async function createCertificate(formData: FormData) {
  const newCertificate = {
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    issue_date: formData.get('issue_date') ? formData.get('issue_date') as string : null,
    credential_url: formData.get('credential_url') as string,
    image_url: formData.get('image_url') as string,
  };

  const { error } = await supabase.from('certificates').insert([newCertificate]);

  if (error) {
    console.error('Error creating certificate:', error);
    throw new Error('Failed to create certificate');
  }

  revalidatePath('/admin/certificates');
  revalidatePath('/');
}

export async function updateCertificate(id: string, formData: FormData) {
  const updatedCertificate = {
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    issue_date: formData.get('issue_date') ? formData.get('issue_date') as string : null,
    credential_url: formData.get('credential_url') as string,
    image_url: formData.get('image_url') as string,
  };

  const { error } = await supabase
    .from('certificates')
    .update(updatedCertificate)
    .eq('id', id);

  if (error) {
    console.error('Error updating certificate:', error);
    throw new Error('Failed to update certificate');
  }

  revalidatePath('/admin/certificates');
  revalidatePath('/');
}

export async function deleteCertificate(id: string) {
  const { error } = await supabase.from('certificates').delete().eq('id', id);

  if (error) {
    console.error('Error deleting certificate:', error);
    throw new Error('Failed to delete certificate');
  }

  revalidatePath('/admin/certificates');
  revalidatePath('/');
}
