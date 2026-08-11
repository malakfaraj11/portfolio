import CertificateForm from '@/components/CertificateForm';
import { createCertificate } from '@/actions/certificates';

export default function NewCertificatePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nouvelle Certification</h1>
      <CertificateForm action={createCertificate} />
    </div>
  );
}
