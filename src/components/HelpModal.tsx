import React, { useState } from 'react';
import {
  X, HelpCircle, ArrowRight, ChevronDown, ChevronUp,
  Leaf, Trophy, ShieldCheck, Clock,
  CheckCircle, Lightbulb, Search, MousePointerClick
} from 'lucide-react';

/* ── Sections du guide ── */
const SECTIONS = [
  { id: 'intro',     label: "C'est quoi Oya ?" },
  { id: 'etapes',    label: "Les étapes" },
  { id: 'resultats', label: "Vos résultats" },
  { id: 'faq',       label: "FAQ" },
  { id: 'rgpd',      label: "Vos données" },
];

/* ── Détail des 5 étapes ── */
const ETAPES = [
  {
    num: '1',
    emoji: '🧰',
    color: 'bg-orange-50 border-orange-200',
    badge: 'text-oya-terracotta',
    title: 'Vos compétences',
    subtitle: 'Étape 1',
    desc: "On vous propose une liste de compétences issues de différents domaines professionnels : agriculture, industrie alimentaire, logistique, restauration, environnement, gestion de projet, communication et gouvernance. Cochez toutes les compétences que vous maîtrisez, même si vous les avez apprises dans un autre secteur.",
    tips: [
      "Inutile d'être expert : si vous savez faire quelque chose à 50 ou 60 %, cochez-le quand même.",
      "En revanche, ne cochez pas ce que vous ne savez pas faire : cela fausserait vos résultats.",
      "Plus vous êtes précis dans vos réponses, plus vos résultats seront utiles.",
    ],
  },
  {
    num: '2',
    emoji: '✨',
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'text-yellow-600',
    title: 'Vos qualités personnelles',
    subtitle: 'Étape 2',
    desc: "On vous demande de choisir parmi une liste de qualités celles qui vous ressemblent vraiment. Ces qualités sont regroupées en grandes familles : votre façon d'être avec les autres, votre sens de l'organisation, votre autonomie, votre goût pour le terrain, ou encore votre créativité.",
    tips: [
      "Soyez honnête. Il n'existe pas de mauvaise réponse : chaque profil correspond à des métiers différents.",
      "Choisir des qualités pour « faire bonne impression » ne vous donnera pas de meilleurs résultats, juste des résultats moins adaptés à votre vraie personnalité.",
    ],
  },
  {
    num: '3',
    emoji: '🌍',
    color: 'bg-green-50 border-green-200',
    badge: 'text-oya-green-dark',
    title: 'Vos secteurs préférés',
    subtitle: 'Étape 3 (Facultatif)',
    desc: "Si vous avez déjà une idée du secteur dans lequel vous aimeriez travailler, vous pouvez le préciser ici. Plusieurs choix sont possibles. Les métiers correspondant à vos préférences seront mis en avant dans vos résultats.",
    tips: [
      "Cette étape est facultative. Si vous ne savez pas encore, passez directement à la suite.",
      "Vous verrez quand même tous les métiers compatibles avec votre profil, même sans choisir de secteur.",
    ],
  },
  {
    num: '4',
    emoji: '⚙️',
    color: 'bg-blue-50 border-blue-200',
    badge: 'text-blue-600',
    title: 'Vos contraintes de travail',
    subtitle: 'Étape 4',
    desc: "Vous indiquez ici votre situation pratique : est-ce que vous préférez travailler en intérieur, en extérieur, ou les deux ? Vous cherchez un temps plein, un temps partiel ou une alternance ? Quelle est votre zone géographique ? Acceptez-vous des déplacements fréquents ?",
    tips: [
      "Ces informations ne changent pas votre classement de métiers.",
      "Elles permettent à l'équipe Oya de vous proposer un accompagnement mieux adapté à votre situation si vous le souhaitez.",
    ],
  },
  {
    num: '5',
    emoji: '📬',
    color: 'bg-purple-50 border-purple-200',
    badge: 'text-purple-600',
    title: 'Votre adresse email',
    subtitle: 'Étape 5 (Facultatif)',
    desc: "Si vous souhaitez recevoir vos résultats par email ou être recontacté(e) par un conseiller Oya, vous pouvez laisser votre adresse ici. Deux cases de consentement vous sont proposées indépendamment.",
    tips: [
      "Si vous ne souhaitez rien cocher, vos résultats s'affichent quand même à l'écran immédiatement.",
      "Consentement 1 : recevoir votre diagnostic par email.",
      "Consentement 2 : être tenu(e) informé(e) des formations et actualités Oya.",
    ],
  },
];

