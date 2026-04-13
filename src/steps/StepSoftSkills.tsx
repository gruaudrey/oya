import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { Heart, Info, ArrowRight } from 'lucide-react';

// Ces valeurs correspondent EXACTEMENT aux softSkills du catalogue métiers
const SOFT_CATEGORIES = [
  {
    label: '🤝 Qualités relationnelles',
    skills: [
      'Communication', 'Empathie', 'Écoute active',
      'Service client', 'Diplomatie', 'Travail en équipe', 'Travail en réseau',
    ],
  },
  {
    label: '📋 Organisation & méthode',
    skills: [
      'Organisation', 'Rigueur', 'Précision',
      'Fiabilité', 'Gestion des priorités', 'Sens des responsabilités',
    ],
  },
  {
    label: '🚀 Leadership & autonomie',
    skills: [
      'Leadership', 'Autonomie', 'Initiative',
      'Polyvalence', 'Adaptabilité', 'Vision stratégique',
    ],
  },
  {
    label: '💪 Terrain & engagement',
    skills: [
      'Résistance physique', 'Sens du terrain', 'Réactivité',
      'Travail sous pression', 'Persévérance', 'Passion',
    ],
  },
  {
    label: '💡 Créativité & vision',
    skills: [
      'Créativité', 'Curiosité', 'Vision globale',
      'Pédagogie', "Sens de l engagement", 'Sens du détail',
    ],
  },
];

export default function StepSoftSkills({ onNext, onPrev, data }: any) {
  const [selected, setSelected] = useState<string[]>(data.softSkills || []);

  const toggle = (skill: string) => {
    setSelected(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <StepLayout currentStep={2} totalSteps={5} onPrev={onPrev}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-oya-terracotta uppercase mb-3">
          QUALITÉS PERSONNELLES
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-oya-terracotta/10 rounded-2xl text-oya-terracotta shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
            Quelles sont vos <span className="text-oya-terracotta">qualités personnelles ?</span>
          </h2>
        </div>
        <p className="text-gray-600 mt-4 text-lg">
          Sélectionnez les qualités qui vous définissent le mieux au travail. Ces soft skills comptent pour 30% de votre score de compatibilité.
        </p>
        {selected.length > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-oya-terracotta/10 text-oya-terracotta px-3 py-1.5 rounded-full text-sm font-semibold">
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {selected.length} qualité{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="space-y-5 mb-8">
        {SOFT_CATEGORIES.map(cat => (
          <div key={cat.label}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{cat.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.skills.map(skill => {
                const isSelected = selected.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggle(skill)}
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
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-xl mb-8 text-sm">
        <Info className="w-5 h-5 shrink-0 text-yellow-600" />
        <p><strong>Conseil :</strong> Soyez honnête ! Choisissez les qualités que vous appliquez vraiment, pas celles que vous aimeriez avoir.</p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-sm text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">2</span> sur 4 étapes complétées
        </div>
        <button
          onClick={() => onNext(selected)}
          disabled={selected.length === 0}
          className="flex items-center gap-2 bg-oya-terracotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-oya-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </StepLayout>
  );
}
