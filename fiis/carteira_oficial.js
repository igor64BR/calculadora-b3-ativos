const createFII = (nome, dy, pvp, vacancia, vacanciaCincoAnos) => {
  // Calcula a taxa média anual composta de crescimento da vacância nos últimos 5 anos
  const txCrescimentoVacancia = vacanciaCincoAnos !== 0 
    ? (vacancia / vacanciaCincoAnos) ** (1 / 5) - 1
    : 0;

  // Inverte o sinal para que:
  // - crescimento negativo da vacância (melhora) gere valor positivo (bonificação)
  // - crescimento positivo da vacância (piora) gere valor negativo (penalização)
  const crescVacancia = -txCrescimentoVacancia;

  return {
    nome,
    dy,
    pvp,
    vacancia,
    crescVacancia,
  };
};

const carteira = [
  createFII("HGLG11", 8.63, 0.94, 3.5, 16.6),
  createFII("XPML11", 10.91, 0.86, 4.0, 3.7),
  createFII("KNRI11", 8.64, 0.85, 4.49, 6.28),
  createFII("KNSC11", 13.04, 0.98, 0, 0),
  createFII("XPLG11", 9.96, 0.91, 7.9, 9.2),
  createFII("MXRF11", 12.06, 1, 0, 0),
  createFII("BTLG11", 9.54, 0.95, 1, 9.78),
  createFII("KNCR11", 12.68, 1, 0, 0),
  createFII("HGRE11", 10.68, 0.69, 13.3, 21.7),
];

export default carteira;