/* ── FAQ ── */
const FAQ_ITEMS = [
  {
    q: "Le diagnostic est-il vraiment gratuit ?",
    a: "Oui, entièrement. Aucun paiement ni carte bancaire n'est demandé, à aucun moment.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "Entre 2 et 5 minutes selon le soin que vous apportez à vos réponses. Vos résultats apparaissent immédiatement à la fin.",
  },
  {
    q: "Je n'ai aucune expérience dans l'alimentaire. Puis-je quand même faire le diagnostic ?",
    a: "Tout à fait. Oya est précisément conçu pour les personnes en reconversion. Les compétences que vous avez acquises dans d'autres secteurs sont souvent transférables. Renseignez ce que vous savez faire, et Oya fera le lien avec les métiers de la transition alimentaire.",
  },
  {
    q: "Puis-je refaire le diagnostic ?",
    a: "Oui, autant de fois que vous le souhaitez. N'hésitez pas à tester différents profils pour explorer plusieurs orientations possibles.",
  },
  {
    q: "Mes réponses influencent-elles vraiment les résultats ?",
    a: "Oui. Deux personnes avec des profils différents obtiendront des résultats différents. Plus vous répondez précisément, plus vos résultats reflètent fidèlement ce qui vous correspond.",
  },
  {
    q: "Que se passe-t-il si je laisse mon adresse email ?",
    a: "Un conseiller Oya pourra vous recontacter avec votre diagnostic détaillé et des suggestions de formations adaptées. Vous choisissez séparément ce que vous acceptez : recevoir vos résultats par email, ou être informé(e) des actualités et formations Oya. Les deux sont indépendants et facultatifs.",
  },
  {
    q: "Le bouton Aide est-il disponible pendant le diagnostic ?",
    a: "Oui. À chaque étape, un bouton Aide est visible dans la barre en haut de l'écran. Il ouvre ce guide sans interrompre votre progression dans le formulaire.",
  },
];

