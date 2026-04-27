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
const CLE_MODE_PARCOURS_SIMPLE = "maths-paysager-parcours-simple";
const CLE_MOTIVATION = "maths-paysager-motivation";
const CLE_ATELIER_MENTAL = "maths-paysager-atelier-mental";
const CLE_JARDIN_QUETES = "maths-paysager-jardin-quetes";
const CLE_CONFIANCE_EXERCICE = "maths-paysager-confiance-exercice";
const CLE_INTERFACE_EPUREE = "maths-paysager-interface-epuree";
const MAX_HISTORIQUE = 20;
const sessionStats = { essais: 0, reussites: 0 };
let chronoInterval = null;
let chronoRestant = 0;
let parcoursCibleActif = null;

let exerciceActuel = null;
let questionAtelierActuelle = null;

// ============================================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("js-enhanced");
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
  const selectFormatExercice = document.getElementById("format-exercice");
  const selectObjectifSeance = document.getElementById("objectif-seance");
  const selectModeAccompagnement = document.getElementById("mode-accompagnement");
  const btnGenererExercice = document.getElementById("btn-generer-exercice");
  const btnValiderExercice = document.getElementById("btn-valider-exercice");
  const btnSuivantExercice = document.getElementById("btn-suivant-exercice");
  const btnJokerExercice = document.getElementById("btn-joker-exercice");
  const btnIndice1 = document.getElementById("btn-indice-1");
  const btnIndice2 = document.getElementById("btn-indice-2");
  const btnMethode = document.getElementById("btn-methode");
  const modeAdaptatif = document.getElementById("mode-adaptatif");
  const modeFocus = document.getElementById("mode-focus");
  const modeEtudeAccompagnee = document.getElementById("mode-etude-accompagnee");
  const modeEvaluation = document.getElementById("mode-evaluation");
  const modeChrono = document.getElementById("mode-chrono");
  const modeParcoursSimple = document.getElementById("mode-parcours-simple");
  const enonceExercice = document.getElementById("exercice-enonce");
  const rubanSessionExercice = document.getElementById("ruban-session-exercice");
  const recommandationExercice = document.getElementById("recommandation-exercice");
  const parcoursVisual = document.getElementById("parcours-visual");
  const coachEtapes = document.getElementById("coach-etapes");
  const objectifSession = document.getElementById("objectif-session");
  const competencesExercice = document.getElementById("competences-exercice");
  const pontMathsMetier = document.getElementById("pont-maths-metier");
  const ficheApprentissage = document.getElementById("fiche-apprentissage");
  const missionSuivante = document.getElementById("mission-suivante");
  const checklistVerification = document.getElementById("checklist-verification");
  const planRemediation = document.getElementById("plan-remediation");
  const planMaitrise = document.getElementById("plan-maitrise");
  const chronometreExercice = document.getElementById("chronometre-exercice");
  const diagnosticExercice = document.getElementById("diagnostic-exercice");
  const planRevision = document.getElementById("plan-revision");
  const tableauCompetences = document.getElementById("tableau-competences");
  const planEntrainementPersonnalise = document.getElementById("plan-entrainement-personnalise");
  const btnExportBilan = document.getElementById("btn-export-bilan");
  const sessionProgression = document.getElementById("session-progression");
  const motivationEleve = document.getElementById("motivation-eleve");
  const defiJour = document.getElementById("defi-jour");
  const btnAnalyserSeance = document.getElementById("btn-analyser-seance");
  const analyseApprentissage = document.getElementById("analyse-apprentissage");
  const uniteAttendue = document.getElementById("unite-attendue");
  const testsFormulesResultat = document.getElementById("tests-formules-resultat");
  const estimationExercice = document.getElementById("estimation-exercice");
  const confianceExercice = document.getElementById("confiance-exercice");
  const reponseExercice = document.getElementById("reponse-exercice");
  const feedbackExercice = document.getElementById("feedback-exercice");
  const insightConfiance = document.getElementById("insight-confiance");
  const feedbackEstimation = document.getElementById("feedback-estimation");
  const journalResolution = document.getElementById("journal-resolution");
  const feedbackJournalResolution = document.getElementById("feedback-journal-resolution");
  const roadmapExerciceLong = document.getElementById("roadmap-exercice-long");
  const radarCompetences = document.getElementById("radar-competences");
  const laboratoireErreurs = document.getElementById("laboratoire-erreurs");
  const progressionExercice = document.getElementById("progression-exercice");
  const badgesExercice = document.getElementById("badges-exercice");
  const historiqueExercice = document.getElementById("historique-exercice");
  const btnRejouerErreur = document.getElementById("btn-rejouer-erreur");
  const btnTestsFormules = document.getElementById("btn-tests-formules");
  const btnDemarrageRapide = document.getElementById("btn-demarrage-rapide");
  const btnReviserNotion = document.getElementById("btn-reviser-notion");
  const messageDemarrage = document.getElementById("message-demarrage");
  const moodCoachFeedback = document.getElementById("mood-coach-feedback");
  const microPlanList = document.getElementById("micro-plan-list");
  const microPlanResult = document.getElementById("micro-plan-result");
  const btnStartMicroPlan = document.getElementById("btn-start-micro-plan");
  const moodChips = document.querySelectorAll(".mood-chip");
  const btnFontMinus = document.getElementById("btn-font-minus");
  const btnFontPlus = document.getElementById("btn-font-plus");
  const modeContrasteFort = document.getElementById("mode-contraste-fort");
  const cockpitSessionGoal = document.getElementById("cockpit-session-goal");
  const cockpitSessionMeter = document.getElementById("cockpit-session-meter");
  const cockpitLastAction = document.getElementById("cockpit-last-action");
  const cockpitNextStep = document.getElementById("cockpit-next-step");
  const questLevel = document.getElementById("quest-level");
  const questXpMeter = document.getElementById("quest-xp-meter");
  const questXpHint = document.getElementById("quest-xp-hint");
  const questStreak = document.getElementById("quest-streak");
  const questDailyDescription = document.getElementById("quest-daily-description");
  const questDailyProgress = document.getElementById("quest-daily-progress");
  const questFeedback = document.getElementById("quest-feedback");
  const btnQuestReroll = document.getElementById("btn-quest-reroll");
  const atelierType = document.getElementById("atelier-type");
  const btnAtelierNouvelle = document.getElementById("btn-atelier-nouvelle");
  const btnAtelierVerifier = document.getElementById("btn-atelier-verifier");
  const atelierEnonce = document.getElementById("atelier-enonce");
  const atelierReponse = document.getElementById("atelier-reponse");
  const atelierFeedback = document.getElementById("atelier-feedback");
  const atelierScore = document.getElementById("atelier-score");
  const atelierSerie = document.getElementById("atelier-serie");
  const atelierConseil = document.getElementById("atelier-conseil");
  const citationJour = document.getElementById("citation-jour");
  const coachTemps = document.getElementById("coach-temps");
  const coachPriorite = document.getElementById("coach-priorite");
  const btnCoachPlan = document.getElementById("btn-coach-plan");
  const coachPlanSortie = document.getElementById("coach-plan-sortie");
  const convertisseurValeur = document.getElementById("convertisseur-valeur");
  const convertisseurType = document.getElementById("convertisseur-type");
  const btnConvertir = document.getElementById("btn-convertir");
  const convertisseurResultat = document.getElementById("convertisseur-resultat");
  const flashcardFormule = document.getElementById("flashcard-formule");
  const flashcardContenu = document.getElementById("flashcard-contenu");
  const flashcardIndice = document.getElementById("flashcard-indice");
  const btnFlashcardNext = document.getElementById("btn-flashcard-next");
  const studioFormat = document.getElementById("studio-format");
  const btnStudioGenerer = document.getElementById("btn-studio-generer");
  const btnStudioValider = document.getElementById("btn-studio-valider");
  const studioEnonce = document.getElementById("studio-enonce");
  const studioReponse = document.getElementById("studio-reponse");
  const studioFeedback = document.getElementById("studio-feedback");
  const studioScore = document.getElementById("studio-score");
  const studioCodeErreur = document.getElementById("studio-code-erreur");
  const studioMetacognition = document.getElementById("studio-metacognition");
  const experienceBannerText = document.getElementById("experience-banner-text");
  const parcoursIntuitifChips = document.querySelectorAll("[data-parcours]");
  const parcoursIntuitifSteps = document.getElementById("parcours-intuitif-steps");
  const parcoursIntuitifFeedback = document.getElementById("parcours-intuitif-feedback");
  const btnParcoursPremiereEtape = document.getElementById("btn-parcours-premiere-etape");
  const btnInterfaceEpuree = document.getElementById("btn-interface-epuree");


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
  initialiserInterfaceEpuree(btnInterfaceEpuree);
  initialiserSaisieDecimale();
  initialiserModeFocus(modeFocus);
  initialiserConfortAccessibilite(btnFontMinus, btnFontPlus, modeContrasteFort);
  initialiserNavigationConfort();
  initialiserExperienceFluide();
  initialiserCockpitApprentissage({
    sessionGoal: cockpitSessionGoal,
    sessionMeter: cockpitSessionMeter,
    lastAction: cockpitLastAction,
    nextStep: cockpitNextStep,
  });
  initialiserJardinQuetes({
    level: questLevel,
    xpMeter: questXpMeter,
    xpHint: questXpHint,
    streak: questStreak,
    dailyDescription: questDailyDescription,
    dailyProgress: questDailyProgress,
    feedback: questFeedback,
    btnReroll: btnQuestReroll,
  });
  initialiserCalculRapideClavier();
  initialiserAtelierMental({
    atelierType: atelierType,
    btnAtelierNouvelle: btnAtelierNouvelle,
    btnAtelierVerifier: btnAtelierVerifier,
    atelierEnonce: atelierEnonce,
    atelierReponse: atelierReponse,
    atelierFeedback: atelierFeedback,
    atelierScore: atelierScore,
    atelierSerie: atelierSerie,
    atelierConseil: atelierConseil,
  });
  initialiserCitationQuotidienne(citationJour);
  initialiserCoachRevision({
    coachTemps: coachTemps,
    coachPriorite: coachPriorite,
    btnCoachPlan: btnCoachPlan,
    coachPlanSortie: coachPlanSortie,
  });
  initialiserConvertisseurUnites({
    convertisseurValeur: convertisseurValeur,
    convertisseurType: convertisseurType,
    btnConvertir: btnConvertir,
    convertisseurResultat: convertisseurResultat,
  });
  initialiserFlashcardsFormules({
    flashcardFormule: flashcardFormule,
    flashcardContenu: flashcardContenu,
    flashcardIndice: flashcardIndice,
    btnFlashcardNext: btnFlashcardNext,
  });
  initialiserDemarrageRapide(btnDemarrageRapide, btnReviserNotion, messageDemarrage, {
    selectThemeExercice: selectThemeExercice,
    selectNiveauExercice: selectNiveauExercice,
    selectFormatExercice: selectFormatExercice,
    selectObjectifSeance: selectObjectifSeance,
    selectModeAccompagnement: selectModeAccompagnement,
    modeFocus: modeFocus,
    modeAdaptatif: modeAdaptatif,
    btnGenererExercice: btnGenererExercice,
  });
  initialiserCapApprentissage({
    moodCoachFeedback: moodCoachFeedback,
    microPlanList: microPlanList,
    microPlanResult: microPlanResult,
    btnStartMicroPlan: btnStartMicroPlan,
    moodChips: moodChips,
    selectThemeExercice: selectThemeExercice,
    selectNiveauExercice: selectNiveauExercice,
    selectFormatExercice: selectFormatExercice,
    selectModeAccompagnement: selectModeAccompagnement,
    modeFocus: modeFocus,
    modeEtudeAccompagnee: modeEtudeAccompagnee,
    btnGenererExercice: btnGenererExercice,
  });
  initialiserStudioMissions({
    studioFormat: studioFormat,
    btnStudioGenerer: btnStudioGenerer,
    btnStudioValider: btnStudioValider,
    studioEnonce: studioEnonce,
    studioReponse: studioReponse,
    studioFeedback: studioFeedback,
    studioScore: studioScore,
    studioCodeErreur: studioCodeErreur,
    studioMetacognition: studioMetacognition,
  });
  initialiserBanniereExperienceFluide(experienceBannerText);
  initialiserParcoursIntuitif({
    chips: parcoursIntuitifChips,
    steps: parcoursIntuitifSteps,
    feedback: parcoursIntuitifFeedback,
    btnFirstStep: btnParcoursPremiereEtape,
    main: document.querySelector(".main"),
  });

  // --- Mode exercices / progression ---
  initialiserModeExercices({
    selectThemeExercice: selectThemeExercice,
    selectNiveauExercice: selectNiveauExercice,
    selectObjectifSeance: selectObjectifSeance,
    selectModeAccompagnement: selectModeAccompagnement,
    btnGenererExercice: btnGenererExercice,
    btnValiderExercice: btnValiderExercice,
    btnSuivantExercice: btnSuivantExercice,
    btnJokerExercice: btnJokerExercice,
    btnIndice1: btnIndice1,
    btnIndice2: btnIndice2,
    btnMethode: btnMethode,
    modeAdaptatif: modeAdaptatif,
    modeEtudeAccompagnee: modeEtudeAccompagnee,
    modeEvaluation: modeEvaluation,
    modeChrono: modeChrono,
    modeParcoursSimple: modeParcoursSimple,
    enonceExercice: enonceExercice,
    rubanSessionExercice: rubanSessionExercice,
    recommandationExercice: recommandationExercice,
    parcoursVisual: parcoursVisual,
    coachEtapes: coachEtapes,
    objectifSession: objectifSession,
    competencesExercice: competencesExercice,
    pontMathsMetier: pontMathsMetier,
    ficheApprentissage: ficheApprentissage,
    missionSuivante: missionSuivante,
    checklistVerification: checklistVerification,
    planRemediation: planRemediation,
    planMaitrise: planMaitrise,
    chronometreExercice: chronometreExercice,
    diagnosticExercice: diagnosticExercice,
    planRevision: planRevision,
    tableauCompetences: tableauCompetences,
    planEntrainementPersonnalise: planEntrainementPersonnalise,
    sessionProgression: sessionProgression,
    motivationEleve: motivationEleve,
    defiJour: defiJour,
    btnAnalyserSeance: btnAnalyserSeance,
    analyseApprentissage: analyseApprentissage,
    uniteAttendue: uniteAttendue,
    testsFormulesResultat: testsFormulesResultat,
    estimationExercice: estimationExercice,
    confianceExercice: confianceExercice,
    reponseExercice: reponseExercice,
    feedbackExercice: feedbackExercice,
    insightConfiance: insightConfiance,
    feedbackEstimation: feedbackEstimation,
    journalResolution: journalResolution,
    feedbackJournalResolution: feedbackJournalResolution,
    roadmapExerciceLong: roadmapExerciceLong,
    radarCompetences: radarCompetences,
    laboratoireErreurs: laboratoireErreurs,
    progressionExercice: progressionExercice,
    badgesExercice: badgesExercice,
    historiqueExercice: historiqueExercice,
    btnRejouerErreur: btnRejouerErreur,
    btnTestsFormules: btnTestsFormules,
    btnExportBilan: btnExportBilan,
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

function initialiserInterfaceEpuree(boutonInterface) {
  if (!boutonInterface) return;

  const appliquerEtatInterface = function (estEpuree) {
    document.body.classList.toggle("interface-epuree", estEpuree);
    boutonInterface.setAttribute("aria-pressed", estEpuree ? "true" : "false");
    boutonInterface.textContent = estEpuree
      ? "Afficher les outils avancés"
      : "Revenir à l'interface épurée";
  };

  const valeurStockee = localStorage.getItem(CLE_INTERFACE_EPUREE);
  const modeEpureActif = valeurStockee === null ? true : valeurStockee === "1";
  appliquerEtatInterface(modeEpureActif);

  boutonInterface.addEventListener("click", function () {
    const nouvelEtat = !document.body.classList.contains("interface-epuree");
    appliquerEtatInterface(nouvelEtat);
    localStorage.setItem(CLE_INTERFACE_EPUREE, nouvelEtat ? "1" : "0");
  });
}

function initialiserCitationQuotidienne(zoneCitation) {
  if (!zoneCitation) return;

  const citations = [
    "Mesurer un jardin, c'est déjà dessiner sa beauté avec les maths.",
    "Chaque mètre bien calculé devient un espace bien aménagé.",
    "Les maths donnent une forme précise aux idées du paysagiste.",
    "Tracer, compter, planter : la réussite du chantier commence avec les maths.",
    "Une bordure droite naît d'un bon calcul avant le premier coup de bêche.",
    "Comprendre les surfaces, c'est mieux préparer les plantations.",
    "Les pourcentages aident à doser juste : ni trop, ni trop peu.",
    "En aménagement paysager, un calcul clair évite beaucoup d'erreurs.",
    "Les maths transforment un plan sur papier en paysage réel.",
    "Bien calculer aujourd'hui, c'est gagner du temps sur le chantier demain.",
  ];

  const maintenant = new Date();
  const debutAnnee = new Date(maintenant.getFullYear(), 0, 1);
  const numeroJour = Math.floor((maintenant - debutAnnee) / 86400000);
  const indexCitation = numeroJour % citations.length;
  zoneCitation.textContent = citations[indexCitation];
}

function initialiserCoachRevision(options) {
  if (!options || !options.btnCoachPlan || !options.coachPlanSortie) return;

  options.btnCoachPlan.addEventListener("click", function () {
    const progression = chargerProgression();
    const minutes = Math.max(10, Math.min(120, parserNombreLocale(options.coachTemps ? options.coachTemps.value : "30") || 30));
    const prioriteChoisie = options.coachPriorite ? options.coachPriorite.value : "auto";
    const priorite = prioriteChoisie === "auto" ? determinerPrioriteFaible(progression) : prioriteChoisie;
    const blocs = genererBlocsRevision(minutes);
    const libellePriorite = libelleCompetence(priorite);
    const tauxGlobal = progression.essais > 0 ? (progression.reussites / progression.essais) * 100 : 0;

    options.coachPlanSortie.innerHTML =
      "<p><strong>Plan du jour (" + minutes + " min)</strong></p>" +
      "<p>Priorité conseillée : <strong>" + libellePriorite + "</strong> — taux global actuel : <strong>" + arrondir(tauxGlobal) + "%</strong>.</p>" +
      "<ol class=\"coach-plan-list\">" +
      "<li><strong>" + blocs.echauffement + " min</strong> d'échauffement : atelier mental + 2 conversions rapides.</li>" +
      "<li><strong>" + blocs.noyau + " min</strong> sur <strong>" + libellePriorite + "</strong> : 3 exercices guidés puis 1 exercice autonome.</li>" +
      "<li><strong>" + blocs.transfert + " min</strong> de transfert métier : explique à voix haute la formule choisie et l'unité finale.</li>" +
      "<li><strong>" + blocs.bilan + " min</strong> de bilan : note 1 erreur évitée et 1 astuce à réutiliser.</li>" +
      "</ol>" +
      "<p class=\"resultat__astuce\"><strong>Conseil coach :</strong> vise la régularité (20 à 30 min/jour) plutôt qu'une longue séance occasionnelle.</p>";

    notifierActionApprentissage({ type: "plan-revision", competence: priorite });
  });
}

function determinerPrioriteFaible(progression) {
  const competences = ["aires-perimetres", "pourcentages", "situations-metier"];
  let priorite = competences[0];
  let pireTaux = 1;

  competences.forEach(function (cle) {
    const stats = progression.competences[cle] || { essais: 0, reussites: 0 };
    const taux = stats.essais > 0 ? stats.reussites / stats.essais : 0;
    if (taux < pireTaux) {
      pireTaux = taux;
      priorite = cle;
    }
  });

  return priorite;
}

function genererBlocsRevision(minutes) {
  const echauffement = Math.max(4, Math.round(minutes * 0.2));
  const noyau = Math.max(8, Math.round(minutes * 0.5));
  const transfert = Math.max(4, Math.round(minutes * 0.2));
  const bilan = Math.max(2, minutes - echauffement - noyau - transfert);
  return { echauffement: echauffement, noyau: noyau, transfert: transfert, bilan: bilan };
}

function libelleCompetence(competence) {
  const labels = {
    "aires-perimetres": "Aires et périmètres",
    pourcentages: "Pourcentages",
    "situations-metier": "Situations métier",
  };
  return labels[competence] || "Compétence transversale";
}

function initialiserConvertisseurUnites(options) {
  if (!options || !options.btnConvertir || !options.convertisseurResultat) return;

  options.btnConvertir.addEventListener("click", function () {
    const valeur = parserNombreLocale(options.convertisseurValeur ? options.convertisseurValeur.value : "");
    const type = options.convertisseurType ? options.convertisseurType.value : "m-cm";
    if (isNaN(valeur)) {
      afficherErreur(options.convertisseurResultat, "Renseigne une valeur numérique avant de convertir.");
      return;
    }

    const conversion = convertirUnite(valeur, type);
    options.convertisseurResultat.className = "resultat resultat--visible";
    options.convertisseurResultat.innerHTML =
      "<div class=\"resultat__ligne\"><span class=\"resultat__label\">Résultat :</span><span class=\"resultat__valeur\">" +
      arrondir(conversion.valeur) + " " + conversion.unite +
      "</span></div>" +
      "<p class=\"resultat__astuce\"><strong>Méthode :</strong> " + conversion.explic + "</p>";
  });
}

function convertirUnite(valeur, type) {
  switch (type) {
    case "m-cm":
      return { valeur: valeur * 100, unite: "cm", explic: "1 m = 100 cm, donc on multiplie par 100." };
    case "cm-m":
      return { valeur: valeur / 100, unite: "m", explic: "1 cm = 0,01 m, donc on divise par 100." };
    case "m2-ha":
      return { valeur: valeur / 10000, unite: "ha", explic: "1 ha = 10 000 m², donc on divise par 10 000." };
    case "ha-m2":
      return { valeur: valeur * 10000, unite: "m²", explic: "1 ha = 10 000 m², donc on multiplie par 10 000." };
    case "l-m3":
      return { valeur: valeur / 1000, unite: "m³", explic: "1 m³ = 1 000 L, donc on divise par 1 000." };
    case "m3-l":
      return { valeur: valeur * 1000, unite: "L", explic: "1 m³ = 1 000 L, donc on multiplie par 1 000." };
    default:
      return { valeur: valeur, unite: "", explic: "Aucune conversion appliquée." };
  }
}

function initialiserFlashcardsFormules(options) {
  if (!options || !options.flashcardFormule || !options.flashcardContenu || !options.flashcardIndice || !options.btnFlashcardNext) return;

  const cartes = [
    { question: "Rectangle : aire ?", reponse: "A = longueur × largeur" },
    { question: "Rectangle : périmètre ?", reponse: "P = 2 × (longueur + largeur)" },
    { question: "Cercle : périmètre ?", reponse: "P = 2 × π × rayon" },
    { question: "Triangle : aire ?", reponse: "A = (base × hauteur) ÷ 2" },
    { question: "Trouver X% de N ?", reponse: "(X × N) ÷ 100" },
    { question: "Part en pourcentage ?", reponse: "(partie ÷ total) × 100" },
  ];
  let index = 0;
  let afficheReponse = false;

  function afficherCarte() {
    const carte = cartes[index];
    options.flashcardContenu.textContent = afficheReponse ? carte.reponse : carte.question;
    options.flashcardIndice.textContent = afficheReponse
      ? "Explique à voix haute à quoi sert cette formule."
      : "Clique pour révéler la réponse.";
    options.flashcardFormule.classList.toggle("flashcard--answer", afficheReponse);
  }

  function carteSuivante() {
    index = (index + 1) % cartes.length;
    afficheReponse = false;
    afficherCarte();
  }

  options.flashcardFormule.addEventListener("click", function () {
    afficheReponse = !afficheReponse;
    afficherCarte();
  });
  options.flashcardFormule.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      afficheReponse = !afficheReponse;
      afficherCarte();
    }
  });
  options.btnFlashcardNext.addEventListener("click", carteSuivante);
  afficherCarte();
}

