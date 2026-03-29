// ============================================================
// MATHS PAYSAGER — Script principal
// Application de calcul pour CAPa Aménagement Paysager
// Chaque fonction est commentée en français pour les élèves
// ============================================================

// --- CONSTANTES ---
// La valeur de Pi, utilisée pour les calculs du cercle
const PI = Math.PI; // ≈ 3.14159265...

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
