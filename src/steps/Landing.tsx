import React, { useState } from 'react';
import { ArrowRight, Clock, Star, ShieldCheck, Target, GraduationCap, CheckCircle2, Trophy, Leaf, Sprout, HelpCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { HelpModal } from '../components/HelpModal';

export default function Landing({ onNext, onHelp }: { onNext: () => void; onHelp: () => void }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <Logo className="h-8 sm:h-10" />
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-2 bg-oya-terracotta/10 hover:bg-oya-terracotta/20 text-oya-terracotta font-semibold px-4 py-2 rounded-full text-sm transition-colors"
        >
          <HelpCircle className="w-4 h-4" /> Comment ça marche ?
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-1/2 p-4 sm:p-6 lg:p-12 lg:pr-6 flex flex-col">
          <div className="relative flex-1 rounded-3xl overflow-hidden min-h-[300px] lg:min-h-0">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
              alt="Champ de blé au coucher du soleil" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-6 right-6 bg-black/20 backdrop-blur-md p-4 rounded-full">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            {/* Mobile overlay text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden flex flex-col justify-end p-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit">
                <Trophy className="w-3 h-3" /> DIAGNOSTIC OYA
              </div>
              <h1 className="text-3xl font-heading font-bold text-white leading-tight">
                Faites fleurir votre <span className="text-oya-yellow">carrière</span> durable
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 sm:p-12 lg:pl-16 flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="hidden lg:inline-flex items-center gap-2 bg-gray-50 border border-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Trophy className="w-4 h-4 text-oya-green-light" /> Oya
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-[1.1] mb-6 hidden lg:block">
              Vos <br/>
              compétences <br/>
              <span className="text-oya-terracotta">sont</span> <br/>
              <span className="text-oya-terracotta">transférables !</span>
            </h1>
            
            <h1 className="text-4xl font-heading font-bold text-gray-900 leading-[1.1] mb-4 lg:hidden">
              Vos <br/>
              compétences <br/>
              <span className="text-oya-terracotta">sont</span> <br/>
              <span className="text-oya-terracotta">transférables !</span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Découvrez quels métiers de la transition alimentaire vous conviennent le plus grâce à notre analyse intelligente.
            </p>

            {/* Mobile Features */}
            <div className="space-y-4 mb-8 lg:hidden">
              <FeatureCard icon={<Target className="w-6 h-6 text-oya-terracotta" />} title="Précision IA" desc="Algorithme personnalisé basé sur votre profil unique." />
              <FeatureCard icon={<GraduationCap className="w-6 h-6 text-oya-yellow" />} title="Formations Clés" desc="Accédez aux meilleures écoles de la transition." />
              <FeatureCard icon={<CheckCircle2 className="w-6 h-6 text-oya-green-light" />} title="100% Gratuit" desc="Un outil ouvert à tous pour l'impact écologique." />
            </div>

            <button 
              onClick={onNext}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-oya-terracotta/20"
            >
              Démarrer l'analyse <ArrowRight className="w-5 h-5" />
            </button>

            {/* Desktop Features */}
            <div className="hidden lg:flex items-center gap-8 mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Clock className="w-4 h-4 text-oya-terracotta" /> 5 min env.
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Star className="w-4 h-4 text-oya-yellow" /> Gratuit
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-gray-400" /> Sécurisé
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 mt-auto">
        © Oya. Tous droits réservés.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
      <div className="p-2 bg-white rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}
