import CertificateForm from '@/components/CertificateForm';
import { getCertificate, updateCertificate } from '@/actions/certificates';
import { notFound } from 'next/navigation';

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  if (!certificate) {
    notFound();
  }

  const updateAction = updateCertificate.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier la Certification: {certificate.title}</h1>
      <CertificateForm certificate={certificate} action={updateAction} />
    </div>
  );
}
