import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { ChefHat, Store, Truck, Sprout, ArrowRight } from 'lucide-react';

const DOMAINES = [
  { id: 'cuisine', label: 'Cuisine & Gastronomie', icon: ChefHat },
  { id: 'commerce', label: 'Commerce de proximité', icon: Store },
  { id: 'logistique', label: 'Gestion & Logistique', icon: Truck },
  { id: 'agriculture', label: 'Agriculture Urbaine', icon: Sprout },
];

export default function StepDomaines({ onNext, onPrev, data }: any) {
  const [selected, setSelected] = useState<string>(data.domaine || '');

  const handleNext = () => {
    onNext(selected);
  };

  return (
    <StepLayout currentStep={2} totalSteps={5} onPrev={onPrev}>
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight mb-4">
          Quels sont vos <span className="text-oya-terracotta">domaines</span> de prédilection ?
        </h2>
        <p className="text-gray-600 text-lg">
          Sélectionnez les secteurs qui correspondent le mieux à votre parcours actuel.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {DOMAINES.map(dom => {
          const isSelected = selected === dom.id;
          const Icon = dom.icon;
          return (
            <button
              key={dom.id}
              onClick={() => setSelected(dom.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected 
                  ? 'border-oya-terracotta bg-oya-terracotta/5 text-oya-terracotta' 
                  : 'border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-xl ${isSelected ? 'bg-oya-terracotta text-white' : 'bg-gray-100 text-gray-500'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-lg flex-1">{dom.label}</span>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-oya-terracotta text-white flex items-center justify-center">
                  <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button 
          onClick={handleNext}
          disabled={!selected}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer l'analyse <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </StepLayout>
  );
}
