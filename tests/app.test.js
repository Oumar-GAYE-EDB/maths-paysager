const test = require('node:test');
const assert = require('node:assert/strict');

const {
  triangleValide,
  arrondir,
  creerExerciceForme,
  creerExercicePourcentage,
  creerExerciceRemediation,
} = require('../app.js');

function avecRandom(valeur, fn) {
  const original = Math.random;
  Math.random = () => valeur;
  try {
    return fn();
  } finally {
    Math.random = original;
  }
}

test('triangleValide respecte l\'inégalité triangulaire', () => {
  assert.equal(triangleValide(3, 4, 5), true);
  assert.equal(triangleValide(2, 3, 10), false);
});

test('arrondir formate en français avec 2 décimales', () => {
  assert.equal(arrondir(12.5), '12,50');
});

test('creerExerciceForme couvre rectangle, cercle, carré, triangle, trapèze', () => {
  const configs = [
    { rand: 0.01, attendu: 'rectangle' },
    { rand: 0.21, attendu: 'cercle' },
    { rand: 0.41, attendu: 'carré' },
    { rand: 0.61, attendu: 'triangle' },
    { rand: 0.81, attendu: 'trapèze' },
  ];

  configs.forEach(({ rand, attendu }) => {
    const exo = avecRandom(rand, () => creerExerciceForme('moyen'));
    assert.match(exo.titre.toLowerCase(), new RegExp(attendu));
    assert.ok(Number.isFinite(exo.reponse));
  });
});

test('creerExercicePourcentage couvre 4 types de calcul', () => {
  const configs = [
    { rand: 0.01, attendu: 'pourcentage' },
    { rand: 0.26, attendu: 'part' },
    { rand: 0.51, attendu: 'augmentation' },
    { rand: 0.76, attendu: 'réduction' },
  ];

  configs.forEach(({ rand, attendu }) => {
    const exo = avecRandom(rand, () => creerExercicePourcentage('moyen'));
    assert.match(exo.titre.toLowerCase(), new RegExp(attendu));
    assert.ok(Number.isFinite(exo.reponse));
  });
});

test('remédiation renvoie un exercice cohérent pour un code connu', () => {
  const exo = creerExerciceRemediation({ erreurCode: 'triangle_div2' });
  assert.equal(exo.erreurCode, 'triangle_div2');
  assert.equal(exo.reponse, 20);
});
