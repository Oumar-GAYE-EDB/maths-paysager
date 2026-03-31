// ============================================================
// MATHS PAYSAGER — Script principal
// Application de calcul pour CAPa Aménagement Paysager
// Chaque fonction est commentée en français pour les élèves
// ============================================================

// --- CONSTANTES ---
// La valeur de Pi, utilisée pour les calculs du cercle
const PI = Math.PI; // ≈ 3.14159265...
const CLE_HISTORIQUE = "maths-paysager-historique";
const CLE_PROGRESS = "maths-paysager-progression";
const CLE_REMEDIATION = "maths-paysager-remediation";
const MAX_HISTORIQUE = 20;
const sessionStats = { essais: 0, reussites: 0 };
let chronoInterval = null;
let chronoRestant = 0;

let exerciceActuel = null;

// ============================================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // On récupère les éléments HTML importants
  const selectForme = document.getElementById("forme");
  const champsForme = document.getElementById("champs-forme");
  const btnCalculerForme = document.getElementById("btn-calculer-forme");
  const btnResetForme = document.getElementById("btn-reset-forme");
  const resultatForme = document.getElementById("resultat-forme");
  const schemaForme = document.getElementById("schema-forme");

  const selectPourcent = document.getElementById("type-pourcent");
  const champsPourcent = document.getElementById("champs-pourcent");
  const btnCalculerPourcent = document.getElementById("btn-calculer-pourcent");
  const btnResetPourcent = document.getElementById("btn-reset-pourcent");
  const resultatPourcent = document.getElementById("resultat-pourcent");
  const selectThemeExercice = document.getElementById("theme-exercice");
  const selectNiveauExercice = document.getElementById("niveau-exercice");
  const selectObjectifSeance = document.getElementById("objectif-seance");
  const btnGenererExercice = document.getElementById("btn-generer-exercice");
  const btnValiderExercice = document.getElementById("btn-valider-exercice");
  const btnSuivantExercice = document.getElementById("btn-suivant-exercice");
  const btnIndice1 = document.getElementById("btn-indice-1");
  const btnIndice2 = document.getElementById("btn-indice-2");
  const btnMethode = document.getElementById("btn-methode");
  const modeAdaptatif = document.getElementById("mode-adaptatif");
  const modeEvaluation = document.getElementById("mode-evaluation");
  const modeChrono = document.getElementById("mode-chrono");
  const modeFocus = document.getElementById("mode-focus");
  const enonceExercice = document.getElementById("exercice-enonce");
  const recommandationExercice = document.getElementById("recommandation-exercice");
  const objectifSession = document.getElementById("objectif-session");
  const competencesExercice = document.getElementById("competences-exercice");
  const planRemediation = document.getElementById("plan-remediation");
  const chronometreExercice = document.getElementById("chronometre-exercice");
  const diagnosticExercice = document.getElementById("diagnostic-exercice");
  const planRevision = document.getElementById("plan-revision");
  const sessionProgression = document.getElementById("session-progression");
  const uniteAttendue = document.getElementById("unite-attendue");
  const testsFormulesResultat = document.getElementById("tests-formules-resultat");
  const reponseExercice = document.getElementById("reponse-exercice");
  const feedbackExercice = document.getElementById("feedback-exercice");
  const progressionExercice = document.getElementById("progression-exercice");
  const badgesExercice = document.getElementById("badges-exercice");
  const historiqueExercice = document.getElementById("historique-exercice");
  const btnRejouerErreur = document.getElementById("btn-rejouer-erreur");
  const btnTestsFormules = document.getElementById("btn-tests-formules");

  // --- Afficher les champs dès le chargement ---
  afficherChampsFormes(selectForme.value, champsForme);
  afficherChampsPourcent(selectPourcent.value, champsPourcent);

  // --- Quand l'utilisateur change de forme ---
  selectForme.addEventListener("change", function () {
    afficherChampsFormes(this.value, champsForme);
    resultatForme.innerHTML = "";
    resultatForme.className = "resultat";
    schemaForme.innerHTML = "";
  });

  // --- Quand l'utilisateur change de type de pourcentage ---
  selectPourcent.addEventListener("change", function () {
    afficherChampsPourcent(this.value, champsPourcent);
    resultatPourcent.innerHTML = "";
    resultatPourcent.className = "resultat";
  });

  // --- Clic sur "Calculer" pour les formes ---
  btnCalculerForme.addEventListener("click", function () {
    calculerForme(selectForme.value, champsForme, resultatForme, schemaForme);
  });

  // --- Clic sur "Calculer" pour les pourcentages ---
  btnCalculerPourcent.addEventListener("click", function () {
    calculerPourcentage(selectPourcent.value, champsPourcent, resultatPourcent);
  });

  // --- Clic sur "Réinitialiser" pour les formes ---
  if (btnResetForme) {
    btnResetForme.addEventListener("click", function () {
      reinitialiserSectionFormes(selectForme, champsForme, resultatForme, schemaForme);
    });
  }

  // --- Clic sur "Réinitialiser" pour les pourcentages ---
  if (btnResetPourcent) {
    btnResetPourcent.addEventListener("click", function () {
      reinitialiserSectionPourcentages(selectPourcent, champsPourcent, resultatPourcent);
    });
  }

  // --- Mode sombre / clair ---
  initialiserTheme();

  // --- Mode exercices / progression ---
  initialiserModeExercices({
    selectThemeExercice: selectThemeExercice,
    selectNiveauExercice: selectNiveauExercice,
    selectObjectifSeance: selectObjectifSeance,
    btnGenererExercice: btnGenererExercice,
    btnValiderExercice: btnValiderExercice,
    btnSuivantExercice: btnSuivantExercice,
    btnIndice1: btnIndice1,
    btnIndice2: btnIndice2,
    btnMethode: btnMethode,
    modeAdaptatif: modeAdaptatif,
    modeEvaluation: modeEvaluation,
    modeChrono: modeChrono,
    modeFocus: modeFocus,
    enonceExercice: enonceExercice,
    recommandationExercice: recommandationExercice,
    objectifSession: objectifSession,
    competencesExercice: competencesExercice,
    planRemediation: planRemediation,
    chronometreExercice: chronometreExercice,
    diagnosticExercice: diagnosticExercice,
    planRevision: planRevision,
    sessionProgression: sessionProgression,
    uniteAttendue: uniteAttendue,
    testsFormulesResultat: testsFormulesResultat,
    reponseExercice: reponseExercice,
    feedbackExercice: feedbackExercice,
    progressionExercice: progressionExercice,
    badgesExercice: badgesExercice,
    historiqueExercice: historiqueExercice,
    btnRejouerErreur: btnRejouerErreur,
    btnTestsFormules: btnTestsFormules,
  });
});


// ============================================================
// 2. GESTION DU THÈME (MODE SOMBRE / CLAIR)
// ============================================================

function initialiserTheme() {
  // Récupère le bouton de basculement
  const boutonTheme = document.querySelector("[data-theme-toggle]");
  const racine = document.documentElement;

  // Clé utilisée pour mémoriser le thème choisi par l'utilisateur
  const CLE_THEME = "maths-paysager-theme";

  // 1) On essaie de relire le thème enregistré (priorité à l'utilisateur)
  const themeEnregistre = localStorage.getItem(CLE_THEME);

  // 2) Sinon, on détecte la préférence du système (sombre ou clair)
  let theme = themeEnregistre
    ? themeEnregistre
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  // On applique le thème détecté
  racine.setAttribute("data-theme", theme);
  mettreAJourIconeTheme(boutonTheme, theme);

  // Au clic sur le bouton, on bascule
  if (boutonTheme) {
    boutonTheme.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      racine.setAttribute("data-theme", theme);
      mettreAJourIconeTheme(boutonTheme, theme);

      // On mémorise le choix pour les prochaines visites
      localStorage.setItem(CLE_THEME, theme);
    });
  }
}

/**
 * Remet la section formes dans son état initial
 */
function reinitialiserSectionFormes(selectForme, champsForme, resultatForme, schemaForme) {
  selectForme.selectedIndex = 0;
  afficherChampsFormes(selectForme.value, champsForme);
  resultatForme.innerHTML = "";
  resultatForme.className = "resultat";
  schemaForme.innerHTML = "";
}

/**
 * Remet la section pourcentages dans son état initial
 */
function reinitialiserSectionPourcentages(selectPourcent, champsPourcent, resultatPourcent) {
  selectPourcent.selectedIndex = 0;
  afficherChampsPourcent(selectPourcent.value, champsPourcent);
  resultatPourcent.innerHTML = "";
  resultatPourcent.className = "resultat";
}

/**
 * Met à jour l'icône du bouton (soleil ou lune)
 * @param {HTMLElement} bouton - Le bouton de thème
 * @param {string} theme - "dark" ou "light"
 */
function mettreAJourIconeTheme(bouton, theme) {
  if (!bouton) return;
  if (theme === "dark") {
    // En mode sombre, on affiche un soleil (pour basculer vers clair)
    bouton.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    bouton.setAttribute("aria-label", "Basculer en mode clair");
  } else {
    // En mode clair, on affiche une lune (pour basculer vers sombre)
    bouton.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    bouton.setAttribute("aria-label", "Basculer en mode sombre");
  }
}

// ============================================================
// 2B. MODE EXERCICES, PROGRESSION, BADGES, HISTORIQUE
// ============================================================

