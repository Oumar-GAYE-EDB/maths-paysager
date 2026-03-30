const test = require('node:test');
const assert = require('node:assert/strict');

const { triangleValide, badgesObtenus, genererParcoursCompetences, defiDuJour } = require('../app.js');

test('triangleValide respecte l\'inégalité triangulaire', () => {
  assert.equal(triangleValide(3, 4, 5), true);
  assert.equal(triangleValide(2, 3, 10), false);
});

test('badgesObtenus attribue les badges attendus', () => {
  const badges = badgesObtenus({
    reussites: 6,
    meilleureserie: 3,
    competences: { 'situations-metier': { reussites: 3 } },
  });

  assert.ok(badges.includes('🌱 Premier succès'));
  assert.ok(badges.includes('🍀 5 réponses justes'));
  assert.ok(badges.includes('🔥 Série de 3'));
  assert.ok(badges.includes('🧰 Pro terrain'));
});

test('genererParcoursCompetences affiche les niveaux', () => {
  const html = genererParcoursCompetences({
    competences: {
      'aires-perimetres': { essais: 10, reussites: 9 },
      'pourcentages': { essais: 10, reussites: 6 },
      'situations-metier': { essais: 10, reussites: 3 },
    },
  });

  assert.match(html, /Maîtrisé/);
  assert.match(html, /En progrès/);
  assert.match(html, /À renforcer/);
});

test('defiDuJour renvoie une phrase non vide', () => {
  const defi = defiDuJour();
  assert.equal(typeof defi, 'string');
  assert.ok(defi.length > 10);
});
