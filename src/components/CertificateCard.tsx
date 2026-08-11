import { Certificate } from '@/actions/certificates';

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 flex items-start space-x-4">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
        {certificate.image_url ? (
          <img
            src={certificate.image_url}
            alt={certificate.issuer}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <span className="text-2xl">🎓</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 truncate">{certificate.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{certificate.issuer}</p>
        
        {certificate.issue_date && (
          <p className="text-xs text-gray-400 mb-3">
            Obtenu en {new Date(certificate.issue_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </p>
        )}

        {certificate.credential_url && (
          <a
            href={certificate.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Vérifier le certificat
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
