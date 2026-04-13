import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { Compass, ArrowRight, Info } from 'lucide-react';

// Correspond exactement aux catégories du catalogue métiers
export const SECTEURS = [
  { id: 'Production agricole', emoji: '🌱', label: 'Production agricole', desc: 'Maraîchage, élevage, agroécologie, agriculture urbaine' },
  { id: 'Transformation agroalimentaire & industries', emoji: '🏭', label: 'Transformation & industrie', desc: 'IAA, qualité, écoconception, décarbonation' },
  { id: 'Logistique, distribution & circuits courts', emoji: '🚛', label: 'Logistique & circuits courts', desc: 'Supply chain, livraison, plateformes alimentaires' },
  { id: 'Restauration & métiers de bouche', emoji: '🍳', label: 'Restauration & alimentation', desc: 'Cuisine durable, collectivité, artisanat' },
  { id: 'Nutrition, santé & consommation', emoji: '🥗', label: 'Nutrition & santé', desc: 'Conseil, santé publique, alimentation durable' },
  { id: 'Économie circulaire & environnement', emoji: '♻️', label: 'Économie circulaire', desc: 'Biodéchets, compostage, anti-gaspillage' },
  { id: 'Gouvernance, politiques publiques & transition', emoji: '🏛️', label: 'Gouvernance & politiques', desc: 'PAT, collectivités, RSE, stratégie territoriale' },
  { id: 'Transversale', emoji: '🔗', label: 'Transversal & innovation', desc: 'Numérique, communication, formation, énergie' },
];

export default function StepSecteurs({ onNext, onPrev, data }: any) {
  const [selected, setSelected] = useState<string[]>(data.secteursPref || []);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <StepLayout currentStep={3} totalSteps={5} onPrev={onPrev}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-oya-terracotta uppercase mb-3">
          SECTEURS DE PRÉDILECTION — Étape 3 sur 5
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-oya-terracotta/10 rounded-2xl text-oya-terracotta shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
            Vers quels <span className="text-oya-terracotta">secteurs vous sentez-vous attiré ?</span>
          </h2>
        </div>
        <p className="text-gray-600 mt-4 text-lg">
          Sélectionnez un ou plusieurs secteurs qui vous attirent. Vos choix orientent les résultats vers les métiers de ces domaines.
        </p>
        {selected.length > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-oya-terracotta/10 text-oya-terracotta px-3 py-1.5 rounded-full text-sm font-semibold">
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {selected.length} secteur{selected.length > 1 ? 's' : ''} sélectionné{selected.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {SECTEURS.map(s => {
          const isSelected = selected.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-oya-terracotta bg-oya-terracotta/5'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl shrink-0">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm mb-0.5 ${isSelected ? 'text-oya-terracotta' : 'text-gray-900'}`}>
                  {s.label}
                </div>
                <div className="text-xs text-gray-500 leading-snug">{s.desc}</div>
              </div>
              <div className={`w-4 h-4 shrink-0 rounded border mt-0.5 flex items-center justify-center ${
                isSelected ? 'bg-oya-terracotta border-oya-terracotta' : 'border-gray-300'
              }`}>
                {isSelected && <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5"><path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-xl mb-8 text-sm">
        <Info className="w-5 h-5 shrink-0 text-yellow-600" />
        <p>Pas de secteur de prédilection ? Laissez vide pour une analyse sans filtre sur l'ensemble des 80 métiers.</p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-sm text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">3</span> sur 5 étapes complétées
        </div>
        <button
          onClick={() => onNext(selected)}
          className="flex items-center gap-2 bg-oya-terracotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-oya-terracotta/90 transition-colors"
        >
          Suivant <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </StepLayout>
  );
}
