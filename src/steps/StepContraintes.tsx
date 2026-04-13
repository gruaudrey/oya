import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { Clock, TreePine, MapPin, Navigation, ArrowRight } from 'lucide-react';

export default function StepContraintes({ onNext, onPrev, data }: any) {
  const [rythme, setRythme] = useState(data.contraintes?.rythme || 'Temps plein (35h+)');
  const [environnement, setEnvironnement] = useState(data.contraintes?.environnement || 'Nature & Extérieur');
  const [localisation, setLocalisation] = useState(data.contraintes?.localisation || '');
  const [mobilite, setMobilite] = useState(data.contraintes?.mobilite || 'Rayon de 20km');

  const handleNext = () => {
    onNext({ rythme, environnement, localisation, mobilite });
  };

  return (
    <StepLayout currentStep={4} totalSteps={5} onPrev={onPrev}>
      <div className="mb-8 text-center sm:text-left">
        <div className="text-xs font-bold tracking-wider text-oya-terracotta uppercase mb-3 hidden sm:block">
          ÉTAPE 3 SUR 5 — Presque terminé...
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight mb-4">
          Vos Contraintes
        </h2>
        <p className="text-gray-600 text-lg">
          Pour vous proposer les métiers les plus adaptés, nous avons besoin de comprendre votre cadre de vie idéal et vos impératifs quotidiens.
        </p>
      </div>

      <div className="bg-gray-50/50 rounded-3xl p-6 sm:p-8 border border-gray-100 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rythme */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 text-oya-terracotta" /> Rythme de travail
            </label>
            <select 
              value={rythme}
              onChange={(e) => setRythme(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-oya-terracotta/20 focus:border-oya-terracotta outline-none transition-all appearance-none"
            >
              <option>Temps plein (35h+)</option>
              <option>Temps partiel</option>
              <option>Flexible / Indépendant</option>
            </select>
          </div>

          {/* Environnement */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <TreePine className="w-4 h-4 text-oya-terracotta" /> Environnement
            </label>
            <select 
              value={environnement}
              onChange={(e) => setEnvironnement(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-oya-terracotta/20 focus:border-oya-terracotta outline-none transition-all appearance-none"
            >
              <option>Nature & Extérieur</option>
              <option>Bureau / Télétravail</option>
              <option>Atelier / Production</option>
              <option>Mixte</option>
            </select>
          </div>

          {/* Localisation */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-oya-terracotta" /> Localisation
            </label>
            <input 
              type="text"
              placeholder="Ville, département ou région"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-oya-terracotta/20 focus:border-oya-terracotta outline-none transition-all"
            />
          </div>

          {/* Mobilité */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Navigation className="w-4 h-4 text-oya-terracotta" /> Mobilité géographique
            </label>
            <select 
              value={mobilite}
              onChange={(e) => setMobilite(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-oya-terracotta/20 focus:border-oya-terracotta outline-none transition-all appearance-none"
            >
              <option>Rayon de 20km</option>
              <option>Rayon de 50km</option>
              <option>Régionale</option>
              <option>Nationale</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-gray-100 gap-4">
        <button onClick={onPrev} className="text-gray-500 font-medium hover:text-gray-900 transition-colors">
          Retour
        </button>
        <button 
          onClick={handleNext}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-oya-terracotta text-white px-8 py-4 rounded-xl font-semibold hover:bg-oya-terracotta/90 transition-colors"
        >
          Suivant <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400 bg-gray-50 py-3 rounded-xl">
        Vos données sont sécurisées et utilisées uniquement pour votre diagnostic.
      </div>
    </StepLayout>
  );
}