function initialiserModeExercices(ui) {
  if (!ui || !ui.btnGenererExercice) return;

  mettreAJourProgressionSession(ui.sessionProgression);
  mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
  mettreAJourChronometre(ui);
  appliquerModeFocus(ui);
  if (ui.testsFormulesResultat) {
    ui.testsFormulesResultat.innerHTML = "Conseil fiabilité : lance « Vérifier les formules » avant une évaluation.";
  }

  ui.btnGenererExercice.addEventListener("click", function () {
    const objectifSeance = ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision";
    const selection = ui.modeAdaptatif && ui.modeAdaptatif.checked
      ? choisirParcoursAdaptatif(ui.selectThemeExercice.value, ui.selectNiveauExercice.value, objectifSeance)
      : { theme: ui.selectThemeExercice.value, niveau: ui.selectNiveauExercice.value, source: "manuel", objectifSeance: objectifSeance };
    exerciceActuel = creerExercice(selection.theme, selection.niveau, selection);
    afficherExercice(ui.enonceExercice, ui.feedbackExercice, ui.reponseExercice, exerciceActuel);
    afficherRecommandation(ui.recommandationExercice, selection);
    afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, selection);
    afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
    mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
    appliquerModeEvaluation(ui.modeEvaluation, ui.btnIndice1, ui.btnIndice2, ui.btnMethode, ui.feedbackExercice);
    demarrerChronoSiActif(ui, exerciceActuel);
  });

  ui.btnValiderExercice.addEventListener("click", function () {
    corrigerExercice(ui, false);
  });

  ui.btnSuivantExercice.addEventListener("click", function () {
    corrigerExercice(ui, true);
  });

  ui.reponseExercice.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      corrigerExercice(ui, false);
    }
  });

  if (ui.btnIndice1) {
    ui.btnIndice1.addEventListener("click", function () {
      afficherIndiceProgressif(ui.feedbackExercice, exerciceActuel, 0);
    });
  }
  if (ui.btnIndice2) {
    ui.btnIndice2.addEventListener("click", function () {
      afficherIndiceProgressif(ui.feedbackExercice, exerciceActuel, 1);
    });
  }
  if (ui.btnMethode) {
    ui.btnMethode.addEventListener("click", function () {
      afficherMethode(ui.feedbackExercice, exerciceActuel);
    });
  }
  if (ui.modeEvaluation) {
    ui.modeEvaluation.addEventListener("change", function () {
      appliquerModeEvaluation(ui.modeEvaluation, ui.btnIndice1, ui.btnIndice2, ui.btnMethode, ui.feedbackExercice);
    });
  }
  if (ui.modeChrono) {
    ui.modeChrono.addEventListener("change", function () {
      demarrerChronoSiActif(ui, exerciceActuel);
    });
  }
  if (ui.modeFocus) {
    ui.modeFocus.addEventListener("change", function () {
      appliquerModeFocus(ui);
    });
  }
  if (ui.btnRejouerErreur) {
    ui.btnRejouerErreur.addEventListener("click", function () {
      const remediation = consommerRemediation();
      if (!remediation) {
        ui.feedbackExercice.className = "resultat resultat--visible";
        ui.feedbackExercice.innerHTML = "Aucune erreur récente à rejouer. Fais quelques exercices d'abord.";
        return;
      }
      exerciceActuel = creerExerciceRemediation(remediation);
      afficherExercice(ui.enonceExercice, ui.feedbackExercice, ui.reponseExercice, exerciceActuel);
      afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, {
        source: "remediation",
        message: "Rejeu ciblé : on reprend une erreur récente.",
        objectifSeance: ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision",
      });
      mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
      afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
      demarrerChronoSiActif(ui, exerciceActuel);
    });
  }
  if (ui.btnTestsFormules) {
    ui.btnTestsFormules.addEventListener("click", function () {
      afficherBilanTestsFormules(ui.testsFormulesResultat);
    });
  }

  mettreAJourProgressionEtBadges(ui.progressionExercice, ui.badgesExercice);
  afficherHistorique(ui.historiqueExercice);
  mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
}

function corrigerExercice(ui, passerAuSuivant) {
  if (!exerciceActuel) {
    ui.feedbackExercice.className = "resultat resultat--visible resultat--erreur";
    ui.feedbackExercice.innerHTML = "Commence par générer un exercice.";
    return;
  }

  const reponse = lireValeur("reponse-exercice");
  if (!passerAuSuivant && reponse === null) {
    ui.feedbackExercice.className = "resultat resultat--visible resultat--erreur";
    ui.feedbackExercice.innerHTML = "Entre une réponse avant de valider.";
    ui.reponseExercice.focus();
    return;
  }

  if (!passerAuSuivant) {
    const estCorrect = Math.abs(reponse - exerciceActuel.reponse) <= exerciceActuel.tolerance;
    const diagnostic = analyserErreur(exerciceActuel, reponse);
    sessionStats.essais += 1;
    sessionStats.reussites += estCorrect ? 1 : 0;
    enregistrerTentativeExercice(exerciceActuel, reponse, estCorrect);
    if (!estCorrect) {
      ajouterRemediation(exerciceActuel);
    }
    afficherFeedbackExercice(ui.feedbackExercice, exerciceActuel, reponse, estCorrect, diagnostic);
    afficherPlanRemediation(ui.planRemediation, exerciceActuel, estCorrect ? "" : diagnostic);
    mettreAJourProgressionEtBadges(ui.progressionExercice, ui.badgesExercice);
    mettreAJourProgressionSession(ui.sessionProgression);
    afficherHistorique(ui.historiqueExercice);
    mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
    return;
  }

  const selection = ui.modeAdaptatif && ui.modeAdaptatif.checked
    ? choisirParcoursAdaptatif(ui.selectThemeExercice.value, ui.selectNiveauExercice.value, ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision")
    : { theme: ui.selectThemeExercice.value, niveau: ui.selectNiveauExercice.value, source: "manuel", objectifSeance: ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision" };
  exerciceActuel = creerExercice(selection.theme, selection.niveau, selection);
  afficherExercice(ui.enonceExercice, ui.feedbackExercice, ui.reponseExercice, exerciceActuel);
  afficherRecommandation(ui.recommandationExercice, selection);
  afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, selection);
  mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
  afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
  demarrerChronoSiActif(ui, exerciceActuel);
}

function creerExercice(theme, niveau, meta) {
  if (meta && meta.remediation) return creerExerciceRemediation(meta.remediation, niveau);
  if (theme === "pourcentages") return creerExercicePourcentage(niveau);
  if (theme === "metier") return creerExerciceMetier(niveau);
  return creerExerciceForme(niveau);
}

function choisirParcoursAdaptatif(themeDefaut, niveauDefaut, objectifSeance) {
  const remediation = consommerRemediation();
  if (remediation) {
    return {
      theme: remediation.theme,
      niveau: "facile",
      source: "remediation",
      remediation: remediation,
      objectifSeance: objectifSeance || "precision",
      message:
        "Coach : on te propose une remédiation ciblée sur « " +
        remediation.competenceLibelle +
        " » après une erreur récente.",
    };
  }

  const progression = chargerProgression();
  const competenceCible = trouverCompetencePrioritaire(progression);
  const mapping = {
    "aires-perimetres": { theme: "aires", label: "aires et périmètres" },
    pourcentages: { theme: "pourcentages", label: "pourcentages" },
    "situations-metier": { theme: "metier", label: "situations métier" },
  };
  const cible = mapping[competenceCible] || { theme: themeDefaut, label: "révisions générales" };
  const tauxGlobal = progression.essais > 0 ? (progression.reussites / progression.essais) * 100 : 0;
  const niveau = tauxGlobal < 55 ? "facile" : (tauxGlobal < 80 ? "moyen" : "difficile");
  return {
    theme: cible.theme,
    niveau: niveau || niveauDefaut,
    source: "adaptatif",
    objectifSeance: objectifSeance || "precision",
    message:
      "Coach : priorité sur « " +
      cible.label +
      " » (taux actuel " +
      arrondir(tauxGlobal) +
      "%). Niveau conseillé : " +
      niveau +
      ".",
  };
}

function trouverCompetencePrioritaire(progression) {
  const cles = ["aires-perimetres", "pourcentages", "situations-metier"];
  let pire = cles[0];
  let pireScore = Number.POSITIVE_INFINITY;
  cles.forEach(function (cle) {
    const stats = progression.competences[cle] || { essais: 0, reussites: 0 };
    const taux = stats.essais > 0 ? stats.reussites / stats.essais : 0.45;
    const score = taux - Math.min(stats.essais, 8) * 0.01;
    if (score < pireScore) {
      pireScore = score;
      pire = cle;
    }
  });
  return pire;
}

function afficherRecommandation(zone, selection) {
  if (!zone) return;
  const messageParDefaut = "Mode manuel : tu choisis toi-même ton thème et ton niveau.";
  zone.innerHTML = selection && selection.message ? selection.message : messageParDefaut;
}

function lireRemediation() {
  try {
    const brut = localStorage.getItem(CLE_REMEDIATION);
    return brut ? JSON.parse(brut) : [];
  } catch (e) {
    return [];
  }
}

function sauvegarderRemediation(file) {
  localStorage.setItem(CLE_REMEDIATION, JSON.stringify(file.slice(0, 8)));
}

function ajouterRemediation(exercice) {
  if (!exercice || !exercice.erreurCode) return;
  const file = lireRemediation();
  file.unshift({
    erreurCode: exercice.erreurCode,
    theme: exercice.theme === "aires" ? "aires" : exercice.theme,
    competence: exercice.competence,
    competenceLibelle: exercice.titre,
    date: Date.now(),
  });
  sauvegarderRemediation(file);
}

function consommerRemediation() {
  const file = lireRemediation();
  if (file.length === 0) return null;
  const prochaine = file.shift();
  sauvegarderRemediation(file);
  return prochaine;
}

function creerExerciceForme(niveau) {
  const difficultes = {
    facile: { min: 2, max: 10 },
    moyen: { min: 5, max: 20 },
    difficile: { min: 10, max: 40 },
  };
  const plage = difficultes[niveau] || difficultes.facile;
  const type = nombreAleatoire(0, 1) === 0 ? "rectangle" : "cercle";

  if (type === "rectangle") {
    const L = nombreAleatoire(plage.min, plage.max);
    const l = nombreAleatoire(plage.min, plage.max);
    const aire = L * l;
    return {
      theme: "aires",
      competence: "aires-perimetres",
      competenceLabel: "Aires et périmètres",
      objectif: "Choisir la bonne formule d'aire/périmètre puis appliquer l'unité correcte.",
      titre: "Aire de rectangle",
      enonce: "Contexte : tu prépares une zone de gazon rectangulaire.\nDonnées : longueur = " + L + " m, largeur = " + l + " m.\nQuestion : quelle surface (en m²) faut-il préparer ?",
      reponse: aire,
      tolerance: 0.05,
      unite: "m²",
      explication: "Étape 1 : aire = longueur × largeur. Étape 2 : " + L + " × " + l + " = " + arrondir(aire) + " m².",
      erreurProbable: "Ne confonds pas aire (m²) et périmètre (m).",
      erreurCode: "aire_unite",
      palier: "Bronze",
      indices: [
        "Indice 1 : cherche une surface, donc une formule d'aire.",
        "Indice 2 : pour un rectangle, aire = longueur × largeur (pas ×2).",
      ],
    };
  }

  const rayon = nombreAleatoire(plage.min, plage.max);
  const perimetre = 2 * PI * rayon;
  return {
    theme: "aires",
    competence: "aires-perimetres",
    competenceLabel: "Aires et périmètres",
    objectif: "Distinguer rayon et diamètre dans les formules du cercle.",
    titre: "Périmètre de cercle",
    enonce: "Contexte : tu poses une bordure autour d'un bassin circulaire.\nDonnée : rayon = " + rayon + " m.\nQuestion : quelle longueur de bordure (en m) faut-il prévoir ?",
    reponse: perimetre,
    tolerance: 0.1,
    unite: "m",
    explication: "Étape 1 : périmètre = 2 × π × r. Étape 2 : 2 × π × " + rayon + " = " + arrondir(perimetre) + " m.",
    erreurProbable: "Attention : le rayon n'est pas le diamètre.",
    erreurCode: "rayon_diametre",
    palier: "Argent",
    indices: [
      "Indice 1 : on cherche une longueur autour du cercle : c'est un périmètre.",
      "Indice 2 : applique 2 × π × rayon, sans transformer le rayon en diamètre.",
    ],
  };
}

function creerExercicePourcentage(niveau) {
  const nombre = niveau === "difficile" ? nombreAleatoire(120, 800) : nombreAleatoire(50, 400);
  const pourcent = niveau === "facile" ? nombreAleatoire(5, 30) : nombreAleatoire(10, 75);
  const resultat = (pourcent * nombre) / 100;
  return {
    theme: "pourcentages",
    competence: "pourcentages",
    competenceLabel: "Pourcentages",
    objectif: "Maîtriser le passage « pourcentage » vers « division par 100 ».",
    titre: "Calcul de pourcentage",
    enonce: "Contexte : une remise de " + pourcent + "% est appliquée sur un montant de " + nombre + " €.\nQuestion : quel est le montant de la remise ?",
    reponse: resultat,
    tolerance: 0.05,
    unite: "",
    explication: "Étape 1 : calculer " + pourcent + " × " + nombre + ". Étape 2 : diviser par 100. Résultat = " + arrondir(resultat) + ".",
    erreurProbable: "Pense à diviser par 100 à la fin.",
    erreurCode: "pourcent_div100",
    palier: niveau === "difficile" ? "Or" : "Argent",
    indices: [
      "Indice 1 : " + pourcent + "% signifie " + pourcent + "/100.",
      "Indice 2 : fais la multiplication puis divise le résultat par 100.",
    ],
  };
}

function creerExerciceMetier(niveau) {
  const scenario = nombreAleatoire(1, 3);
  if (scenario === 1) {
    const longueur = niveau === "facile" ? nombreAleatoire(4, 12) : nombreAleatoire(8, 25);
    const largeur = niveau === "difficile" ? nombreAleatoire(5, 16) : nombreAleatoire(3, 10);
    const surface = longueur * largeur;
    const sacsParM2 = niveau === "difficile" ? 1.3 : 1.1;
    const sacs = surface * sacsParM2;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Calculer une surface puis convertir en quantité de matériau.",
      titre: "Situation métier CAPa — semis",
      enonce: "Contexte : tu dois semer une parcelle.\nDonnées : " + longueur + " m × " + largeur + " m, avec " + sacsParM2 + " sac/m².\nQuestion : combien de sacs faut-il prévoir au total ?",
      reponse: sacs,
      tolerance: 0.15,
      unite: "sacs",
      explication: "Étape 1 : surface = " + longueur + " × " + largeur + " = " + arrondir(surface) + " m². Étape 2 : sacs = surface × " + sacsParM2 + " = " + arrondir(sacs) + ".",
      erreurProbable: "Fais bien le calcul de surface avant la conversion en sacs.",
      erreurCode: "metier_surface_avant_conversion",
      palier: "Argent",
      indices: ["Indice 1 : commence par calculer la surface en m².", "Indice 2 : convertis ensuite avec le coefficient en sac/m²."],
    };
  }
  if (scenario === 2) {
    const surface = niveau === "facile" ? nombreAleatoire(20, 70) : nombreAleatoire(60, 220);
    const prixM2 = niveau === "difficile" ? nombreAleatoire(9, 16) : nombreAleatoire(6, 11);
    const cout = surface * prixM2;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Estimer un coût total à partir d'un prix unitaire.",
      titre: "Situation métier CAPa — paillage",
      enonce: "Contexte : devis de paillage.\nDonnées : surface = " + surface + " m², prix = " + prixM2 + " €/m².\nQuestion : quel est le coût total du chantier ?",
      reponse: cout,
      tolerance: 0.05,
      unite: "€",
      explication: "Étape 1 : identifier le prix unitaire (€/m²). Étape 2 : coût total = " + surface + " × " + prixM2 + " = " + arrondir(cout) + " €.",
      erreurProbable: "Tu as peut-être additionné au lieu de multiplier surface et prix unitaire.",
      erreurCode: "metier_cout_unitaire",
      palier: "Bronze",
      indices: ["Indice 1 : €/m² = prix pour 1 m².", "Indice 2 : multiplie la surface totale par ce prix unitaire."],
    };
  }
  const longueurTuyau = niveau === "facile" ? nombreAleatoire(25, 60) : nombreAleatoire(50, 180);
  const debit = niveau === "difficile" ? nombreAleatoire(5, 10) : nombreAleatoire(3, 7);
  const volume = longueurTuyau * debit;
  return {
    theme: "metier",
    competence: "situations-metier",
    competenceLabel: "Situations métier CAPa",
    objectif: "Relier une mesure terrain à une estimation de ressources.",
    titre: "Situation métier CAPa — arrosage",
    enonce: "Contexte : préparation d'un cycle d'arrosage.\nDonnées : longueur de ligne = " + longueurTuyau + " m, consommation = " + debit + " L/m.\nQuestion : quel volume total d'eau faut-il prévoir ?",
    reponse: volume,
    tolerance: 0.05,
    unite: "L",
    explication: "Étape 1 : repérer l'unité L/m. Étape 2 : volume = " + longueurTuyau + " × " + debit + " = " + arrondir(volume) + " L.",
    erreurProbable: "Attention à l'unité L/m : on doit multiplier par la longueur.",
    erreurCode: "metier_volume_unitaire",
    palier: niveau === "difficile" ? "Or" : "Argent",
    indices: ["Indice 1 : L/m signifie « litres par mètre ».", "Indice 2 : multiplie la longueur totale par la valeur en L/m."],
  };
}

