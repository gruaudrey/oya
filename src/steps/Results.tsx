import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, RefreshCcw, HelpCircle, X } from 'lucide-react';
import { Logo } from '../components/Logo';
import { HelpModal } from '../components/HelpModal';
import type { MatchResult } from '../lib/matching';

interface ResultsProps {
  onRestart: () => void;
  results: MatchResult[];
  aiExplanations: Record<number, string>;
  email: string;
}

function MetierModal({ metier, aiExplanation, onClose }: { metier: MatchResult; aiExplanation: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">{metier.emoji}</div>
            <div>
              <h2 className="font-heading font-bold text-gray-900 leading-tight">{metier.nom}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{metier.categorie} · {metier.niveau}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0 ml-2">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Score */}
          <div className="flex gap-3">
            <div className="flex-1 bg-oya-terracotta/5 rounded-2xl p-4 text-center border border-oya-terracotta/10">
              <div className="text-3xl font-heading font-bold text-oya-terracotta">{metier.score}%</div>
              <div className="text-xs text-gray-500 mt-0.5">Compatibilité globale</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
              <div className="text-3xl font-heading font-bold text-gray-900">{metier.salaire}</div>
              <div className="text-xs text-gray-500 mt-0.5">Salaire indicatif</div>
            </div>
          </div>

          {/* Barres de score */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600 font-medium">Compétences métier</span>
                <span className="font-bold text-gray-900">{metier.techScore}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-oya-terracotta rounded-full" style={{ width: `${metier.techScore}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600 font-medium">Soft skills</span>
                <span className="font-bold text-gray-900">{metier.softScore}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-oya-yellow rounded-full" style={{ width: `${metier.softScore}%` }} />
              </div>
            </div>
          </div>

          {/* IA */}
          {aiExplanation && (
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex gap-3">
              <Sparkles className="w-5 h-5 text-oya-terracotta shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900 mb-1">L'avis de l'IA Oya</p>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{aiExplanation}"</p>
              </div>
            </div>
          )}

          {/* Points à renforcer */}
          {metier.missingTech.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">Points à renforcer</h4>
              <div className="flex flex-wrap gap-2">
                {metier.missingTech.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Secteurs employeurs */}
          {metier.secteurs.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">Secteurs employeurs</h4>
              <div className="flex flex-wrap gap-2">
                {metier.secteurs.map(s => (
                  <span key={s} className="px-3 py-1 bg-oya-terracotta/5 border border-oya-terracotta/10 rounded-lg text-sm text-oya-terracotta">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-oya-terracotta to-oya-yellow text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Explorer les formations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Results({ onRestart, results, aiExplanations, email }: ResultsProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedMetier, setSelectedMetier] = useState<MatchResult | null>(null);
  const top5 = results.slice(0, 5);
  const top1 = top5[0];
  const others = top5.slice(1);

  if (!top1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Aucun résultat trouvé.</p>
          <button onClick={onRestart} className="text-oya-terracotta font-medium">Refaire le diagnostic</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {selectedMetier && (
        <MetierModal
          metier={selectedMetier}
          aiExplanation={aiExplanations[selectedMetier.id] || ''}
          onClose={() => setSelectedMetier(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <Logo className="h-8" />
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-oya-terracotta bg-oya-terracotta/10 hover:bg-oya-terracotta/20 px-3 py-1.5 rounded-full transition-colors"
        >
          <HelpCircle className="w-4 h-4" /> Aide
        </button>
        <button onClick={onRestart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <RefreshCcw className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-green-100">
            <CheckCircle2 className="w-4 h-4" /> Résultats envoyés à {email || 'votre email'}
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-4">
            Vos métiers compatibles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sur la base de votre profil, nous avons identifié <strong>{top5.length} métiers</strong> où vos compétences sont vos meilleurs atouts pour la transition alimentaire.
          </p>
        </div>

        {/* Top Match Card */}
        <div className="bg-white rounded-3xl border-2 border-oya-terracotta shadow-xl shadow-oya-terracotta/10 overflow-hidden mb-8 relative">
          <div className="absolute top-0 left-0 bg-oya-terracotta text-white font-bold px-4 py-1 rounded-br-xl z-10">
            #1
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {top1.emoji}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-1">
                    {top1.nom}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{top1.categorie} · {top1.niveau}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-oya-terracotta bg-oya-terracotta/10 px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3 h-3" /> Match Idéal
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-4xl font-heading font-bold text-oya-terracotta">
                  {top1.score}<span className="text-2xl">%</span>
                </div>
                <div className="text-xs font-bold tracking-wider text-gray-400 uppercase mt-1">COMPATIBILITÉ</div>
                <div className="text-xs text-gray-500 mt-1">{top1.salaire}/mois</div>
              </div>
            </div>

            {/* Explication IA */}
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 mb-8 flex gap-4">
              <Sparkles className="w-6 h-6 text-oya-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">L'avis de l'IA Oya</h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{aiExplanations[top1.id] || 'Analyse en cours...'}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Scores */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-oya-terracotta"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Analyse du profil
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-600 font-medium">Compétences Techniques</span>
                      <span className="font-bold text-gray-900">{top1.techScore}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-oya-terracotta rounded-full transition-all" style={{ width: `${top1.techScore}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-600 font-medium">Soft Skills & Adaptabilité</span>
                      <span className="font-bold text-gray-900">{top1.softScore}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-oya-yellow rounded-full transition-all" style={{ width: `${top1.softScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Points à renforcer */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-oya-terracotta"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Points à renforcer
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {top1.missingTech.slice(0, 3).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium">{skill}</span>
                    ))}
                    {top1.missingTech.length > 3 && (
                      <span className="px-3 py-1 text-sm text-gray-400 font-medium">+{top1.missingTech.length - 3} autres...</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Ces compétences sont accessibles via nos formations recommandées.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-oya-terracotta"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Prêt à faire le saut ?</h4>
                  <p className="text-sm text-gray-600">Découvrez le parcours de formation pour ce métier.</p>
                </div>
              </div>
              <button className="w-full sm:w-auto bg-oya-terracotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-oya-terracotta/90 transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                Explorer formations <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Autres opportunités */}
        {others.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-heading font-bold text-gray-900">Autres opportunités</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map((metier, i) => (
                <button
                  key={metier.id}
                  onClick={() => setSelectedMetier(metier)}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-oya-terracotta/40 hover:shadow-md transition-all cursor-pointer group text-left w-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{metier.emoji}</div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 mb-0.5">#{i + 2}</div>
                        <h4 className="font-bold text-gray-900 group-hover:text-oya-terracotta transition-colors text-sm leading-tight">{metier.nom}</h4>
                        <p className="text-xs text-gray-500">{metier.categorie}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-oya-terracotta">{metier.score}%</div>
                      <div className="text-xs text-gray-400">{metier.salaire}</div>
                    </div>
                  </div>
                  {aiExplanations[metier.id] && (
                    <p className="text-xs text-gray-500 italic border-t border-gray-50 pt-3 line-clamp-2">
                      {aiExplanations[metier.id]}
                    </p>
                  )}
                  <div className="mt-3 text-xs font-semibold text-oya-terracotta group-hover:underline">
                    Voir le détail →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pb-12">
          <p className="text-gray-500 mb-4">Vous n'êtes pas convaincu par ces résultats ?</p>
          <button onClick={onRestart} className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition-colors">
            <RefreshCcw className="w-4 h-4" /> Refaire le diagnostic
          </button>
        </div>
      </main>
    </div>
  );
}
