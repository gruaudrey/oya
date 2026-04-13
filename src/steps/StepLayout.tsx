import React, { useState } from 'react';
import { ChevronLeft, X, HelpCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { HelpModal } from '../components/HelpModal';

export function StepLayout({ 
  children, 
  currentStep, 
  totalSteps, 
  onPrev, 
  onClose 
}: { 
  children: React.ReactNode, 
  currentStep: number, 
  totalSteps: number, 
  onPrev?: () => void,
  onClose?: () => void
}) {
  const [showHelp, setShowHelp] = useState(false);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={onPrev} className="p-2 hover:bg-gray-100 rounded-full transition-colors" disabled={!onPrev}>
          <ChevronLeft className={`w-5 h-5 ${onPrev ? 'text-gray-600' : 'text-transparent'}`} />
        </button>
        <Logo className="h-8" />
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-oya-terracotta bg-oya-terracotta/10 hover:bg-oya-terracotta/20 px-3 py-1.5 rounded-full transition-colors"
        >
          <HelpCircle className="w-4 h-4" /> Aide
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-oya-terracotta to-oya-yellow transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mt-4 sm:mt-8 relative overflow-hidden">
          {children}
        </div>
      </main>
      
      <div className="text-center py-6 text-xs text-gray-400 font-medium">
        Propulsé par <span className="font-bold text-gray-600 italic">Oya</span>
      </div>
    </div>
  );
}