function initialiserModeFocus(caseFocus) {
  const CLE_MODE_FOCUS = "maths-paysager-mode-focus";
  const body = document.body;
  if (!caseFocus || !body) return;

  const modeMemoire = localStorage.getItem(CLE_MODE_FOCUS) === "1";
  caseFocus.checked = modeMemoire;
  body.classList.toggle("mode-focus", modeMemoire);

  caseFocus.addEventListener("change", function () {
    const actif = !!caseFocus.checked;
    body.classList.toggle("mode-focus", actif);
    localStorage.setItem(CLE_MODE_FOCUS, actif ? "1" : "0");
  });
}

function initialiserConfortAccessibilite(btnMinus, btnPlus, toggleContraste) {
  const CLE_FONT = "maths-paysager-font-scale";
  const CLE_CONTRASTE = "maths-paysager-contrast";
  const body = document.body;
  if (!body) return;

  const fontScale = localStorage.getItem(CLE_FONT) || "normal";
  body.setAttribute("data-font-scale", fontScale);

  const contrasteActif = localStorage.getItem(CLE_CONTRASTE) === "1";
  body.classList.toggle("contrast-fort", contrasteActif);
  if (toggleContraste) toggleContraste.checked = contrasteActif;

  if (btnMinus) {
    btnMinus.addEventListener("click", function () {
      body.setAttribute("data-font-scale", "small");
      localStorage.setItem(CLE_FONT, "small");
    });
  }
  if (btnPlus) {
    btnPlus.addEventListener("click", function () {
      body.setAttribute("data-font-scale", "large");
      localStorage.setItem(CLE_FONT, "large");
    });
  }
  if (toggleContraste) {
    toggleContraste.addEventListener("change", function () {
      const actif = !!toggleContraste.checked;
      body.classList.toggle("contrast-fort", actif);
      localStorage.setItem(CLE_CONTRASTE, actif ? "1" : "0");
    });
  }
}

function initialiserDemarrageRapide(btnRapide, btnRevision, zoneMessage, ui) {
  if (!btnRapide || !btnRevision || !ui) return;
  btnRapide.addEventListener("click", function () {
    ui.selectThemeExercice.value = "metier";
    ui.selectNiveauExercice.value = "facile";
    ui.selectObjectifSeance.value = "metier";
    if (ui.selectModeAccompagnement) ui.selectModeAccompagnement.value = "guide";
    if (ui.modeFocus) ui.modeFocus.checked = true;
    if (ui.modeAdaptatif) ui.modeAdaptatif.checked = true;
    document.body.classList.toggle("mode-focus", true);
    if (zoneMessage) {
      zoneMessage.textContent = "Parcours rapide lancé : 3 exercices métiers niveau facile.";
    }
    ui.btnGenererExercice.click();
  });

  btnRevision.addEventListener("click", function () {
    ui.selectThemeExercice.value = "aires";
    ui.selectNiveauExercice.value = "facile";
    ui.selectObjectifSeance.value = "unites";
    if (ui.selectModeAccompagnement) ui.selectModeAccompagnement.value = "guide";
    if (ui.modeAdaptatif) ui.modeAdaptatif.checked = false;
    if (zoneMessage) {
      zoneMessage.textContent = "Parcours révision activé : notion + unité d'abord, puis validation.";
    }
    ui.btnGenererExercice.click();
  });
}

function initialiserCapApprentissage(ui) {
  if (!ui || !ui.moodChips || !ui.moodChips.length || !ui.btnStartMicroPlan) return;

  const plansParHumeur = {
    focus: {
      feedback: "Très bon état d'esprit. Tu peux viser une mission guidée puis une mission plus autonome.",
      steps: [
        "1 min : lis l'énoncé et repère l'unité finale.",
        "4 min : réalise un exercice guidé sans te presser.",
        "2 min : vérifie méthode + ordre de grandeur.",
        "1 min : note 1 réflexe à réutiliser en chantier."
      ],
      preset: { theme: "metier", niveau: "moyen", format: "guide", accompagnement: "autonome", focus: true },
    },
    stress: {
      feedback: "Respire 20 secondes : on avance en étapes courtes. Priorité à la compréhension, pas à la vitesse.",
      steps: [
        "2 min : relis calmement l'énoncé et reformule la question.",
        "3 min : fais un exercice facile avec indices.",
        "2 min : compare ta méthode avec la correction.",
        "1 min : écris la formule clé sur un brouillon."
      ],
      preset: { theme: "aires", niveau: "facile", format: "guide", accompagnement: "guide", focus: true },
    },
    fatigue: {
      feedback: "On simplifie : objectif mini mais réussi. Une petite victoire relance la motivation.",
      steps: [
        "1 min : choisis un thème unique.",
        "3 min : fais un calcul direct court.",
        "2 min : vérifie uniquement unité et ordre de grandeur.",
        "2 min : fais une question d'atelier mental pour terminer."
      ],
      preset: { theme: "pourcentages", niveau: "facile", format: "direct", accompagnement: "guide", focus: false },
    },
    motivation: {
      feedback: "Énergie haute : parfait pour un défi progressif. Garde une vérification rigoureuse à la fin.",
      steps: [
        "1 min : estimation rapide du résultat attendu.",
        "4 min : mission chantier multi-étapes.",
        "2 min : vérifie les unités à chaque ligne.",
        "1 min : reformule la méthode comme si tu l'expliquais à un camarade."
      ],
      preset: { theme: "metier", niveau: "difficile", format: "chantier", accompagnement: "defi", focus: true },
    },
  };

  let humeurActive = "focus";

  function appliquerPlan(humeur) {
    const plan = plansParHumeur[humeur] || plansParHumeur.focus;
    humeurActive = humeur;

    ui.moodChips.forEach(function (chip) {
      chip.classList.toggle("mood-chip--active", chip.dataset.mood === humeur);
      chip.setAttribute("aria-pressed", chip.dataset.mood === humeur ? "true" : "false");
    });

    if (ui.moodCoachFeedback) ui.moodCoachFeedback.textContent = plan.feedback;
    if (ui.microPlanList) {
      ui.microPlanList.innerHTML = plan.steps.map(function (etape) {
        return "<li>" + etape + "</li>";
      }).join("");
    }
  }

  ui.moodChips.forEach(function (chip) {
    chip.setAttribute("aria-pressed", chip.classList.contains("mood-chip--active") ? "true" : "false");
    chip.addEventListener("click", function () {
      appliquerPlan(chip.dataset.mood || "focus");
    });
  });

  ui.btnStartMicroPlan.addEventListener("click", function () {
    const plan = plansParHumeur[humeurActive] || plansParHumeur.focus;
    if (ui.selectThemeExercice) ui.selectThemeExercice.value = plan.preset.theme;
    if (ui.selectNiveauExercice) ui.selectNiveauExercice.value = plan.preset.niveau;
    if (ui.selectFormatExercice) ui.selectFormatExercice.value = plan.preset.format;
    if (ui.selectModeAccompagnement) ui.selectModeAccompagnement.value = plan.preset.accompagnement;
    if (ui.modeFocus) {
      ui.modeFocus.checked = !!plan.preset.focus;
      document.body.classList.toggle("mode-focus", !!plan.preset.focus);
    }
    if (ui.modeEtudeAccompagnee) ui.modeEtudeAccompagnee.checked = true;
    if (ui.microPlanResult) {
      ui.microPlanResult.textContent = "Parcours appliqué : " + plan.preset.theme + " · niveau " + plan.preset.niveau + ". Exercice lancé ✅";
    }
    if (ui.btnGenererExercice) ui.btnGenererExercice.click();
    notifierActionApprentissage({ type: "micro-plan", competence: plan.preset.theme });
  });

  appliquerPlan("focus");
}

function initialiserCockpitApprentissage(elements) {
  if (!elements) return;
  mettreAJourCockpitApprentissage(elements, { type: "init" });
  document.addEventListener("maths-paysager:action", function (event) {
    mettreAJourCockpitApprentissage(elements, event && event.detail ? event.detail : { type: "maj" });
  });
}

function notifierActionApprentissage(action) {
  document.dispatchEvent(new CustomEvent("maths-paysager:action", { detail: action || { type: "maj" } }));
}

function mettreAJourCockpitApprentissage(elements, action) {
  if (!elements.sessionGoal || !elements.sessionMeter || !elements.lastAction || !elements.nextStep) return;
  const essaisSession = sessionStats.essais || 0;
  const reussitesSession = sessionStats.reussites || 0;
  const objectif = 5;
  const progressionObjectif = Math.min(100, (reussitesSession / objectif) * 100);
  elements.sessionGoal.textContent = reussitesSession + " / " + objectif + " exercices validés";
  elements.sessionMeter.style.width = progressionObjectif + "%";

  const progressionGlobale = chargerProgression();
  const tauxGlobal = progressionGlobale.essais > 0
    ? Math.round((progressionGlobale.reussites / progressionGlobale.essais) * 100)
    : 0;

  const typeAction = action && action.type ? action.type : "init";
  if (typeAction === "calcul-forme") {
    elements.lastAction.textContent = "Bravo, tu as finalisé un calcul d'aire et de périmètre.";
    elements.nextStep.textContent = "Passe sur un exercice CAPa pour réutiliser la formule dans un contexte métier.";
    return;
  }
  if (typeAction === "calcul-pourcentage") {
    elements.lastAction.textContent = "Calcul de pourcentage réussi : méthode appliquée correctement.";
    elements.nextStep.textContent = "Enchaîne avec un deuxième calcul pour automatiser le réflexe ×/÷ 100.";
    return;
  }
  if (typeAction === "exercice-correct") {
    elements.lastAction.textContent = "Exercice validé ✅ (" + reussitesSession + " réussite(s) cette séance).";
    elements.nextStep.textContent = essaisSession < objectif
      ? "Continue : vise encore " + Math.max(0, objectif - reussitesSession) + " réussite(s)."
      : "Excellent rythme : tente un niveau supérieur pour consolider.";
    return;
  }
  if (typeAction === "exercice-erreur") {
    elements.lastAction.textContent = "Pas grave, l'erreur fait partie de l'apprentissage.";
    elements.nextStep.textContent = "Lis l'indice, corrige l'unité puis refais un exercice similaire.";
    return;
  }
  if (typeAction === "nouvel-exercice") {
    elements.lastAction.textContent = "Nouvel exercice lancé : concentre-toi sur les données utiles.";
    elements.nextStep.textContent = "Astuce : estime d'abord l'ordre de grandeur, puis calcule.";
    return;
  }
  if (typeAction === "micro-plan") {
    elements.lastAction.textContent = "Parcours personnalisé lancé selon ton énergie du moment.";
    elements.nextStep.textContent = "Suis les 4 mini-étapes et valide au moins 1 exercice avant de changer de thème.";
    return;
  }

  elements.lastAction.textContent = "Historique global : " + progressionGlobale.reussites + " réussites sur " + progressionGlobale.essais + " essais.";
  elements.nextStep.textContent = tauxGlobal >= 70
    ? "Tu progresses bien (" + tauxGlobal + "%) : teste le mode autonome."
    : "Objectif du jour : atteindre 70% de réussite en prenant ton temps.";
}

function initialiserJardinQuetes(ui) {
  if (!ui || !ui.level || !ui.xpMeter || !ui.streak || !ui.dailyDescription || !ui.dailyProgress || !ui.feedback) return;
  let etat = chargerJardinQuetes();
  etat = assurerDefiJour(etat);
  sauvegarderJardinQuetes(etat);
  afficherJardinQuetes(ui, etat);

  document.addEventListener("maths-paysager:action", function (event) {
    const action = event && event.detail ? event.detail : { type: "maj" };
    if (!action || !action.type) return;
    if (!actionComptePourQuete(action.type)) return;

    etat = appliquerActiviteJournaliere(etat);
    etat = incrementerProgressionDefi(etat, action.type);
    etat = attribuerRecompenseSiDefiValide(etat, ui.feedback);
    sauvegarderJardinQuetes(etat);
    afficherJardinQuetes(ui, etat);
  });

  if (ui.btnReroll) {
    ui.btnReroll.addEventListener("click", function () {
      const dateJour = obtenirDateJour();
      if (etat.rerollDate === dateJour) {
        ui.feedback.textContent = "Tu as déjà changé ton défi aujourd'hui. Reviens demain pour un nouveau tirage.";
        return;
      }
      const indexSuivant = (Number(etat.defiIndex) + 1) % CATALOGUE_DEFIS_JOUR.length;
      etat.defiIndex = indexSuivant;
      etat.defi = CATALOGUE_DEFIS_JOUR[indexSuivant];
      etat.defiDate = dateJour;
      etat.defiProgress = 0;
      etat.defiComplete = false;
      etat.defiRewardClaimed = false;
      etat.rerollDate = dateJour;
      sauvegarderJardinQuetes(etat);
      afficherJardinQuetes(ui, etat);
      ui.feedback.textContent = "Nouveau défi prêt : montre ce que tu sais faire 💪";
    });
  }
}

const CATALOGUE_DEFIS_JOUR = [
  { label: "Valide 2 calculs de surface ou pourcentage.", cible: 2, typeAction: "calcul", xp: 30 },
  { label: "Réussis 2 exercices guidés (ou questions atelier).", cible: 2, typeAction: "validation", xp: 40 },
  { label: "Enchaîne 3 actions utiles sans t'arrêter.", cible: 3, typeAction: "toutes", xp: 45 },
];

function chargerJardinQuetes() {
  const valeurParDefaut = {
    xpTotal: 0,
    streak: 0,
    lastActiveDate: "",
    defiDate: "",
    defiIndex: 0,
    defi: null,
    defiProgress: 0,
    defiComplete: false,
    defiRewardClaimed: false,
    rerollDate: "",
  };
  try {
    const brut = localStorage.getItem(CLE_JARDIN_QUETES);
    if (!brut) return valeurParDefaut;
    const data = JSON.parse(brut);
    return {
      xpTotal: Number(data.xpTotal) || 0,
      streak: Number(data.streak) || 0,
      lastActiveDate: typeof data.lastActiveDate === "string" ? data.lastActiveDate : "",
      defiDate: typeof data.defiDate === "string" ? data.defiDate : "",
      defiIndex: Number(data.defiIndex) || 0,
      defi: data.defi || null,
      defiProgress: Number(data.defiProgress) || 0,
      defiComplete: Boolean(data.defiComplete),
      defiRewardClaimed: Boolean(data.defiRewardClaimed),
      rerollDate: typeof data.rerollDate === "string" ? data.rerollDate : "",
    };
  } catch (e) {
    return valeurParDefaut;
  }
}

function sauvegarderJardinQuetes(etat) {
  localStorage.setItem(CLE_JARDIN_QUETES, JSON.stringify(etat));
}

function obtenirDateJour() {
  return new Date().toISOString().slice(0, 10);
}

function obtenirDateHier(dateJour) {
  const date = new Date(dateJour + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function assurerDefiJour(etat) {
  const dateJour = obtenirDateJour();
  if (etat.defiDate === dateJour && etat.defi) return etat;

  const dateReference = new Date(dateJour + "T00:00:00Z");
  const jourDeLAnnee = Math.floor((dateReference - new Date(Date.UTC(dateReference.getUTCFullYear(), 0, 0))) / 86400000);
  const indexDefi = jourDeLAnnee % CATALOGUE_DEFIS_JOUR.length;
  etat.defiDate = dateJour;
  etat.defiIndex = indexDefi;
  etat.defi = CATALOGUE_DEFIS_JOUR[indexDefi];
  etat.defiProgress = 0;
  etat.defiComplete = false;
  etat.defiRewardClaimed = false;
  return etat;
}

function actionComptePourQuete(typeAction) {
  return ["calcul-forme", "calcul-pourcentage", "exercice-correct"].indexOf(typeAction) !== -1;
}

function appliquerActiviteJournaliere(etat) {
  const dateJour = obtenirDateJour();
  if (etat.lastActiveDate === dateJour) return etat;
  etat.streak = etat.lastActiveDate === obtenirDateHier(dateJour) ? (etat.streak + 1) : 1;
  etat.lastActiveDate = dateJour;
  return etat;
}

function incrementerProgressionDefi(etat, typeAction) {
  etat = assurerDefiJour(etat);
  if (!etat.defi || etat.defiComplete) return etat;

  const typeDefi = etat.defi.typeAction;
  const progressionAutorisee =
    typeDefi === "toutes" ||
    (typeDefi === "calcul" && (typeAction === "calcul-forme" || typeAction === "calcul-pourcentage")) ||
    (typeDefi === "validation" && typeAction === "exercice-correct");

  if (!progressionAutorisee) return etat;

  etat.defiProgress = Math.min(etat.defi.cible, etat.defiProgress + 1);
  if (etat.defiProgress >= etat.defi.cible) {
    etat.defiComplete = true;
  }
  return etat;
}

function attribuerRecompenseSiDefiValide(etat, zoneFeedback) {
  if (!etat.defiComplete || etat.defiRewardClaimed || !etat.defi) return etat;
  etat.xpTotal += etat.defi.xp;
  etat.defiRewardClaimed = true;
  if (zoneFeedback) {
    zoneFeedback.textContent = "Défi réussi 🎉 +" + etat.defi.xp + " XP gagnés. Continue pour monter de niveau.";
  }
  return etat;
}

function calculerNiveauXP(xpTotal) {
  let niveau = 1;
  let xpReste = Math.max(0, Number(xpTotal) || 0);
  let seuil = 120;
  while (xpReste >= seuil) {
    xpReste -= seuil;
    niveau += 1;
    seuil = 120 + (niveau - 1) * 40;
  }
  return { niveau: niveau, xpCourant: xpReste, xpProchainNiveau: seuil };
}

function afficherJardinQuetes(ui, etat) {
  const progression = calculerNiveauXP(etat.xpTotal);
  const pourcentageXp = Math.round((progression.xpCourant / progression.xpProchainNiveau) * 100);
  ui.level.textContent = "Niveau " + progression.niveau + " · " + etat.xpTotal + " XP";
  ui.xpMeter.style.width = Math.max(0, Math.min(100, pourcentageXp)) + "%";
  if (ui.xpHint) {
    const restant = progression.xpProchainNiveau - progression.xpCourant;
    ui.xpHint.textContent = "Encore " + restant + " XP pour passer au niveau " + (progression.niveau + 1) + ".";
  }
  ui.streak.textContent = etat.streak + " jour" + (etat.streak > 1 ? "s" : "");

  etat = assurerDefiJour(etat);
  const defi = etat.defi || CATALOGUE_DEFIS_JOUR[0];
  ui.dailyDescription.textContent = defi.label + " (récompense : +" + defi.xp + " XP)";
  ui.dailyProgress.textContent = etat.defiProgress + " / " + defi.cible + (etat.defiComplete ? " ✅" : "");
}


function initialiserNavigationConfort() {
  const boutonTop = document.getElementById("btn-retour-haut");
  const barreProgression = document.getElementById("scroll-progress-bar");

  function actualiserProgression() {
    const hauteurScrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progression = hauteurScrollable > 0 ? (window.scrollY / hauteurScrollable) * 100 : 0;
    if (barreProgression) {
      barreProgression.style.width = Math.min(100, Math.max(0, progression)) + "%";
    }
    if (boutonTop) {
      boutonTop.classList.toggle("btn-top--visible", window.scrollY > 260);
    }
  }

  if (boutonTop) {
    boutonTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", actualiserProgression, { passive: true });
  window.addEventListener("resize", actualiserProgression);
  actualiserProgression();
}

function initialiserExperienceFluide() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elementsReveles = document.querySelectorAll(".card, .study-routine__card, .learning-cockpit__card, .comfort-bar, .orientation-strip__item");

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    elementsReveles.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    const observateurRevelation = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    elementsReveles.forEach(function (element) {
      observateurRevelation.observe(element);
    });
  }

  const liensNavigation = Array.from(document.querySelectorAll(".quick-nav__link"));
  if (!liensNavigation.length || typeof IntersectionObserver === "undefined") return;

  const sectionsObservees = liensNavigation
    .map(function (lien) {
      const href = lien.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return null;
      const section = document.querySelector(href);
      if (!section) return null;
      return { lien: lien, section: section };
    })
    .filter(Boolean);

  if (!sectionsObservees.length) return;

  const observateurSections = new IntersectionObserver(function (entries) {
    const visibles = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });

    if (!visibles.length) return;
    const sectionActive = visibles[0].target;
    sectionsObservees.forEach(function (item) {
      const active = item.section === sectionActive;
      item.lien.classList.toggle("is-active", active);
      if (active) {
        item.lien.setAttribute("aria-current", "page");
      } else {
        item.lien.removeAttribute("aria-current");
      }
    });
  }, { threshold: [0.3, 0.5, 0.75], rootMargin: "-20% 0px -35% 0px" });

  sectionsObservees.forEach(function (item) {
    observateurSections.observe(item.section);
  });
}