function creerExerciceRemediation(remediation) {
  const banque = {
    aire_unite: function () {
      return {
        theme: "aires",
        competence: "aires-perimetres",
        titre: "Remédiation : aire vs périmètre",
        enonce: "Contexte : terrasse rectangulaire de 8 m sur 3 m.\nQuestion : calcule uniquement l'aire en m².",
        reponse: 24,
        tolerance: 0.01,
        unite: "m²",
        explication: "Aire = 8 × 3 = 24 m². Le périmètre serait un autre calcul.",
        erreurProbable: "Tu as peut-être utilisé la formule du périmètre.",
        erreurCode: "aire_unite",
        indices: [
          "Indice 1 : l'aire est une surface, donc en m².",
          "Indice 2 : multiplie simplement 8 par 3.",
        ],
      };
    },
    rayon_diametre: function () {
      return {
        theme: "aires",
        competence: "aires-perimetres",
        titre: "Remédiation : rayon et diamètre",
        enonce: "Contexte : bassin circulaire, rayon 5 m.\nQuestion : calcule le périmètre en mètres.",
        reponse: 2 * PI * 5,
        tolerance: 0.1,
        unite: "m",
        explication: "P = 2 × π × r = 2 × π × 5 ≈ 31,42 m.",
        erreurProbable: "Tu as peut-être pris 5 m comme diamètre.",
        erreurCode: "rayon_diametre",
        indices: [
          "Indice 1 : formule du périmètre = 2 × π × r.",
          "Indice 2 : ici r = 5 m, inutile de redoubler la valeur avant la formule.",
        ],
      };
    },
    pourcent_div100: function () {
      return {
        theme: "pourcentages",
        competence: "pourcentages",
        titre: "Remédiation : pourcentage",
        enonce: "Contexte : remise de 25% sur un montant de 120 €.\nQuestion : quel est le montant de la remise ?",
        reponse: 30,
        tolerance: 0.01,
        unite: "",
        explication: "(25 × 120) ÷ 100 = 30.",
        erreurProbable: "Tu as peut-être oublié la division par 100.",
        erreurCode: "pourcent_div100",
        indices: [
          "Indice 1 : 25% = 25/100.",
          "Indice 2 : fais 25 × 120 puis divise par 100.",
        ],
      };
    },
    metier_surface_avant_conversion: function () {
      return {
        theme: "metier",
        competence: "situations-metier",
        competenceLabel: "Situations métier CAPa",
        objectif: "Reprendre la méthode en deux étapes (surface puis conversion).",
        titre: "Remédiation : situation métier",
        enonce: "Contexte : semis sur une parcelle de 6 m × 4 m.\nDonnée : 1,2 sac/m².\nQuestion : combien de sacs faut-il au total ?",
        reponse: 28.8,
        tolerance: 0.05,
        unite: "sacs",
        explication: "Surface = 6 × 4 = 24 m² puis sacs = 24 × 1,2 = 28,8.",
        erreurProbable: "Tu as peut-être converti avant de calculer la surface.",
        erreurCode: "metier_surface_avant_conversion",
        palier: "Bronze",
        indices: [
          "Indice 1 : étape 1 = surface en m².",
          "Indice 2 : étape 2 = surface × sacs/m².",
        ],
      };
    },
    metier_cout_unitaire: function () {
      return {
        theme: "metier",
        competence: "situations-metier",
        competenceLabel: "Situations métier CAPa",
        objectif: "Différencier coût unitaire et coût total.",
        titre: "Remédiation : coût unitaire",
        enonce: "Contexte : paillage de 40 m² à 7 €/m².\nQuestion : quel est le coût total du chantier ?",
        reponse: 280,
        tolerance: 0.01,
        unite: "€",
        explication: "Coût total = 40 × 7 = 280 €.",
        erreurProbable: "Utilise une multiplication, pas une addition.",
        erreurCode: "metier_cout_unitaire",
        palier: "Bronze",
        indices: ["Indice 1 : €/m² signifie un prix pour 1 m².", "Indice 2 : multiplie la surface par le prix unitaire."],
      };
    },
    metier_volume_unitaire: function () {
      return {
        theme: "metier",
        competence: "situations-metier",
        competenceLabel: "Situations métier CAPa",
        objectif: "Calculer un volume à partir d'un débit par mètre.",
        titre: "Remédiation : arrosage",
        enonce: "Contexte : ligne d'arrosage de 30 m avec 4 L/m.\nQuestion : quel volume total d'eau faut-il prévoir ?",
        reponse: 120,
        tolerance: 0.01,
        unite: "L",
        explication: "Volume = longueur × L/m = 30 × 4 = 120 L.",
        erreurProbable: "L/m impose une multiplication par la longueur totale.",
        erreurCode: "metier_volume_unitaire",
        palier: "Argent",
        indices: ["Indice 1 : compte d'abord le nombre de mètres.", "Indice 2 : applique ensuite les litres par mètre."],
      };
    },
  };
  const generateur = banque[remediation.erreurCode] || banque.pourcent_div100;
  return generateur();
}

function afficherExercice(zoneEnonce, zoneFeedback, champReponse, exercice) {
  if (!zoneEnonce || !exercice) return;
  const enonceFormate = (exercice.enonce || "").replace(/\n/g, "<br>");
  zoneEnonce.innerHTML =
    '<p><strong>' + exercice.titre + "</strong></p>" +
    "<p>" + enonceFormate + "</p>";
  zoneFeedback.className = "resultat";
  zoneFeedback.innerHTML = "";
  champReponse.value = "";
  champReponse.focus();
}

