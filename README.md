# Maths Paysager

Calculateur pédagogique pour les élèves de **CAPa Aménagement Paysager**.

L'application aide à pratiquer :
- les **aires**,
- les **périmètres**,
- les **pourcentages**,
avec un affichage des formules et des étapes de calcul.

---

## Objectifs pédagogiques

- Rendre les calculs concrets avec des exemples métiers (terrasse, bassin, massif, parcelle, etc.).
- Expliquer les résultats (pas seulement donner une valeur finale).
- Proposer une interface simple, lisible et adaptée au mobile.

---

## Fonctionnalités

### 1) Aire & périmètre
Formes disponibles :
- Rectangle
- Carré
- Cercle
- Triangle
- Trapèze

Pour chaque forme :
- saisie guidée des dimensions,
- validation des champs,
- résultat arrondi,
- détail des étapes,
- schéma SVG explicatif.

### 2) Pourcentages
Types de calcul :
- Trouver `X%` d'un nombre
- Trouver le pourcentage de `A` par rapport à `B`
- Augmentation en pourcentage
- Réduction en pourcentage

### 3) Accessibilité et confort
- Messages d'erreur par champ
- Zones de résultat avec `aria-live`
- Thème clair/sombre mémorisé dans le navigateur
- Mode focus (interface simplifiée orientée exercice)
- Interface responsive

### 4) Atelier mental (nouveau)
- Mini-questions rapides (calcul mental, pourcentages flash, conversions)
- Vérification immédiate avec méthode courte de correction
- Score, taux de réussite et série de bonnes réponses conservés en local
- Conseil personnalisé selon les performances récentes

### 5) Coach adaptatif et remédiation
- Mode adaptatif : proposition automatique du thème et du niveau selon les performances
- File de remédiation : exercices ciblés après une erreur fréquente
- Aide graduée : **Indice 1**, **Indice 2**, puis **méthode guidée**
- Bouton **Je bloque** : relance un accompagnement immédiat sans quitter l'exercice
- Diagnostic d'erreur probable (unité, division par 100, confusion rayon/diamètre)
- Mode évaluation (indices désactivés) et rejouage d'erreurs récentes

### 6) Parcours d'apprentissage
- Objectif de séance affiché avant chaque exercice
- Micro-compétence ciblée + palier de maîtrise (Bronze / Argent / Or)
- Barre de progression de session (réussites en cours)
- Nouveau réglage de **niveau d'accompagnement** (Guidé / Autonome / Défi) pour ajuster la tolérance et le niveau d'exigence

### 7) Situations métier enrichies
- Scénarios CAPa variés : semis, paillage (coût €/m²), arrosage (L/m)
- Mise en contexte « utile sur chantier » + auto-contrôle rapide sur chaque exercice
- Pont explicite « maths ↔ métier » pour chaque exercice (mesure, décision, impact terrain)
- Nouveaux scénarios : talus triangulaire, répartition de plantations, coût de bordures en €/ml
- Exercices plus riches en plusieurs étapes : surface utile (zone - allée), enchaînement de pourcentages (hausse puis remise), chiffrage complet avec marge de sécurité
- Nouvelles mises en situation : perte de plants en %, préparation de solution avec dosage + marge de sécurité
- Feedback renforcé après validation : affichage de l'écart (valeur et %) pour guider la correction
- Questions flash de métacognition (30 sec) après correction pour verbaliser la méthode et favoriser le transfert

### 8) Fiabilité des calculs
- Vérifications supplémentaires sur les contraintes géométriques
- Bouton de vérification interne des formules (auto-tests rapides)
- Script de tests Node.js pour valider les formules principales (`tests/formules.test.js`)

### 9) Nouveau : coach de révision + outils actifs
- **Coach de révision personnalisé** : génération d'un plan quotidien en fonction du temps disponible et des compétences à renforcer
- **Convertisseur intelligent** : conversions fréquentes sur chantier (m/cm, m²/ha, L/m³) avec rappel de méthode
- **Flashcards formules** : entraînement actif (question/réponse) pour mémoriser les formules essentielles

### 10) Nouveau : Jardin des progrès (gamification douce)
- **Défi du jour** renouvelé automatiquement pour encourager la régularité
- **XP et niveaux** pour valoriser les efforts (calculs, exercices, atelier mental)
- **Série de jours actifs** pour développer une routine courte et motivante

### 11) Nouveau : estimation et auto-contrôle rapide
- Champ d'**estimation préalable** (optionnel) dans les calculs de formes et pourcentages
- Feedback sur l'écart entre estimation et résultat exact pour travailler l'ordre de grandeur
- Mini-checklist de **vérification en 20 secondes** après chaque résultat

---

## Stack technique

Projet web statique (sans build) :
- `index.html`
- `style.css`
- `app.js`

Aucune dépendance JavaScript externe.

---

## Lancer le projet en local

### Option simple
Ouvrir `index.html` dans un navigateur.

### Option recommandée (serveur local)
Depuis la racine du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrir :
`http://localhost:8000`

### Vérifier les formules (tests rapides)

```bash
node tests/formules.test.js
```

---

## Structure du projet

```text
maths-paysager/
├── index.html   # structure de l'application
├── style.css    # styles + thèmes clair/sombre
├── app.js       # logique de calcul + rendu + validations
└── README.md
```

---

## Feuille de route (propositions)

- [ ] Ajouter des tests unitaires pour les formules de calcul
- [ ] Vérifier des contraintes géométriques avancées (ex. triangle impossible)
- [ ] Ajouter un historique des calculs (localStorage)
- [ ] Ajouter un export PDF des résultats
- [ ] Créer un mode “exercices” pour l'entraînement

## 3 améliorations prioritaires pour aider les élèves

### 1) Parcours guidé “pas à pas” avec diagnostic immédiat
- Afficher un assistant en 3 étapes (Comprendre l’énoncé → Choisir la formule → Calculer).
- Détecter les erreurs fréquentes et proposer une correction ciblée (ex : confusion rayon/diamètre, oubli d’unité, division par 100).
- Donner un feedback court et actionnable après chaque tentative.

**Impact élève :** réduit le blocage, améliore l’autonomie et la compréhension des méthodes.

### 2) Tableau de progression lisible pour l’élève et l’enseignant
- Ajouter un tableau de bord avec :
  - taux de réussite par compétence (aires, périmètres, pourcentages),
  - temps moyen par exercice,
  - erreurs récurrentes.
- Mettre en avant des objectifs simples (“Aujourd’hui : réussir 4 exercices sur les pourcentages”).
- Conserver l’historique des sessions pour visualiser les progrès dans le temps.

**Impact élève :** motivation renforcée grâce à des objectifs clairs et des progrès visibles.

### 3) Interface encore plus agréable et inclusive
- Proposer un mode “focus” qui n’affiche que l’exercice en cours (moins de distraction).
- Améliorer la lisibilité : taille de police réglable, contraste renforcé, boutons plus grands sur mobile.
- Ajouter des micro-interactions douces (confirmation visuelle après validation, transitions discrètes).

**Impact élève :** expérience plus confortable, meilleure concentration et meilleure accessibilité.

---

## Contribution

Les contributions sont bienvenues :
1. Fork du projet
2. Création d'une branche (`feature/ma-modif`)
3. Commit de vos changements
4. Pull Request

---

## Licence

À préciser (ex. MIT).