function initialiserParcoursIntuitif(ui) {
  if (!ui || !ui.chips || !ui.chips.length || !ui.steps || !ui.feedback || !ui.main) return;

  const definitionParcours = {
    bases: {
      feedback: "Parfait pour consolider les fondamentaux : on privilégie des calculs courts et répétitifs.",
      sections: ["formes", "pourcent", "memo", "atelier"],
      steps: [
        "Commence par 2 calculs d'aire/périmètre pour revoir les formules.",
        "Enchaîne avec 2 exercices de pourcentage pour automatiser ×/÷ 100.",
        "Termine avec 3 questions d'atelier mental pour fixer les réflexes."
      ],
      firstTarget: "#section-formes",
      action: { type: "parcours-bases", competence: "fondamentaux" },
    },
    metier: {
      feedback: "Ce parcours connecte les maths à des situations de chantier : utile pour mieux mémoriser.",
      sections: ["studio", "exercices", "coach"],
      steps: [
        "Lance une mission terrain dans le Studio (format guidé ou chantier).",
        "Passe au mode exercices CAPa pour appliquer la même logique en autonomie.",
        "Crée ton plan avec le coach de révision pour préparer la prochaine séance."
      ],
      firstTarget: "#section-studio-missions",
      action: { type: "parcours-metier", competence: "transfert-metier" },
    },
    evaluation: {
      feedback: "Objectif évaluation : te mettre dans les conditions du contrôle avec vérifications rapides.",
      sections: ["exercices", "atelier", "memo"],
      steps: [
        "Active un exercice avec accompagnement autonome ou défi.",
        "Chronomètre-toi sur une série courte de questions d'atelier mental.",
        "Relis l'aide-mémoire et note 2 formules à réviser ce soir."
      ],
      firstTarget: "#section-exercices",
      action: { type: "parcours-evaluation", competence: "evaluation" },
    },
    complet: {
      feedback: "Vue complète activée : toutes les sections restent visibles pour explorer librement.",
      sections: [],
      steps: [
        "Choisis un objectif simple de séance (ex : 3 exercices validés).",
        "Utilise la navigation rapide pour alterner calculs, entraînement et correction.",
        "Note une astuce clé à retenir avant de quitter l'application."
      ],
      firstTarget: "#section-demarrage",
      action: { type: "parcours-complet", competence: "organisation" },
    },
  };

  const sections = Array.from(document.querySelectorAll("[data-learning-section]"));
  let parcoursActif = "bases";

  function appliquerParcours(cleParcours) {
    const parcours = definitionParcours[cleParcours] || definitionParcours.bases;
    parcoursActif = cleParcours;

    ui.chips.forEach(function (chip) {
      const actif = chip.dataset.parcours === cleParcours;
      chip.classList.toggle("mood-chip--active", actif);
      chip.setAttribute("aria-pressed", actif ? "true" : "false");
    });

    ui.feedback.textContent = parcours.feedback;
    ui.steps.innerHTML = parcours.steps.map(function (step) {
      return "<li>" + step + "</li>";
    }).join("");

    const filtrer = parcours.sections.length > 0;
    ui.main.setAttribute("data-learning-view", filtrer ? "filtered" : "all");
    sections.forEach(function (section) {
      const cle = section.dataset.learningSection;
      const estVisible = !filtrer || parcours.sections.indexOf(cle) !== -1;
      section.classList.toggle("section-muted", !estVisible);
    });

    notifierActionApprentissage(parcours.action);
  }

  ui.chips.forEach(function (chip) {
    chip.setAttribute("aria-pressed", chip.classList.contains("mood-chip--active") ? "true" : "false");
    chip.addEventListener("click", function () {
      appliquerParcours(chip.dataset.parcours || "bases");
    });
  });

  if (ui.btnFirstStep) {
    ui.btnFirstStep.addEventListener("click", function () {
      const parcours = definitionParcours[parcoursActif] || definitionParcours.bases;
      const cible = parcours.firstTarget ? document.querySelector(parcours.firstTarget) : null;
      if (cible) cible.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  appliquerParcours("bases");
}

function initialiserCalculRapideClavier() {
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
    const cible = event.target;
    if (!(cible instanceof HTMLInputElement) || cible.type !== "number") return;

    if (cible.closest("#section-formes")) {
      const bouton = document.getElementById("btn-calculer-forme");
      if (bouton) {
        event.preventDefault();
        bouton.click();
      }
      return;
    }

    if (cible.closest("#section-pourcent")) {
      const bouton = document.getElementById("btn-calculer-pourcent");
      if (bouton) {
        event.preventDefault();
        bouton.click();
      }
    }
  });
}

function initialiserAtelierMental(ui) {
  if (!ui || !ui.btnAtelierNouvelle || !ui.btnAtelierVerifier) return;
  mettreAJourAtelierStats(ui);
  mettreAJourConseilAtelier(ui.atelierConseil);

  ui.btnAtelierNouvelle.addEventListener("click", function () {
    questionAtelierActuelle = genererQuestionAtelier(ui.atelierType ? ui.atelierType.value : "calcul");
    afficherQuestionAtelier(ui.atelierEnonce, ui.atelierFeedback, ui.atelierReponse, questionAtelierActuelle);
  });

  ui.btnAtelierVerifier.addEventListener("click", function () {
    verifierQuestionAtelier(ui);
  });

  if (ui.atelierReponse) {
    ui.atelierReponse.addEventListener("keydown", function (event) {
      if (event.key === "Enter") verifierQuestionAtelier(ui);
    });
  }

  if (ui.atelierType) {
    ui.atelierType.addEventListener("change", function () {
      questionAtelierActuelle = genererQuestionAtelier(ui.atelierType.value);
      afficherQuestionAtelier(ui.atelierEnonce, ui.atelierFeedback, ui.atelierReponse, questionAtelierActuelle);
    });
  }
}

function genererQuestionAtelier(type) {
  if (type === "pourcentage") {
    const base = nombreAleatoire(20, 200);
    const pourcentage = [5, 10, 15, 20, 25, 30][nombreAleatoire(0, 5)];
    return {
      type: type,
      enonce: "Calcule " + pourcentage + "% de " + base + ".",
      reponse: (pourcentage * base) / 100,
      tolerance: 0.01,
      explication: "Méthode : (" + pourcentage + " × " + base + ") ÷ 100.",
    };
  }

  if (type === "conversion") {
    const metres = nombreAleatoire(3, 35);
    const facteur = [10, 100, 1000][nombreAleatoire(0, 2)];
    const uniteCible = facteur === 10 ? "dm" : facteur === 100 ? "cm" : "mm";
    return {
      type: type,
      enonce: "Convertis " + metres + " m en " + uniteCible + ".",
      reponse: metres * facteur,
      tolerance: 0.01,
      explication: "1 m = " + facteur + " " + uniteCible + ", donc " + metres + " × " + facteur + ".",
    };
  }

  const a = nombreAleatoire(8, 40);
  const b = nombreAleatoire(2, 15);
  const operation = nombreAleatoire(0, 1) === 0 ? "+" : "×";
  return {
    type: "calcul",
    enonce: operation === "+"
      ? "Calcule rapidement : " + a + " + " + b + "."
      : "Calcule rapidement : " + a + " × " + b + ".",
    reponse: operation === "+" ? a + b : a * b,
    tolerance: 0.01,
    explication: operation === "+"
      ? "Additionne les dizaines puis les unités."
      : "Pense à la distributivité pour aller plus vite.",
  };
}

function afficherQuestionAtelier(zoneEnonce, zoneFeedback, champReponse, question) {
  if (!zoneEnonce || !question) return;
  zoneEnonce.innerHTML = "<strong>Question flash :</strong> " + question.enonce;
  if (zoneFeedback) {
    zoneFeedback.className = "resultat";
    zoneFeedback.textContent = "";
  }
  if (champReponse) {
    champReponse.value = "";
    champReponse.focus();
  }
}

function verifierQuestionAtelier(ui) {
  if (!questionAtelierActuelle) {
    if (ui.atelierFeedback) {
      ui.atelierFeedback.className = "resultat resultat--visible resultat--erreur";
      ui.atelierFeedback.textContent = "Commence par générer une question de l'atelier mental.";
    }
    return;
  }
  const valeur = lireValeur("atelier-reponse");
  if (valeur === null) {
    ui.atelierFeedback.className = "resultat resultat--visible resultat--erreur";
    ui.atelierFeedback.textContent = "Entre une réponse numérique avant de vérifier.";
    return;
  }
  const estCorrect = Math.abs(valeur - questionAtelierActuelle.reponse) <= questionAtelierActuelle.tolerance;
  enregistrerResultatAtelier(estCorrect);
  mettreAJourAtelierStats(ui);
  mettreAJourConseilAtelier(ui.atelierConseil);

  ui.atelierFeedback.className = "resultat resultat--visible" + (estCorrect ? "" : " resultat--erreur");
  ui.atelierFeedback.innerHTML = estCorrect
    ? "<strong>Excellent ✅</strong> " + questionAtelierActuelle.explication
    : "<strong>Presque ❌</strong> Réponse attendue : " + arrondir(questionAtelierActuelle.reponse) + ". " + questionAtelierActuelle.explication;

  notifierActionApprentissage({ type: estCorrect ? "exercice-correct" : "exercice-erreur" });
}

function lireAtelierStats() {
  const statsParDefaut = { essais: 0, reussites: 0, serie: 0 };
  try {
    const brut = localStorage.getItem(CLE_ATELIER_MENTAL);
    if (!brut) return statsParDefaut;
    const stats = JSON.parse(brut);
    return {
      essais: Number(stats.essais) || 0,
      reussites: Number(stats.reussites) || 0,
      serie: Number(stats.serie) || 0,
    };
  } catch (e) {
    return statsParDefaut;
  }
}

function enregistrerResultatAtelier(estCorrect) {
  const stats = lireAtelierStats();
  stats.essais += 1;
  stats.reussites += estCorrect ? 1 : 0;
  stats.serie = estCorrect ? stats.serie + 1 : 0;
  localStorage.setItem(CLE_ATELIER_MENTAL, JSON.stringify(stats));
}

function mettreAJourAtelierStats(ui) {
  if (!ui || !ui.atelierScore || !ui.atelierSerie) return;
  const stats = lireAtelierStats();
  const taux = stats.essais > 0 ? Math.round((stats.reussites / stats.essais) * 100) : 0;
  ui.atelierScore.textContent = stats.reussites + " / " + stats.essais + " (" + taux + "%)";
  ui.atelierSerie.textContent = stats.serie + " bonne réponse" + (stats.serie > 1 ? "s" : "") + " d'affilée";
}

function mettreAJourConseilAtelier(zoneConseil) {
  if (!zoneConseil) return;
  const stats = lireAtelierStats();
  if (stats.essais < 3) {
    zoneConseil.innerHTML = "<strong>Conseil personnalisé :</strong> fais 3 questions rapides pour lancer ta séance.";
    return;
  }
  const taux = (stats.reussites / stats.essais) * 100;
  if (taux >= 80) {
    zoneConseil.innerHTML = "<strong>Très bon rythme :</strong> passe sur « Pourcentages flash » ou monte le niveau des exercices.";
    return;
  }
  zoneConseil.innerHTML = "<strong>Plan minute :</strong> 2 questions calcul mental, 2 conversions, puis un exercice CAPa guidé.";
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

function initialiserSaisieDecimale() {
  document.addEventListener("input", function (event) {
    const cible = event.target;
    if (!cible || cible.tagName !== "INPUT" || cible.type !== "number") return;
    if (typeof cible.value !== "string" || cible.value.indexOf(",") === -1) return;
    cible.value = cible.value.replace(",", ".");
  });
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

function initialiserConfianceExercice(selectConfiance, zoneInsight) {
  if (!selectConfiance) return;
  const confianceMemoire = localStorage.getItem(CLE_CONFIANCE_EXERCICE);
  if (confianceMemoire && ["basse", "moyenne", "haute"].indexOf(confianceMemoire) !== -1) {
    selectConfiance.value = confianceMemoire;
  }
  selectConfiance.addEventListener("change", function () {
    localStorage.setItem(CLE_CONFIANCE_EXERCICE, selectConfiance.value);
    afficherInsightConfiance(zoneInsight, selectConfiance.value, null);
  });
  afficherInsightConfiance(zoneInsight, selectConfiance.value, null);
}

function enregistrerConfianceExercice(confiance, estCorrect) {
  const stats = chargerConfianceExercice();
  const cle = confiance || "moyenne";
  if (!stats[cle]) stats[cle] = { essais: 0, reussites: 0 };
  stats[cle].essais += 1;
  stats[cle].reussites += estCorrect ? 1 : 0;
  localStorage.setItem(CLE_CONFIANCE_EXERCICE + "-stats", JSON.stringify(stats));
}

function chargerConfianceExercice() {
  try {
    const brut = localStorage.getItem(CLE_CONFIANCE_EXERCICE + "-stats");
    const base = { basse: { essais: 0, reussites: 0 }, moyenne: { essais: 0, reussites: 0 }, haute: { essais: 0, reussites: 0 } };
    if (!brut) return base;
    const lu = JSON.parse(brut);
    return {
      basse: lu.basse || base.basse,
      moyenne: lu.moyenne || base.moyenne,
      haute: lu.haute || base.haute,
    };
  } catch (e) {
    return { basse: { essais: 0, reussites: 0 }, moyenne: { essais: 0, reussites: 0 }, haute: { essais: 0, reussites: 0 } };
  }
}

function afficherInsightConfiance(zoneInsight, confiance, estCorrect) {
  if (!zoneInsight) return;
  const labels = {
    basse: "J'ai besoin d'aide",
    moyenne: "Je suis plutôt sûr(e)",
    haute: "Je suis très confiant(e)",
  };
  const stats = chargerConfianceExercice();
  const bloc = stats[confiance] || { essais: 0, reussites: 0 };
  const taux = bloc.essais > 0 ? Math.round((bloc.reussites / bloc.essais) * 100) : null;
  let conseil = "Choisis un niveau de confiance réaliste : cela entraîne ton auto-évaluation.";
  if (estCorrect === true && confiance === "basse") conseil = "Excellente surprise : tu peux viser « plutôt sûr(e) » au prochain exercice.";
  if (estCorrect === false && confiance === "haute") conseil = "Bonne ambition. Vérifie l'unité et l'ordre de grandeur avant de valider.";
  if (estCorrect === true && confiance === "haute") conseil = "Confiance bien calibrée ✅ Continue en mode défi si tu veux progresser plus vite.";
  zoneInsight.innerHTML =
    "<strong>Coach confiance</strong><br>" +
    "Niveau choisi : <em>" + (labels[confiance] || labels.moyenne) + "</em>." +
    (taux === null ? "" : " Réussite à ce niveau : " + taux + "% (" + bloc.reussites + "/" + bloc.essais + ").") +
    "<br><small>" + conseil + "</small>";
}

function transitionGenerationExercice(zone) {
  if (!zone) return;
  zone.classList.remove("is-loading");
  void zone.offsetWidth;
  zone.classList.add("is-loading");
  window.setTimeout(function () {
    zone.classList.remove("is-loading");
  }, 260);
}

// ============================================================
// 2B. MODE EXERCICES, PROGRESSION, BADGES, HISTORIQUE
// ============================================================

function initialiserModeExercices(ui) {
  if (!ui || !ui.btnGenererExercice) return;

  initialiserParcoursSimplifie(ui);
  initialiserEtudeAccompagnee(ui);
  initialiserConfianceExercice(ui.confianceExercice, ui.insightConfiance);
  mettreAJourProgressionSession(ui.sessionProgression);
  mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
  mettreAJourTableauCompetences(ui.tableauCompetences, ui.planEntrainementPersonnalise);
  afficherAnalyseApprentissage(ui.analyseApprentissage);
  mettreAJourChronometre(ui);
  mettreAJourRubanSession(ui);
  if (ui.testsFormulesResultat) {
    ui.testsFormulesResultat.innerHTML = "Conseil fiabilité : lance « Vérifier les formules » avant une évaluation.";
  }
  afficherBarreParcours(ui.parcoursVisual, 1);
  initialiserRaccourcisExercice(ui);

  ui.btnGenererExercice.addEventListener("click", function () {
    const objectifSeance = ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision";
    const modeAccompagnement = ui.selectModeAccompagnement ? ui.selectModeAccompagnement.value : "autonome";
    const formatExercice = ui.selectFormatExercice ? ui.selectFormatExercice.value : "direct";
    const selection = ui.modeAdaptatif && ui.modeAdaptatif.checked
      ? choisirParcoursAdaptatif(ui.selectThemeExercice.value, ui.selectNiveauExercice.value, objectifSeance, modeAccompagnement, formatExercice)
      : { theme: ui.selectThemeExercice.value, niveau: ui.selectNiveauExercice.value, source: "manuel", objectifSeance: objectifSeance, modeAccompagnement: modeAccompagnement, formatExercice: formatExercice };
    selection.etudeAccompagnee = !!(ui.modeEtudeAccompagnee && ui.modeEtudeAccompagnee.checked);
    exerciceActuel = creerExercice(selection.theme, selection.niveau, selection);
    transitionGenerationExercice(ui.enonceExercice);
    afficherExercice(ui.enonceExercice, ui.feedbackExercice, ui.reponseExercice, exerciceActuel);
    if (ui.estimationExercice) ui.estimationExercice.value = "";
    afficherFeedbackEstimation(ui.feedbackEstimation, null);
    afficherRecommandation(ui.recommandationExercice, selection);
    afficherBarreParcours(ui.parcoursVisual, 2);
    afficherCoachEtapes(ui.coachEtapes, exerciceActuel, "avant-reponse");
    afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, selection);
    afficherPontMathsMetier(ui.pontMathsMetier, exerciceActuel);
    afficherFicheApprentissage(ui.ficheApprentissage, exerciceActuel);
    afficherMissionSuivante(ui.missionSuivante, exerciceActuel, null);
    afficherChecklistVerification(ui.checklistVerification, exerciceActuel, false);
    afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
    reinitialiserJournalResolution(ui.journalResolution, ui.feedbackJournalResolution);
    mettreAJourRoadmapExercice(ui.roadmapExerciceLong, exerciceActuel, selection.etudeAccompagnee);
    mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
    appliquerModeEvaluation(ui.modeEvaluation, ui.btnIndice1, ui.btnIndice2, ui.btnMethode, ui.feedbackExercice);
    demarrerChronoSiActif(ui, exerciceActuel);
    reinitialiserAidesParcoursSimple(ui);
    mettreAJourRubanSession(ui);
  });

  ui.btnValiderExercice.addEventListener("click", function () {
    corrigerExercice(ui, false);
  });

  ui.btnSuivantExercice.addEventListener("click", function () {
    corrigerExercice(ui, true);
  });
  if (ui.btnJokerExercice) {
    ui.btnJokerExercice.addEventListener("click", function () {
      if (!exerciceActuel) return;
      afficherCoachEtapes(ui.coachEtapes, exerciceActuel, "blocage");
      afficherBarreParcours(ui.parcoursVisual, 3);
      afficherIndiceProgressif(ui.feedbackExercice, exerciceActuel, 0);
    });
  }

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
      if (ui.estimationExercice) ui.estimationExercice.value = "";
      afficherFeedbackEstimation(ui.feedbackEstimation, null);
      afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, {
        source: "remediation",
        message: "Rejeu ciblé : on reprend une erreur récente.",
        objectifSeance: ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision",
      });
      afficherCoachEtapes(ui.coachEtapes, exerciceActuel, "avant-reponse");
      afficherBarreParcours(ui.parcoursVisual, 2);
      afficherPontMathsMetier(ui.pontMathsMetier, exerciceActuel);
      afficherFicheApprentissage(ui.ficheApprentissage, exerciceActuel);
      afficherMissionSuivante(ui.missionSuivante, exerciceActuel, null);
      afficherChecklistVerification(ui.checklistVerification, exerciceActuel, false);
      mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
      afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
      reinitialiserJournalResolution(ui.journalResolution, ui.feedbackJournalResolution);
      mettreAJourRoadmapExercice(ui.roadmapExerciceLong, exerciceActuel, !!(ui.modeEtudeAccompagnee && ui.modeEtudeAccompagnee.checked));
      demarrerChronoSiActif(ui, exerciceActuel);
    });
  }
  if (ui.btnTestsFormules) {
    ui.btnTestsFormules.addEventListener("click", function () {
      afficherBilanTestsFormules(ui.testsFormulesResultat);
    });
  }
  if (ui.btnExportBilan) {
    ui.btnExportBilan.addEventListener("click", function () {
      exporterBilanEleve(ui.feedbackExercice);
    });
  }
  if (ui.btnAnalyserSeance) {
    ui.btnAnalyserSeance.addEventListener("click", function () {
      afficherAnalyseApprentissage(ui.analyseApprentissage);
    });
  }

  mettreAJourProgressionEtBadges(ui.progressionExercice, ui.badgesExercice);
  afficherPlanMaitrise(ui.planMaitrise);
  afficherHistorique(ui.historiqueExercice);
  mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
  mettreAJourTableauCompetences(ui.tableauCompetences, ui.planEntrainementPersonnalise);
  afficherAnalyseApprentissage(ui.analyseApprentissage);
  mettreAJourTableauMotivation(ui.motivationEleve, ui.defiJour);
  mettreAJourRadarCompetences(ui.radarCompetences);
  mettreAJourLaboratoireErreurs(ui.laboratoireErreurs);
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
    const niveauConfiance = ui.confianceExercice ? ui.confianceExercice.value : "moyenne";
    const estimation = ui.estimationExercice ? parserNombreLocale(ui.estimationExercice.value) : null;
    if (exerciceActuel.formatExercice === "long" && !validerJournalResolution(ui.journalResolution, ui.feedbackJournalResolution)) {
      return;
    }
    if (exerciceActuel.estimationObligatoire && estimation === null) {
      ui.feedbackExercice.className = "resultat resultat--visible resultat--erreur";
      ui.feedbackExercice.innerHTML = "Commence par donner une estimation rapide avant de valider.";
      if (ui.estimationExercice) ui.estimationExercice.focus();
      return;
    }
    const estCorrect = Math.abs(reponse - exerciceActuel.reponse) <= exerciceActuel.tolerance;
    const diagnostic = analyserErreur(exerciceActuel, reponse);
    sessionStats.essais += 1;
    sessionStats.reussites += estCorrect ? 1 : 0;
    enregistrerConfianceExercice(niveauConfiance, estCorrect);
    enregistrerTentativeExercice(exerciceActuel, reponse, estCorrect);
    enregistrerMotivation(exerciceActuel, estCorrect);
    if (!estCorrect) {
      ajouterRemediation(exerciceActuel);
    }
    afficherFeedbackExercice(ui.feedbackExercice, exerciceActuel, reponse, estCorrect, diagnostic);
    afficherInsightConfiance(ui.insightConfiance, niveauConfiance, estCorrect);
    afficherFeedbackEstimation(ui.feedbackEstimation, estimation, exerciceActuel.reponse, exerciceActuel.unite);
    afficherMissionSuivante(ui.missionSuivante, exerciceActuel, estCorrect);
    afficherCoachEtapes(ui.coachEtapes, exerciceActuel, estCorrect ? "corrige-ok" : "corrige-ko");
    afficherBarreParcours(ui.parcoursVisual, estCorrect ? 4 : 3);
    afficherChecklistVerification(ui.checklistVerification, exerciceActuel, estCorrect);
    afficherPlanRemediation(ui.planRemediation, exerciceActuel, estCorrect ? "" : diagnostic);
    mettreAJourProgressionEtBadges(ui.progressionExercice, ui.badgesExercice);
    mettreAJourProgressionSession(ui.sessionProgression);
    afficherPlanMaitrise(ui.planMaitrise);
    if (parcoursCibleActif && !passerAuSuivant) parcoursCibleActif.restant = Math.max(0, parcoursCibleActif.restant - 1);
    afficherHistorique(ui.historiqueExercice);
    mettreAJourDiagnosticPedagogique(ui.diagnosticExercice, ui.planRevision);
    mettreAJourTableauCompetences(ui.tableauCompetences, ui.planEntrainementPersonnalise);
    afficherAnalyseApprentissage(ui.analyseApprentissage);
    mettreAJourRadarCompetences(ui.radarCompetences);
    mettreAJourLaboratoireErreurs(ui.laboratoireErreurs);
    mettreAJourTableauMotivation(ui.motivationEleve, ui.defiJour);
    if (!estCorrect) debloquerAidesParcoursSimple(ui);
    mettreAJourRubanSession(ui);
    notifierActionApprentissage({ type: estCorrect ? "exercice-correct" : "exercice-erreur" });
    return;
  }

  const selection = ui.modeAdaptatif && ui.modeAdaptatif.checked
    ? choisirParcoursAdaptatif(
      ui.selectThemeExercice.value,
      ui.selectNiveauExercice.value,
      ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision",
      ui.selectModeAccompagnement ? ui.selectModeAccompagnement.value : "autonome",
      ui.selectFormatExercice ? ui.selectFormatExercice.value : "direct"
    )
    : {
      theme: ui.selectThemeExercice.value,
      niveau: ui.selectNiveauExercice.value,
      source: "manuel",
      objectifSeance: ui.selectObjectifSeance ? ui.selectObjectifSeance.value : "precision",
      modeAccompagnement: ui.selectModeAccompagnement ? ui.selectModeAccompagnement.value : "autonome",
      formatExercice: ui.selectFormatExercice ? ui.selectFormatExercice.value : "direct",
    };
  selection.etudeAccompagnee = !!(ui.modeEtudeAccompagnee && ui.modeEtudeAccompagnee.checked);
  exerciceActuel = creerExercice(selection.theme, selection.niveau, selection);
  transitionGenerationExercice(ui.enonceExercice);
  afficherExercice(ui.enonceExercice, ui.feedbackExercice, ui.reponseExercice, exerciceActuel);
  if (ui.estimationExercice) ui.estimationExercice.value = "";
  afficherFeedbackEstimation(ui.feedbackEstimation, null);
  afficherRecommandation(ui.recommandationExercice, selection);
  afficherBarreParcours(ui.parcoursVisual, 2);
  afficherCoachEtapes(ui.coachEtapes, exerciceActuel, "avant-reponse");
  afficherObjectifEtCompetences(ui.objectifSession, ui.competencesExercice, exerciceActuel, selection);
  afficherPontMathsMetier(ui.pontMathsMetier, exerciceActuel);
  afficherFicheApprentissage(ui.ficheApprentissage, exerciceActuel);
  afficherMissionSuivante(ui.missionSuivante, exerciceActuel, null);
  afficherChecklistVerification(ui.checklistVerification, exerciceActuel, false);
  mettreAJourUniteAttendue(ui.uniteAttendue, exerciceActuel);
  afficherPlanRemediation(ui.planRemediation, exerciceActuel, "");
  reinitialiserJournalResolution(ui.journalResolution, ui.feedbackJournalResolution);
  mettreAJourRoadmapExercice(ui.roadmapExerciceLong, exerciceActuel, selection.etudeAccompagnee);
  demarrerChronoSiActif(ui, exerciceActuel);
  reinitialiserAidesParcoursSimple(ui);
  mettreAJourRubanSession(ui);
  notifierActionApprentissage({ type: "nouvel-exercice" });
}

