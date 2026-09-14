import { getCertifications, createCertification, deleteCertification } from '@/actions/content';
import ToggleForm from '@/components/ToggleForm';

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  async function handleCreate(formData: FormData) {
    'use server';
    
    // Parse date if provided
    const dateStr = formData.get('date') as string;
    const date = dateStr ? new Date(dateStr) : undefined;
    
    await createCertification({
      name: formData.get('name') as string,
      issuer: formData.get('issuer') as string,
      url: formData.get('url') as string || null,
      ...(date ? { date } : {})
    });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteCertification(formData.get('id') as string);
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 dark:text-white">Certifications</h1>

      <ToggleForm title="Ajouter une nouvelle certification">
        <form action={handleCreate} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Nom (ex: AWS Certified Developer)" 
              required 
              className="flex-1 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none" 
            />
            
            <input 
              type="text" 
              name="issuer" 
              placeholder="Organisme (ex: Amazon Web Services)" 
              required 
              className="flex-1 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="date" 
              name="date" 
              className="flex-1 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
            
            <input 
              type="url" 
              name="url" 
              placeholder="URL de vérification (optionnel)" 
              className="flex-1 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors md:self-end">
            Ajouter
          </button>
        </form>
      </ToggleForm>

      <div className="mb-6">
        <h2 className="text-xl font-bold dark:text-white mb-4">Certifications existantes ({certifications.length})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert: any) => (
          <div key={cert.id} className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-start group">
            <div>
              <span className="text-[10px] font-mono font-bold text-fuchsia-500 uppercase tracking-widest bg-fuchsia-500/10 px-2 py-1 rounded inline-block mb-2">
                {cert.issuer}
              </span>
              <h3 className="font-bold text-lg dark:text-white">{cert.name}</h3>
              {cert.date && <p className="text-sm text-slate-500 mt-1">{new Date(cert.date).toLocaleDateString('fr-FR')}</p>}
              {cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-2 inline-block">
                  Voir la certification
                </a>
              )}
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={cert.id} />
              <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-lg border border-transparent dark:border-white/10 hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors p-2 rounded-full hover:bg-red-500/10">
                ✕
              </button>
            </form>
          </div>
        ))}
        {certifications.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
            Aucune certification ajoutée. Utilisez le formulaire ci-dessus.
          </div>
        )}
      </div>
    </div>
  );
}
