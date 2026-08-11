'use client';

import { Certificate } from '@/actions/certificates';
import { useRouter } from 'next/navigation';

export default function CertificateForm({
  certificate,
  action,
}: {
  certificate?: Certificate | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push('/admin/certificates');
      }}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de la certification</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={certificate?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="issuer" className="block text-sm font-medium text-gray-700">Délivré par (ex: Coursera, AWS)</label>
        <input
          type="text"
          name="issuer"
          id="issuer"
          defaultValue={certificate?.issuer}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700">Date d'obtention</label>
        <input
          type="date"
          name="issue_date"
          id="issue_date"
          defaultValue={certificate?.issue_date ? new Date(certificate.issue_date).toISOString().split('T')[0] : ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="credential_url" className="block text-sm font-medium text-gray-700">Lien de vérification</label>
        <input
          type="url"
          name="credential_url"
          id="credential_url"
          defaultValue={certificate?.credential_url}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL de l'image (scan/logo)</label>
        <input
          type="url"
          name="image_url"
          id="image_url"
          defaultValue={certificate?.image_url}
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