function afficherFeedbackExercice(zone, exercice, reponseEleve, estCorrect, diagnostic) {
  if (!zone) return;
  zone.className = "resultat resultat--visible" + (estCorrect ? "" : " resultat--erreur");
  const message = estCorrect
    ? "<strong>Bravo ✅</strong> Ta réponse est correcte."
    : "<strong>Presque ❌</strong> Ce n'est pas la bonne réponse.";
  zone.innerHTML =
    message +
    "<br>Ta réponse : " +
    arrondir(reponseEleve) +
    (exercice.unite ? " " + exercice.unite : "") +
    "<br>Réponse attendue : " +
    arrondir(exercice.reponse) +
    (exercice.unite ? " " + exercice.unite : "") +
    '<div class="resultat__formule">' +
    exercice.explication +
    "</div>" +
    (diagnostic ? '<p class="resultat__astuce"><strong>Diagnostic probable :</strong> ' + diagnostic + "</p>" : "") +
    '<p class="resultat__astuce"><strong>Erreur fréquente :</strong> ' +
    exercice.erreurProbable +
    "</p>";
}

function analyserErreur(exercice, reponseEleve) {
  if (!exercice || typeof reponseEleve !== "number") return "";
  if (reponseEleve < 0) return "Le résultat ne peut pas être négatif dans ce contexte.";
  const attendu = exercice.reponse;
  if (!isFinite(attendu) || attendu === 0) return exercice.erreurProbable || "";
  const ratio = reponseEleve / attendu;
  if (ratio > 1.95 && ratio < 2.05) return "Tu as probablement doublé la valeur (possible confusion rayon/diamètre ou oubli du ÷2).";
  if (ratio > 0.45 && ratio < 0.55) return "Tu as peut-être divisé par 2 alors qu'il ne fallait pas.";
  if (ratio > 90 && ratio < 110) return "Tu sembles avoir oublié la division par 100 (ou conversion d'unité).";
  if (ratio > 0.009 && ratio < 0.011) return "Tu as peut-être divisé par 100 une fois de trop.";
  return exercice.erreurProbable || "Relis les unités et l'ordre des étapes.";
}

function afficherIndiceProgressif(zone, exercice, niveauIndice) {
  if (!zone || !exercice) return;
  const indices = exercice.indices || [];
  if (!indices[niveauIndice]) {
    zone.className = "resultat resultat--visible";
    zone.innerHTML = "Aucun indice supplémentaire pour cet exercice.";
    return;
  }
  zone.className = "resultat resultat--visible";
  zone.innerHTML =
    "<strong>Indice " +
    (niveauIndice + 1) +
    " :</strong> " +
    indices[niveauIndice] +
    '<p class="resultat__astuce">Essaie ensuite de refaire le calcul sans regarder la méthode complète.</p>';
}

function afficherMethode(zone, exercice) {
  if (!zone || !exercice) return;
  zone.className = "resultat resultat--visible";
  zone.innerHTML =
    "<strong>Méthode guidée :</strong>" +
    '<div class="resultat__formule">' +
    exercice.explication +
    "</div>" +
    '<p class="resultat__astuce"><strong>Astuce de remédiation :</strong> ' +
    exercice.erreurProbable +
    "</p>";
}

function chargerProgression() {
  try {
    const brute = localStorage.getItem(CLE_PROGRESS);
    if (!brute) {
      return {
        essais: 0,
        reussites: 0,
        serie: 0,
        meilleureserie: 0,
        competences: {},
      };
    }
    return JSON.parse(brute);
  } catch (e) {
    return { essais: 0, reussites: 0, serie: 0, meilleureserie: 0, competences: {} };
  }
}

function sauvegarderProgression(data) {
  localStorage.setItem(CLE_PROGRESS, JSON.stringify(data));
}

function enregistrerTentativeExercice(exercice, reponse, estCorrect) {
  const progression = chargerProgression();
  progression.essais += 1;
  progression.reussites += estCorrect ? 1 : 0;
  progression.serie = estCorrect ? progression.serie + 1 : 0;
  progression.meilleureserie = Math.max(progression.meilleureserie || 0, progression.serie || 0);

  if (!progression.competences[exercice.competence]) {
    progression.competences[exercice.competence] = { essais: 0, reussites: 0 };
  }
  progression.competences[exercice.competence].essais += 1;
  progression.competences[exercice.competence].reussites += estCorrect ? 1 : 0;
  sauvegarderProgression(progression);

  enregistrerHistorique({
    type: "exercice",
    label: exercice.titre,
    details: exercice.enonce,
    resultat: (estCorrect ? "✅ " : "❌ ") + arrondir(reponse) + (exercice.unite ? " " + exercice.unite : ""),
    competence: exercice.competence || "",
    erreurCode: estCorrect ? "" : (exercice.erreurCode || ""),
    estCorrect: estCorrect,
  });
}

function badgesObtenus(progression) {
  const badges = [];
  if (progression.reussites >= 1) badges.push("🌱 Premier succès");
  if (progression.reussites >= 5) badges.push("🍀 5 réponses justes");
  if (progression.reussites >= 20) badges.push("🌿 20 réussites");
  if ((progression.meilleureserie || 0) >= 3) badges.push("🔥 Série de 3");
  if ((progression.competences["situations-metier"] || {}).reussites >= 3) badges.push("🧰 Pro terrain");
  return badges;
}

function mettreAJourProgressionEtBadges(zoneProgression, zoneBadges) {
  const progression = chargerProgression();
  const taux = progression.essais > 0 ? (progression.reussites / progression.essais) * 100 : 0;
  if (zoneProgression) {
    zoneProgression.innerHTML =
      "<p>Exercices tentés : <strong>" + progression.essais + "</strong></p>" +
      "<p>Réussites : <strong>" + progression.reussites + "</strong></p>" +
      "<p>Taux de réussite : <strong>" + arrondir(taux) + "%</strong></p>" +
      "<p>Série actuelle : <strong>" + (progression.serie || 0) + "</strong></p>";
  }

  if (zoneBadges) {
    const badges = badgesObtenus(progression);
    zoneBadges.innerHTML = badges.length
      ? badges.map(function (b) { return '<span class="badge">' + b + "</span>"; }).join("")
      : '<span class="badge">Aucun badge pour le moment</span>';
  }
}

function mettreAJourProgressionSession(zone) {
  if (!zone) return;
  const taux = sessionStats.essais > 0 ? (sessionStats.reussites / sessionStats.essais) * 100 : 0;
  const pourcentage = Math.max(0, Math.min(100, arrondirNombre(taux)));
  zone.innerHTML =
    '<p><strong>Session en cours</strong> : ' +
    sessionStats.reussites +
    "/" +
    sessionStats.essais +
    " réussites</p>" +
    '<div class="session-bar"><span style="width:' + pourcentage + '%"></span></div>' +
    "<small>Objectif conseillé : atteindre 80% avant de passer au niveau supérieur.</small>";
}

function afficherObjectifEtCompetences(zoneObjectif, zoneCompetences, exercice, selection) {
  const objectifs = {
    precision: "Appliquer la formule sans erreur de calcul.",
    unites: "Vérifier systématiquement l'unité finale et sa cohérence.",
    metier: "Relier le calcul à une décision concrète de chantier.",
  };
  if (zoneObjectif) {
    const source = selection && selection.source ? selection.source : "manuel";
    const objectifSeance = selection && selection.objectifSeance ? selection.objectifSeance : "precision";
    const objectif = exercice && exercice.objectif
      ? exercice.objectif
      : (objectifs[objectifSeance] || objectifs.precision);
    zoneObjectif.innerHTML =
      "<strong>Objectif de séance :</strong> " +
      objectif +
      '<br><small>Parcours : ' + source + "</small>";
  }
  if (zoneCompetences) {
    const competence = exercice && exercice.competenceLabel ? exercice.competenceLabel : "Compétence transversale";
    const palier = determinerPalierCompetence(exercice ? exercice.competence : "");
    zoneCompetences.innerHTML =
      "<strong>Micro-compétence :</strong> " +
      competence +
      '<br><strong>Palier actuel :</strong> ' + palier;
  }
}

function determinerPalierCompetence(competence) {
  const progression = chargerProgression();
  const stats = progression.competences[competence] || { essais: 0, reussites: 0 };
  if (stats.essais === 0) return "Bronze";
  const taux = (stats.reussites / stats.essais) * 100;
  if (taux >= 80 && stats.essais >= 8) return "Or";
  if (taux >= 60 && stats.essais >= 4) return "Argent";
  return "Bronze";
}

function afficherPlanRemediation(zone, exercice, diagnostic) {
  if (!zone || !exercice) return;
  zone.innerHTML =
    "<strong>Plan de remédiation (3 étapes)</strong>" +
    "<ol class=\"resultat__etapes-liste\">" +
    "<li>Revoir la notion ciblée : " + (diagnostic || exercice.erreurProbable) + ".</li>" +
    "<li>Refaire un exercice similaire avec indice 1 puis indice 2.</li>" +
    "<li>Valider un nouvel exercice sans aide pour consolider.</li>" +
    "</ol>";
}

function mettreAJourUniteAttendue(zone, exercice) {
  if (!zone) return;
  zone.textContent = exercice && exercice.unite ? "(unité attendue : " + exercice.unite + ")" : "(sans unité)";
}

function appliquerModeEvaluation(toggle, btn1, btn2, btnMethode, zoneFeedback) {
  const actif = !!(toggle && toggle.checked);
  [btn1, btn2, btnMethode].forEach(function (btn) {
    if (!btn) return;
    btn.disabled = actif;
    btn.setAttribute("aria-disabled", actif ? "true" : "false");
  });
  if (actif && zoneFeedback) {
    zoneFeedback.className = "resultat resultat--visible";
    zoneFeedback.innerHTML = "Mode évaluation activé : indices et méthode désactivés.";
  }
}

function appliquerModeFocus(ui) {
  if (!ui || !ui.modeFocus) return;
  const focusActif = !!ui.modeFocus.checked;
  const zonesAvancees = document.querySelectorAll("[data-focus-advanced]");
  zonesAvancees.forEach(function (zone) {
    zone.hidden = focusActif;
  });
}

function demarrerChronoSiActif(ui, exercice) {
  if (!ui || !ui.chronometreExercice) return;
  if (chronoInterval) {
    clearInterval(chronoInterval);
    chronoInterval = null;
  }
  if (!ui.modeChrono || !ui.modeChrono.checked || !exercice) {
    chronoRestant = 0;
    mettreAJourChronometre(ui);
    return;
  }
  const duree = exercice.palier === "Or" ? 180 : (exercice.palier === "Argent" ? 150 : 120);
  chronoRestant = duree;
  mettreAJourChronometre(ui);
  chronoInterval = setInterval(function () {
    chronoRestant -= 1;
    mettreAJourChronometre(ui);
    if (chronoRestant <= 0) {
      clearInterval(chronoInterval);
      chronoInterval = null;
      ui.feedbackExercice.className = "resultat resultat--visible";
      ui.feedbackExercice.innerHTML = "⏱️ Temps écoulé. Lis la méthode puis passe à l'exercice suivant.";
    }
  }, 1000);
}