function initialiserParcoursSimplifie(ui) {
  if (!ui || !ui.modeParcoursSimple) return;
  const modeEnregistre = localStorage.getItem(CLE_MODE_PARCOURS_SIMPLE);
  const actif = modeEnregistre === null ? true : modeEnregistre === "1";
  ui.modeParcoursSimple.checked = actif;
  appliquerParcoursSimplifie(actif);
  ui.modeParcoursSimple.addEventListener("change", function () {
    const actifSelection = !!ui.modeParcoursSimple.checked;
    appliquerParcoursSimplifie(actifSelection);
    if (actifSelection) reinitialiserAidesParcoursSimple(ui);
    localStorage.setItem(CLE_MODE_PARCOURS_SIMPLE, actifSelection ? "1" : "0");
  });
}

function initialiserEtudeAccompagnee(ui) {
  if (!ui || !ui.modeEtudeAccompagnee) return;
  const cle = "maths-paysager-etude-accompagnee";
  const valeur = localStorage.getItem(cle);
  const actif = valeur === null ? true : valeur === "1";
  ui.modeEtudeAccompagnee.checked = actif;
  if (ui.modeEtudeAccompagnee) {
    ui.modeEtudeAccompagnee.addEventListener("change", function () {
      localStorage.setItem(cle, ui.modeEtudeAccompagnee.checked ? "1" : "0");
      mettreAJourRoadmapExercice(ui.roadmapExerciceLong, exerciceActuel, ui.modeEtudeAccompagnee.checked);
    });
  }
  if (ui.journalResolution) {
    ui.journalResolution.addEventListener("input", function () {
      const texte = (ui.journalResolution.value || "").trim();
      if (!ui.feedbackJournalResolution) return;
      if (texte.length < 20) {
        ui.feedbackJournalResolution.innerHTML = "Conseil : précise au moins 2 étapes avec les unités (ex : m² puis €).";
        return;
      }
      ui.feedbackJournalResolution.innerHTML = "Très bien : ta méthode est notée. Continue avec le calcul final.";
    });
  }
}

function reinitialiserJournalResolution(zoneJournal, zoneFeedback) {
  if (zoneJournal) zoneJournal.value = "";
  if (zoneFeedback) zoneFeedback.innerHTML = "Conseil : note au moins 2 étapes pour mémoriser la méthode.";
}

function validerJournalResolution(zoneJournal, zoneFeedback) {
  const texte = zoneJournal ? String(zoneJournal.value || "").trim() : "";
  const nbEtapes = texte.split(/\n+/).filter(function (ligne) { return ligne.trim().length >= 8; }).length;
  if (texte.length < 40 || nbEtapes < 2) {
    if (zoneFeedback) {
      zoneFeedback.innerHTML = "En format long, note au moins 2 étapes détaillées avant validation (données, formule, unité).";
    }
    if (zoneJournal) zoneJournal.focus();
    return false;
  }
  if (zoneFeedback) {
    zoneFeedback.innerHTML = "Journal validé ✅ : tu peux comparer ta méthode avec la correction.";
  }
  return true;
}

function mettreAJourRoadmapExercice(zone, exercice, etudeAccompagnee) {
  if (!zone) return;
  const formatLong = exercice && (exercice.formatExercice === "long" || exercice.formatExercice === "chantier");
  if (!etudeAccompagnee) {
    zone.innerHTML = "<p class=\"exercise-roadmap__title\">Mode autonome actif</p><p>Roadmap masquée. Active « étude accompagnée » pour revoir les étapes-guides.</p>";
    return;
  }
  if (!formatLong) {
    zone.innerHTML = "<p class=\"exercise-roadmap__title\">Prépare-toi pour les exercices longs</p><p>Astuce : passe en format « Étude de cas longue » pour travailler la méthode complète en plusieurs étapes.</p>";
    return;
  }
  zone.innerHTML =
    "<p class=\"exercise-roadmap__title\">Feuille de route active (format long)</p>" +
    "<ol class=\"exercise-roadmap__list\">" +
      "<li>Repère la question finale et l'unité attendue.</li>" +
      "<li>Écris une estimation réaliste (ordre de grandeur).</li>" +
      "<li>Détaille 2 à 4 sous-calculs dans le journal de résolution.</li>" +
      "<li>Contrôle la cohérence terrain : coût, quantité ou volume plausible.</li>" +
      "<li>Valide puis compare ton raisonnement avec l'explication.</li>" +
    "</ol>";
}

function appliquerParcoursSimplifie(actif) {
  document.body.classList.toggle("mode-parcours-simple", !!actif);
  if (!actif) document.body.classList.remove("mode-parcours-simple-aides");
}

function debloquerAidesParcoursSimple(ui) {
  if (!ui || !ui.modeParcoursSimple || !ui.modeParcoursSimple.checked) return;
  document.body.classList.add("mode-parcours-simple-aides");
}

function reinitialiserAidesParcoursSimple(ui) {
  if (!ui || !ui.modeParcoursSimple || !ui.modeParcoursSimple.checked) return;
  document.body.classList.remove("mode-parcours-simple-aides");
}

function creerExercice(theme, niveau, meta) {
  let exercice = null;
  const themeEffectif = theme === "mixte"
    ? ["aires", "pourcentages", "metier"][nombreAleatoire(0, 2)]
    : theme;
  if (meta && meta.remediation) exercice = creerExerciceRemediation(meta.remediation, niveau);
  else if (themeEffectif === "pourcentages") exercice = creerExercicePourcentage(niveau);
  else if (themeEffectif === "metier") exercice = creerExerciceMetier(niveau);
  else exercice = creerExerciceForme(niveau);
  return enrichirExercice(exercice, meta);
}

function enrichirExercice(exercice, meta) {
  if (!exercice) return exercice;
  const modeAccompagnement = meta && meta.modeAccompagnement ? meta.modeAccompagnement : "autonome";
  const formatExercice = meta && meta.formatExercice ? meta.formatExercice : "direct";
  const etudeAccompagnee = !!(meta && meta.etudeAccompagnee);
  const baseTolerance = typeof exercice.tolerance === "number" ? exercice.tolerance : 0.05;
  if (modeAccompagnement === "guide") exercice.tolerance = baseTolerance * 1.5;
  if (modeAccompagnement === "defi") exercice.tolerance = baseTolerance * 0.6;
  exercice.modeAccompagnement = modeAccompagnement;
  exercice.formatExercice = formatExercice;
  exercice.etudeAccompagnee = etudeAccompagnee;
  appliquerFormatExercice(exercice, formatExercice);
  if (etudeAccompagnee) {
    exercice.etapes = (exercice.etapes || []).concat([
      "J'écris au moins deux étapes dans le journal de résolution.",
      "Je termine par une phrase de conclusion avec l'unité finale."
    ]);
  }
  exercice.questionsFlash = construireQuestionsFlash(exercice);
  return exercice;
}

function appliquerFormatExercice(exercice, formatExercice) {
  if (!exercice) return;
  if (formatExercice === "guide") {
    exercice.niveauCognitif = "N2 · Appliquer";
    exercice.enonce = "[Format guidé] Complète chaque étape avant de calculer le résultat final.\n" + exercice.enonce;
    return;
  }
  if (formatExercice === "estimation") {
    exercice.niveauCognitif = "N3 · Estimer puis vérifier";
    exercice.estimationObligatoire = true;
    exercice.enonce = "[Format estimation] Donne d'abord un ordre de grandeur, puis calcule précisément.\n" + exercice.enonce;
    return;
  }
  if (formatExercice === "erreur") {
    const enonceOriginal = exercice.enonce;
    const reponseCorrecte = exercice.reponse;
    const propositionIncorrecte = arrondirNombre(reponseCorrecte * 2);
    exercice.modeCorrection = "erreur";
    exercice.reponseDetail = reponseCorrecte;
    exercice.reponse = 0;
    exercice.tolerance = 0.001;
    exercice.unite = "(0 ou 1)";
    exercice.niveauCognitif = "N4 · Détecter et corriger";
    exercice.explication = "La proposition est fausse : " + arrondir(reponseCorrecte) + " était attendu. " + exercice.explication;
    exercice.enonce =
      "[Format détection d'erreur] Lis la proposition puis réponds 1 si elle est correcte, 0 sinon.\n" +
      enonceOriginal +
      "\nProposition d'un élève : « résultat = " + arrondir(propositionIncorrecte) + " ».";
    return;
  }
  if (formatExercice === "chantier") {
    const enonceOriginal = exercice.enonce;
    const verification = exercice.verification || "Vérifie l'unité, puis l'ordre de grandeur avant de confirmer.";
    exercice.niveauCognitif = "N4 · Mission multi-étapes";
    exercice.estimationObligatoire = true;
    exercice.tolerance = Math.max(exercice.tolerance || 0.05, 0.1);
    exercice.etapes = [
      "Je reformule la mission avec mes mots (quoi calculer ?).",
      "Je découpe en 2 ou 3 mini-calculs avant le résultat final.",
      "Je contrôle l'unité finale et l'impact chantier."
    ];
    exercice.enonce =
      "[Format mission chantier] Fais une estimation, puis résous le problème étape par étape comme sur le terrain.\n" +
      enonceOriginal +
      "\nContrôle final conseillé : " + verification;
    return;
  }
  if (formatExercice === "long") {
    transformerEnEtudeDeCasLongue(exercice);
    return;
  }
  exercice.niveauCognitif = "N1 · Reconnaître et appliquer";
}

function transformerEnEtudeDeCasLongue(exercice) {
  if (!exercice) return;
  const enonceOriginal = exercice.enonce;
  const unite = exercice.unite || "unité attendue";
  const verification = exercice.verification || "Vérifie l'unité et l'ordre de grandeur.";
  exercice.niveauCognitif = "N4 · Étude de cas longue";
  exercice.estimationObligatoire = true;
  exercice.tolerance = Math.max(exercice.tolerance || 0.05, 0.15);
  exercice.etapes = [
    "Je lis toutes les données et je surligne les unités utiles.",
    "Je réalise une estimation rapide pour cadrer mon résultat.",
    "Je découpe le problème en sous-calculs (2 à 4 étapes).",
    "Je note les résultats intermédiaires avec leurs unités.",
    "Je vérifie la cohérence métier (quantité, coût ou volume plausible).",
    "Je rédige le résultat final avec l'unité : " + unite + ".",
  ];
  exercice.enonce =
    "[Format étude de cas longue] Résous ce dossier comme en situation réelle : estimation, calcul détaillé, vérification finale.\n" +
    enonceOriginal +
    "\nLivrables attendus : (1) estimation chiffrée, (2) au moins 2 calculs intermédiaires, (3) résultat final argumenté.\nContraintes : note les conversions d'unités et valide la cohérence terrain.\nContrôle final : " +
    verification;
  exercice.questionsFlash = [
    "Quelle donnée était prioritaire pour démarrer ta résolution ?",
    "Quel sous-calcul t'a semblé le plus risqué (unité, pourcentage, conversion) ?",
    "Si tu devais expliquer ta méthode à un camarade, quelles 3 étapes garderais-tu ?",
  ];
}

function construireQuestionsFlash(exercice) {
  if (!exercice) return [];
  const unite = exercice.unite || "bonne unité";
  const questionsCommunes = [
    "Quel ordre de grandeur attends-tu avant de calculer précisément ?",
    "Pourquoi l'unité finale doit-elle être « " + unite + " » ?",
  ];
  if (exercice.competence === "pourcentages") {
    return [
      "Ton pourcentage représente-t-il une hausse, une baisse ou une part d'un total ?",
      "Quel coefficient multiplicateur aurais-tu pu utiliser ?",
    ];
  }
  if (exercice.competence === "situations-metier") {
    return [
      "Quelle décision chantier prendrais-tu avec ce résultat ?",
      "Quel risque as-tu si tu sous-estimes la quantité à commander ?",
    ];
  }
  return questionsCommunes;
}

function choisirParcoursAdaptatif(themeDefaut, niveauDefaut, objectifSeance, modeAccompagnement, formatExercice) {
  const formatAdapte = objectifSeance === "metier" && (!formatExercice || formatExercice === "direct")
    ? "chantier"
    : (formatExercice || "direct");
  const remediation = consommerRemediation();
  if (remediation) {
    return {
      theme: remediation.theme,
      niveau: "facile",
      source: "remediation",
      remediation: remediation,
      objectifSeance: objectifSeance || "precision",
      modeAccompagnement: modeAccompagnement || "autonome",
      formatExercice: formatAdapte,
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
  if (!parcoursCibleActif || parcoursCibleActif.restant <= 0 || parcoursCibleActif.competence !== competenceCible) {
    parcoursCibleActif = { competence: competenceCible, restant: 5 };
  }
  return {
    theme: cible.theme,
    niveau: niveau || niveauDefaut,
    source: "adaptatif",
    objectifSeance: objectifSeance || "precision",
    modeAccompagnement: modeAccompagnement || "autonome",
    formatExercice: formatAdapte,
    parcoursCible: parcoursCibleActif,
    message:
      "Coach : priorité sur « " +
      cible.label +
      " » (taux actuel " +
      arrondir(tauxGlobal) +
      "%). Niveau conseillé : " +
      niveau +
      ". Parcours ciblé restant : " + parcoursCibleActif.restant + "/5.",
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
  const format = selection && selection.formatExercice ? libelleFormatExercice(selection.formatExercice) : "Calcul direct";
  const messageParDefaut = "Mode manuel : tu choisis toi-même ton thème, ton niveau et le format (" + format + ").";
  zone.innerHTML = (selection && selection.message ? selection.message : messageParDefaut) + "<br><small>Format actif : " + format + ".</small>";
}

function afficherCoachEtapes(zone, exercice, etat) {
  if (!zone || !exercice) return;
  const etapes = exercice.etapes && exercice.etapes.length
    ? exercice.etapes
    : ["Comprendre la question", "Choisir la formule", "Calculer puis vérifier l'unité"];
  const etapesValidees = etat === "corrige-ok" ? 3 : (etat === "corrige-ko" ? 2 : 1);
  const blocVerification = exercice.verification
    ? "<p><strong>Auto-contrôle :</strong> " + exercice.verification + "</p>"
    : "";
  const utilite = exercice.utiliteMetier
    ? "<p><strong>Pourquoi c'est utile sur chantier :</strong> " + exercice.utiliteMetier + "</p>"
    : "";
  zone.innerHTML =
    "<strong>Parcours pas à pas</strong>" +
    "<ol class=\"resultat__etapes-liste\">" +
    etapes.map(function (etape, index) {
      const done = index < etapesValidees;
      return "<li>" + (done ? "✅ " : "⬜ ") + etape + "</li>";
    }).join("") +
    "</ol>" +
    utilite +
    blocVerification;
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
  const typesDisponibles = niveau === "facile"
    ? ["rectangle", "cercle", "triangle"]
    : ["rectangle", "cercle", "triangle", "zone-mixte", "zone-composite", "trapeze-allee"];
  const type = typesDisponibles[nombreAleatoire(0, typesDisponibles.length - 1)];

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
      etapes: [
        "Je repère que l'on cherche une surface.",
        "Je choisis la formule aire = longueur × largeur.",
        "Je calcule et j'écris le résultat en m².",
      ],
      utiliteMetier: "Connaître la surface permet d'estimer les rouleaux de gazon et le temps de préparation du sol.",
      verification: "Si ton résultat est en m (et non m²), c'est qu'il y a une erreur de formule.",
      pontMathsMetier: {
        mesure: "La surface d'une zone à engazonner.",
        decision: "Prévoir la quantité de gazon à commander.",
        impact: "Évite le manque de rouleaux et les retards sur chantier.",
      },
      indices: [
        "Indice 1 : cherche une surface, donc une formule d'aire.",
        "Indice 2 : pour un rectangle, aire = longueur × largeur (pas ×2).",
      ],
    };
  }

  if (type === "cercle") {
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
      etapes: [
        "Je repère que l'on cherche la longueur autour du bassin.",
        "Je choisis la formule périmètre = 2 × π × rayon.",
        "Je calcule puis j'arrondis au centième en m.",
      ],
      utiliteMetier: "Le périmètre aide à commander la bonne longueur de bordure ou de ganivelle.",
      verification: "Le résultat doit être supérieur au diamètre (2r).",
      pontMathsMetier: {
        mesure: "La longueur totale de bordure à poser autour du bassin.",
        decision: "Déterminer la quantité de matériaux à acheter.",
        impact: "Réduit les pertes et évite les allers-retours fournisseur.",
      },
      indices: [
        "Indice 1 : on cherche une longueur autour du cercle : c'est un périmètre.",
        "Indice 2 : applique 2 × π × rayon, sans transformer le rayon en diamètre.",
      ],
    };
  }

  if (type === "trapeze-allee") {
    const base1 = nombreAleatoire(plage.min + 4, plage.max + 8);
    const base2 = nombreAleatoire(plage.min + 2, base1 - 1);
    const hauteur = nombreAleatoire(plage.min, plage.max);
    const largeurAllee = nombreAleatoire(1, 3);
    const longueurAllee = nombreAleatoire(Math.max(6, plage.min + 2), plage.max + 6);
    const aireTrapeze = ((base1 + base2) * hauteur) / 2;
    const aireAllee = largeurAllee * longueurAllee;
    const airePlantable = aireTrapeze - aireAllee;
    return {
      theme: "aires",
      competence: "aires-perimetres",
      competenceLabel: "Aires et périmètres",
      objectif: "Calculer une aire de trapèze puis retirer une allée non plantable.",
      titre: "Surface utile d'une plate-bande trapézoïdale",
      enonce: "Contexte : une plate-bande en trapèze contient une allée technique.\nDonnées : grande base = " + base1 + " m, petite base = " + base2 + " m, hauteur = " + hauteur + " m ; allée = " + longueurAllee + " m × " + largeurAllee + " m.\nQuestion : quelle surface reste plantable (en m²) ?",
      reponse: airePlantable,
      tolerance: 0.1,
      unite: "m²",
      explication: "Étape 1 : aire trapèze = ((" + base1 + " + " + base2 + ") × " + hauteur + ") ÷ 2 = " + arrondir(aireTrapeze) + " m². Étape 2 : aire allée = " + longueurAllee + " × " + largeurAllee + " = " + arrondir(aireAllee) + " m². Étape 3 : surface plantable = " + arrondir(aireTrapeze) + " - " + arrondir(aireAllee) + " = " + arrondir(airePlantable) + " m².",
      erreurProbable: "N'oublie pas de diviser par 2 dans la formule du trapèze avant de retirer l'allée.",
      erreurCode: "triangle_div2",
      palier: "Or",
      etapes: [
        "Je calcule l'aire du trapèze complet.",
        "Je calcule l'aire de l'allée non plantée.",
        "Je soustrais pour obtenir la surface réellement plantable.",
      ],
      utiliteMetier: "Permet d'ajuster finement les quantités de plants pour des formes non rectangulaires.",
      verification: "La surface finale doit rester positive et inférieure à l'aire totale du trapèze.",
      pontMathsMetier: {
        mesure: "Surface plantable réelle d'une plate-bande irrégulière.",
        decision: "Déterminer la quantité de plantes et de paillage à commander.",
        impact: "Évite le sur-stock sur des zones à géométrie complexe.",
      },
      indices: [
        "Indice 1 : commence par la formule d'aire du trapèze ((B+b)×h)/2.",
        "Indice 2 : enlève ensuite l'aire de l'allée.",
      ],
    };
  }

  const base = nombreAleatoire(plage.min + 2, plage.max + 6);
  const hauteur = nombreAleatoire(plage.min, plage.max);
  const aireTriangle = (base * hauteur) / 2;
  if (type === "zone-composite") {
    const longueurRect = nombreAleatoire(plage.min + 6, plage.max + 8);
    const largeurRect = nombreAleatoire(plage.min + 2, plage.max + 4);
    const rayonBassin = nombreAleatoire(Math.max(2, plage.min - 2), Math.max(4, plage.max - 6));
    const surfaceRect = longueurRect * largeurRect;
    const surfaceBassin = PI * rayonBassin * rayonBassin;
    const surfacePlantable = surfaceRect - surfaceBassin;
    return {
      theme: "aires",
      competence: "aires-perimetres",
      competenceLabel: "Aires et périmètres",
      objectif: "Combiner deux formules d'aire (rectangle et cercle) dans un même aménagement.",
      titre: "Surface composite d'un espace paysager",
      enonce: "Contexte : un espace rectangulaire accueille un bassin circulaire au centre.\nDonnées : zone = " + longueurRect + " m × " + largeurRect + " m ; bassin de rayon " + rayonBassin + " m.\nQuestion : quelle surface reste disponible pour les plantations (en m²) ?",
      reponse: surfacePlantable,
      tolerance: 0.1,
      unite: "m²",
      explication: "Étape 1 : surface rectangle = " + longueurRect + " × " + largeurRect + " = " + arrondir(surfaceRect) + " m². Étape 2 : surface bassin = π × " + rayonBassin + "² = " + arrondir(surfaceBassin) + " m². Étape 3 : surface plantable = " + arrondir(surfaceRect) + " - " + arrondir(surfaceBassin) + " = " + arrondir(surfacePlantable) + " m².",
      erreurProbable: "Pense à retirer la surface du bassin (zone non plantable).",
      erreurCode: "aire_unite",
      palier: "Or",
      etapes: [
        "Je calcule la surface totale rectangulaire.",
        "Je calcule la surface circulaire du bassin.",
        "Je soustrais pour obtenir la surface réellement plantable.",
      ],
      utiliteMetier: "Ce calcul évite de commander trop de plants quand une partie de la zone est occupée.",
      verification: "La surface finale doit être positive et inférieure à la surface totale.",
      pontMathsMetier: {
        mesure: "La surface réellement disponible pour planter autour d'un bassin.",
        decision: "Ajuster les quantités de végétaux et de paillage.",
        impact: "Réduit les surplus et protège le budget chantier.",
      },
      indices: [
        "Indice 1 : il faut deux aires différentes (rectangle puis cercle).",
        "Indice 2 : surface plantable = surface totale - surface bassin.",
      ],
    };
  }
  if (type === "zone-mixte") {
    const longueurZone = nombreAleatoire(plage.min + 8, plage.max + 10);
    const largeurZone = nombreAleatoire(plage.min + 4, plage.max + 6);
    const longueurAllee = nombreAleatoire(Math.max(2, plage.min - 1), Math.max(4, plage.max - 4));
    const largeurAllee = nombreAleatoire(2, 4);
    const surfaceTotale = longueurZone * largeurZone;
    const surfaceAllee = longueurAllee * largeurAllee;
    const surfacePlantation = surfaceTotale - surfaceAllee;
    return {
      theme: "aires",
      competence: "aires-perimetres",
      competenceLabel: "Aires et périmètres",
      objectif: "Résoudre un exercice en plusieurs étapes avec retrait d'une zone non plantée.",
      titre: "Surface utile d'un aménagement",
      enonce: "Contexte : tu aménages un massif rectangulaire avec une allée centrale.\nDonnées : zone totale = " + longueurZone + " m × " + largeurZone + " m ; allée = " + longueurAllee + " m × " + largeurAllee + " m.\nQuestion : quelle surface utile (en m²) reste à planter ?",
      reponse: surfacePlantation,
      tolerance: 0.05,
      unite: "m²",
      explication: "Étape 1 : surface totale = " + longueurZone + " × " + largeurZone + " = " + arrondir(surfaceTotale) + " m². Étape 2 : surface allée = " + longueurAllee + " × " + largeurAllee + " = " + arrondir(surfaceAllee) + " m². Étape 3 : surface utile = " + arrondir(surfaceTotale) + " - " + arrondir(surfaceAllee) + " = " + arrondir(surfacePlantation) + " m².",
      erreurProbable: "Pense à retirer l'allée : on ne plante pas sur cette zone.",
      erreurCode: "aire_unite",
      palier: niveau === "difficile" ? "Or" : "Argent",
      etapes: [
        "Je calcule la surface totale de la zone.",
        "Je calcule la surface de l'allée qui n'est pas plantée.",
        "Je soustrais pour obtenir la surface utile en m².",
      ],
      utiliteMetier: "Cette méthode permet d'estimer précisément les quantités de terre végétale, plants et paillage.",
      verification: "La surface utile doit être inférieure à la surface totale et rester positive.",
      pontMathsMetier: {
        mesure: "Surface réellement plantable sur la zone.",
        decision: "Commander les matériaux en fonction de la surface utile.",
        impact: "Évite le surdosage de fournitures et les coûts inutiles.",
      },
      indices: [
        "Indice 1 : il y a deux rectangles à traiter (zone totale et allée).",
        "Indice 2 : surface utile = surface totale - surface allée.",
      ],
    };
  }
  return {
    theme: "aires",
    competence: "aires-perimetres",
    competenceLabel: "Aires et périmètres",
    objectif: "Choisir la bonne formule d'aire d'un triangle pour une zone en pente.",
    titre: "Aire de triangle",
    enonce: "Contexte : un talus triangulaire doit être paillé.\nDonnées : base = " + base + " m, hauteur = " + hauteur + " m.\nQuestion : quelle surface (en m²) faut-il couvrir ?",
    reponse: aireTriangle,
    tolerance: 0.05,
    unite: "m²",
    explication: "Étape 1 : aire triangle = (base × hauteur) ÷ 2. Étape 2 : (" + base + " × " + hauteur + ") ÷ 2 = " + arrondir(aireTriangle) + " m².",
    erreurProbable: "Tu as peut-être oublié de diviser par 2 à la fin.",
    erreurCode: "triangle_div2",
    palier: niveau === "difficile" ? "Or" : "Argent",
    etapes: [
      "Je repère la forme : triangle.",
      "J'applique (base × hauteur) ÷ 2.",
      "Je vérifie l'unité m² pour une surface.",
    ],
    utiliteMetier: "La surface du talus permet de calculer les besoins en toile et en paillage.",
    verification: "L'aire d'un triangle doit être plus petite que base × hauteur.",
    pontMathsMetier: {
      mesure: "La surface réelle d'un talus triangulaire.",
      decision: "Prévoir le volume de paillage ou de géotextile.",
      impact: "Aide à sécuriser la pente sans surcoût matière.",
    },
    indices: [
      "Indice 1 : pour un triangle, on n'utilise pas longueur × largeur.",
      "Indice 2 : multiplie base et hauteur puis divise par 2.",
    ],
  };
}

