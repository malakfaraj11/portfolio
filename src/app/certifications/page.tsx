import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import TiltCard from '@/components/TiltCard';
import { TextReveal } from '@/components/TextReveal';
import { ArrowLeft, Award } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen font-sans relative selection:bg-fuchsia-500/30">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-fuchsia-900/10 dark:via-[#0f0f11] dark:to-[#0f0f11]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group bg-slate-100 dark:bg-[#161618] px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </ScrollReveal>
          
          <TextReveal delay={0.1} text="Certifications." className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter" />

          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Validation des compétences et expertises techniques.
            </p>
          </ScrollReveal>
        </div>
      </section>
        
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.length > 0 ? certifications.map((cert, idx) => (
            <ScrollReveal key={cert.id} delay={idx * 0.1} className="col-span-1">
              <TiltCard className="group block h-full" intensity={10}>
                <SpotlightCard 
                  className="h-full flex flex-col interactive overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161618] hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 rounded-[32px] p-8" 
                  spotlightColor="rgba(150, 150, 150, 0.1)"
                >
                  <div className="mb-6 flex justify-between items-start">
                    <div className="bg-fuchsia-500/10 text-fuchsia-500 p-3 rounded-2xl">
                      <Award className="w-8 h-8" />
                    </div>
                    {cert.date && (
                      <span className="text-xs font-mono text-slate-400 dark:text-gray-500 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full">
                        {new Date(cert.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-fuchsia-500 transition-colors">
                    {cert.name}
                  </h3>
                  <h4 className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
                    {cert.issuer}
                  </h4>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/10">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 interactive">
                        Vérifier la certification
                      </a>
                    ) : (
                      <span className="text-sm font-bold text-slate-400 dark:text-gray-600">Certifié</span>
                    )}
                  </div>
                </SpotlightCard>
              </TiltCard>
            </ScrollReveal>
          )) : (
            <div className="col-span-full py-32 text-center">
              <Award className="w-16 h-16 text-slate-300 dark:text-white/10 mx-auto mb-6" />
              <p className="text-xl font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">Aucune certification trouvée</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