function mettreAJourChronometre(ui) {
  if (!ui || !ui.chronometreExercice) return;
  if (!ui.modeChrono || !ui.modeChrono.checked) {
    ui.chronometreExercice.innerHTML = "Mode chrono inactif : active-le pour travailler la rapidité en conditions d'évaluation.";
    return;
  }
  const minutes = Math.floor(Math.max(0, chronoRestant) / 60);
  const secondes = Math.max(0, chronoRestant) % 60;
  ui.chronometreExercice.innerHTML =
    "<strong>Chrono exercice :</strong> " +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secondes).padStart(2, "0") +
    " <small>(objectif : méthode juste + temps maîtrisé)</small>";
}

function executerTestsFormules() {
  const tests = [
    { nom: "Aire rectangle", ok: proche(6 * 4, 24, 0.0001) },
    { nom: "Périmètre cercle", ok: proche(2 * PI * 5, 31.4159, 0.01) },
    { nom: "Pourcentage", ok: proche((15 * 200) / 100, 30, 0.0001) },
    { nom: "Triangle valide", ok: triangleValide(3, 4, 5) },
    { nom: "Triangle impossible", ok: !triangleValide(2, 3, 8) },
  ];
  return tests;
}

function afficherBilanTestsFormules(zone) {
  if (!zone) return;
  const tests = executerTestsFormules();
  const reussis = tests.filter(function (t) { return t.ok; }).length;
  zone.innerHTML =
    "<strong>Tests internes des formules :</strong> " +
    reussis +
    "/" +
    tests.length +
    " réussis." +
    "<ul>" +
    tests
      .map(function (test) { return "<li>" + (test.ok ? "✅ " : "❌ ") + test.nom + "</li>"; })
      .join("") +
    "</ul>";
}

function lireHistorique() {
  try {
    const brut = localStorage.getItem(CLE_HISTORIQUE);
    return brut ? JSON.parse(brut) : [];
  } catch (e) {
    return [];
  }
}

function enregistrerHistorique(entree) {
  const historique = lireHistorique();
  historique.unshift({
    date: new Date().toLocaleString("fr-FR"),
    timestamp: Date.now(),
    type: entree.type,
    label: entree.label,
    details: entree.details,
    resultat: entree.resultat,
    competence: entree.competence || "",
    erreurCode: entree.erreurCode || "",
    estCorrect: typeof entree.estCorrect === "boolean" ? entree.estCorrect : null,
  });
  localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(historique.slice(0, MAX_HISTORIQUE)));
}

function mettreAJourDiagnosticPedagogique(zoneDiagnostic, zonePlanRevision) {
  const historiqueComplet = lireHistorique().filter(function (item) {
    return item.type === "exercice";
  });
  const historique = historiqueComplet.filter(function (item) {
    return item.estCorrect === false;
  });
  const erreursParCode = {};
  historique.forEach(function (item) {
    const cle = item.erreurCode || "erreur_generique";
    const poids = calculerPoidsRecence(item.timestamp);
    erreursParCode[cle] = (erreursParCode[cle] || 0) + poids;
  });
  const topErreurs = Object.entries(erreursParCode)
    .sort(function (a, b) { return b[1] - a[1]; })
    .slice(0, 3);
  const tendance = analyserTendanceRecente(historiqueComplet);

  if (zoneDiagnostic) {
    if (topErreurs.length === 0) {
      zoneDiagnostic.innerHTML =
        "<strong>Diagnostic personnalisé :</strong> aucune erreur fréquente détectée pour l'instant. Continue ainsi." +
        '<p class="resultat__astuce"><strong>Tendance :</strong> ' + tendance + "</p>";
    } else {
      zoneDiagnostic.innerHTML =
        "<strong>Erreurs fréquentes pondérées (récent) :</strong><ul>" +
        topErreurs.map(function (item) {
          return "<li>" + libelleErreur(item[0]) + " : <strong>" + arrondirNombre(item[1]) + "</strong> pts</li>";
        }).join("") +
        "</ul>" +
        '<p class="resultat__astuce"><strong>Tendance :</strong> ' + tendance + "</p>";
    }
  }

  if (zonePlanRevision) {
    const plan = genererPlanRevision(topErreurs);
    zonePlanRevision.innerHTML =
      "<strong>Plan de révision (10 minutes)</strong>" +
      "<ol class=\"resultat__etapes-liste\">" +
      plan.map(function (etape) { return "<li>" + etape + "</li>"; }).join("") +
      "</ol>";
  }
}

function calculerPoidsRecence(timestamp) {
  if (!timestamp) return 1;
  const ageMs = Date.now() - timestamp;
  const ageJours = ageMs / (1000 * 60 * 60 * 24);
  if (ageJours <= 1) return 1.6;
  if (ageJours <= 7) return 1.25;
  if (ageJours <= 30) return 1.1;
  return 1;
}

function analyserTendanceRecente(historiqueExercices) {
  if (!historiqueExercices || historiqueExercices.length < 4) {
    return "pas assez de données (continue quelques exercices).";
  }
  const tentatives = historiqueExercices
    .filter(function (item) { return typeof item.estCorrect === "boolean"; })
    .slice(0, 16);
  const recentes = tentatives.slice(0, 8);
  const anciennes = tentatives.slice(8, 16);
  const tauxRecents = recentes.length
    ? recentes.filter(function (item) { return item.estCorrect; }).length / recentes.length
    : 0;
  const tauxAnciens = anciennes.length
    ? anciennes.filter(function (item) { return item.estCorrect; }).length / anciennes.length
    : tauxRecents;
  const delta = tauxRecents - tauxAnciens;
  if (delta >= 0.15) return "en nette amélioration 📈";
  if (delta >= 0.05) return "en légère amélioration ↗️";
  if (delta <= -0.15) return "en recul, refaire une séance ciblée 📉";
  if (delta <= -0.05) return "légère baisse, renforcer les bases ↘️";
  return "stable ➖";
}

function libelleErreur(code) {
  const libelles = {
    aire_unite: "Confusion aire (m²) / périmètre (m)",
    rayon_diametre: "Confusion rayon / diamètre",
    pourcent_div100: "Division par 100 oubliée",
    metier_surface_avant_conversion: "Surface non calculée avant conversion",
    metier_cout_unitaire: "Coût unitaire mal appliqué",
    metier_volume_unitaire: "Unité L/m mal interprétée",
    erreur_generique: "Erreur de méthode à préciser",
  };
  return libelles[code] || libelles.erreur_generique;
}

function genererPlanRevision(topErreurs) {
  if (!topErreurs || topErreurs.length === 0) {
    return [
      "2 min : relis une formule de chaque thème (aires, pourcentages, métier).",
      "4 min : fais 2 exercices faciles sans indice.",
      "4 min : refais 1 exercice en mode évaluation.",
    ];
  }
  return [
    "3 min : revois la notion « " + libelleErreur(topErreurs[0][0]) + " ».",
    "4 min : fais 2 exercices ciblés avec indice 1 puis indice 2.",
    "3 min : valide 1 exercice similaire sans aide.",
  ];
}

function afficherHistorique(zone) {
  if (!zone) return;
  const historique = lireHistorique();
  if (historique.length === 0) {
    zone.innerHTML = '<li class="history-item">Aucune tentative enregistrée pour le moment.</li>';
    return;
  }
  zone.innerHTML = historique
    .slice(0, 8)
    .map(function (item) {
      return (
        '<li class="history-item">' +
        "<strong>" +
        item.label +
        "</strong><br>" +
        item.resultat +
        "<br><small>" +
        item.date +
        "</small>" +
        "</li>"
      );
    })
    .join("");
}

function nombreAleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ============================================================
// 3. AFFICHAGE DES CHAMPS DE SAISIE POUR LES FORMES
// ============================================================

/**
 * Génère les champs de saisie adaptés à la forme sélectionnée
 * @param {string} forme - Le nom de la forme (rectangle, carre, cercle, triangle, trapeze)
 * @param {HTMLElement} conteneur - L'élément HTML qui contient les champs
 */
function afficherChampsFormes(forme, conteneur) {
  // Définition des champs pour chaque forme
  // Chaque champ a un identifiant (id), une étiquette (label),
  // un texte d'aide (placeholder) et une unité
  const champsParForme = {
    rectangle: [
      { id: "longueur", label: "Longueur (m)", placeholder: "Ex : 5.5", unite: "m" },
      { id: "largeur", label: "Largeur (m)", placeholder: "Ex : 3.2", unite: "m" },
    ],
    carre: [
      { id: "cote", label: "Côté (m)", placeholder: "Ex : 4", unite: "m" },
    ],
    cercle: [
      { id: "rayon", label: "Rayon (m)", placeholder: "Ex : 2.5", unite: "m" },
    ],
    triangle: [
      { id: "base", label: "Base (m)", placeholder: "Ex : 6", unite: "m" },
      { id: "hauteur", label: "Hauteur (m)", placeholder: "Ex : 4", unite: "m" },
      { id: "cote1", label: "Côté 1 (m)", placeholder: "Ex : 5", unite: "m" },
      { id: "cote2", label: "Côté 2 (m)", placeholder: "Ex : 5", unite: "m" },
      { id: "cote3", label: "Côté 3 (m)", placeholder: "= Base", unite: "m" },
    ],
    trapeze: [
      { id: "base1", label: "Grande base (m)", placeholder: "Ex : 8", unite: "m" },
      { id: "base2", label: "Petite base (m)", placeholder: "Ex : 5", unite: "m" },
      { id: "hauteur", label: "Hauteur (m)", placeholder: "Ex : 3", unite: "m" },
      { id: "coteG", label: "Côté gauche (m)", placeholder: "Ex : 3.5", unite: "m" },
      { id: "coteD", label: "Côté droit (m)", placeholder: "Ex : 3.5", unite: "m" },
    ],
  };

  // On récupère la liste des champs pour la forme choisie
  const champs = champsParForme[forme] || [];

  // On génère le HTML de chaque champ
  conteneur.innerHTML = champs
    .map(function (champ) {
      return (
        '<div class="form-group">' +
        '  <label for="' + champ.id + '">' + champ.label + "</label>" +
        '  <input type="number" id="' + champ.id + '" ' +
        '    aria-describedby="' + champ.id + '-erreur" ' +
        '    placeholder="' + champ.placeholder + '" ' +
        '    step="0.01" min="0">' +
        '  <p class="field-error" id="' + champ.id + '-erreur" aria-live="polite"></p>' +
        "</div>"
      );
    })
    .join("");
}


