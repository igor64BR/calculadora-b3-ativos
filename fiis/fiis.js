// Pesos atribuídos a cada indicador (ajuste conforme seu perfil)
const pesos = {
  dy: 0.2,
  pvp: 0.3,
  vacancia: 0.3,
  crescVacancia: 0.2,
};

// Função de normalização entre 0 e 100
function normalizar(valor, min, max, invertido = false) {
  if (min === max) return 100; // evitar divisão por zero se todos iguais
  if (invertido) {
    return ((max - valor) / (max - min)) * 100;
  }
  return ((valor - min) / (max - min)) * 100;
}

// Função que calcula as notas normalizadas e o ranking
function calcularNotas(fiis) {
  const dyMin = Math.min(...fiis.map(f => f.dy));
  const dyMax = Math.max(...fiis.map(f => f.dy));
  const pvpMin = Math.min(...fiis.map(f => f.pvp));
  const pvpMax = Math.max(...fiis.map(f => f.pvp));
  const vacanciaMin = Math.min(...fiis.map(f => f.vacancia));
  const vacanciaMax = Math.max(...fiis.map(f => f.vacancia));
  const crescVacanciaMin = Math.min(...fiis.map(f => f.crescVacancia));
  const crescVacanciaMax = Math.max(...fiis.map(f => f.crescVacancia));

  return fiis.map(fii => {
    const notaDY = normalizar(fii.dy, dyMin, dyMax);
    const notaPVP = normalizar(fii.pvp, pvpMin, pvpMax, true); // menor é melhor
    const notaVacancia = normalizar(fii.vacancia, vacanciaMin, vacanciaMax, true); // menor vacância é melhor
    const notaCrescVacancia = normalizar(fii.crescVacancia, crescVacanciaMin, crescVacanciaMax);

    const notaFinal =
      notaDY * pesos.dy +
      notaPVP * pesos.pvp +
      notaVacancia * pesos.vacancia +
      notaCrescVacancia * pesos.crescVacancia;

    return {
      nome: fii.nome,
      nota: notaFinal.toFixed(2),
    };
  }).sort((a, b) => b.nota - a.nota);
}

import carteira from './carteira_oficial.js';
// Executar o ranking e mostrar no console
const ranking = calcularNotas(carteira);

console.log("Ranking de FIIs:");
ranking.forEach((fii, i) => {
  console.log(`${i + 1}. ${fii.nome}: Nota ${fii.nota}`);
});