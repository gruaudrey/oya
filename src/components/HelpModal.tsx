import React from 'react';
import { X, ClipboardList, Cpu, Mail, Trophy, ShieldCheck, Clock, HelpCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    icon: <ClipboardList className="w-6 h-6 text-oya-terracotta" />,
    title: 'Vos compétences',
    desc: "Cochez toutes les compétences que vous maîtrisez déjà. Pas besoin d'être expert !",
  },
  {
    num: '2',
    icon: <ClipboardList className="w-6 h-6 text-oya-yellow" />,
    title: 'Vos préférences',
    desc: "Indiquez votre domaine préféré et vos contraintes : rythme, environnement, localisation.",
  },
  {
    num: '3',
    icon: <Cpu className="w-6 h-6 text-oya-green-dark" />,
    title: "Analyse IA",
    desc: "Notre algorithme compare votre profil avec 80 métiers de la transition alimentaire.",
  },
  {
    num: '4',
    icon: <Trophy className="w-6 h-6 text-oya-terracotta" />,
    title: 'Vos résultats',
    desc: "Les 5 métiers les plus compatibles s'affichent avec score, salaire et explication personnalisée.",
  },
  {
    num: '5',
    icon: <Mail className="w-6 h-6 text-oya-yellow" />,
    title: 'Votre analyse par email',
    desc: "Laissez votre email pour recevoir votre diagnostic complet et les formations adaptées.",
  },
];

const FAQ = [
  { q: "C'est gratuit ?", a: "Oui, 100% gratuit et sans engagement." },
  { q: "Mes données sont-elles protégées ?", a: "Vos données servent uniquement à générer votre diagnostic. Elles ne sont jamais revendues." },
  { q: "Combien de temps ça prend ?", a: "Environ 5 minutes. Les résultats sont instantanés." },
  { q: "Je n'ai pas de diplôme agricole, puis-je faire le diagnostic ?", a: "Absolument ! Conçu pour les personnes en reconversion. Vos compétences actuelles sont transférables." },
];

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-oya-terracotta font-bold">
            <HelpCircle className="w-5 h-5" /> Comment ça marche ?
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Étapes */}
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-900 text-sm">
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && <div className="w-px flex-1 bg-gray-100 my-1 min-h-[12px]" />}
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {step.icon}
                    <span className="font-semibold text-gray-900 text-sm">{step.title}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Garanties */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <Clock className="w-4 h-4 text-oya-terracotta" />, label: '5 min', sub: 'environ' },
              { icon: <Trophy className="w-4 h-4 text-oya-yellow" />, label: 'Gratuit', sub: '100%' },
              { icon: <ShieldCheck className="w-4 h-4 text-gray-400" />, label: 'Sécurisé', sub: 'RGPD' },
            ].map((g, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="flex justify-center mb-1">{g.icon}</div>
                <div className="font-bold text-gray-900 text-xs">{g.label}</div>
                <div className="text-xs text-gray-400">{g.sub}</div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Questions fréquentes</h3>
            <div className="space-y-2">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.q}</p>
                  <p className="text-gray-500 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Continuer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