// ============================================================
// 4. AFFICHAGE DES CHAMPS DE SAISIE POUR LES POURCENTAGES
// ============================================================

/**
 * Génère les champs adaptés au type de calcul de pourcentage
 * @param {string} type - Le type de calcul sélectionné
 * @param {HTMLElement} conteneur - L'élément HTML qui contient les champs
 */
function afficherChampsPourcent(type, conteneur) {
  const champsParType = {
    "trouver-pourcentage": [
      { id: "pourcent-val", label: "Pourcentage (%)", placeholder: "Ex : 15" },
      { id: "nombre-val", label: "Nombre", placeholder: "Ex : 200" },
    ],
    "quel-pourcentage": [
      { id: "partie-val", label: "Partie (A)", placeholder: "Ex : 30" },
      { id: "total-val", label: "Total (B)", placeholder: "Ex : 200" },
    ],
    augmentation: [
      { id: "valeur-depart", label: "Valeur de départ", placeholder: "Ex : 150" },
      { id: "pourcent-aug", label: "Augmentation (%)", placeholder: "Ex : 20" },
    ],
    reduction: [
      { id: "valeur-depart", label: "Valeur de départ", placeholder: "Ex : 150" },
      { id: "pourcent-red", label: "Réduction (%)", placeholder: "Ex : 10" },
    ],
  };

  const champs = champsParType[type] || [];

  conteneur.innerHTML = champs
    .map(function (champ) {
      return (
        '<div class="form-group">' +
        '  <label for="' + champ.id + '">' + champ.label + "</label>" +
        '  <input type="number" id="' + champ.id + '" ' +
        '    aria-describedby="' + champ.id + '-erreur" ' +
        '    placeholder="' + champ.placeholder + '" ' +
        '    step="0.01" min="0">' +
        '  <p class="field-error" id="' + champ.id + '-erreur" aria-live="polite"></p>' +
        "</div>"
      );
    })
    .join("");
}


// ============================================================
// 5. CALCULS DES AIRES ET PÉRIMÈTRES
// ============================================================

/**
 * Effectue le calcul d'aire et de périmètre selon la forme
 * @param {string} forme - La forme sélectionnée
 * @param {HTMLElement} conteneur - Le conteneur des champs
 * @param {HTMLElement} resultat - La zone d'affichage du résultat
 * @param {HTMLElement} schema - La zone d'affichage du schéma
 */
function calculerForme(forme, conteneur, resultat, schema) {
  effacerErreursChamps(conteneur);

  // Variable pour stocker l'aire, le périmètre et la formule
  let aire, perimetre, formuleAire, formulePerimetre;
  let etapesAire = [];
  let etapesPerimetre = [];

  // On utilise un "switch" pour choisir la bonne formule
  switch (forme) {
    // --- RECTANGLE ---
    case "rectangle": {
      // On lit les valeurs saisies par l'élève
      const L = lireValeur("longueur");
      const l = lireValeur("largeur");

      // Vérification : les valeurs doivent être positives
      if (!valide(L, l)) {
        if (!valide(L)) afficherErreurChamp("longueur", "Entrez une longueur positive.");
        if (!valide(l)) afficherErreurChamp("largeur", "Entrez une largeur positive.");
        afficherErreur(resultat, "Veuillez entrer des valeurs positives.");
        schema.innerHTML = "";
        return;
      }

      // Formules du rectangle :
      // Aire = Longueur × Largeur
      aire = L * l;
      // Périmètre = 2 × (Longueur + Largeur)
      perimetre = 2 * (L + l);

      // On prépare le détail de la formule
      formuleAire = "Aire = " + L + " × " + l + " = " + arrondir(aire) + " m²";
      formulePerimetre = "Périmètre = 2 × (" + L + " + " + l + ") = " + arrondir(perimetre) + " m";
      etapesAire = [
        "Je repère les dimensions : longueur = " + L + " m et largeur = " + l + " m.",
        "J'applique la formule de l'aire du rectangle : L × l.",
        "Je calcule : " + L + " × " + l + " = " + arrondir(aire) + " m².",
      ];
      etapesPerimetre = [
        "Je calcule d'abord la somme longueur + largeur : " + L + " + " + l + ".",
        "Je multiplie par 2 pour avoir les 4 côtés.",
        "Résultat : périmètre = " + arrondir(perimetre) + " m.",
      ];

      // On dessine le schéma du rectangle
      dessinerSchema(schema, forme, { L: L, l: l });
      break;
    }

    // --- CARRÉ ---
    case "carre": {
      const c = lireValeur("cote");

      if (!valide(c)) {
        afficherErreurChamp("cote", "Entrez un côté positif.");
        afficherErreur(resultat, "Veuillez entrer une valeur positive.");
        schema.innerHTML = "";
        return;
      }

      // Formules du carré :
      // Aire = Côté × Côté (= Côté²)
      aire = c * c;
      // Périmètre = 4 × Côté
      perimetre = 4 * c;

      formuleAire = "Aire = " + c + " × " + c + " = " + arrondir(aire) + " m²";
      formulePerimetre = "Périmètre = 4 × " + c + " = " + arrondir(perimetre) + " m";
      etapesAire = [
        "Je repère le côté du carré : " + c + " m.",
        "J'applique la formule : côté × côté.",
        "Je calcule : " + c + " × " + c + " = " + arrondir(aire) + " m².",
      ];
      etapesPerimetre = [
        "Un carré a 4 côtés égaux.",
        "Je fais 4 × " + c + ".",
        "Résultat : périmètre = " + arrondir(perimetre) + " m.",
      ];

      dessinerSchema(schema, forme, { c: c });
      break;
    }

    // --- CERCLE ---
    case "cercle": {
      const r = lireValeur("rayon");

      if (!valide(r)) {
        afficherErreurChamp("rayon", "Entrez un rayon positif.");
        afficherErreur(resultat, "Veuillez entrer une valeur positive.");
        schema.innerHTML = "";
        return;
      }

      // Formules du cercle :
      // Aire = π × Rayon²
      aire = PI * r * r;
      // Périmètre (circonférence) = 2 × π × Rayon
      perimetre = 2 * PI * r;

      formuleAire = "Aire = π × " + r + "² = " + arrondir(aire) + " m²";
      formulePerimetre = "Périmètre = 2 × π × " + r + " = " + arrondir(perimetre) + " m";
      etapesAire = [
        "Je repère le rayon : " + r + " m.",
        "J'élève le rayon au carré : " + r + " × " + r + ".",
        "Je multiplie par π pour obtenir l'aire : " + arrondir(aire) + " m².",
      ];
      etapesPerimetre = [
        "J'applique la formule du périmètre du cercle : 2 × π × rayon.",
        "Je remplace le rayon par " + r + ".",
        "Résultat : périmètre = " + arrondir(perimetre) + " m.",
      ];

      dessinerSchema(schema, forme, { r: r });
      break;
    }

    // --- TRIANGLE ---
    case "triangle": {
      const b = lireValeur("base");
      const h = lireValeur("hauteur");
      const c1 = lireValeur("cote1");
      const c2 = lireValeur("cote2");
      // Si côté 3 n'est pas renseigné, on prend la base
      const c3Input = document.getElementById("cote3");
      const c3 = c3Input && c3Input.value !== "" ? lireValeur("cote3") : b;

      if (!valide(b, h)) {
        if (!valide(b)) afficherErreurChamp("base", "La base doit être positive.");
        if (!valide(h)) afficherErreurChamp("hauteur", "La hauteur doit être positive.");
        afficherErreur(resultat, "La base et la hauteur sont obligatoires.");
        schema.innerHTML = "";
        return;
      }

      // Formules du triangle :
      // Aire = (Base × Hauteur) ÷ 2
      aire = (b * h) / 2;

      // Périmètre = somme des 3 côtés (si fournis)
      if (valide(c1, c2, c3)) {
        if (!triangleValide(c1, c2, c3)) {
          afficherErreurChamp("cote1", "Triangle impossible avec ces longueurs.");
          afficherErreurChamp("cote2", "Vérifiez l'inégalité triangulaire.");
          if (c3Input && c3Input.value !== "") {
            afficherErreurChamp("cote3", "Le 3e côté est incohérent.");
          }
          afficherErreur(
            resultat,
            "Triangle impossible : la somme de deux côtés doit être supérieure au troisième."
          );
          schema.innerHTML = "";
          return;
        }
        if (h >= c1 + c2) {
          afficherErreurChamp("hauteur", "Hauteur incohérente avec les côtés renseignés.");
          afficherErreur(resultat, "Vérifie la hauteur : elle semble incompatible avec ce triangle.");
          schema.innerHTML = "";
          return;
        }
        perimetre = c1 + c2 + c3;
        formulePerimetre = "Périmètre = " + c1 + " + " + c2 + " + " + c3 + " = " + arrondir(perimetre) + " m";
      } else {
        perimetre = null;
        formulePerimetre = "Périmètre : renseignez les 3 côtés";
      }

      formuleAire = "Aire = (" + b + " × " + h + ") ÷ 2 = " + arrondir(aire) + " m²";
      etapesAire = [
        "Je prends la base (" + b + " m) et la hauteur (" + h + " m).",
        "Je calcule base × hauteur : " + b + " × " + h + ".",
        "Je divise par 2 : aire = " + arrondir(aire) + " m².",
      ];
      etapesPerimetre = perimetre !== null
        ? [
            "Je repère les 3 côtés : " + c1 + ", " + c2 + " et " + c3 + " m.",
            "Je fais la somme des côtés.",
            "Résultat : périmètre = " + arrondir(perimetre) + " m.",
          ]
        : [
            "Le périmètre d'un triangle = côté 1 + côté 2 + côté 3.",
            "Il manque au moins une mesure de côté.",
            "Complète les 3 côtés pour terminer le calcul.",
          ];

      dessinerSchema(schema, forme, { b: b, h: h });
      break;
    }

    // --- TRAPÈZE ---
    case "trapeze": {
      const B1 = lireValeur("base1");
      const B2 = lireValeur("base2");
      const h = lireValeur("hauteur");
      const cG = lireValeur("coteG");
      const cD = lireValeur("coteD");

      if (!valide(B1, B2, h)) {
        if (!valide(B1)) afficherErreurChamp("base1", "La grande base doit être positive.");
        if (!valide(B2)) afficherErreurChamp("base2", "La petite base doit être positive.");
        if (!valide(h)) afficherErreurChamp("hauteur", "La hauteur doit être positive.");
        afficherErreur(resultat, "Les deux bases et la hauteur sont obligatoires.");
        schema.innerHTML = "";
        return;
      }
      if (B1 < B2) {
        afficherErreurChamp("base1", "La grande base doit être supérieure ou égale à la petite base.");
        afficherErreurChamp("base2", "La petite base doit être inférieure ou égale à la grande base.");
        afficherErreur(resultat, "Vérifiez les bases : grande base ≥ petite base.");
        schema.innerHTML = "";
        return;
      }

      // Formules du trapèze :
      // Aire = ((Base1 + Base2) × Hauteur) ÷ 2
      aire = ((B1 + B2) * h) / 2;

      // Périmètre = somme des 4 côtés (si fournis)
      if (valide(cG, cD)) {
        if (cG < h || cD < h) {
          afficherErreurChamp("coteG", "Un côté latéral doit être au moins égal à la hauteur.");
          afficherErreurChamp("coteD", "Un côté latéral doit être au moins égal à la hauteur.");
          afficherErreur(resultat, "Trapèze impossible : côtés latéraux trop courts par rapport à la hauteur.");
          schema.innerHTML = "";
          return;
        }
        perimetre = B1 + B2 + cG + cD;
        formulePerimetre = "Périmètre = " + B1 + " + " + B2 + " + " + cG + " + " + cD + " = " + arrondir(perimetre) + " m";
      } else {
        perimetre = null;
        formulePerimetre = "Périmètre : renseignez les côtés latéraux";
      }

      formuleAire = "Aire = ((" + B1 + " + " + B2 + ") × " + h + ") ÷ 2 = " + arrondir(aire) + " m²";
      etapesAire = [
        "Je repère les deux bases : " + B1 + " m et " + B2 + " m, et la hauteur : " + h + " m.",
        "Je calcule (base 1 + base 2) × hauteur.",
        "Je divise par 2 : aire = " + arrondir(aire) + " m².",
      ];
      etapesPerimetre = perimetre !== null
        ? [
            "Je prends les 4 côtés du trapèze.",
            "Je fais la somme : " + B1 + " + " + B2 + " + " + cG + " + " + cD + ".",
            "Résultat : périmètre = " + arrondir(perimetre) + " m.",
          ]
        : [
            "Le périmètre d'un trapèze = somme des 4 côtés.",
            "Il manque un côté latéral.",
            "Complète côté gauche et côté droit pour calculer le périmètre.",
          ];

      dessinerSchema(schema, forme, { B1: B1, B2: B2, h: h });
      break;
    }
  }

  // --- Affichage du résultat ---
  afficherResultat(resultat, aire, perimetre, formuleAire, formulePerimetre, etapesAire, etapesPerimetre, forme);
}