/* ── Composant FAQ accordéon ── */
function FaqItem({ q, a }: { q: string; a: string; key?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm pr-2">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50">
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Modal principale ── */
export function HelpModal({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`guide-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-oya-terracotta font-bold text-lg">
            <HelpCircle className="w-5 h-5" /> Guide utilisateur Oya
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Nav sections */}
        <div className="flex gap-1 px-4 py-2 border-b border-gray-100 overflow-x-auto shrink-0">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSection === s.id
                  ? 'bg-oya-terracotta text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-10">

          {/* ── C'EST QUOI OYA ? ── */}
          <section id="guide-intro">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-oya-terracotta" />
              <h2 className="font-bold text-gray-900 text-base">C'est quoi Oya ?</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Oya est un outil gratuit qui vous aide à trouver un métier dans les secteurs de l'alimentation et de l'environnement. Il est fait pour les personnes qui souhaitent changer de voie, découvrir de nouveaux horizons professionnels, ou simplement savoir quels métiers correspondent à leurs compétences.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              En quelques minutes, vous répondez à quelques questions sur ce que vous savez faire et ce qui vous correspond. Oya compare ensuite votre profil avec une large liste de métiers du secteur alimentaire et vous propose un classement personnalisé, avec des explications claires sur chaque métier suggéré.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Que vous soyez en reconversion, en recherche d'emploi, ou simplement curieux, Oya est accessible à tous. Pas besoin d'avoir un diplôme agricole ou alimentaire pour l'utiliser : vos compétences actuelles, quelle que soit votre expérience, sont prises en compte.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: <Clock className="w-4 h-4 text-oya-terracotta" />, label: '2 à 5 minutes', sub: 'pour compléter' },
                { icon: <Trophy className="w-4 h-4 text-yellow-500" />, label: '80 métiers', sub: 'comparés' },
                { icon: <ShieldCheck className="w-4 h-4 text-green-600" />, label: 'Gratuit & RGPD', sub: 'sans engagement' },
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  {g.icon}
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{g.label}</div>
                    <div className="text-xs text-gray-400">{g.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── LES ÉTAPES ── */}
          <section id="guide-etapes">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-oya-terracotta" />
              <h2 className="font-bold text-gray-900 text-base">Comment fonctionne le diagnostic ?</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Le diagnostic se déroule en cinq étapes simples, l'une après l'autre. Une barre en haut de l'écran vous montre où vous en êtes à tout moment. Vous pouvez revenir en arrière si vous souhaitez modifier une réponse.
            </p>
            <div className="space-y-4">
              {ETAPES.map((e, i) => (
                <div key={i} className={`rounded-2xl border p-4 ${e.color}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{e.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wide ${e.badge}`}>{e.subtitle}</span>
                      </div>
                      <div className="font-bold text-gray-900 text-sm">{e.title}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{e.desc}</p>
                  <div className="space-y-1.5">
                    {e.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-500 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── LES RÉSULTATS ── */}
          <section id="guide-resultats">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-oya-terracotta" />
              <h2 className="font-bold text-gray-900 text-base">Comment lire vos résultats ?</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Dès que vous avez soumis le formulaire, une page de résultats personnalisée s'affiche. Elle est organisée en deux parties.
            </p>
            <div className="space-y-3">
              {[
                {
                  emoji: '🥇',
                  title: 'Les trois métiers les plus compatibles',
                  text: "Les trois métiers avec les meilleurs scores sont présentés en détail. Pour chacun, vous trouvez : le nom du métier et son score de compatibilité, une indication sur le niveau d'études généralement recommandé, une fourchette de salaire approximative, et les compétences qui vous manquent encore si vous souhaitez évoluer vers ce métier.",
                },
                {
                  emoji: '📋',
                  title: "D'autres métiers suggérés",
                  text: "En dessous du top 3, deux autres métiers sont proposés sous forme de cartes. Cliquez sur l'une d'elles pour afficher la fiche complète, sans quitter la page. Vous pouvez en consulter plusieurs à la suite.",
                },
                {
                  emoji: '📊',
                  title: 'Les indicateurs visuels',
                  text: "Dans chaque fiche, deux barres de couleur vous montrent d'un coup d'œil votre niveau de correspondance : l'une pour vos compétences, l'autre pour vos qualités personnelles. Plus la barre est remplie, plus votre profil est proche de ce que le métier demande.",
                },
                {
                  emoji: '🔍',
                  title: 'Les compétences manquantes',
                  text: "Chaque fiche liste les compétences attendues pour ce métier que vous n'avez pas encore. Ce n'est pas une critique : c'est une information utile. Si ce métier vous intéresse, cette liste devient votre point de départ pour chercher une formation, un stage, ou une expérience à acquérir.",
                },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-xl shrink-0">{r.emoji}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{r.title}</div>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3">
              <MousePointerClick className="w-4 h-4 text-oya-terracotta mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>À noter :</strong> Vous pouvez utiliser la liste des compétences manquantes pour orienter vos recherches de formation ou en parler avec un conseiller Oya.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="guide-faq">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-oya-terracotta" />
              <h2 className="font-bold text-gray-900 text-base">Questions fréquentes</h2>
            </div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </section>

          {/* ── VOS DONNÉES ── */}
          <section id="guide-rgpd">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-oya-terracotta" />
              <h2 className="font-bold text-gray-900 text-base">Vos données et votre vie privée</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Oya respecte le Règlement Général sur la Protection des Données (RGPD). Voici ce qui se passe avec les informations que vous fournissez.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: '🔒',
                  title: 'Vos données personnelles restent chez Oya',
                  text: "Si vous laissez votre adresse email, elle est transmise uniquement au système Oya pour vous recontacter si vous l'avez demandé. Elle n'est jamais partagée, vendue ou utilisée à d'autres fins.",
                },
                {
                  icon: '👤',
                  title: 'Vous choisissez ce que vous acceptez',
                  text: "À la dernière étape du diagnostic, deux cases de consentement vous sont proposées indépendamment. La première concerne uniquement l'envoi de vos résultats par email. La seconde concerne les informations sur les formations et actualités Oya. Vous pouvez cocher l'une sans l'autre, ou n'en cocher aucune.",
                },
                {
                  icon: '🗑️',
                  title: "Vous pouvez demander la suppression de vos données",
                  text: "Conformément au RGPD, vous avez le droit de demander à tout moment que vos données soient supprimées. Il vous suffit de contacter directement l'équipe Oya. Votre demande sera traitée dans les meilleurs délais.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{item.title}</div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            J'ai compris, continuer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
