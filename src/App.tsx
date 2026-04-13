import { useState } from 'react';
import Landing from './steps/Landing';
import Help from './steps/Help';
import StepExpertises from './steps/StepExpertises';
import StepSoftSkills from './steps/StepSoftSkills';
import StepSecteurs from './steps/StepSecteurs';
import StepContraintes from './steps/StepContraintes';
import StepEmail from './steps/StepEmail';
import Results from './steps/Results';
import { calculateMatch } from './lib/matching';
import { generateAIExplanations, sendToN8N } from './lib/mistral';
import type { MatchResult, Profile } from './lib/matching';

const initialProfile: Profile = {
  competencesTech: [],
  softSkills: [],
  secteursPref: [],
  contraintes: { rythme: '', environnement: '', localisation: '', mobilite: '' },
  niveau: '',
  email: '',
  consentEmail: false,
  consentMarketing: false,
};

export default function App() {
  const [step, setStep] = useState<'landing' | 'help' | 'diagnostic' | 'results'>('landing');
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const updateProfile = (data: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(s => s + 1);
  const prevStep = () => {
    if (currentStep === 0) {
      setStep('landing');
    } else {
      setCurrentStep(s => s - 1);
    }
  };

  const handleSubmit = async (emailData: { email: string; consentEmail: boolean; consentMarketing: boolean }) => {
    setLoading(true);

    const finalProfile: Profile = { ...profile, ...emailData };

    // 1. Calcul du matching
    const matched = calculateMatch(finalProfile);
    const top5 = matched.slice(0, 5);
    setResults(matched);

    // 2. Envoi données + top 3 vers n8n
    await sendToN8N(finalProfile, top5.slice(0, 3));

    // 3. Explications IA Mistral (données anonymisées uniquement)
    const explanations = await generateAIExplanations(top5, finalProfile);
    setAiExplanations(explanations);

    setLoading(false);
    setStep('results');
  };

  const handleReset = () => {
    setStep('landing');
    setCurrentStep(0);
    setProfile(initialProfile);
    setResults([]);
    setAiExplanations({});
  };

  if (step === 'help') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Help onBack={() => setStep('landing')} />
      </div>
    );
  }

  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Landing
          onNext={() => { setStep('diagnostic'); setCurrentStep(0); }}
          onHelp={() => setStep('help')}
        />
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Results
          onRestart={handleReset}
          results={results}
          aiExplanations={aiExplanations}
          email={profile.email}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {currentStep === 0 && (
        <StepExpertises
          onNext={(competencesTech: string[]) => {
            updateProfile({ competencesTech });
            nextStep();
          }}
          onPrev={prevStep}
          data={profile}
        />
      )}
      {currentStep === 1 && (
        <StepSoftSkills
          onNext={(softSkills: string[]) => {
            updateProfile({ softSkills });
            nextStep();
          }}
          onPrev={prevStep}
          data={profile}
        />
      )}
      {currentStep === 2 && (
        <StepSecteurs
          onNext={(secteursPref: string[]) => {
            updateProfile({ secteursPref });
            nextStep();
          }}
          onPrev={prevStep}
          data={profile}
        />
      )}
      {currentStep === 3 && (
        <StepContraintes
          onNext={(contraintes: Profile['contraintes']) => {
            updateProfile({ contraintes });
            nextStep();
          }}
          onPrev={prevStep}
          data={profile}
        />
      )}
      {currentStep === 4 && (
        <StepEmail
          onNext={handleSubmit}
          onPrev={prevStep}
          data={profile}
          loading={loading}
        />
      )}
    </div>
  );
}
