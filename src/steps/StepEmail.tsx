import React, { useState } from 'react';
import { StepLayout } from './StepLayout';
import { Mail, ShieldCheck, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export default function StepEmail({ onNext, onPrev, data, loading }: any) {
  const [email, setEmail] = useState(data.email || '');
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);

  const handleNext = () => {
    onNext({ email, consentEmail, consentMarketing });
  };

  return (
    <StepLayout currentStep={5} totalSteps={5} onPrev={onPrev}>

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-oya-terracotta uppercase mb-4">
          ÉTAPE FINALE <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight mb-4">
          Recevoir mon analyse personnalisée
        </h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Votre diagnostic est prêt. Entrez votre email pour débloquer vos recommandations de carrière IA.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre adresse email professionnelle ou personnelle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-oya-terracotta/20 focus:border-oya-terracotta outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-start pt-1">
              <input
                type="checkbox"
                checked={consentEmail}
                onChange={(e) => setConsentEmail(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded bg-white peer-checked:bg-oya-terracotta peer-checked:border-oya-terracotta transition-all flex items-center justify-center">
                <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              J'accepte de recevoir mon analyse détaillée et des suggestions de formations personnalisées par email.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-start pt-1">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded bg-white peer-checked:bg-oya-terracotta peer-checked:border-oya-terracotta transition-all flex items-center justify-center">
                <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Je souhaite rester informé(e) des opportunités de carrière et des conseils d'orientation d'Oya (facultatif).
            </span>
          </label>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex gap-3 border border-gray-100">
          <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-500 leading-relaxed">
            <strong>Protection de vos données (RGPD)</strong><br/>
            Vos données sont traitées avec le plus grand soin. Elles servent exclusivement à générer votre diagnostic et ne seront jamais revendues à des tiers. Vous disposez d'un droit d'accès, de rectification et de suppression à tout moment.
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!email || !email.includes('@') || loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-oya-terracotta/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Analyse en cours...
            </>
          ) : (
            <>
              Voir mes résultats <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          En cliquant, vous confirmez avoir pris connaissance de nos conditions générales.
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-gray-100 text-xs font-bold tracking-wider text-gray-400 uppercase">
        <span>IA SÉCURISÉE</span>
        <span>ANALYSE GRATUITE</span>
        <span>100% CONFIDENTIEL</span>
      </div>
    </StepLayout>
  );
}