function creerExercicePourcentage(niveau) {
  const scenariosParNiveau = {
    facile: [1, 2, 4],
    moyen: [1, 2, 3, 4, 5, 6, 8],
    difficile: [2, 3, 4, 5, 6, 7, 8],
  };
  const scenariosDisponibles = scenariosParNiveau[niveau] || scenariosParNiveau.facile;
  const scenario = scenariosDisponibles[nombreAleatoire(0, scenariosDisponibles.length - 1)];
  if (scenario === 1) {
    const nombre = niveau === "difficile" ? nombreAleatoire(120, 800) : nombreAleatoire(50, 400);
    const pourcent = niveau === "facile" ? nombreAleatoire(5, 30) : nombreAleatoire(10, 75);
    const resultat = (pourcent * nombre) / 100;
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Maîtriser le passage « pourcentage » vers « division par 100 ».",
      titre: "Calcul de remise fournisseur",
      enonce: "Contexte : une remise de " + pourcent + "% est appliquée sur un montant de " + nombre + " €.\nQuestion : quel est le montant de la remise ?",
      reponse: resultat,
      tolerance: 0.05,
      unite: "€",
      explication: "Étape 1 : calculer " + pourcent + " × " + nombre + ". Étape 2 : diviser par 100. Résultat = " + arrondir(resultat) + " €.",
      erreurProbable: "Pense à diviser par 100 à la fin.",
      erreurCode: "pourcent_div100",
      palier: niveau === "difficile" ? "Or" : "Argent",
      etapes: [
        "Je transforme le pourcentage en fraction sur 100.",
        "Je multiplie le montant par ce pourcentage.",
        "Je vérifie que la remise est plus petite que le montant initial.",
      ],
      utiliteMetier: "Calculer une remise est utile pour lire un devis fournisseur ou comparer des promotions.",
      verification: "Une remise de x% doit rester entre 0 et le montant de départ.",
      pontMathsMetier: {
        mesure: "Le montant exact économisé sur le devis.",
        decision: "Choisir le fournisseur le plus intéressant.",
        impact: "Améliore la marge du chantier.",
      },
      indices: [
        "Indice 1 : " + pourcent + "% signifie " + pourcent + "/100.",
        "Indice 2 : fais la multiplication puis divise le résultat par 100.",
      ],
    };
  }
  if (scenario === 2) {
    const total = niveau === "facile" ? nombreAleatoire(80, 220) : nombreAleatoire(180, 520);
    const realise = niveau === "facile" ? nombreAleatoire(25, 70) : nombreAleatoire(40, 90);
    const taux = (realise / total) * 100;
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Interpréter un taux d'avancement à partir d'une partie et d'un total.",
      titre: "Taux d'avancement du chantier",
      enonce: "Contexte : sur " + total + " m² prévus, " + realise + " m² ont été traités aujourd'hui.\nQuestion : quel est le pourcentage d'avancement de la journée ?",
      reponse: taux,
      tolerance: 0.1,
      unite: "%",
      explication: "Étape 1 : part/total = " + realise + " ÷ " + total + ". Étape 2 : multiplier par 100. Taux = " + arrondir(taux) + " %.",
      erreurProbable: "Utilise bien la formule (partie ÷ total) × 100.",
      erreurCode: "pourcent_div100",
      palier: niveau === "facile" ? "Bronze" : "Argent",
      etapes: [
        "Je repère la partie réalisée et le total prévu.",
        "Je calcule la fraction réalisée (partie ÷ total).",
        "Je convertis en pourcentage avec × 100.",
      ],
      utiliteMetier: "Le taux d'avancement aide à suivre le planning réel du chantier.",
      verification: "Un taux doit rester entre 0% et 100%.",
      pontMathsMetier: {
        mesure: "La part réellement terminée d'une tâche.",
        decision: "Ajuster les ressources pour tenir le délai.",
        impact: "Améliore le pilotage quotidien du chantier.",
      },
      indices: [
        "Indice 1 : commence par partie ÷ total.",
        "Indice 2 : multiplie ensuite par 100 pour avoir un pourcentage.",
      ],
    };
  }
  if (scenario === 3) {
    const montantBase = nombreAleatoire(180, 950);
    const hausse = nombreAleatoire(5, 18);
    const remise = nombreAleatoire(5, 15);
    const apresHausse = montantBase * (1 + hausse / 100);
    const montantFinal = apresHausse * (1 - remise / 100);
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Enchaîner deux pourcentages successifs dans une situation de devis.",
      titre: "Devis ajusté : hausse puis remise",
      enonce: "Contexte : un devis de " + montantBase + " € subit d'abord une hausse de " + hausse + "% (matières), puis une remise commerciale de " + remise + "%.\nQuestion : quel est le montant final après ces deux ajustements ?",
      reponse: montantFinal,
      tolerance: 0.05,
      unite: "€",
      explication: "Étape 1 : après hausse = " + montantBase + " × (1 + " + hausse + "/100) = " + arrondir(apresHausse) + " €. Étape 2 : montant final = " + arrondir(apresHausse) + " × (1 - " + remise + "/100) = " + arrondir(montantFinal) + " €.",
      erreurProbable: "Ne soustrais pas directement les pourcentages : il faut appliquer les étapes l'une après l'autre.",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je calcule le montant après la hausse.",
        "J'applique ensuite la remise sur ce nouveau montant.",
        "Je vérifie que le résultat final reste cohérent avec les deux variations.",
      ],
      utiliteMetier: "Ce raisonnement sert pour comparer des devis quand plusieurs ajustements sont appliqués.",
      verification: "Hausse puis remise ne reviennent pas au montant initial sauf cas particuliers.",
      pontMathsMetier: {
        mesure: "L'évolution réelle du coût final.",
        decision: "Négocier et valider un devis plus fiable.",
        impact: "Réduit les écarts entre budget prévu et coût réel.",
      },
      indices: [
        "Indice 1 : transforme chaque variation en coefficient multiplicateur.",
        "Indice 2 : applique d'abord la hausse, puis la remise sur le nouveau montant.",
      ],
    };
  }

  if (scenario === 4) {
    const surfaceInitiale = niveau === "difficile" ? nombreAleatoire(260, 900) : nombreAleatoire(120, 420);
    const perte = niveau === "difficile" ? nombreAleatoire(8, 22) : nombreAleatoire(5, 15);
    const surfaceFinale = surfaceInitiale * (1 - perte / 100);
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Interpréter une perte en pourcentage pour estimer une quantité réellement disponible.",
      titre: "Surface utile après perte de végétaux",
      enonce: "Contexte : après préparation, " + perte + "% des plants deviennent inutilisables.\nDonnée : surface initialement prévue = " + surfaceInitiale + " m².\nQuestion : quelle surface peut encore être plantée ?",
      reponse: surfaceFinale,
      tolerance: 0.05,
      unite: "m²",
      explication: "Étape 1 : coefficient de conservation = 1 - " + perte + "/100. Étape 2 : surface utile = " + surfaceInitiale + " × (1 - " + perte + "/100) = " + arrondir(surfaceFinale) + " m².",
      erreurProbable: "Pour une perte, on retire x% (coefficient 1 - x/100), on ne l'ajoute pas.",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je repère qu'il s'agit d'une diminution (perte).",
        "Je transforme la perte en coefficient multiplicateur.",
        "Je multiplie la surface initiale par ce coefficient.",
      ],
      utiliteMetier: "Permet d'anticiper les pertes sur chantier et d'ajuster la commande de végétaux.",
      verification: "Après une perte, le résultat doit être inférieur à la surface initiale.",
      pontMathsMetier: {
        mesure: "La surface réellement exploitable après aléas.",
        decision: "Ajuster la quantité de plants de remplacement.",
        impact: "Limite les ruptures de stock en cours de chantier.",
      },
      indices: [
        "Indice 1 : perte = diminution, donc coefficient inférieur à 1.",
        "Indice 2 : applique surface finale = surface initiale × (1 - perte/100).",
      ],
    };
  }
  if (scenario === 5) {
    const quantiteBase = niveau === "moyen" ? nombreAleatoire(200, 520) : nombreAleatoire(350, 900);
    const hausse = niveau === "moyen" ? nombreAleatoire(8, 16) : nombreAleatoire(12, 24);
    const quantiteFinale = quantiteBase * (1 + hausse / 100);
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Convertir une hausse en pourcentage vers un volume final à prévoir.",
      titre: "Besoin supplémentaire après hausse de commande",
      enonce: "Contexte : la commande initiale est de " + quantiteBase + " plants.\nDonnée : le client ajoute " + hausse + "% de plants.\nQuestion : combien de plants faut-il prévoir au total ?",
      reponse: quantiteFinale,
      tolerance: 0.1,
      unite: "plants",
      explication: "Étape 1 : coefficient de hausse = 1 + " + hausse + "/100. Étape 2 : quantité finale = " + quantiteBase + " × (1 + " + hausse + "/100) = " + arrondir(quantiteFinale) + " plants.",
      erreurProbable: "Pour une hausse, le coefficient est 1 + x/100.",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je repère qu'il s'agit d'une augmentation.",
        "Je transforme la hausse en coefficient multiplicateur.",
        "Je calcule la nouvelle quantité totale.",
      ],
      utiliteMetier: "Permet d'adapter rapidement la commande quand le besoin client évolue.",
      verification: "Après hausse, la quantité finale doit être supérieure à la quantité de base.",
      pontMathsMetier: {
        mesure: "La variation de quantité à commander.",
        decision: "Mettre à jour la commande fournisseur.",
        impact: "Évite la rupture de plants en fin de chantier.",
      },
      indices: [
        "Indice 1 : hausse = résultat plus grand que la base.",
        "Indice 2 : applique quantité finale = base × (1 + hausse/100).",
      ],
    };
  }
  if (scenario === 6) {
    const budgetInitial = niveau === "moyen" ? nombreAleatoire(1400, 4200) : nombreAleatoire(3000, 9800);
    const partMateriaux = niveau === "moyen" ? nombreAleatoire(35, 55) : nombreAleatoire(45, 68);
    const partMainOeuvre = niveau === "moyen" ? nombreAleatoire(18, 34) : nombreAleatoire(25, 40);
    const montantMateriaux = (budgetInitial * partMateriaux) / 100;
    const montantMainOeuvre = (budgetInitial * partMainOeuvre) / 100;
    const reserveAleas = budgetInitial - montantMateriaux - montantMainOeuvre;
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Décomposer un budget en parts (%) puis retrouver la réserve restante.",
      titre: "Répartition budgétaire d'un chantier",
      enonce: "Contexte : budget global de " + budgetInitial + " €.\nDonnées : " + partMateriaux + "% pour les matériaux et " + partMainOeuvre + "% pour la main-d'œuvre.\nQuestion : quel montant reste pour la réserve aléas ?",
      reponse: reserveAleas,
      tolerance: 0.1,
      unite: "€",
      explication: "Étape 1 : matériaux = " + budgetInitial + " × " + partMateriaux + "/100 = " + arrondir(montantMateriaux) + " €. Étape 2 : main-d'œuvre = " + budgetInitial + " × " + partMainOeuvre + "/100 = " + arrondir(montantMainOeuvre) + " €. Étape 3 : réserve = budget - matériaux - main-d'œuvre = " + arrondir(reserveAleas) + " €.",
      erreurProbable: "Pense à calculer les deux pourcentages avant de soustraire.",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je calcule le montant des matériaux.",
        "Je calcule le montant de main-d'œuvre.",
        "Je retire ces deux montants du budget total.",
      ],
      utiliteMetier: "La réserve aléas sécurise le chantier en cas d'imprévu (casse, retards, météo).",
      verification: "La réserve doit rester positive et inférieure au budget initial.",
      pontMathsMetier: {
        mesure: "La part disponible pour absorber les imprévus.",
        decision: "Valider un budget plus réaliste avant lancement.",
        impact: "Évite les dépassements de budget non anticipés.",
      },
      indices: [
        "Indice 1 : commence par calculer chaque part en euros.",
        "Indice 2 : réserve = budget total - part 1 - part 2.",
      ],
    };
  }
  if (scenario === 7) {
    const montantNet = nombreAleatoire(800, 2800);
    const remise = nombreAleatoire(8, 22);
    const coefficient = 1 - remise / 100;
    const montantInitial = montantNet / coefficient;
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Remonter d'un montant final vers le montant initial avant remise.",
      titre: "Retrouver le prix initial avant remise",
      enonce: "Contexte : après une remise de " + remise + "%, le montant payé est de " + arrondir(montantNet) + " €.\nQuestion : quel était le montant initial avant remise ?",
      reponse: montantInitial,
      tolerance: 0.1,
      unite: "€",
      explication: "Étape 1 : coefficient après remise = 1 - " + remise + "/100 = " + arrondir(coefficient) + ". Étape 2 : montant initial = montant payé ÷ coefficient = " + arrondir(montantNet) + " ÷ " + arrondir(coefficient) + " = " + arrondir(montantInitial) + " €.",
      erreurProbable: "Pour retrouver la valeur initiale, il faut diviser par le coefficient (et non multiplier).",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je calcule le coefficient de conservation après remise.",
        "Je pose l'équation montant final = montant initial × coefficient.",
        "Je divise pour retrouver le montant initial.",
      ],
      utiliteMetier: "Utile pour vérifier un devis quand seul le montant remisé est communiqué.",
      verification: "Le montant initial doit être supérieur au montant payé après remise.",
      pontMathsMetier: {
        mesure: "Le prix réel avant négociation commerciale.",
        decision: "Comparer objectivement deux offres remisées.",
        impact: "Améliore la lecture économique des achats chantier.",
      },
      indices: [
        "Indice 1 : après remise, on garde (100 - remise)% du prix initial.",
        "Indice 2 : montant initial = montant payé ÷ (1 - remise/100).",
      ],
    };
  }
  if (scenario === 8) {
    const surfaceInitiale = niveau === "difficile" ? nombreAleatoire(180, 420) : nombreAleatoire(90, 260);
    const hausseZone = niveau === "difficile" ? nombreAleatoire(12, 28) : nombreAleatoire(8, 18);
    const pertePlantules = niveau === "difficile" ? nombreAleatoire(6, 14) : nombreAleatoire(4, 10);
    const partAromatiques = niveau === "difficile" ? nombreAleatoire(30, 55) : nombreAleatoire(20, 40);
    const surfaceApresHausse = surfaceInitiale * (1 + hausseZone / 100);
    const surfaceApresPerte = surfaceApresHausse * (1 - pertePlantules / 100);
    const surfaceAromatiques = surfaceApresPerte * (partAromatiques / 100);
    return {
      theme: "pourcentages",
      competence: "pourcentages",
      competenceLabel: "Pourcentages",
      objectif: "Enchaîner 3 pourcentages successifs (hausse, baisse, part finale).",
      titre: "Plan de culture — enchaînement de pourcentages",
      enonce: "Contexte : un plan de culture évolue sur la saison.\nDonnées : surface initiale = " + surfaceInitiale + " m² ; extension de " + hausseZone + "% ; pertes de " + pertePlantules + "% après reprise ; puis " + partAromatiques + "% de la surface restante est réservée aux aromatiques.\nQuestion : quelle surface finale est allouée aux aromatiques ?",
      reponse: surfaceAromatiques,
      tolerance: 0.15,
      unite: "m²",
      explication: "Étape 1 : surface après extension = " + arrondir(surfaceInitiale) + " × (1 + " + hausseZone + "/100) = " + arrondir(surfaceApresHausse) + " m². Étape 2 : surface après pertes = " + arrondir(surfaceApresHausse) + " × (1 - " + pertePlantules + "/100) = " + arrondir(surfaceApresPerte) + " m². Étape 3 : aromatiques = " + arrondir(surfaceApresPerte) + " × (" + partAromatiques + "/100) = " + arrondir(surfaceAromatiques) + " m².",
      erreurProbable: "Enchaîne les coefficients dans l'ordre : hausse, puis perte, puis part finale.",
      erreurCode: "pourcent_div100",
      palier: "Or",
      etapes: [
        "Je transforme chaque pourcentage en coefficient multiplicateur.",
        "J'applique les évolutions dans l'ordre chronologique.",
        "Je calcule ensuite la part finale sur la surface restante.",
      ],
      utiliteMetier: "Cette méthode aide à ajuster un plan de plantation quand les surfaces et pertes évoluent.",
      verification: "Après une hausse puis une perte, la surface finale doit rester positive et cohérente avec l'ordre de grandeur initial.",
      pontMathsMetier: {
        mesure: "La surface réellement exploitable pour une catégorie de culture.",
        decision: "Répartir les plants selon la surface réellement disponible.",
        impact: "Réduit les erreurs de commande en fin de planification.",
      },
      indices: [
        "Indice 1 : hausse de x% = × (1 + x/100), perte de y% = × (1 - y/100).",
        "Indice 2 : applique le pourcentage d'aromatiques à la toute dernière surface obtenue.",
      ],
    };
  }

  const totalPlants = niveau === "difficile" ? nombreAleatoire(300, 900) : nombreAleatoire(120, 320);
  const partVivaces = niveau === "facile" ? nombreAleatoire(20, 45) : nombreAleatoire(30, 70);
  const vivaces = (partVivaces * totalPlants) / 100;
  return {
    theme: "pourcentages",
    competence: "pourcentages",
    competenceLabel: "Pourcentages",
    objectif: "Relier une proportion en % à une quantité de végétaux.",
    titre: "Répartition de plantations",
    enonce: "Contexte : plan de plantation d'un massif.\nDonnées : " + totalPlants + " plants au total, dont " + partVivaces + "% de vivaces.\nQuestion : combien de plants vivaces faut-il prévoir ?",
    reponse: vivaces,
    tolerance: 0.05,
    unite: "plants",
    explication: "Vivaces = (" + partVivaces + " × " + totalPlants + ") ÷ 100 = " + arrondir(vivaces) + " plants.",
    erreurProbable: "Ne confonds pas pourcentage et quantité totale.",
    erreurCode: "pourcent_div100",
    palier: "Argent",
    etapes: [
      "Je repère le total de plants.",
      "Je calcule la part vivaces avec le pourcentage.",
      "Je vérifie que le résultat est inférieur au total.",
    ],
    utiliteMetier: "Cette répartition aide à commander les bonnes quantités de végétaux.",
    verification: "Le nombre de vivaces doit rester entre 0 et le total de plants.",
    pontMathsMetier: {
      mesure: "La quantité de plants par catégorie.",
      decision: "Passer les commandes aux pépinières.",
      impact: "Évite les ruptures ou surplus de plants.",
    },
    indices: [
      "Indice 1 : calcule x% d'un nombre avec (x × nombre) ÷ 100.",
      "Indice 2 : ton résultat doit être inférieur au total de plants.",
    ],
  };
}

