import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { Sparkles, Info, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    label: "🌱 Agriculture & Production",
    competences: [
      "Agroécologie", "Agriculture urbaine", "Production végétale",
      "Maraîchage & cultures", "Élevage & bien-être animal",
      "Conseil agricole", "Diagnostic agroécologique",
      "Agriculture de précision", "Gestion d'exploitation agricole",
    ],
  },
  {
    label: "🏭 Transformation & Industrie",
    competences: [
      "Transformation agroalimentaire", "Qualité & HACCP",
      "Écoconception produit", "Analyse cycle de vie (ACV)",
      "Bilan carbone & décarbonation", "Gestion de production",
      "Maintenance industrielle", "Sécurité alimentaire",
    ],
  },
  {
    label: "🚛 Logistique & Distribution",
    competences: [
      "Logistique & Supply Chain", "Circuits courts",
      "Gestion des stocks", "Transport & livraison",
      "Approvisionnement local", "Coordination de plateforme",
      "Optimisation des flux", "Drive fermier & e-commerce",
    ],
  },
  {
    label: "🍳 Restauration & Alimentation",
    competences: [
      "Restauration collective", "Cuisine durable & saisonnière",
      "Végétalisation des menus", "Achats durables & sourcing",
      "Anti-gaspillage alimentaire", "Artisanat alimentaire",
      "Menus bas-carbone", "Réglementation Egalim",
    ],
  },
  {
    label: "♻️ Environnement & Économie circulaire",
    competences: [
      "Économie circulaire", "Gestion des biodéchets",
      "Compostage", "Réduction des déchets",
      "RSE & développement durable", "Énergies renouvelables",
      "Efficacité énergétique", "Reporting ESG & CSRD",
    ],
  },
  {
    label: "📊 Gestion & Stratégie",
    competences: [
      "Gestion de projet", "Management d'équipe",
      "Analyse de données", "Gestion budgétaire",
      "Négociation commerciale", "Relation client",
      "Marchés publics", "Montage de dossiers de financement",
    ],
  },
  {
    label: "🎓 Animation & Communication",
    competences: [
      "Animation & pédagogie", "Formation & accompagnement",
      "Communication digitale", "Marketing Digital",
      "Sensibilisation & médiation", "Gestion de crise",
      "Community management", "Conduite du changement",
    ],
  },
  {
    label: "🏛️ Gouvernance & Politiques publiques",
    competences: [
      "Coordination territoriale", "Politique alimentaire (PAT)",
      "Concertation multi-acteurs", "Ingénierie de projet",
      "Partenariats public-privé", "Conseil & stratégie",
      "Nutrition & santé publique", "Diagnostic territorial",
    ],
  },
];

export default function StepExpertises({ onNext, onPrev, data }: any) {
  const [selected, setSelected] = useState<string[]>(data.competencesTech || []);

  const toggleSelection = (exp: string) => {
    setSelected(prev =>
      prev.includes(exp) ? prev.filter(i => i !== exp) : [...prev, exp]
    );
  };

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <StepLayout currentStep={1} totalSteps={5} onPrev={onPrev}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-oya-terracotta uppercase mb-3">
          COMPÉTENCES MÉTIER — Étape 1 sur 4
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-oya-terracotta/10 rounded-2xl text-oya-terracotta shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
            Quelles sont vos <span className="text-oya-terracotta">compétences métier ?</span>
          </h2>
        </div>
        <p className="text-gray-600 mt-4 text-lg">
          Sélectionnez les compétences techniques et professionnelles que vous maîtrisez. Elles comptent pour <strong>70%</strong> de votre score de compatibilité.
        </p>
        {selected.length > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-oya-terracotta/10 text-oya-terracotta px-3 py-1.5 rounded-full text-sm font-semibold">
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {selected.length} compétence{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="space-y-6 mb-8">
        {CATEGORIES.map(cat => (
          <div key={cat.label}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{cat.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.competences.map(exp => {
                const isSelected = selected.includes(exp);
                return (
                  <button
                    key={exp}
                    onClick={() => toggleSelection(exp)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all text-sm ${
                      isSelected
                        ? 'border-oya-terracotta bg-oya-terracotta/5 text-oya-terracotta font-semibold'
                        : 'border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 shrink-0 rounded flex items-center justify-center border ${
                      isSelected ? 'bg-oya-terracotta border-oya-terracotta text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    {exp}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-xl mb-8 text-sm">
        <Info className="w-5 h-5 shrink-0 text-yellow-600" />
        <p><strong>Conseil :</strong> Choisissez au moins 3 compétences pour obtenir une analyse plus précise de votre profil de transition.</p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-sm text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">1</span> sur 4 étapes complétées
        </div>
        <button 
          onClick={handleNext}
          disabled={selected.length === 0}
          className="flex items-center gap-2 bg-oya-terracotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-oya-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </StepLayout>
  );
}
