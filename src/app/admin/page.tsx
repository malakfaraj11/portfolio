import { getProfile, getProjects, getCertifications, getExperiences, getMessages } from '@/actions/content';
import Link from 'next/link';
import { Briefcase, FolderGit2, Award, Mail, User, ArrowRight } from 'lucide-react';

export default async function AdminDashboardPage() {
  const [profile, projects, certifications, experiences, messages] = await Promise.all([
    getProfile(),
    getProjects(),
    getCertifications(),
    getExperiences(),
    getMessages()
  ]);

  const stats = [
    {
      label: 'Projets',
      value: projects.length,
      icon: <FolderGit2 className="w-8 h-8 text-fuchsia-500" />,
      href: '/admin/projects',
      color: 'bg-fuchsia-500/10 border-fuchsia-500/20'
    },
    {
      label: 'Certifications',
      value: certifications.length,
      icon: <Award className="w-8 h-8 text-blue-500" />,
      href: '/admin/certifications',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      label: 'Parcours',
      value: experiences.length,
      icon: <Briefcase className="w-8 h-8 text-emerald-500" />,
      href: '/admin/experience',
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Messages',
      value: messages.length,
      icon: <Mail className="w-8 h-8 text-orange-500" />,
      href: '/admin/messages',
      color: 'bg-orange-500/10 border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Tableau de Bord</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Bienvenue dans votre espace d'administration. Voici un aperçu de vos données.
        </p>
      </div>

      {/* Profil Status Card */}
      <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden">
            {profile?.photoUrl ? (
              <img src={profile.photoUrl} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-lg">
              {profile ? profile.tagline : 'Profil non configuré'}
            </h2>
            <p className="text-sm text-slate-500">
              {profile?.status || 'Aucun statut défini'} • {profile?.location || 'Aucune localisation'}
            </p>
          </div>
        </div>
        <Link 
          href="/admin/profile" 
          className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors group"
        >
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <Link 
            key={i} 
            href={stat.href}
            className={`p-6 rounded-3xl border ${stat.color} flex flex-col gap-4 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-sm`}
          >
            <div className="flex justify-between items-start">
              {stat.icon}
              <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions or Recent Activity could go here in the future */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
          <h3 className="font-bold text-lg dark:text-white mb-4">Messages Récents</h3>
          <div className="space-y-4">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="pb-4 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                <p className="font-bold text-sm dark:text-white">{msg.name}</p>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">{msg.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-sm text-slate-500">Aucun message pour le moment.</p>
            )}
          </div>
          {messages.length > 0 && (
            <Link href="/admin/messages" className="inline-block mt-4 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">
              Voir tous les messages &rarr;
            </Link>
          )}
        </div>

        <div className="bg-gradient-to-br from-fuchsia-600 to-blue-600 p-6 md:p-8 rounded-3xl text-white shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-2xl mb-2">Prêt à publier ?</h3>
            <p className="text-white/80 text-sm">
              Votre portfolio est dynamique. Assurez-vous d'avoir ajouté vos derniers projets et mis à jour votre statut pour attirer les meilleures opportunités.
            </p>
          </div>
          <Link 
            href="/" 
            target="_blank"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors w-max"
          >
            Voir le site public
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
