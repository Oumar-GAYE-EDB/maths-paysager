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
- Interface responsive

### 4) Coach adaptatif et remédiation
- Mode adaptatif : proposition automatique du thème et du niveau selon les performances
- File de remédiation : exercices ciblés après une erreur fréquente
- Aide graduée : **Indice 1**, **Indice 2**, puis **méthode guidée**
- Diagnostic d'erreur probable (unité, division par 100, confusion rayon/diamètre)
- Mode évaluation (indices désactivés) et rejouage d'erreurs récentes

### 5) Parcours d'apprentissage
- Objectif de séance affiché avant chaque exercice
- Micro-compétence ciblée + palier de maîtrise (Bronze / Argent / Or)
- Barre de progression de session (réussites en cours)

### 6) Situations métier enrichies
- Scénarios CAPa variés : semis, paillage (coût €/m²), arrosage (L/m)

### 7) Fiabilité des calculs
- Vérifications supplémentaires sur les contraintes géométriques
- Bouton de vérification interne des formules (auto-tests rapides)
- Script de tests Node.js pour valider les formules principales (`tests/formules.test.js`)

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
