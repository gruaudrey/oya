import type { MatchResult, Profile } from './matching';

const MISTRAL_KEY = import.meta.env.VITE_MISTRAL_KEY;
const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK;

export async function generateAIExplanations(
  top5: MatchResult[],
  profile: Profile
): Promise<Record<number, string>> {
  const explanations: Record<number, string> = {};

  if (!MISTRAL_KEY) {
    // Fallback si pas de clé configurée
    for (const metier of top5) {
      explanations[metier.id] = `Vos compétences en ${profile.competencesTech.slice(0, 2).join(' et ')} correspondent bien au profil de ${metier.nom}. Ce métier valorise votre expérience et ouvre des perspectives dans la transition alimentaire.`;
    }
    return explanations;
  }

  await Promise.allSettled(
    top5.map(async (metier) => {
      try {
        const prompt = `Profil candidat : compétences en ${profile.competencesTech.join(', ')}.
Métier cible : ${metier.nom} (${metier.categorie}).
Score de compatibilité : ${metier.score}%.
Explique en 2 phrases courtes et encourageantes pourquoi ce profil correspond à ce métier de la transition alimentaire, en citant 1 compétence transférable clé.`;

        const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${MISTRAL_KEY}`,
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 120,
            temperature: 0.7,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          explanations[metier.id] = data.choices?.[0]?.message?.content?.trim() || '';
        }
      } catch {
        // Silently skip on error
      }
    })
  );

  // Fallback pour ceux sans explication
  for (const metier of top5) {
    if (!explanations[metier.id]) {
      explanations[metier.id] = `Vos compétences en ${profile.competencesTech.slice(0, 2).join(' et ')} sont directement transférables vers le poste de ${metier.nom}. Avec un score de ${metier.score}%, c'est une opportunité concrète de reconversion dans la transition alimentaire.`;
    }
  }

  return explanations;
}

export async function sendToN8N(profile: Profile, top3: MatchResult[]): Promise<void> {
  if (!N8N_WEBHOOK) return;

  try {
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: profile.email,
        consentEmail: profile.consentEmail,
        consentMarketing: profile.consentMarketing,
        competencesTech: profile.competencesTech,
        softSkills: profile.softSkills,
        contraintes: profile.contraintes,
        niveau: profile.niveau,
        timestamp: new Date().toISOString(),
        top1: top3[0] ? { nom: top3[0].nom, score: top3[0].score } : null,
        top2: top3[1] ? { nom: top3[1].nom, score: top3[1].score } : null,
        top3: top3[2] ? { nom: top3[2].nom, score: top3[2].score } : null,
      }),
    });
  } catch {
    // Non-bloquant
  }
}