// ============================================================
// 6. CALCULS DES POURCENTAGES
// ============================================================

/**
 * Effectue le calcul de pourcentage selon le type choisi
 * @param {string} type - Le type de calcul
 * @param {HTMLElement} conteneur - Le conteneur des champs
 * @param {HTMLElement} resultat - La zone d'affichage du résultat
 */
function calculerPourcentage(type, conteneur, resultat) {
  effacerErreursChamps(conteneur);

  let valeurResultat, formule;
  let etapes = [];

  switch (type) {
    // --- Trouver X% d'un nombre ---
    case "trouver-pourcentage": {
      const pourcent = lireValeur("pourcent-val");
      const nombre = lireValeur("nombre-val");

      if (pourcent === null || nombre === null) {
        if (pourcent === null) afficherErreurChamp("pourcent-val", "Renseigne le pourcentage.");
        if (nombre === null) afficherErreurChamp("nombre-val", "Renseigne le nombre.");
        afficherErreur(resultat, "Veuillez remplir les deux champs.");
        return;
      }

      // Formule : Résultat = (Pourcentage × Nombre) ÷ 100
      valeurResultat = (pourcent * nombre) / 100;
      formule = pourcent + "% de " + nombre + " = (" + pourcent + " × " + nombre + ") ÷ 100 = " + arrondir(valeurResultat);
      etapes = [
        "Je transforme " + pourcent + "% en opération : (pourcentage × nombre) ÷ 100.",
        "Je calcule " + pourcent + " × " + nombre + ".",
        "Je divise par 100 : résultat = " + arrondir(valeurResultat) + ".",
      ];
      afficherResultatPourcent(resultat, arrondir(valeurResultat), formule, etapes, type);
      break;
    }

    // --- Quel pourcentage représente A par rapport à B ? ---
    case "quel-pourcentage": {
      const partie = lireValeur("partie-val");
      const total = lireValeur("total-val");

      if (partie === null || total === null) {
        if (partie === null) afficherErreurChamp("partie-val", "Renseigne la partie.");
        if (total === null) afficherErreurChamp("total-val", "Renseigne le total.");
        afficherErreur(resultat, "Veuillez remplir les deux champs.");
        return;
      }
      if (total === 0) {
        afficherErreurChamp("total-val", "Le total doit être supérieur à 0.");
        afficherErreur(resultat, "Le total ne peut pas être zéro.");
        return;
      }

      // Formule : Pourcentage = (Partie ÷ Total) × 100
      valeurResultat = (partie / total) * 100;
      formule = "(" + partie + " ÷ " + total + ") × 100 = " + arrondir(valeurResultat) + " %";
      etapes = [
        "Je fais partie ÷ total : " + partie + " ÷ " + total + ".",
        "Je multiplie le résultat par 100.",
        "Je trouve : " + arrondir(valeurResultat) + " %.",
      ];
      afficherResultatPourcent(resultat, arrondir(valeurResultat) + " %", formule, etapes, type);
      break;
    }

    // --- Augmentation ---
    case "augmentation": {
      const depart = lireValeur("valeur-depart");
      const aug = lireValeur("pourcent-aug");

      if (depart === null || aug === null) {
        if (depart === null) afficherErreurChamp("valeur-depart", "Renseigne la valeur de départ.");
        if (aug === null) afficherErreurChamp("pourcent-aug", "Renseigne le pourcentage d'augmentation.");
        afficherErreur(resultat, "Veuillez remplir les deux champs.");
        return;
      }
      if (aug > 500) {
        afficherErreurChamp("pourcent-aug", "Augmentation trop élevée pour un exercice pédagogique (max 500%).");
        afficherErreur(resultat, "Renseigne une augmentation plus réaliste.");
        return;
      }

      // Formule : Nouveau = Départ + (Départ × Pourcentage ÷ 100)
      //         = Départ × (1 + Pourcentage ÷ 100)
      const augmentation = (depart * aug) / 100;
      valeurResultat = depart + augmentation;
      formule = depart + " + (" + depart + " × " + aug + "% ) = " + depart + " + " + arrondir(augmentation) + " = " + arrondir(valeurResultat);
      etapes = [
        "Je calcule le montant de l'augmentation : (" + depart + " × " + aug + ") ÷ 100.",
        "J'obtiens " + arrondir(augmentation) + ".",
        "J'ajoute à la valeur de départ : " + depart + " + " + arrondir(augmentation) + ".",
      ];
      afficherResultatPourcent(resultat, arrondir(valeurResultat), formule, etapes, type);
      break;
    }

    // --- Réduction ---
    case "reduction": {
      const depart = lireValeur("valeur-depart");
      const red = lireValeur("pourcent-red");

      if (depart === null || red === null) {
        if (depart === null) afficherErreurChamp("valeur-depart", "Renseigne la valeur de départ.");
        if (red === null) afficherErreurChamp("pourcent-red", "Renseigne le pourcentage de réduction.");
        afficherErreur(resultat, "Veuillez remplir les deux champs.");
        return;
      }
      if (red > 100) {
        afficherErreurChamp("pourcent-red", "Une réduction ne peut pas dépasser 100%.");
        afficherErreur(resultat, "La réduction doit être comprise entre 0% et 100%.");
        return;
      }

      // Formule : Nouveau = Départ - (Départ × Pourcentage ÷ 100)
      //         = Départ × (1 - Pourcentage ÷ 100)
      const reduction = (depart * red) / 100;
      valeurResultat = depart - reduction;
      formule = depart + " - (" + depart + " × " + red + "% ) = " + depart + " - " + arrondir(reduction) + " = " + arrondir(valeurResultat);
      etapes = [
        "Je calcule le montant de la réduction : (" + depart + " × " + red + ") ÷ 100.",
        "J'obtiens " + arrondir(reduction) + ".",
        "Je retire ce montant à la valeur de départ.",
      ];
      afficherResultatPourcent(resultat, arrondir(valeurResultat), formule, etapes, type);
      break;
    }
  }
}


// ============================================================
// 7. FONCTIONS UTILITAIRES
// ============================================================

/**
 * Lit la valeur numérique d'un champ de saisie
 * @param {string} id - L'identifiant du champ HTML
 * @returns {number|null} La valeur numérique ou null si vide
 */
function lireValeur(id) {
  const champ = document.getElementById(id);
  if (!champ || champ.value.trim() === "") return null;
  return parseFloat(champ.value);
}

/**
 * Vérifie que toutes les valeurs passées sont des nombres positifs
 * @param  {...number} valeurs - Les valeurs à vérifier
 * @returns {boolean} true si toutes sont valides
 */
function valide(...valeurs) {
  return valeurs.every(function (v) {
    return v !== null && !isNaN(v) && v > 0;
  });
}

/**
 * Vérifie si trois longueurs peuvent former un triangle
 * (inégalité triangulaire).
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {boolean}
 */
