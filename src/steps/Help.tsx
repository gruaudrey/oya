import React from 'react';
import { ArrowLeft, ClipboardList, Cpu, Mail, Trophy, ShieldCheck, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';

const STEPS = [
  {
    num: '1',
    icon: <ClipboardList className="w-7 h-7 text-oya-terracotta" />,
    title: 'Vous renseignez vos compétences',
    desc: "Cochez toutes les compétences que vous maîtrisez déjà : gestion de projet, logistique, agroécologie, cuisine, animation… Pas besoin d'être expert, sélectionnez ce que vous savez faire.",
  },
  {
    num: '2',
    icon: <ClipboardList className="w-7 h-7 text-oya-yellow" />,
    title: 'Vous précisez vos préférences',
    desc: "Vous indiquez votre domaine préféré (agriculture, restauration, logistique…) et vos contraintes : rythme de travail, environnement souhaité, localisation et mobilité.",
  },
  {
    num: '3',
    icon: <Cpu className="w-7 h-7 text-oya-green-dark" />,
    title: "L'IA analyse votre profil",
    desc: "Notre algorithme compare vos compétences avec les 80 métiers de la transition alimentaire. Chaque métier reçoit un score de compatibilité calculé sur vos compétences techniques (70%) et vos savoir-être (30%).",
  },
  {
    num: '4',
    icon: <Trophy className="w-7 h-7 text-oya-terracotta" />,
    title: 'Vous découvrez vos résultats',
    desc: "Les 5 métiers les plus compatibles avec votre profil s'affichent, avec leur score, le salaire indicatif, et une explication personnalisée. Vous voyez aussi les compétences à renforcer pour réussir votre transition.",
  },
  {
    num: '5',
    icon: <Mail className="w-7 h-7 text-oya-yellow" />,
    title: 'Vous recevez votre analyse',
    desc: "En laissant votre email, vous pouvez recevoir votre diagnostic complet et être informé(e) des formations et opportunités adaptées à votre profil.",
  },
];

const FAQ = [
  {
    q: "C'est gratuit ?",
    a: "Oui, le diagnostic Oya est 100% gratuit et sans engagement.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos données sont utilisées uniquement pour générer votre diagnostic. Elles ne sont jamais revendues à des tiers. Vous pouvez demander leur suppression à tout moment.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "Environ 5 minutes pour compléter le questionnaire. Les résultats sont instantanés.",
  },
  {
    q: "Je n'ai pas de diplôme agricole, puis-je quand même faire le diagnostic ?",
    a: "Absolument ! Le diagnostic est conçu pour les personnes en reconversion. Vos compétences actuelles, même non agricoles, sont précieuses et transférables.",
  },
  {
    q: "Je ne suis pas satisfait de mes résultats, que faire ?",
    a: "Vous pouvez refaire le diagnostic à tout moment en ajoutant ou modifiant vos compétences pour obtenir des résultats différents.",
  },
];

export default function Help({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>
        <Logo className="h-8" />
        <div className="w-20" />
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">

        {/* Intro */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-oya-terracotta/10 text-oya-terracotta px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" /> Comment ça marche ?
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">
            Trouvez votre métier de demain
          </h1>
          <p className="text-gray-500 text-lg">
            Oya analyse vos compétences pour identifier les métiers de la transition alimentaire qui vous correspondent le mieux. Voici comment, en 5 étapes simples.
          </p>
        </div>

        {/* Étapes */}
        <div className="space-y-4 mb-12">
          {STEPS.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 shadow-sm">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-heading font-bold text-gray-900 text-lg border border-gray-100">
                  {step.num}
                </div>
                {i < STEPS.length - 1 && <div className="w-px flex-1 bg-gray-100 min-h-[20px]" />}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  {step.icon}
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Garanties */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {[
            { icon: <Clock className="w-5 h-5 text-oya-terracotta" />, label: '5 min', sub: 'environ' },
            { icon: <Trophy className="w-5 h-5 text-oya-yellow" />, label: '100% gratuit', sub: 'sans engagement' },
            { icon: <ShieldCheck className="w-5 h-5 text-gray-400" />, label: 'Sécurisé', sub: 'RGPD' },
          ].map((g, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="flex justify-center mb-2">{g.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{g.label}</div>
              <div className="text-xs text-gray-400">{g.sub}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-1">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-oya-terracotta/20"
          >
            Je me lance ! <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