function creerExerciceMetier(niveau) {
  const scenariosParNiveau = {
    facile: [1, 2, 3, 4],
    moyen: [1, 2, 3, 4, 5, 6, 9],
    difficile: [2, 3, 4, 5, 6, 7, 8, 9],
  };
  const scenariosDisponibles = scenariosParNiveau[niveau] || scenariosParNiveau.facile;
  const scenario = scenariosDisponibles[nombreAleatoire(0, scenariosDisponibles.length - 1)];
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
      etapes: [
        "Je calcule d'abord la surface totale en m².",
        "Je convertis cette surface en sacs avec le coefficient.",
        "Je vérifie que le nombre de sacs est cohérent avec la taille de la parcelle.",
      ],
      utiliteMetier: "Ce calcul évite de manquer de semences le jour du chantier.",
      verification: "Si la parcelle est grande, le nombre de sacs doit augmenter proportionnellement.",
      visuel: "🌱 Parcelle de semis",
      decisionChantier: "Décision : prévoir l'achat des sacs avant l'intervention.",
      pontMathsMetier: {
        mesure: "La surface d'une parcelle et sa conversion en sacs.",
        decision: "Commander la quantité de semences.",
        impact: "Évite les interruptions de chantier liées au manque de stock.",
      },
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
      etapes: [
        "Je relève la surface totale en m².",
        "Je repère le prix unitaire €/m².",
        "Je multiplie pour obtenir le coût total en euros.",
      ],
      utiliteMetier: "Savoir estimer le coût total aide à préparer un devis réaliste.",
      verification: "Le coût total doit être supérieur au prix d'1 m².",
      visuel: "🧾 Devis paillage",
      decisionChantier: "Décision : valider le budget total du chantier.",
      pontMathsMetier: {
        mesure: "Le coût global à partir d'un prix unitaire.",
        decision: "Valider (ou ajuster) le devis client.",
        impact: "Sécurise la rentabilité du chantier.",
      },
      indices: ["Indice 1 : €/m² = prix pour 1 m².", "Indice 2 : multiplie la surface totale par ce prix unitaire."],
    };
  }
  if (scenario === 3) {
    const perimetre = niveau === "facile" ? nombreAleatoire(18, 45) : nombreAleatoire(35, 130);
    const prixMl = niveau === "difficile" ? nombreAleatoire(20, 45) : nombreAleatoire(12, 28);
    const coutBordure = perimetre * prixMl;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Passer d'une longueur (ml) à un coût total.",
      titre: "Situation métier CAPa — bordures",
      enonce: "Contexte : pose de bordures pour un massif.\nDonnées : périmètre à border = " + perimetre + " m, prix de fourniture/pose = " + prixMl + " €/ml.\nQuestion : quel est le coût total des bordures ?",
      reponse: coutBordure,
      tolerance: 0.05,
      unite: "€",
      explication: "Coût = longueur totale × prix au mètre linéaire = " + perimetre + " × " + prixMl + " = " + arrondir(coutBordure) + " €.",
      erreurProbable: "Attention à l'unité €/ml : c'est une multiplication par la longueur.",
      erreurCode: "metier_cout_unitaire",
      palier: "Argent",
      etapes: [
        "Je repère la longueur totale en mètres linéaires.",
        "Je repère le prix pour 1 mètre.",
        "Je multiplie pour obtenir le coût total.",
      ],
      utiliteMetier: "Permet de chiffrer précisément la finition d'un massif.",
      verification: "Le coût total doit être plus grand que le prix d'un mètre linéaire.",
      visuel: "🪵 Bordures du massif",
      decisionChantier: "Décision : ajuster le budget bordures avant commande.",
      pontMathsMetier: {
        mesure: "Le linéaire de bordure à poser.",
        decision: "Arbitrer entre différents matériaux de bordure.",
        impact: "Évite les écarts de budget en fin de chantier.",
      },
      indices: ["Indice 1 : ml = mètre linéaire.", "Indice 2 : multiplie la longueur par le prix unitaire €/ml."],
    };
  }
  if (scenario === 4) {
    const longueur = niveau === "facile" ? nombreAleatoire(12, 40) : nombreAleatoire(30, 95);
    const debitMinute = niveau === "difficile" ? nombreAleatoire(12, 28) : nombreAleatoire(8, 18);
    const duree = niveau === "facile" ? nombreAleatoire(10, 25) : nombreAleatoire(20, 45);
    const volume = debitMinute * duree;
    const volumeParMetre = volume / longueur;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Relier un débit, une durée et un linéaire pour évaluer une consommation.",
      titre: "Situation métier CAPa — test de réseau d'arrosage",
      enonce: "Contexte : test d'un réseau d'arrosage de " + longueur + " m.\nDonnées : débit mesuré = " + debitMinute + " L/min pendant " + duree + " min.\nQuestion : quel volume total d'eau est consommé pendant le test ?",
      reponse: volume,
      tolerance: 0.1,
      unite: "L",
      explication: "Volume total = débit × durée = " + debitMinute + " × " + duree + " = " + arrondir(volume) + " L. En repère : cela représente environ " + arrondir(volumeParMetre) + " L par mètre de réseau.",
      erreurProbable: "Ne divise pas par la longueur si on demande le volume total.",
      erreurCode: "metier_volume_unitaire",
      palier: "Argent",
      etapes: [
        "Je repère les unités L/min et min.",
        "Je multiplie débit par durée pour obtenir un volume.",
        "Je vérifie que l'unité finale est en litres.",
      ],
      utiliteMetier: "Permet d'anticiper la consommation d'eau lors des essais de mise en service.",
      verification: "Si le temps de test double, le volume consommé doit doubler.",
      visuel: "🚿 Test réseau",
      decisionChantier: "Décision : valider la réserve d'eau avant la phase d'arrosage.",
      pontMathsMetier: {
        mesure: "Le volume réellement utilisé pendant un test technique.",
        decision: "Planifier les remplissages de cuve et les pauses.",
        impact: "Évite les interruptions liées à un manque d'eau.",
      },
      indices: [
        "Indice 1 : L/min × min = L.",
        "Indice 2 : commence par le volume total demandé avant d'autres conversions.",
      ],
    };
  }
  if (scenario === 5) {
    const longueur = niveau === "moyen" ? nombreAleatoire(10, 24) : nombreAleatoire(18, 38);
    const largeur = niveau === "moyen" ? nombreAleatoire(8, 18) : nombreAleatoire(14, 26);
    const prixM2 = niveau === "moyen" ? nombreAleatoire(7, 12) : nombreAleatoire(10, 16);
    const margePct = niveau === "moyen" ? nombreAleatoire(6, 10) : nombreAleatoire(8, 14);
    const surface = longueur * largeur;
    const coutDirect = surface * prixM2;
    const coutFinal = coutDirect * (1 + margePct / 100);
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Construire un calcul complet : surface, coût direct, puis marge de sécurité.",
      titre: "Situation métier CAPa — chiffrage complet d'un massif",
      enonce: "Contexte : chiffrage d'un massif à pailler.\nDonnées : zone = " + longueur + " m × " + largeur + " m ; prix de fourniture/pose = " + prixM2 + " €/m² ; marge de sécurité = " + margePct + "%.\nQuestion : quel budget total faut-il prévoir (marge incluse) ?",
      reponse: coutFinal,
      tolerance: 0.1,
      unite: "€",
      explication: "Étape 1 : surface = " + longueur + " × " + largeur + " = " + arrondir(surface) + " m². Étape 2 : coût direct = " + arrondir(surface) + " × " + prixM2 + " = " + arrondir(coutDirect) + " €. Étape 3 : budget final = " + arrondir(coutDirect) + " × (1 + " + margePct + "/100) = " + arrondir(coutFinal) + " €.",
      erreurProbable: "La marge (%) s'applique au coût direct, pas à la surface.",
      erreurCode: "metier_cout_unitaire",
      palier: "Or",
      etapes: [
        "Je calcule d'abord la surface du massif.",
        "Je transforme la surface en coût direct avec le prix unitaire €/m².",
        "J'ajoute la marge de sécurité en pourcentage.",
      ],
      utiliteMetier: "Ce type de calcul reflète un vrai chiffrage de chantier avec aléa intégré.",
      verification: "Le budget final doit être supérieur au coût direct.",
      visuel: "📐 + 🧾 Chiffrage terrain complet",
      decisionChantier: "Décision : valider un budget réaliste avant signature du devis.",
      pontMathsMetier: {
        mesure: "Le coût final d'intervention après marge de sécurité.",
        decision: "Fixer un prix cohérent pour éviter les pertes.",
        impact: "Sécurise la rentabilité globale du chantier.",
      },
      indices: [
        "Indice 1 : calcule d'abord le coût sans marge.",
        "Indice 2 : ajoute ensuite x% avec un coefficient (1 + x/100).",
      ],
    };
  }
  if (scenario === 6) {
    const surface = niveau === "moyen" ? nombreAleatoire(90, 220) : nombreAleatoire(180, 420);
    const dosage = niveau === "moyen" ? nombreAleatoire(2, 4) : nombreAleatoire(4, 6);
    const perte = niveau === "moyen" ? nombreAleatoire(4, 8) : nombreAleatoire(8, 12);
    const litresSansPerte = surface * dosage;
    const litresTotaux = litresSansPerte * (1 + perte / 100);
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Combiner conversion d'un dosage et marge de sécurité en pourcentage.",
      titre: "Situation métier CAPa — préparation de solution nutritive",
      enonce: "Contexte : préparation d'une solution nutritive sur " + surface + " m².\nDonnées : dosage = " + dosage + " L/m² ; marge de sécurité (pertes/pulvérisation) = " + perte + "%.\nQuestion : quel volume total faut-il préparer ?",
      reponse: litresTotaux,
      tolerance: 0.1,
      unite: "L",
      explication: "Étape 1 : volume de base = " + surface + " × " + dosage + " = " + arrondir(litresSansPerte) + " L. Étape 2 : volume total = " + arrondir(litresSansPerte) + " × (1 + " + perte + "/100) = " + arrondir(litresTotaux) + " L.",
      erreurProbable: "Applique d'abord le dosage, puis ajoute la marge en pourcentage.",
      erreurCode: "metier_volume_unitaire",
      palier: "Or",
      etapes: [
        "Je calcule le volume de base avec L/m².",
        "J'ajoute la marge de sécurité en pourcentage.",
        "Je vérifie que le volume final est supérieur au volume de base.",
      ],
      utiliteMetier: "Cette méthode évite les arrêts de chantier liés à une préparation insuffisante.",
      verification: "Avec une marge positive, le volume final doit être plus grand que le volume de base.",
      visuel: "🧪 Préparation solution",
      decisionChantier: "Décision : planifier le volume total à préparer avant intervention.",
      pontMathsMetier: {
        mesure: "Le volume total de solution à emporter sur le terrain.",
        decision: "Dimensionner les cuves et le nombre de remplissages.",
        impact: "Réduit les interruptions et la perte de productivité.",
      },
      indices: [
        "Indice 1 : commence par le volume sans marge (surface × dosage).",
        "Indice 2 : ajoute ensuite la marge avec un coefficient (1 + x/100).",
      ],
    };
  }
  if (scenario === 7) {
    const nbBacs = niveau === "moyen" ? nombreAleatoire(6, 16) : nombreAleatoire(12, 26);
    const volumeBac = niveau === "moyen" ? nombreAleatoire(45, 85) : nombreAleatoire(70, 120);
    const perte = niveau === "moyen" ? nombreAleatoire(5, 10) : nombreAleatoire(9, 16);
    const volumeTheorique = nbBacs * volumeBac;
    const volumeAvecMarge = volumeTheorique * (1 + perte / 100);
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Prévoir un volume total avec marge de perte lors du remplissage.",
      titre: "Situation métier CAPa — remplissage de bacs",
      enonce: "Contexte : préparation d'un substrat pour " + nbBacs + " bacs.\nDonnées : " + volumeBac + " L par bac ; pertes estimées lors du remplissage = " + perte + "%.\nQuestion : quel volume total de substrat faut-il préparer ?",
      reponse: volumeAvecMarge,
      tolerance: 0.1,
      unite: "L",
      explication: "Étape 1 : volume théorique = " + nbBacs + " × " + volumeBac + " = " + arrondir(volumeTheorique) + " L. Étape 2 : volume avec marge = " + arrondir(volumeTheorique) + " × (1 + " + perte + "/100) = " + arrondir(volumeAvecMarge) + " L.",
      erreurProbable: "Ajoute la marge seulement après avoir calculé le volume théorique.",
      erreurCode: "metier_volume_unitaire",
      palier: "Or",
      etapes: [
        "Je calcule le volume nécessaire sans pertes.",
        "Je convertis la perte en coefficient multiplicateur.",
        "Je calcule le volume final à préparer avant le chantier.",
      ],
      utiliteMetier: "Anticiper les pertes évite de relancer une préparation en pleine intervention.",
      verification: "Le volume final doit être supérieur au volume théorique.",
      visuel: "🪴 Préparation des bacs",
      decisionChantier: "Décision : dimensionner la zone de stockage et les livraisons.",
      pontMathsMetier: {
        mesure: "Le volume réel de substrat à mobiliser.",
        decision: "Planifier commande + logistique de manutention.",
        impact: "Fluidifie le chantier et réduit les arrêts.",
      },
      indices: [
        "Indice 1 : commence par multiplier nombre de bacs × litres par bac.",
        "Indice 2 : applique ensuite la marge avec (1 + x/100).",
      ],
    };
  }
  if (scenario === 8) {
    const longueur = nombreAleatoire(16, 42);
    const largeur = nombreAleatoire(6, 20);
    const epaisseurCm = nombreAleatoire(4, 9);
    const densiteKgM3 = nombreAleatoire(520, 760);
    const surface = longueur * largeur;
    const volume = surface * (epaisseurCm / 100);
    const masse = volume * densiteKgM3;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Enchaîner surface, conversion cm→m et masse totale de paillage.",
      titre: "Situation métier CAPa — masse de paillage à livrer",
      enonce: "Contexte : paillage d'une zone de " + longueur + " m × " + largeur + " m.\nDonnées : épaisseur = " + epaisseurCm + " cm ; densité du paillage = " + densiteKgM3 + " kg/m³.\nQuestion : quelle masse totale de paillage faut-il livrer ?",
      reponse: masse,
      tolerance: 0.2,
      unite: "kg",
      explication: "Étape 1 : surface = " + longueur + " × " + largeur + " = " + arrondir(surface) + " m². Étape 2 : épaisseur = " + epaisseurCm + " cm = " + arrondir(epaisseurCm / 100) + " m. Étape 3 : volume = surface × épaisseur = " + arrondir(volume) + " m³. Étape 4 : masse = volume × densité = " + arrondir(masse) + " kg.",
      erreurProbable: "Attention à convertir les centimètres en mètres avant de calculer le volume.",
      erreurCode: "metier_surface_avant_conversion",
      palier: "Or",
      etapes: [
        "Je calcule la surface à pailler.",
        "Je convertis l'épaisseur de cm vers m.",
        "Je calcule volume puis masse avec la densité.",
      ],
      utiliteMetier: "Permet d'organiser les livraisons sans surcharge ni rupture de matériau.",
      verification: "Une épaisseur plus grande doit donner une masse plus grande.",
      visuel: "🚛 Paillage en vrac",
      decisionChantier: "Décision : planifier le tonnage et le nombre de rotations de livraison.",
      pontMathsMetier: {
        mesure: "Le tonnage réel de paillage nécessaire.",
        decision: "Valider la logistique fournisseur et transport.",
        impact: "Réduit les coûts de transport et les retards de pose.",
      },
      indices: [
        "Indice 1 : convertis d'abord l'épaisseur en mètres.",
        "Indice 2 : masse = (surface × épaisseur) × densité.",
      ],
    };
  }
  if (scenario === 9) {
    const longueur = niveau === "difficile" ? nombreAleatoire(22, 46) : nombreAleatoire(14, 32);
    const largeur = niveau === "difficile" ? nombreAleatoire(12, 28) : nombreAleatoire(8, 18);
    const aireAllee = niveau === "difficile" ? nombreAleatoire(25, 70) : nombreAleatoire(12, 36);
    const doseKgM2 = niveau === "difficile" ? nombreAleatoire(3, 6) : nombreAleatoire(2, 4);
    const prixKg = niveau === "difficile" ? nombreAleatoire(2, 5) : nombreAleatoire(1, 3);
    const margeSecurite = niveau === "difficile" ? nombreAleatoire(8, 16) : nombreAleatoire(5, 10);
    const surfaceBrute = longueur * largeur;
    const surfaceUtile = surfaceBrute - aireAllee;
    const masseTheorique = surfaceUtile * doseKgM2;
    const masseFinale = masseTheorique * (1 + margeSecurite / 100);
    const budget = masseFinale * prixKg;
    return {
      theme: "metier",
      competence: "situations-metier",
      competenceLabel: "Situations métier CAPa",
      objectif: "Résoudre une étude de cas complète : surface utile, dosage, marge puis coût total.",
      titre: "Situation métier CAPa — étude de chantier complète",
      enonce: "Contexte : préparation d'un semis sur une zone rectangulaire avec allée technique.\nDonnées : zone = " + longueur + " m × " + largeur + " m ; allée non semée = " + aireAllee + " m² ; dosage = " + doseKgM2 + " kg/m² ; prix = " + prixKg + " €/kg ; marge sécurité = " + margeSecurite + "%.\nQuestion : quel budget total faut-il prévoir pour les semences ?",
      reponse: budget,
      tolerance: 0.2,
      unite: "€",
      explication: "Étape 1 : surface brute = " + longueur + " × " + largeur + " = " + arrondir(surfaceBrute) + " m². Étape 2 : surface utile = " + arrondir(surfaceBrute) + " - " + aireAllee + " = " + arrondir(surfaceUtile) + " m². Étape 3 : masse théorique = " + arrondir(surfaceUtile) + " × " + doseKgM2 + " = " + arrondir(masseTheorique) + " kg. Étape 4 : masse avec marge = " + arrondir(masseTheorique) + " × (1 + " + margeSecurite + "/100) = " + arrondir(masseFinale) + " kg. Étape 5 : budget total = " + arrondir(masseFinale) + " × " + prixKg + " = " + arrondir(budget) + " €.",
      erreurProbable: "Respecte l'ordre des étapes : surface utile → masse → marge → coût.",
      erreurCode: "metier_surface_avant_conversion",
      palier: "Or",
      etapes: [
        "Je retire l'allée pour obtenir la surface utile.",
        "Je calcule la masse de semences selon le dosage kg/m².",
        "J'ajoute la marge de sécurité en pourcentage.",
        "Je convertis la masse finale en coût total (€).",
      ],
      utiliteMetier: "C'est un chiffrage réaliste avant commande : quantité + sécurité + coût final.",
      verification: "Le budget final doit être supérieur au budget sans marge et rester cohérent avec la surface utile.",
      visuel: "🗂️ Dossier chantier complet",
      decisionChantier: "Décision : valider la commande de semences et le budget associé.",
      pontMathsMetier: {
        mesure: "La quantité réelle de semences nécessaire pour la zone utile.",
        decision: "Préparer un bon de commande fiable.",
        impact: "Limite les erreurs de stock et les écarts financiers.",
      },
      indices: [
        "Indice 1 : commence toujours par la surface utile (on retire l'allée).",
        "Indice 2 : applique la marge sur la masse avant de calculer le coût total.",
      ],
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
    etapes: [
      "Je repère l'unité L/m (litres par mètre).",
      "Je multiplie cette consommation par la longueur totale.",
      "Je contrôle que le volume final est en litres.",
    ],
    utiliteMetier: "Permet d'anticiper la réserve d'eau nécessaire avant l'intervention.",
    verification: "Si la longueur double, le volume doit doubler aussi.",
    visuel: "💧 Ligne d'arrosage",
    decisionChantier: "Décision : confirmer le volume d'eau à préparer.",
    pontMathsMetier: {
      mesure: "Le volume d'eau total à partir d'un débit par mètre.",
      decision: "Préparer la réserve d'eau et la durée d'arrosage.",
      impact: "Réduit les risques de sous-arrosage ou gaspillage.",
    },
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
    triangle_div2: function () {
      return {
        theme: "aires",
        competence: "aires-perimetres",
        titre: "Remédiation : aire du triangle",
        enonce: "Contexte : talus triangulaire de base 10 m et hauteur 4 m.\nQuestion : calcule la surface à pailler en m².",
        reponse: 20,
        tolerance: 0.01,
        unite: "m²",
        explication: "Aire = (base × hauteur) ÷ 2 = (10 × 4) ÷ 2 = 20 m².",
        erreurProbable: "Pense à la division par 2 dans la formule du triangle.",
        erreurCode: "triangle_div2",
        indices: [
          "Indice 1 : écris d'abord la formule complète.",
          "Indice 2 : fais 10 × 4 puis divise par 2.",
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
  viderElement(zoneEnonce);
  const meta = document.createElement("div");
  meta.className = "exercise-meta";
  const chips = [
    "🎯 " + (exercice.competenceLabel || "Compétence"),
    "🧩 " + libelleFormatExercice(exercice.formatExercice),
    "🧠 " + (exercice.niveauCognitif || "N1 · Reconnaître"),
    "🪜 Palier " + (exercice.palier || "Bronze"),
    "📌 " + (exercice.objectif || "Raisonner étape par étape"),
  ];
  chips.forEach(function (label) {
    const chip = document.createElement("span");
    chip.className = "exercise-chip";
    chip.textContent = label;
    meta.appendChild(chip);
  });

  const titre = document.createElement("p");
  const titreFort = document.createElement("strong");
  titreFort.textContent = exercice.titre;
  titre.appendChild(titreFort);

  const enonce = document.createElement("p");
  const lignes = String(exercice.enonce || "").split("\n");
  lignes.forEach(function (ligne, index) {
    enonce.appendChild(document.createTextNode(ligne));
    if (index < lignes.length - 1) enonce.appendChild(document.createElement("br"));
  });

  zoneEnonce.appendChild(meta);
  zoneEnonce.appendChild(titre);
  zoneEnonce.appendChild(enonce);
  if (exercice.visuel) {
    const visuel = document.createElement("p");
    visuel.textContent = exercice.visuel;
    zoneEnonce.appendChild(visuel);
  }
  if (exercice.decisionChantier) {
    const decision = document.createElement("p");
    decision.innerHTML = "<strong>" + exercice.decisionChantier + "</strong>";
    zoneEnonce.appendChild(decision);
  }
  zoneFeedback.className = "resultat";
  zoneFeedback.textContent = "";
  champReponse.value = "";
  champReponse.focus();
  const sectionExercices = document.getElementById("section-exercices");
  if (sectionExercices) sectionExercices.scrollIntoView({ behavior: "smooth", block: "start" });
}

function libelleFormatExercice(formatExercice) {
  const mapping = {
    direct: "Calcul direct",
    guide: "Guidé pas à pas",
    estimation: "Estimation + exact",
    erreur: "Détection d'erreur",
    chantier: "Mission chantier",
    long: "Étude de cas longue",
  };
  return mapping[formatExercice] || mapping.direct;
}

function initialiserRaccourcisExercice(ui) {
  if (!ui || !ui.reponseExercice) return;
  document.addEventListener("keydown", function (event) {
    const cible = event.target;
    const dansChampReponse = cible && cible.id === "reponse-exercice";
    if (event.altKey && event.key.toLowerCase() === "n" && ui.btnGenererExercice) {
      event.preventDefault();
      ui.btnGenererExercice.click();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && ui.btnValiderExercice) {
      event.preventDefault();
      ui.btnValiderExercice.click();
      return;
    }
    if (dansChampReponse && event.key === "Escape" && ui.btnJokerExercice) {
      event.preventDefault();
      ui.btnJokerExercice.click();
    }
  });
}

function afficherBarreParcours(zone, etapeActive) {
  if (!zone) return;
  const etapes = [
    "1. Je lis",
    "2. Je choisis la formule",
    "3. Je calcule",
    "4. Je vérifie",
  ];
  zone.innerHTML = etapes.map(function (etape, index) {
    const numero = index + 1;
    const classes = ["exercise-path__step"];
    if (numero < etapeActive) classes.push("exercise-path__step--done");
    if (numero === etapeActive) classes.push("exercise-path__step--active");
    return "<div class=\"" + classes.join(" ") + "\">" + etape + "</div>";
  }).join("");
}

function afficherFeedbackExercice(zone, exercice, reponseEleve, estCorrect, diagnostic) {
  if (!zone) return;
  zone.className = "resultat resultat--visible" + (estCorrect ? "" : " resultat--erreur");
  viderElement(zone);

  const progression = chargerProgression();
  const motivationData = chargerMotivation();
  const message = document.createElement("p");
  const messageFort = document.createElement("strong");
  messageFort.textContent = estCorrect ? "Bravo ✅" : "Presque ❌";
  message.appendChild(messageFort);
  message.appendChild(document.createTextNode(estCorrect ? " Tu avances bien." : " On corrige ça ensemble."));

  const bilan = document.createElement("p");
  const uniteAffichee = exercice.modeCorrection === "erreur" ? "" : (exercice.unite ? " " + exercice.unite : "");
  const attenduAffiche = exercice.modeCorrection === "erreur"
    ? (exercice.reponse === 1 ? "1 (proposition correcte)" : "0 (proposition incorrecte)")
    : arrondir(exercice.reponse) + uniteAffichee;
  const reponseAffichee = exercice.modeCorrection === "erreur"
    ? String(arrondir(reponseEleve))
    : arrondir(reponseEleve) + uniteAffichee;
  bilan.textContent = estCorrect
    ? "✅ Correct : " + attenduAffiche
    : "❌ Attendu : " + attenduAffiche + " (toi : " + reponseAffichee + ")";

  const ecartTexte = document.createElement("p");
  const ecartAbsolu = Math.abs((reponseEleve || 0) - exercice.reponse);
  const base = Math.max(Math.abs(exercice.reponse), 1e-9);
  const ecartRelatif = (ecartAbsolu / base) * 100;
  ecartTexte.className = "resultat__formule";
  ecartTexte.textContent = estCorrect
    ? "Précision : écart de " + arrondir(ecartAbsolu) + uniteAffichee + "."
    : "Écart actuel : " + arrondir(ecartAbsolu) + uniteAffichee + " (≈ " + arrondir(ecartRelatif) + "%).";

  const explication = document.createElement("div");
  explication.className = "resultat__formule";
  explication.textContent = exercice.explication;

  const action = document.createElement("p");
  action.className = "resultat__formule";
  action.textContent = exercice.modeCorrection === "erreur"
    ? (estCorrect
      ? "Action : explique maintenant l'erreur détectée pour ancrer le raisonnement."
      : "Action : compare la proposition avec la méthode attendue puis décide si elle est juste (1) ou fausse (0).")
    : (estCorrect
      ? "Action : continue sans indice pour consolider."
      : "Action : reprends l'étape 2 de la méthode puis retente avec l'unité finale.");

  const motivation = document.createElement("p");
  motivation.className = "resultat__formule";
  motivation.textContent = estCorrect
    ? messageEncouragement(progression, motivationData)
    : "Objectif : corriger la méthode puis viser une réponse juste au prochain essai.";

  const accompagnement = document.createElement("p");
  accompagnement.className = "resultat__formule";
  accompagnement.textContent = exercice.modeAccompagnement === "defi"
    ? "Mode défi actif : tolérance resserrée pour gagner en précision."
    : (exercice.modeAccompagnement === "guide"
      ? "Mode guidé actif : tolérance élargie pour consolider la méthode."
      : "Mode autonome : équilibre entre précision et autonomie.");

  zone.appendChild(message);
  zone.appendChild(bilan);
  zone.appendChild(ecartTexte);
  zone.appendChild(explication);
  zone.appendChild(action);
  zone.appendChild(motivation);
  zone.appendChild(accompagnement);

  if (diagnostic) zone.appendChild(creerAstuce("Diagnostic probable", diagnostic));
  zone.appendChild(creerAstuce("Erreur fréquente", exercice.erreurProbable));
  if (exercice.questionsFlash && exercice.questionsFlash.length) {
    zone.appendChild(creerAstuce("Questions flash (30 sec)", exercice.questionsFlash.join(" • ")));
  }
}

function dateJourISO(dateObj) {
  const date = dateObj || new Date();
  return date.toISOString().slice(0, 10);
}

function ajouterJours(dateISO, delta) {
  const d = new Date(dateISO + "T00:00:00");
  d.setDate(d.getDate() + delta);
  return dateJourISO(d);
}

function construireDefiDuJour(dateISO) {
  const date = dateISO || dateJourISO();
  const seed = Number(date.replace(/-/g, ""));
  const objectif = (seed % 3) + 3; // entre 3 et 5 réussites
  return { date: date, objectif: objectif, reussites: 0, termine: false };
}

function chargerMotivation() {
  try {
    const brute = localStorage.getItem(CLE_MOTIVATION);
    const base = {
      points: 0,
      serieJours: 0,
      dernierJourReussi: "",
      defisTermines: 0,
      defi: construireDefiDuJour(dateJourISO()),
    };
    if (!brute) return base;
    const data = JSON.parse(brute);
    if (!data.defi || data.defi.date !== dateJourISO()) data.defi = construireDefiDuJour(dateJourISO());
    return Object.assign(base, data);
  } catch (e) {
    return {
      points: 0,
      serieJours: 0,
      dernierJourReussi: "",
      defisTermines: 0,
      defi: construireDefiDuJour(dateJourISO()),
    };
  }
}

function sauvegarderMotivation(data) {
  localStorage.setItem(CLE_MOTIVATION, JSON.stringify(data));
}

function enregistrerMotivation(exercice, estCorrect) {
  const data = chargerMotivation();
  if (!estCorrect || !exercice) {
    sauvegarderMotivation(data);
    return;
  }
  const pointsParPalier = { Bronze: 10, Argent: 14, Or: 18 };
  data.points += pointsParPalier[exercice.palier] || 10;
  data.defi.reussites += 1;
  if (!data.defi.termine && data.defi.reussites >= data.defi.objectif) {
    data.defi.termine = true;
    data.defisTermines += 1;
    data.points += 25;
  }
  const aujourdhui = dateJourISO();
  if (data.dernierJourReussi !== aujourdhui) {
    const hier = ajouterJours(aujourdhui, -1);
    data.serieJours = data.dernierJourReussi === hier ? data.serieJours + 1 : 1;
    data.dernierJourReussi = aujourdhui;
  }
  sauvegarderMotivation(data);
}

function mettreAJourTableauMotivation(zoneMotivation, zoneDefi) {
  const data = chargerMotivation();
  if (zoneMotivation) {
    zoneMotivation.innerHTML =
      "<strong>Tableau motivation</strong>" +
      "<ul>" +
      "<li>⭐ Points d'apprentissage : <strong>" + data.points + "</strong></li>" +
      "<li>🔥 Série de jours actifs : <strong>" + data.serieJours + "</strong></li>" +
      "<li>🏅 Défis réussis : <strong>" + data.defisTermines + "</strong></li>" +
      "</ul>";
  }
  if (zoneDefi) {
    const restant = Math.max(0, data.defi.objectif - data.defi.reussites);
    zoneDefi.innerHTML =
      "<strong>Défi du jour (" + data.defi.date + ")</strong>" +
      "<p>Réussis <strong>" + data.defi.objectif + "</strong> exercices justes pour débloquer le bonus motivation.</p>" +
      "<p>Progression : <strong>" + data.defi.reussites + "/" + data.defi.objectif + "</strong> " +
      (data.defi.termine ? "✅ Défi validé !" : "• Encore " + restant + " réussite(s).") +
      "</p>";
  }
}

function afficherFeedbackEstimation(zone, estimation, valeurExacte, unite) {
  if (!zone) return;
  if (typeof estimation !== "number" || !isFinite(estimation) || typeof valeurExacte !== "number") {
    zone.innerHTML = "Active ton intuition : écris une estimation, puis compare avec ton résultat exact.";
    return;
  }
  const ecart = estimation - valeurExacte;
  const ecartAbs = Math.abs(ecart);
  const ecartPct = valeurExacte !== 0 ? (ecartAbs / Math.abs(valeurExacte)) * 100 : 0;
  const precision = ecartPct <= 10
    ? "🎯 Excellente estimation"
    : (ecartPct <= 25 ? "👍 Bonne intuition" : "🧭 À ajuster");
  zone.innerHTML =
    "<strong>" + precision + "</strong>" +
    "<p>Estimation : <strong>" + arrondir(estimation) + " " + (unite || "") + "</strong> • " +
    "Valeur attendue : <strong>" + arrondir(valeurExacte) + " " + (unite || "") + "</strong></p>" +
    "<p>Écart : <strong>" + arrondir(ecartAbs) + " " + (unite || "") + "</strong> (" + arrondir(ecartPct) + "%). " +
    "Astuce : visualise l'ordre de grandeur avant de calculer précisément.</p>";
}

function mettreAJourRadarCompetences(zone) {
  if (!zone) return;
  const progression = chargerProgression();
  const cartes = [
    { cle: "aires-perimetres", label: "Aires / périmètres" },
    { cle: "pourcentages", label: "Pourcentages" },
    { cle: "situations-metier", label: "Situations métier" },
  ];
  const lignes = cartes.map(function (item) {
    const stats = progression.competences[item.cle] || { essais: 0, reussites: 0 };
    const taux = stats.essais > 0 ? (stats.reussites / stats.essais) * 100 : 0;
    return (
      "<div class=\"radar-row\">" +
      "<span>" + item.label + "</span>" +
      "<span class=\"radar-row__bar\"><span style=\"width:" + Math.max(8, Math.min(100, taux)) + "%\"></span></span>" +
      "<strong>" + arrondir(taux) + "%</strong>" +
      "</div>"
    );
  });
  zone.innerHTML =
    "<p>Lis ton radar pour choisir la prochaine compétence à entraîner en priorité.</p>" +
    lignes.join("");
}

function mettreAJourLaboratoireErreurs(zone) {
  if (!zone) return;
  const file = lireRemediation();
  if (!file.length) {
    zone.innerHTML = "Aucune erreur récurrente détectée. Continue pour alimenter le diagnostic intelligent.";
    return;
  }
  const resume = {};
  file.forEach(function (item) {
    if (!item || !item.erreurCode) return;
    resume[item.erreurCode] = (resume[item.erreurCode] || 0) + 1;
  });
  const pireCode = Object.keys(resume).sort(function (a, b) { return resume[b] - resume[a]; })[0];
  const strategie = {
    rayon_diametre: "Dessine rapidement le cercle et note r puis 2r avant la formule.",
    triangle_div2: "Ajoute un repère visuel « ÷2 » à la fin de ton brouillon.",
    pourcent_div100: "Écris systématiquement « /100 » avant toute multiplication en pourcentage.",
    aire_unite: "Entoure l'unité attendue (m²) avant de calculer.",
    metier_cout_unitaire: "Pose une ligne d'unités : quantité × prix unitaire = coût total.",
    metier_volume_unitaire: "Vérifie que L/min × min donne bien des litres.",
  };
  const conseils = {
    rayon_diametre: "Confusion rayon/diamètre",
    triangle_div2: "Oubli du ÷2 (triangle)",
    pourcent_div100: "Division par 100 oubliée",
    aire_unite: "Unité d'aire non maîtrisée",
    metier_cout_unitaire: "Conversion coût unitaire",
    metier_volume_unitaire: "Conversion de volume",
  };
  zone.innerHTML =
    "<p><strong>Erreur dominante :</strong> " + (conseils[pireCode] || pireCode) + " (" + resume[pireCode] + " occurrence(s)).</p>" +
    "<p><strong>Micro-stratégie :</strong> " + (strategie[pireCode] || "Refais l'exercice en verbalisant chaque unité.") + "</p>" +
    "<p class=\"resultat__astuce\">Objectif : corrige cette erreur 3 fois d'affilée pour la faire disparaître du laboratoire.</p>";
}

function messageEncouragement(progression, motivationData) {
  if ((progression.serie || 0) >= 3) {
    return "Super : " + progression.serie + " réussites de suite 🔥";
  }
  if (motivationData && motivationData.defi && motivationData.defi.termine) {
    return "Défi du jour validé 🎉 Bonus points débloqué, continue comme ça.";
  }
  if (motivationData && motivationData.serieJours >= 3) {
    return "Régularité au top : " + motivationData.serieJours + " jours de suite 👏";
  }
  return "Bravo, tu progresses exercice après exercice.";
}

function analyserErreur(exercice, reponseEleve) {
  if (!exercice || typeof reponseEleve !== "number") return "";
  if (exercice.modeCorrection === "erreur") {
    return reponseEleve === 1
      ? "Ici la proposition était volontairement fausse : repère l'écart numérique puis corrige la formule."
      : "Bonne logique : la proposition était fausse. Prochaine étape : expliquer l'erreur en une phrase.";
  }
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
    zone.textContent = "Aucun indice supplémentaire pour cet exercice.";
    return;
  }
  zone.className = "resultat resultat--visible";
  viderElement(zone);
  const ligne = document.createElement("p");
  const fort = document.createElement("strong");
  fort.textContent = "Indice " + (niveauIndice + 1) + " :";
  ligne.appendChild(fort);
  ligne.appendChild(document.createTextNode(" " + indices[niveauIndice]));
  zone.appendChild(ligne);
  zone.appendChild(creerAstuceTexte("Essaie ensuite de refaire le calcul sans regarder la méthode complète."));
}

function afficherMethode(zone, exercice) {
  if (!zone || !exercice) return;
  zone.className = "resultat resultat--visible";
  viderElement(zone);
  const titre = document.createElement("p");
  const fort = document.createElement("strong");
  fort.textContent = "Méthode guidée :";
  titre.appendChild(fort);
  zone.appendChild(titre);

  const blocMethode = document.createElement("div");
  blocMethode.className = "resultat__formule";
  blocMethode.textContent = exercice.explication;
  zone.appendChild(blocMethode);
  zone.appendChild(creerAstuce("Astuce de remédiation", exercice.erreurProbable));
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

function afficherPlanMaitrise(zone) {
  if (!zone) return;
  const progression = chargerProgression();
  const competences = [
    { cle: "aires-perimetres", label: "Aires / périmètres" },
    { cle: "pourcentages", label: "Pourcentages" },
    { cle: "situations-metier", label: "Situations métier" },
  ];
  const lignes = competences.map(function (item) {
    const stats = progression.competences[item.cle] || { essais: 0, reussites: 0 };
    const taux = stats.essais > 0 ? (stats.reussites / stats.essais) * 100 : 0;
    const statut = taux >= 75 ? "✅ acquis" : (stats.essais >= 2 ? "⚠️ à renforcer" : "🟡 à travailler");
    return "<li><strong>" + item.label + "</strong> — " + statut + " (" + arrondir(taux) + "%)</li>";
  });
  zone.innerHTML = "<strong>Plan de maîtrise (formatif)</strong><ul>" + lignes.join("") + "</ul>";
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

function mettreAJourRubanSession(ui) {
  if (!ui || !ui.rubanSessionExercice) return;
  const taux = sessionStats.essais > 0 ? (sessionStats.reussites / sessionStats.essais) * 100 : 0;
  const progressionTexte = Math.min(sessionStats.essais, 5) + "/5";
  const unite = exerciceActuel && exerciceActuel.unite ? exerciceActuel.unite : "—";
  const chronoTexte = ui.modeChrono && ui.modeChrono.checked
    ? String(Math.floor(Math.max(0, chronoRestant) / 60)).padStart(2, "0") + ":" + String(Math.max(0, chronoRestant) % 60).padStart(2, "0")
    : "désactivé";

  ui.rubanSessionExercice.innerHTML =
    '<div class="exercise-session-ribbon__line">' +
    "<span><strong>Progression :</strong> " + progressionTexte + "</span>" +
    "<span><strong>Réussite :</strong> " + arrondir(taux) + "%</span>" +
    "</div>" +
    '<div class="exercise-session-ribbon__line">' +
    "<span><strong>Unité attendue :</strong> " + unite + "</span>" +
    "<span><strong>Chrono :</strong> " + chronoTexte + "</span>" +
    "</div>";
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
    const modeAccompagnement = selection && selection.modeAccompagnement ? selection.modeAccompagnement : "autonome";
    const libelleMode = modeAccompagnement === "guide"
      ? "guidé"
      : (modeAccompagnement === "defi" ? "défi" : "autonome");
    const objectif = exercice && exercice.objectif
      ? exercice.objectif
      : (objectifs[objectifSeance] || objectifs.precision);
    zoneObjectif.innerHTML =
      "<strong>Objectif de séance :</strong> " +
      objectif +
      '<br><small>Parcours : ' + source + " • Accompagnement : " + libelleMode + " • Format : " + libelleFormatExercice(exercice && exercice.formatExercice) + "</small>";
  }
  if (zoneCompetences) {
    const competence = exercice && exercice.competenceLabel ? exercice.competenceLabel : "Compétence transversale";
    const palier = determinerPalierCompetence(exercice ? exercice.competence : "");
    const critere = exercice && exercice.modeCorrection === "erreur"
      ? "Identifier correctement si une solution proposée est valide (1) ou fausse (0)."
      : "Donner une réponse juste avec l'unité correcte.";
    zoneCompetences.innerHTML =
      "<strong>Micro-compétence :</strong> " +
      competence +
      '<br><strong>Palier actuel :</strong> ' + palier +
      '<br><strong>Critère de réussite :</strong> ' + critere;
  }
}

function afficherFicheApprentissage(zone, exercice) {
  if (!zone || !exercice) return;
  const critere = exercice.modeCorrection === "erreur"
    ? "repérer si la proposition est correcte (1) ou incorrecte (0), puis justifier."
    : "résultat juste avec l'unité correcte.";
  zone.innerHTML =
    "<strong>Fiche d'apprentissage</strong>" +
    "<p><strong>Compétence visée :</strong> " + (exercice.competenceLabel || "Compétence transversale") + "</p>" +
    "<p><strong>Critère de réussite :</strong> " + critere + "</p>" +
    "<p><strong>Erreur à éviter :</strong> " + (exercice.erreurProbable || "Relis l'énoncé.") + "</p>" +
    "<p><strong>Question flash :</strong> " + ((exercice.questionsFlash && exercice.questionsFlash[0]) || "Explique ton raisonnement à voix haute.") + "</p>";
}

function afficherMissionSuivante(zone, exercice, estCorrect) {
  if (!zone || !exercice) return;
  const missions = [];
  if (exercice.competence === "aires-perimetres") {
    missions.push("Mission 1 : refais le calcul en changeant les mesures de +2 m pour vérifier la méthode.");
    missions.push("Mission 2 : explique à l'oral pourquoi l'unité est en m² (et pas en m).");
  } else if (exercice.competence === "pourcentages") {
    missions.push("Mission 1 : transforme le pourcentage en coefficient multiplicateur.");
    missions.push("Mission 2 : vérifie si ton résultat est logique (partie < total, ou baisse/hausse cohérente).");
  } else {
    missions.push("Mission 1 : identifie la décision chantier que ce résultat permet de prendre.");
    missions.push("Mission 2 : propose une marge de sécurité réaliste (5% à 10%) et recalcule.");
  }

  const statut = estCorrect === null
    ? "🎒 Plan d'entraînement : prépare ta stratégie avant de répondre."
    : (estCorrect
      ? "🚀 Bravo, mission réussie ! Passe à la version défi."
      : "🧩 Mission de remédiation : consolide la méthode puis retente.");

  zone.innerHTML =
    "<strong>Mission suivante</strong>" +
    "<p>" + statut + "</p>" +
    "<ul><li>" + missions.join("</li><li>") + "</li></ul>";
}

function afficherPontMathsMetier(zone, exercice) {
  if (!zone || !exercice) return;
  const pont = exercice.pontMathsMetier || {};
  const mesure = pont.mesure || "Quelle grandeur dois-je mesurer ou calculer ?";
  const decision = pont.decision || "Quelle décision chantier prend-on avec ce résultat ?";
  const impact = pont.impact || "Quel impact concret pour le chantier (coût, temps, sécurité, quantité) ?";
  zone.innerHTML =
    "<strong>Lien maths ↔ aménagement paysager</strong>" +
    "<ul class=\"resultat__etapes-liste\">" +
    "<li>📏 <strong>Mesure :</strong> " + mesure + "</li>" +
    "<li>🧭 <strong>Décision :</strong> " + decision + "</li>" +
    "<li>🌿 <strong>Impact terrain :</strong> " + impact + "</li>" +
    "</ul>";
}

function afficherChecklistVerification(zone, exercice, estValide) {
  if (!zone || !exercice) return;
  zone.innerHTML =
    "<strong>Check-list avant / après validation</strong>" +
    "<ul>" +
    "<li>" + (estValide ? "✅" : "⬜") + " J'ai utilisé la bonne formule.</li>" +
    "<li>" + (estValide ? "✅" : "⬜") + " Mon unité finale est correcte.</li>" +
    "<li>" + (estValide ? "✅" : "⬜") + " Mon résultat est cohérent avec la situation.</li>" +
    "</ul>" +
    "<small>Auto-contrôle : " + (exercice.verification || "relis ton calcul étape par étape.") + "</small>";
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
  const erreursConsecutives = compterErreursRecentes(exercice.erreurCode);
  const microCours = erreursConsecutives >= 2
    ? "<p><strong>Micro-cours (30 sec) :</strong> " + (diagnostic || exercice.erreurProbable) + " Ensuite, fais un exercice ciblé sans te presser.</p>"
    : "";
  zone.innerHTML =
    "<strong>Plan de remédiation (3 étapes)</strong>" +
    "<ol class=\"resultat__etapes-liste\">" +
    "<li>Revoir la notion ciblée : " + (diagnostic || exercice.erreurProbable) + ".</li>" +
    "<li>Refaire un exercice similaire avec indice 1 puis indice 2.</li>" +
    "<li>Valider un nouvel exercice sans aide pour consolider.</li>" +
    "</ol>" +
    microCours;
}

function compterErreursRecentes(erreurCode) {
  if (!erreurCode) return 0;
  const historique = lireHistorique()
    .filter(function (item) { return item.estCorrect === false; })
    .slice(0, 4);
  return historique.filter(function (item) { return item.erreurCode === erreurCode; }).length;
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
    mettreAJourRubanSession(ui);
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
  mettreAJourRubanSession(ui);
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
  const historique = lireHistorique().filter(function (item) {
    return item.type === "exercice" && item.estCorrect === false;
  });
  const erreursParCode = {};
  historique.forEach(function (item) {
    const cle = item.erreurCode || "erreur_generique";
    erreursParCode[cle] = (erreursParCode[cle] || 0) + 1;
  });
  const topErreurs = Object.entries(erreursParCode)
    .sort(function (a, b) { return b[1] - a[1]; })
    .slice(0, 3);

  if (zoneDiagnostic) {
    if (topErreurs.length === 0) {
      zoneDiagnostic.innerHTML = "<strong>Diagnostic personnalisé :</strong> aucune erreur fréquente détectée pour l'instant. Continue ainsi.";
    } else {
      zoneDiagnostic.innerHTML =
        "<strong>Erreurs fréquentes (récent) :</strong><ul>" +
        topErreurs.map(function (item) {
          return "<li>" + libelleErreur(item[0]) + " : <strong>" + item[1] + "</strong> fois</li>";
        }).join("") +
        "</ul>";
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

function construireStatsCompetences() {
  const progression = chargerProgression();
  const historique = lireHistorique().filter(function (item) { return item.type === "exercice"; });
  const definitions = [
    { cle: "aires-perimetres", label: "Aires / périmètres", cible: 10 },
    { cle: "pourcentages", label: "Pourcentages", cible: 10 },
    { cle: "situations-metier", label: "Situations métier", cible: 8 },
  ];

  return definitions.map(function (definition) {
    const stats = progression.competences[definition.cle] || { essais: 0, reussites: 0 };
    const taux = stats.essais > 0 ? (stats.reussites / stats.essais) * 100 : 0;
    const recentes = historique
      .filter(function (item) { return item.competence === definition.cle; })
      .slice(0, 5);
    const dynamique = recentes.length === 0
      ? "aucune donnée récente"
      : (recentes.filter(function (item) { return item.estCorrect; }).length >= Math.ceil(recentes.length / 2)
        ? "en progression"
        : "à consolider");
    const restant = Math.max(0, definition.cible - stats.essais);
    return {
      cle: definition.cle,
      label: definition.label,
      essais: stats.essais,
      reussites: stats.reussites,
      taux: taux,
      dynamique: dynamique,
      restant: restant,
    };
  });
}

function mettreAJourTableauCompetences(zoneTableau, zonePlan) {
  const statsCompetences = construireStatsCompetences();
  const moyenne = statsCompetences.reduce(function (acc, item) { return acc + item.taux; }, 0) / statsCompetences.length;
  const pointFort = statsCompetences.reduce(function (meilleur, item) {
    return !meilleur || item.taux > meilleur.taux ? item : meilleur;
  }, null);
  const priorite = statsCompetences.reduce(function (faible, item) {
    return !faible || item.taux < faible.taux ? item : faible;
  }, null);

  if (zoneTableau) {
    const lignes = statsCompetences.map(function (item) {
      const statut = item.taux >= 75 ? "✅ maîtrisé" : (item.essais >= 3 ? "⚠️ en cours" : "🟡 à démarrer");
      return (
        "<li><strong>" + item.label + "</strong> — " +
        arrondir(item.taux) + "% (" + item.reussites + "/" + item.essais + "), " +
        statut + ", tendance : <em>" + item.dynamique + "</em>.</li>"
      );
    }).join("");
    zoneTableau.innerHTML =
      "<p><strong>Vue globale :</strong> " + arrondir(moyenne) + "% de réussite moyenne.</p>" +
      "<ul>" + lignes + "</ul>";
  }

  if (zonePlan) {
    const plan = genererPlanEntrainementHebdo(priorite, pointFort, statsCompetences);
    zonePlan.innerHTML =
      "<p><strong>Mission principale :</strong> " + plan.mission + "</p>" +
      "<ol class=\"resultat__etapes-liste\">" +
      plan.etapes.map(function (etape) { return "<li>" + etape + "</li>"; }).join("") +
      "</ol>" +
      "<small>" + plan.rappel + "</small>";
  }
}

function afficherAnalyseApprentissage(zone) {
  if (!zone) return;
  const statsCompetences = construireStatsCompetences();
  const historique = lireHistorique().filter(function (item) { return item.type === "exercice"; });
  if (historique.length === 0) {
    zone.innerHTML =
      "<p><strong>Diagnostic prêt :</strong> fais 3 exercices pour obtenir une analyse détaillée (forces, risques et plan d'action).</p>" +
      "<ul><li>🎯 Commence en mode guidé.</li><li>🧪 Vérifie l'unité avant de valider.</li><li>🗣️ Explique ta méthode à voix haute.</li></ul>";
    return;
  }

  const pointFort = statsCompetences.reduce(function (acc, item) {
    return !acc || item.taux > acc.taux ? item : acc;
  }, null);
  const axePrioritaire = statsCompetences.reduce(function (acc, item) {
    return !acc || item.taux < acc.taux ? item : acc;
  }, null);
  const recent = historique.slice(0, 6);
  const reussitesRecentes = recent.filter(function (item) { return !!item.estCorrect; }).length;
  const momentum = reussitesRecentes >= 4 ? "positive" : (reussitesRecentes >= 2 ? "stable" : "fragile");
  const conseilMomentum = momentum === "positive"
    ? "Tu peux augmenter la difficulté sur 1 exercice pour consolider."
    : (momentum === "stable"
      ? "Reste en mode autonome et travaille la vérification d'unité."
      : "Reviens 10 minutes en mode guidé avec indices.");

  zone.innerHTML =
    "<p><strong>Forces actuelles :</strong> " + pointFort.label + " (" + arrondir(pointFort.taux) + "%).</p>" +
    "<p><strong>Axe prioritaire :</strong> " + axePrioritaire.label + " (" + arrondir(axePrioritaire.taux) + "%).</p>" +
    "<p><strong>Dynamique récente :</strong> " + reussitesRecentes + "/" + recent.length + " réussites (" + momentum + ").</p>" +
    "<ul>" +
    "<li>✅ Garde ton point fort avec 1 exercice de maintien par séance.</li>" +
    "<li>🎯 Fais 2 exercices ciblés sur « " + axePrioritaire.label + " » aujourd'hui.</li>" +
    "<li>🧭 " + conseilMomentum + "</li>" +
    "</ul>";
}

function genererPlanEntrainementHebdo(priorite, pointFort, statsCompetences) {
  if (!priorite || !pointFort) {
    return {
      mission: "Lance un premier exercice pour activer ton suivi personnalisé.",
      etapes: [
        "Jour 1 : 2 exercices faciles pour prendre tes repères.",
        "Jour 2 : 1 exercice + vérification des unités.",
        "Jour 3 : 1 exercice métier pour relier les maths au terrain.",
      ],
      rappel: "Astuce : note ta méthode en une phrase après chaque correction.",
    };
  }

  const objectifTaux = Math.max(70, Math.round(priorite.taux + 15));
  const exercicesPrioritaires = priorite.essais < 4 ? 4 : 3;
  const rappelCible = statsCompetences
    .map(function (item) { return item.label + " : " + item.restant + " exercice(s) conseillé(s)"; })
    .join(" • ");

  return {
    mission: "Faire monter « " + priorite.label + " » vers " + objectifTaux + "% tout en gardant ton point fort « " + pointFort.label + " ».",
    etapes: [
      "Jour 1-2 : " + exercicesPrioritaires + " exercices ciblés en mode guidé sur " + priorite.label + ".",
      "Jour 3-4 : 2 exercices en mode autonome + relecture des erreurs fréquentes.",
      "Jour 5 : 1 exercice chrono pour tester la stabilité de la méthode.",
      "Jour 6-7 : 1 exercice métier + 1 exercice sur ton point fort « " + pointFort.label + " ».",
    ],
    rappel: "Suivi conseillé cette semaine → " + rappelCible + ".",
  };
}

function exporterBilanEleve(zoneFeedback) {
  const statsCompetences = construireStatsCompetences();
  const lignes = statsCompetences.map(function (item) {
    return "- " + item.label + " : " + arrondir(item.taux) + "% (" + item.reussites + "/" + item.essais + ")";
  }).join("\n");
  const texte = [
    "Bilan Maths Paysager",
    "Date : " + new Date().toLocaleDateString("fr-FR"),
    "Progression par compétence :",
    lignes,
    "Prochaine action : refaire 1 exercice dans la compétence la plus faible.",
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texte).then(function () {
      if (zoneFeedback) {
        zoneFeedback.className = "resultat resultat--visible";
        zoneFeedback.innerHTML = "✅ Bilan copié dans le presse-papiers. Tu peux le coller dans ton carnet de suivi.";
      }
    }).catch(function () {
      fallbackExportBilan(texte, zoneFeedback);
    });
    return;
  }
  fallbackExportBilan(texte, zoneFeedback);
}

function fallbackExportBilan(texte, zoneFeedback) {
  if (!zoneFeedback) return;
  zoneFeedback.className = "resultat resultat--visible";
  zoneFeedback.innerHTML =
    "<strong>Copie manuelle du bilan :</strong><pre>" + texte + "</pre>";
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
  const champsHtml = champs
    .map(function (champ) {
      return (
        '<div class="form-group">' +
        '  <label for="' + champ.id + '">' + champ.label + "</label>" +
        '  <input type="number" id="' + champ.id + '" ' +
        '    aria-describedby="' + champ.id + '-erreur" ' +
        '    placeholder="' + champ.placeholder + '" ' +
        '    step="0.01" min="0">' +
        '  <p class="unit-note">Unité attendue : ' + (champ.unite || "valeur") + "</p>" +
        '  <p class="field-error" id="' + champ.id + '-erreur" aria-live="polite"></p>' +
        "</div>"
      );
    })
    .join("");

  const blocEstimation =
    '<div class="form-group form-group--estimation">' +
    '  <label for="estimation-forme">Estimation de l\'aire (optionnel)</label>' +
    '  <input type="number" id="estimation-forme" placeholder="Ex : 20" step="0.01" min="0">' +
    '  <p class="unit-note">Avant de calculer, fais une estimation rapide en m².</p>' +
    "</div>";

  conteneur.innerHTML = champsHtml + blocEstimation;
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
      { id: "pourcent-val", label: "Pourcentage (%)", placeholder: "Ex : 15", unite: "%" },
      { id: "nombre-val", label: "Nombre", placeholder: "Ex : 200", unite: "valeur brute" },
    ],
    "quel-pourcentage": [
      { id: "partie-val", label: "Partie (A)", placeholder: "Ex : 30", unite: "valeur brute" },
      { id: "total-val", label: "Total (B)", placeholder: "Ex : 200", unite: "valeur brute" },
    ],
    augmentation: [
      { id: "valeur-depart", label: "Valeur de départ", placeholder: "Ex : 150", unite: "valeur brute" },
      { id: "pourcent-aug", label: "Augmentation (%)", placeholder: "Ex : 20", unite: "%" },
    ],
    reduction: [
      { id: "valeur-depart", label: "Valeur de départ", placeholder: "Ex : 150", unite: "valeur brute" },
      { id: "pourcent-red", label: "Réduction (%)", placeholder: "Ex : 10", unite: "%" },
    ],
  };

  const champs = champsParType[type] || [];

  const champsHtml = champs
    .map(function (champ) {
      return (
        '<div class="form-group">' +
        '  <label for="' + champ.id + '">' + champ.label + "</label>" +
        '  <input type="number" id="' + champ.id + '" ' +
        '    aria-describedby="' + champ.id + '-erreur" ' +
        '    placeholder="' + champ.placeholder + '" ' +
        '    step="0.01" min="0">' +
        '  <p class="unit-note">Unité attendue : ' + (champ.unite || "valeur") + "</p>" +
        '  <p class="field-error" id="' + champ.id + '-erreur" aria-live="polite"></p>' +
        "</div>"
      );
    })
    .join("");

  const blocEstimation =
    '<div class="form-group form-group--estimation">' +
    '  <label for="estimation-pourcent">Estimation du résultat (optionnel)</label>' +
    '  <input type="number" id="estimation-pourcent" placeholder="Ex : 30" step="0.01">' +
    '  <p class="unit-note">Astuce : estime d\'abord, puis compare avec le résultat exact.</p>' +
    "</div>";

  conteneur.innerHTML = champsHtml + blocEstimation;
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
  const estimationAire = lireValeur("estimation-forme");

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
  const feedbackEstimation = creerFeedbackEstimation(
    estimationAire,
    aire,
    "m²",
    "ton estimation d'aire"
  );
  afficherResultat(
    resultat,
    aire,
    perimetre,
    formuleAire,
    formulePerimetre,
    etapesAire,
    etapesPerimetre,
    forme,
    feedbackEstimation
  );
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
  const estimationResultat = lireValeur("estimation-pourcent");

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
      afficherResultatPourcent(
        resultat,
        arrondir(valeurResultat),
        formule,
        etapes,
        type,
        creerFeedbackEstimation(estimationResultat, valeurResultat, "", "ton estimation")
      );
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
      afficherResultatPourcent(
        resultat,
        arrondir(valeurResultat) + " %",
        formule,
        etapes,
        type,
        creerFeedbackEstimation(estimationResultat, valeurResultat, "%", "ton estimation")
      );
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
      afficherResultatPourcent(
        resultat,
        arrondir(valeurResultat),
        formule,
        etapes,
        type,
        creerFeedbackEstimation(estimationResultat, valeurResultat, "", "ton estimation")
      );
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
      afficherResultatPourcent(
        resultat,
        arrondir(valeurResultat),
        formule,
        etapes,
        type,
        creerFeedbackEstimation(estimationResultat, valeurResultat, "", "ton estimation")
      );
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
  return parserNombreLocale(champ.value);
}

function parserNombreLocale(texte) {
  if (typeof texte !== "string") return NaN;
  const normalise = texte.trim().replace(/\s+/g, "").replace(",", ".");
  return parseFloat(normalise);
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
function afficherResultat(zone, aire, perimetre, formuleAire, formulePerimetre, etapesAire, etapesPerimetre, forme, feedbackEstimation) {
  zone.className = "resultat resultat--visible";
  viderElement(zone);
  zone.appendChild(creerLigneResultat("Aire", arrondir(aire) + " m²"));
  if (perimetre !== null) {
    zone.appendChild(creerLigneResultat("Périmètre", arrondir(perimetre) + " m"));
  }

  const formule = document.createElement("div");
  formule.className = "resultat__formule";
  formule.appendChild(document.createTextNode(formuleAire));
  formule.appendChild(document.createElement("br"));
  formule.appendChild(document.createTextNode(formulePerimetre));
  zone.appendChild(formule);

  const blocAire = creerBlocEtapesElement("Étapes pour l'aire", etapesAire);
  if (blocAire) zone.appendChild(blocAire);
  const blocPerimetre = creerBlocEtapesElement("Étapes pour le périmètre", etapesPerimetre);
  if (blocPerimetre) zone.appendChild(blocPerimetre);
  const blocEstimation = creerBlocEstimation(feedbackEstimation);
  if (blocEstimation) zone.appendChild(blocEstimation);
  zone.appendChild(creerAutoControle([
    "Ai-je bien écrit l'unité finale (m² pour l'aire, m pour le périmètre) ?",
    "Le résultat est-il cohérent avec les dimensions données ?",
    "Ai-je utilisé la bonne formule pour la forme choisie ?",
  ]));
  zone.appendChild(creerAstuce("Astuce", genererAstuceForme(forme)));

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
  notifierActionApprentissage({ type: "calcul-forme" });
}

/**
 * Affiche le résultat d'un calcul de pourcentage
 */
function afficherResultatPourcent(zone, valeur, formule, etapes, type, feedbackEstimation) {
  zone.className = "resultat resultat--visible";
  viderElement(zone);
  zone.appendChild(creerLigneResultat("Résultat", String(valeur)));

  const blocFormule = document.createElement("div");
  blocFormule.className = "resultat__formule";
  blocFormule.textContent = formule;
  zone.appendChild(blocFormule);

  const blocEtapes = creerBlocEtapesElement("Étapes du calcul", etapes);
  if (blocEtapes) zone.appendChild(blocEtapes);
  const blocEstimation = creerBlocEstimation(feedbackEstimation);
  if (blocEstimation) zone.appendChild(blocEstimation);
  zone.appendChild(creerAutoControle([
    "Le résultat est-il logique (ni trop grand, ni trop petit) ?",
    "Ai-je pensé à \"%\" quand c'est un pourcentage ?",
    "Suis-je capable d'expliquer chaque étape du calcul ?",
  ]));
  zone.appendChild(creerAstuce("Astuce", genererAstucePourcentage(type)));

  enregistrerHistorique({
    type: "calcul",
    label: "Pourcentage",
    details: type,
    resultat: "Résultat : " + valeur,
  });
  afficherHistorique(document.getElementById("historique-exercice"));
  notifierActionApprentissage({ type: "calcul-pourcentage" });
}

function creerBlocEtapesElement(titre, etapes) {
  if (!etapes || etapes.length === 0) return null;
  const bloc = document.createElement("div");
  bloc.className = "resultat__etapes";
  const titreEl = document.createElement("p");
  titreEl.className = "resultat__etapes-titre";
  titreEl.textContent = titre;
  bloc.appendChild(titreEl);
  const liste = document.createElement("ol");
  liste.className = "resultat__etapes-liste";
  etapes.forEach(function (etape) {
    const item = document.createElement("li");
    item.textContent = etape;
    liste.appendChild(item);
  });
  bloc.appendChild(liste);
  return bloc;
}

function creerFeedbackEstimation(estimation, valeurExacte, unite, libelle) {
  if (estimation === null || isNaN(estimation)) return null;
  if (valeurExacte === null || isNaN(valeurExacte)) return null;
  const reference = Math.max(Math.abs(valeurExacte), 1);
  const ecartRelatif = Math.abs(estimation - valeurExacte) / reference;
  const suffixeUnite = unite ? " " + unite : "";

  if (ecartRelatif <= 0.1) {
    return "Excellent : " + libelle + " (" + arrondir(estimation) + suffixeUnite + ") est très proche du résultat exact.";
  }
  if (ecartRelatif <= 0.25) {
    return "Bonne estimation : tu es proche. Écart ≈ " + arrondir(ecartRelatif * 100) + " %.";
  }
  return "Estimation à améliorer : compare les ordres de grandeur avant de calculer. Écart ≈ " + arrondir(ecartRelatif * 100) + " %.";
}

function creerBlocEstimation(message) {
  if (!message) return null;
  const bloc = document.createElement("div");
  bloc.className = "resultat__estimation";
  bloc.textContent = "Auto-contrôle estimation : " + message;
  return bloc;
}

function creerAutoControle(items) {
  const bloc = document.createElement("div");
  bloc.className = "resultat__autocontrole";
  const titre = document.createElement("p");
  titre.className = "resultat__autocontrole-titre";
  titre.textContent = "Vérification rapide (20 secondes)";
  bloc.appendChild(titre);

  const liste = document.createElement("ul");
  liste.className = "resultat__autocontrole-liste";
  (items || []).forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    liste.appendChild(li);
  });
  bloc.appendChild(liste);
  return bloc;
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
  viderElement(zone);
  const prefixe = document.createElement("strong");
  prefixe.textContent = "Erreur : ";
  zone.appendChild(prefixe);
  zone.appendChild(document.createTextNode(message));
}

function viderElement(element) {
  if (!element) return;
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function creerLigneResultat(label, valeur) {
  const ligne = document.createElement("div");
  ligne.className = "resultat__ligne";

  const spanLabel = document.createElement("span");
  spanLabel.className = "resultat__label";
  spanLabel.textContent = label + " :";

  const spanValeur = document.createElement("span");
  spanValeur.className = "resultat__valeur";
  spanValeur.textContent = valeur;

  ligne.appendChild(spanLabel);
  ligne.appendChild(spanValeur);
  return ligne;
}

function creerAstuce(titre, texte) {
  const astuce = document.createElement("p");
  astuce.className = "resultat__astuce";
  const fort = document.createElement("strong");
  fort.textContent = titre + " :";
  astuce.appendChild(fort);
  astuce.appendChild(document.createTextNode(" " + texte));
  return astuce;
}

function creerAstuceTexte(texte) {
  const astuce = document.createElement("p");
  astuce.className = "resultat__astuce";
  astuce.textContent = texte;
  return astuce;
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

function initialiserStudioMissions(options) {
  if (!options || !options.btnStudioGenerer || !options.btnStudioValider || !options.studioEnonce || !options.studioReponse) return;

  const etatStudio = { essais: 0, reussites: 0, mission: null };

  function afficherCompteur() {
    if (options.studioScore) {
      options.studioScore.textContent = etatStudio.reussites + " / " + etatStudio.essais;
    }
  }

  function afficherMission(mission) {
    options.studioEnonce.innerHTML =
      "<p><strong>Mission :</strong> " + mission.enonce + "</p>" +
      "<p class=\"resultat__astuce\"><strong>Critère :</strong> " + mission.critere + "</p>";
    if (options.studioCodeErreur) {
      options.studioCodeErreur.textContent = mission.codeErreur || "—";
    }
    if (options.studioMetacognition) {
      options.studioMetacognition.textContent = "Question réflexive : " + mission.questionReflexive;
    }
    if (options.studioFeedback) {
      options.studioFeedback.className = "resultat";
      options.studioFeedback.innerHTML = "";
    }
    options.studioReponse.value = "";
    options.studioReponse.focus();
  }

  options.btnStudioGenerer.addEventListener("click", function () {
    const format = options.studioFormat ? options.studioFormat.value : "guide";
    etatStudio.mission = genererMissionStudio(format);
    afficherMission(etatStudio.mission);
    notifierActionApprentissage({ type: "studio-mission", competence: etatStudio.mission.competence || "situations-metier" });
  });

  options.btnStudioValider.addEventListener("click", function () {
    if (!etatStudio.mission) {
      afficherErreur(options.studioFeedback, "Commence par générer une mission.");
      return;
    }

    const proposition = (options.studioReponse.value || "").trim();
    if (!proposition) {
      afficherErreur(options.studioFeedback, "Écris une réponse avant de valider.");
      return;
    }

    etatStudio.essais += 1;
    const correction = evaluerMissionStudio(etatStudio.mission, proposition);
    if (correction.estCorrect) etatStudio.reussites += 1;
    afficherCompteur();

    options.studioFeedback.className = "resultat resultat--visible" + (correction.estCorrect ? "" : " resultat--erreur");
    options.studioFeedback.innerHTML =
      "<p><strong>" + (correction.estCorrect ? "Bravo !" : "Presque.") + "</strong> " + correction.message + "</p>" +
      "<p class=\"resultat__astuce\"><strong>Méthode :</strong> " + etatStudio.mission.methode + "</p>";

    notifierActionApprentissage({
      type: correction.estCorrect ? "studio-reussite" : "studio-erreur",
      competence: etatStudio.mission.competence || "situations-metier",
    });
  });

  afficherCompteur();
}

function initialiserBanniereExperienceFluide(zone) {
  if (!zone) return;
  const messages = [
    "Conseil : commence par une estimation pour mieux contrôler l'ordre de grandeur.",
    "Astuce fluidité : vise 1 exercice court + 1 exercice long pour progresser sans te fatiguer.",
    "Réflexe terrain : vérifie toujours l'unité finale avant d'annoncer ta réponse.",
    "Méthode CAPa : découpe les situations complexes en mini-calculs successifs.",
  ];
  let index = 0;
  window.setInterval(function () {
    index = (index + 1) % messages.length;
    zone.textContent = messages[index];
  }, 9000);
}

function genererMissionStudio(format) {
  const banque = {
    guide: [
      {
        enonce: "Massif rectangulaire de 9 m × 5 m. Donne uniquement l'aire en m².",
        reponseNumerique: 45,
        tolerance: 0.15,
        critere: "Réponse numérique en m².",
        methode: "Aire rectangle = longueur × largeur, donc 9 × 5.",
        questionReflexive: "Comment verifies-tu rapidement si le résultat est plausible ?",
        codeErreur: "E02 (aire/périmètre)",
        competence: "aires-perimetres",
      },
    ],
    estimation: [
      {
        enonce: "Sans calcul exact : une zone fait environ 8,2 m × 5,1 m. Choisis la valeur la plus plausible : 12 / 42 / 120.",
        reponseTexte: "42",
        critere: "Choisir l'ordre de grandeur correct.",
        methode: "8 × 5 ≈ 40, donc 42 est la meilleure estimation.",
        questionReflexive: "Quelle estimation mentale as-tu faite avant de choisir ?",
        codeErreur: "E05 (ordre de grandeur)",
        competence: "aires-perimetres",
      },
    ],
    erreur: [
      {
        enonce: "Un élève calcule le périmètre d'un cercle de rayon 4 m avec πr². Écris le code d'erreur attendu.",
        reponseTexte: "E02",
        critere: "Répondre avec le code d'erreur (ex: E02).",
        methode: "πr² calcule l'aire. Pour le périmètre, c'est 2πr.",
        questionReflexive: "Comment distinguer visuellement une formule d'aire d'une formule de périmètre ?",
        codeErreur: "E02 (aire/périmètre)",
        competence: "aires-perimetres",
      },
    ],
    chantier: [
      {
        enonce: "Massif 12 m × 3 m, allée de 6 m² à retirer, paillage à 8 €/m². Donne le coût final avant remise.",
        reponseNumerique: 240,
        tolerance: 0.2,
        critere: "Surface utile puis coût total.",
        methode: "Surface utile = 12×3 - 6 = 30 m², coût = 30 × 8 = 240 €.",
        questionReflexive: "À quelle étape un oubli est-il le plus fréquent ?",
        codeErreur: "E01 (donnée oubliée)",
        competence: "situations-metier",
      },
    ],
    immersion: [
      {
        enonce: "Étude de cas : zone de 18 m × 9 m avec bassin circulaire de rayon 3 m. La surface plantable est paillée à 11 €/m² puis une marge logistique de 8% est ajoutée. Donne le budget final.",
        reponseNumerique: 1588.69,
        tolerance: 0.4,
        critere: "Combiner aire rectangle, retrait du bassin, coût puis marge.",
        methode: "Surface utile = (18×9) - (π×3²) = 133.73 m². Coût brut = 133.73×11 = 1471.01 €. Budget final = 1471.01×1.08 = 1588.69 € (selon arrondis intermédiaires).",
        questionReflexive: "Où as-tu placé ton arrondi pour limiter les écarts ?",
        codeErreur: "E04 (enchaînement incomplet)",
        competence: "situations-metier",
      },
      {
        enonce: "Étude de cas : 24 bacs de 65 L doivent être remplis. Prévoir 12% de pertes, puis ajouter 7% de réserve sécurité. Quel volume total préparer ?",
        reponseNumerique: 1869.5,
        tolerance: 0.4,
        critere: "Enchaîner volume de base, pertes puis réserve.",
        methode: "Base = 24×65 = 1560 L. Avec pertes = 1560×1.12 = 1747.2 L. Avec réserve = 1747.2×1.07 = 1869.50 L (selon arrondis).",
        questionReflexive: "Pourquoi les pourcentages successifs ne s'additionnent-ils pas directement ?",
        codeErreur: "E04 (coefficients successifs)",
        competence: "situations-metier",
      },
    ],
  };

  const liste = banque[format] || banque.guide;
  return liste[Math.floor(Math.random() * liste.length)];
}

function evaluerMissionStudio(mission, proposition) {
  if (mission.reponseNumerique !== undefined) {
    const valeur = parserNombreLocale(proposition);
    if (isNaN(valeur)) {
      return { estCorrect: false, message: "Réponse attendue en nombre." };
    }
    const tolerance = mission.tolerance || 0.1;
    const estCorrect = Math.abs(valeur - mission.reponseNumerique) <= tolerance;
    return {
      estCorrect: estCorrect,
      message: estCorrect
        ? "Résultat valide : " + arrondir(valeur) + "."
        : "Attendu : " + arrondir(mission.reponseNumerique) + ". Vérifie les étapes intermédiaires.",
    };
  }

  const attendu = String(mission.reponseTexte || "").trim().toLowerCase();
  const recu = String(proposition || "").trim().toLowerCase();
  const estCorrect = recu === attendu;
  return {
    estCorrect: estCorrect,
    message: estCorrect
      ? "Bonne analyse, le code d'erreur est correct."
      : "Réponse attendue : " + mission.reponseTexte + ".",
  };
}
