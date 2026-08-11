'use client';

import { Project } from '@/actions/projects';
import { useRouter } from 'next/navigation';

export default function ProjectForm({
  project,
  action,
}: {
  project?: Project | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push('/admin/projects');
      }}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={project?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description courte</label>
        <input
          type="text"
          name="description"
          id="description"
          defaultValue={project?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu détaillé</label>
        <textarea
          name="content"
          id="content"
          rows={5}
          defaultValue={project?.content}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        ></textarea>
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL de l'image</label>
        <input
          type="url"
          name="image_url"
          id="image_url"
          defaultValue={project?.image_url}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">Lien GitHub</label>
          <input
            type="url"
            name="github_url"
            id="github_url"
            defaultValue={project?.github_url}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label htmlFor="live_url" className="block text-sm font-medium text-gray-700">Lien Live (Demo)</label>
          <input
            type="url"
            name="live_url"
            id="live_url"
            defaultValue={project?.live_url}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
          Technologies (séparées par des virgules)
        </label>
        <input
          type="text"
          name="technologies"
          id="technologies"
          defaultValue={project?.technologies?.join(', ')}
          placeholder="React, Next.js, Tailwind"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