function triangleValide(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

/**
 * Arrondit un nombre à 2 décimales
 * @param {number} n - Le nombre à arrondir
 * @returns {string} Le nombre arrondi (format texte)
 */
function arrondir(n) {
  // On utilise toFixed(2) pour afficher 2 chiffres après la virgule
  // Puis on remplace le point par une virgule (convention française)
  return n.toFixed(2).replace(".", ",");
}

function arrondirNombre(n) {
  return Math.round(n * 100) / 100;
}

function proche(a, b, tolerance) {
  return Math.abs(a - b) <= tolerance;
}

/**
 * Supprime les erreurs affichées dans un conteneur de champs
 * @param {HTMLElement} conteneur
 */
function effacerErreursChamps(conteneur) {
  if (!conteneur) return;
  const erreurs = conteneur.querySelectorAll(".field-error");
  const champs = conteneur.querySelectorAll("input");

  erreurs.forEach(function (zone) {
    zone.textContent = "";
  });

  champs.forEach(function (champ) {
    champ.removeAttribute("aria-invalid");
  });
}

/**
 * Affiche une erreur liée à un champ donné
 * @param {string} idChamp
 * @param {string} message
 */
function afficherErreurChamp(idChamp, message) {
  const champ = document.getElementById(idChamp);
  const zoneErreur = document.getElementById(idChamp + "-erreur");
  if (!champ || !zoneErreur) return;

  const unChampDejaInvalide = document.querySelector('input[aria-invalid="true"]');
  champ.setAttribute("aria-invalid", "true");
  zoneErreur.textContent = message;
  if (!unChampDejaInvalide) champ.focus();
}


// ============================================================
// 8. AFFICHAGE DES RÉSULTATS
// ============================================================

/**
 * Affiche le résultat des calculs d'aire et de périmètre
 */
function afficherResultat(zone, aire, perimetre, formuleAire, formulePerimetre, etapesAire, etapesPerimetre, forme) {
  zone.className = "resultat resultat--visible";

  let html = "";

  // Ligne de l'aire
  html +=
    '<div class="resultat__ligne">' +
    '  <span class="resultat__label">Aire :</span>' +
    '  <span class="resultat__valeur">' + arrondir(aire) + " m²</span>" +
    "</div>";

  // Ligne du périmètre (si calculé)
  if (perimetre !== null) {
    html +=
      '<div class="resultat__ligne">' +
      '  <span class="resultat__label">Périmètre :</span>' +
      '  <span class="resultat__valeur">' + arrondir(perimetre) + " m</span>" +
      "</div>";
  }

  // Détail des formules utilisées
  html +=
    '<div class="resultat__formule">' +
    "  " + formuleAire + "<br>" + formulePerimetre +
    "</div>";

  html += genererBlocEtapes("Étapes pour l'aire", etapesAire);
  html += genererBlocEtapes("Étapes pour le périmètre", etapesPerimetre);
  html +=
    '<p class="resultat__astuce"><strong>Astuce :</strong> ' +
    genererAstuceForme(forme) +
    "</p>";

  zone.innerHTML = html;

  enregistrerHistorique({
    type: "calcul",
    label: "Calcul " + forme,
    details: formuleAire,
    resultat:
      "Aire " +
      arrondir(aire) +
      " m²" +
      (perimetre !== null ? " | Périmètre " + arrondir(perimetre) + " m" : ""),
  });
  afficherHistorique(document.getElementById("historique-exercice"));
}

/**
 * Affiche le résultat d'un calcul de pourcentage
 */
function afficherResultatPourcent(zone, valeur, formule, etapes, type) {
  zone.className = "resultat resultat--visible";
  zone.innerHTML =
    '<div class="resultat__ligne">' +
    '  <span class="resultat__label">Résultat :</span>' +
    '  <span class="resultat__valeur">' + valeur + "</span>" +
    "</div>" +
    '<div class="resultat__formule">' + formule + "</div>" +
    genererBlocEtapes("Étapes du calcul", etapes) +
    '<p class="resultat__astuce"><strong>Astuce :</strong> ' + genererAstucePourcentage(type) + "</p>";

  enregistrerHistorique({
    type: "calcul",
    label: "Pourcentage",
    details: type,
    resultat: "Résultat : " + valeur,
  });
  afficherHistorique(document.getElementById("historique-exercice"));
}

function genererBlocEtapes(titre, etapes) {
  if (!etapes || etapes.length === 0) return "";
  return (
    '<div class="resultat__etapes">' +
    '  <p class="resultat__etapes-titre">' + titre + "</p>" +
    '  <ol class="resultat__etapes-liste">' +
    etapes.map(function (etape) { return "<li>" + etape + "</li>"; }).join("") +
    "  </ol>" +
    "</div>"
  );
}

function genererAstuceForme(forme) {
  const astuces = {
    rectangle: "L'aire s'exprime en m², le périmètre en m. Vérifie bien l'unité finale.",
    carre: "Si tu doubles le côté, l'aire est multipliée par 4.",
    cercle: "Ne confonds pas rayon et diamètre : diamètre = 2 × rayon.",
    triangle: "La hauteur doit être perpendiculaire à la base choisie.",
    trapeze: "Pour l'aire, seuls les deux bases parallèles et la hauteur comptent.",
  };
  return astuces[forme] || "Relis la formule avant de remplacer par les valeurs.";
}

function genererAstucePourcentage(type) {
  const astuces = {
    "trouver-pourcentage": "Pour 10%, tu peux diviser par 10 puis ajuster.",
    "quel-pourcentage": "Le total est toujours la référence (100%).",
    augmentation: "Augmenter de 20% revient à multiplier par 1,20.",
    reduction: "Réduire de 20% revient à multiplier par 0,80.",
  };
  return astuces[type] || "Pense à vérifier la cohérence du résultat obtenu.";
}

/**
 * Affiche un message d'erreur dans la zone de résultat
 */
function afficherErreur(zone, message) {
  zone.className = "resultat resultat--visible resultat--erreur";
  zone.innerHTML = "<strong>Erreur :</strong> " + message;
}


// ============================================================
// 9. DESSIN DES SCHÉMAS (SVG)
// ============================================================

/**
 * Dessine un schéma de la forme avec les cotations
 * @param {HTMLElement} conteneur - La zone de dessin
 * @param {string} forme - Le nom de la forme
 * @param {Object} mesures - Les mesures saisies par l'élève
 */
function dessinerSchema(conteneur, forme, mesures) {
  // Dimensions du SVG
  const W = 260;
  const H = 200;
  const marge = 40;

  // Couleurs du schéma (lues depuis les variables CSS)
  const style = getComputedStyle(document.documentElement);
  const couleurPrimaire = style.getPropertyValue("--color-primary").trim();
  const couleurTexte = style.getPropertyValue("--color-text-muted").trim();

  let svg = "";

  switch (forme) {
    case "rectangle": {
      // On dessine un rectangle centré avec les cotations
      const x = marge;
      const y = marge;
      const w = W - 2 * marge;
      const h = H - 2 * marge;

      svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">' +
        // Le rectangle rempli (couleur primaire transparente)
        '  <rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" ' +
        '    fill="' + couleurPrimaire + '" fill-opacity="0.12" stroke="' + couleurPrimaire + '" stroke-width="2" rx="4"/>' +
        // Cotation du bas (longueur)
        '  <text x="' + (W / 2) + '" y="' + (H - 8) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)">' + mesures.L + " m</text>" +
        // Cotation à droite (largeur)
        '  <text x="' + (W - 8) + '" y="' + (H / 2) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)" ' +
        '    transform="rotate(-90 ' + (W - 8) + " " + (H / 2) + ')">' + mesures.l + " m</text>" +
        "</svg>";
      break;
    }

    case "carre": {
      const taille = Math.min(W, H) - 2 * marge;
      const x = (W - taille) / 2;
      const y = (H - taille) / 2;

      svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">' +
        '  <rect x="' + x + '" y="' + y + '" width="' + taille + '" height="' + taille + '" ' +
        '    fill="' + couleurPrimaire + '" fill-opacity="0.12" stroke="' + couleurPrimaire + '" stroke-width="2" rx="4"/>' +
        // Petit carré "angle droit" en bas à gauche
        '  <rect x="' + x + '" y="' + (y + taille - 12) + '" width="12" height="12" ' +
        '    fill="none" stroke="' + couleurPrimaire + '" stroke-width="1.5"/>' +
        // Cotation du bas
        '  <text x="' + (W / 2) + '" y="' + (y + taille + 20) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)">' + mesures.c + " m</text>" +
        "</svg>";
      break;
    }

    case "cercle": {
      const cx = W / 2;
      const cy = H / 2;
      const rayonSVG = Math.min(W, H) / 2 - marge;

      svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">' +
        // Le cercle
        '  <circle cx="' + cx + '" cy="' + cy + '" r="' + rayonSVG + '" ' +
        '    fill="' + couleurPrimaire + '" fill-opacity="0.12" stroke="' + couleurPrimaire + '" stroke-width="2"/>' +
        // Point central
        '  <circle cx="' + cx + '" cy="' + cy + '" r="3" fill="' + couleurPrimaire + '"/>' +
        // Ligne du rayon (du centre au bord droit)
        '  <line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + rayonSVG) + '" y2="' + cy + '" ' +
        '    stroke="' + couleurPrimaire + '" stroke-width="1.5" stroke-dasharray="4 3"/>' +
        // Texte "r = ..."
        '  <text x="' + (cx + rayonSVG / 2) + '" y="' + (cy - 8) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)">r = ' + mesures.r + " m</text>" +
        "</svg>";
      break;
    }

    case "triangle": {
      // Triangle isocèle centré
      const bx1 = marge + 10;
      const bx2 = W - marge - 10;
      const by = H - marge;
      const sommetX = W / 2;
      const sommetY = marge;

      svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">' +
        '  <polygon points="' + sommetX + "," + sommetY + " " + bx1 + "," + by + " " + bx2 + "," + by + '" ' +
        '    fill="' + couleurPrimaire + '" fill-opacity="0.12" stroke="' + couleurPrimaire + '" stroke-width="2" stroke-linejoin="round"/>' +
        // Ligne de hauteur (pointillés)
        '  <line x1="' + sommetX + '" y1="' + sommetY + '" x2="' + sommetX + '" y2="' + by + '" ' +
        '    stroke="' + couleurTexte + '" stroke-width="1" stroke-dasharray="4 3"/>' +
        // Texte hauteur
        '  <text x="' + (sommetX + 16) + '" y="' + ((sommetY + by) / 2) + '" ' +
        '    fill="' + couleurTexte + '" font-size="12" font-family="var(--font-body)">h = ' + mesures.h + " m</text>" +
        // Texte base
        '  <text x="' + (W / 2) + '" y="' + (H - 8) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)">b = ' + mesures.b + " m</text>" +
        "</svg>";
      break;
    }

    case "trapeze": {
      // Trapèze avec grande base en bas et petite base en haut
      const y1 = marge;
      const y2 = H - marge;
      const decalage = 35;

      svg =
        '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">' +
        '  <polygon points="' +
        (marge + decalage) + "," + y1 + " " +
        (W - marge - decalage) + "," + y1 + " " +
        (W - marge) + "," + y2 + " " +
        marge + "," + y2 +
        '" fill="' + couleurPrimaire + '" fill-opacity="0.12" stroke="' + couleurPrimaire + '" stroke-width="2" stroke-linejoin="round"/>' +
        // Ligne de hauteur (pointillés)
        '  <line x1="' + (W / 2) + '" y1="' + y1 + '" x2="' + (W / 2) + '" y2="' + y2 + '" ' +
        '    stroke="' + couleurTexte + '" stroke-width="1" stroke-dasharray="4 3"/>' +
        // Texte petite base (en haut)
        '  <text x="' + (W / 2) + '" y="' + (y1 - 8) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="12" font-family="var(--font-body)">' + mesures.B2 + " m</text>" +
        // Texte grande base (en bas)
        '  <text x="' + (W / 2) + '" y="' + (H - 8) + '" text-anchor="middle" ' +
        '    fill="' + couleurTexte + '" font-size="13" font-family="var(--font-body)">' + mesures.B1 + " m</text>" +
        // Texte hauteur
        '  <text x="' + (W / 2 + 16) + '" y="' + ((y1 + y2) / 2) + '" ' +
        '    fill="' + couleurTexte + '" font-size="12" font-family="var(--font-body)">h = ' + mesures.h + " m</text>" +
        "</svg>";
      break;
    }
  }

  conteneur.innerHTML = svg;
}
