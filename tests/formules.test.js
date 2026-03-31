const PI = Math.PI;

function triangleValide(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function aireRectangle(L, l) {
  return L * l;
}

function perimetreCercle(r) {
  return 2 * PI * r;
}

function pourcentageDe(p, n) {
  return (p * n) / 100;
}

function coutPaillage(surface, prixM2) {
  return surface * prixM2;
}

function volumeArrosage(longueur, litresParM) {
  return longueur * litresParM;
}

function assertClose(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: attendu ${expected}, obtenu ${actual}`);
  }
}

function run() {
  assertClose(aireRectangle(6, 4), 24, 1e-9, 'Aire rectangle');
  assertClose(perimetreCercle(5), 31.4159265, 1e-6, 'Périmètre cercle');
  assertClose(pourcentageDe(15, 200), 30, 1e-9, 'Pourcentage');
  assertClose(coutPaillage(40, 7), 280, 1e-9, 'Coût paillage');
  assertClose(volumeArrosage(30, 4), 120, 1e-9, 'Volume arrosage');
  if (!triangleValide(3, 4, 5)) throw new Error('Triangle 3/4/5 devrait être valide');
  if (triangleValide(2, 3, 8)) throw new Error('Triangle 2/3/8 devrait être invalide');
  console.log('OK: 7/7 tests de formules réussis');
}

run();
