import metiersData from '../data/metiers.json';

export interface Metier {
  id: number;
  nom: string;
  categorie: string;
  emoji: string;
  competencesTech: string[];
  softSkills: string[];
  salaire: string;
  niveau: string;
  secteurs: string[];
}

export interface MatchResult extends Metier {
  score: number;
  techScore: number;
  softScore: number;
  missingTech: string[];
  missingSoft: string[];
}

export interface Profile {
  competencesTech: string[];
  softSkills: string[];
  secteursPref: string[];
  contraintes: {
    rythme: string;
    environnement: string;
    localisation: string;
    mobilite: string;
  };
  niveau: string;
  email: string;
  consentEmail: boolean;
  consentMarketing: boolean;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

function keywordOverlap(userSkills: string[], metierSkills: string[]): {
  score: number;
  missing: string[];
} {
  if (!metierSkills.length) return { score: 0, missing: [] };

  const normalizedUser = userSkills.map(normalize);
  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of metierSkills) {
    const normSkill = normalize(skill);
    const words = normSkill.split(/\s+/).filter(w => w.length > 3);

    const isMatch = normalizedUser.some(us => {
      const uWords = us.split(/\s+/).filter(w => w.length > 3);
      return words.some(w => us.includes(w)) || uWords.some(uw => normSkill.includes(uw));
    });

    if (isMatch) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  return {
    score: Math.round((matched.length / metierSkills.length) * 100),
    missing: missing.slice(0, 4),
  };
}

export function calculateMatch(profile: Profile): MatchResult[] {
  const metiers = metiersData as Metier[];
  const hasSecteurPref = profile.secteursPref && profile.secteursPref.length > 0;

  const results: MatchResult[] = metiers.map(metier => {
    const techResult = keywordOverlap(profile.competencesTech, metier.competencesTech);
    const softResult = keywordOverlap(profile.softSkills, metier.softSkills);

    const techScore = techResult.score;
    const softScore = softResult.score;
    let score = Math.round(techScore * 0.7 + softScore * 0.3);

    // Bonus secteur : +10 pts si le métier est dans un secteur préféré, plafonné à 100
    if (hasSecteurPref && profile.secteursPref.includes(metier.categorie)) {
      score = Math.min(100, score + 10);
    }

    return {
      ...metier,
      score,
      techScore,
      softScore,
      missingTech: techResult.missing,
      missingSoft: softResult.missing,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

// Derive soft skills from domain selection
export function domainToSoftSkills(domaine: string): string[] {
  const map: Record<string, string[]> = {
    cuisine: ['Créativité', 'Service client', 'Travail sous pression', 'Sens du détail'],
    commerce: ['Relation client', 'Négociation', 'Sens commercial', 'Communication'],
    logistique: ['Organisation', 'Rigueur', 'Gestion des priorités', 'Réactivité'],
    agriculture: ['Autonomie', 'Résistance physique', 'Adaptabilité', 'Sens du terrain'],
  };
  return map[domaine] || ['Autonomie', 'Communication', 'Adaptabilité', 'Organisation'];
}
