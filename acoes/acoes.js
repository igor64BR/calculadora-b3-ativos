// Algoritmo de Pontuação de Ações com base em modelo multifatorial
// Considera: Valor, Qualidade, Crescimento, Momentum e Risco (volatilidade)
// Score final é normalizado e ponderado

const normalize = (value, min, max) => {
    return (value - min) / (max - min);
};

const computeScore = (dados) => {
    // Calcula métricas máximas e mínimas por fator
    const plVals = dados.map(d => d.pl);
    const pvpVals = dados.map(d => d.pvp);
    const dyVals = dados.map(d => d.dy);
    const roeVals = dados.map(d => d.roe);
    const volatilidadeVals = dados.map(d => d.volatilidade);
    const crescimentoVals = dados.map(d => {
        // Considera crescimento de receita ou lucro dependendo do tipo
        if (d.tipo !== 'crescimento')
            return d.crescimento_lucro;

        if (d.crescimento_lucro > d.crescimento_receita) {
            return d.crescimento_lucro;
        }

        return d.crescimento_receita;
    });

    const minMax = arr => [Math.min(...arr), Math.max(...arr)];
    const [plMin, plMax] = minMax(plVals);
    const [pvpMin, pvpMax] = minMax(pvpVals);
    const [dyMin, dyMax] = minMax(dyVals);
    const [roeMin, roeMax] = minMax(roeVals);
    const [cresMin, cresMax] = minMax(crescimentoVals);
    const [volMin, volMax] = minMax(volatilidadeVals);

    return dados.map(acao => {
        // Normaliza e inverte os que são melhores quanto menores (PL, PVP, Vol)
        const plScore = 1 - normalize(acao.pl, plMin, plMax);
        const pvpScore = 1 - normalize(acao.pvp, pvpMin, pvpMax);
        const dyScore = normalize(acao.dy, dyMin, dyMax);
        const roeScore = normalize(acao.roe, roeMin, roeMax);
        // const cresScore = normalize(acao.crescimento, cresMin, cresMax);
        const volScore = 1 - normalize(acao.volatilidade, volMin, volMax);

        let crescimentoReal;

        if (acao.tipo !== 'crescimento') {
            crescimentoReal = acao.crescimento_lucro;
        } else if (acao.crescimento_lucro > acao.crescimento_receita) {
            crescimentoReal = acao.crescimento_lucro;
        } else {
            crescimentoReal = acao.crescimento_receita;
        }

        const cresScore = normalize(crescimentoReal, cresMin, cresMax);


        // Pesos ajustáveis por perfil
        const pesos = {
            valor: 0.25,
            qualidade: 0.20,
            crescimento: 0.20,
            momentum: 0.15,
            risco: 0.20
        };

        // Se a soma dos pesos for diferente de 1, joga um erro
        const pesoTotal = Object.values(pesos).reduce((acc, val) => acc + val, 0);
        if (pesoTotal !== 1) {
            throw new Error('A soma dos pesos deve ser igual a 1, peso atual: ' + pesoTotal);
        }

        const scoreFinal = (
            (plScore + pvpScore) / 2 * pesos.valor +
            (roeScore * pesos.qualidade) +
            (cresScore * pesos.crescimento) +
            (dyScore * pesos.momentum) +
            (volScore * pesos.risco)
        );

        return {
            ticker: acao.ticker,
            score: Math.round(scoreFinal * 100)
        };
    }).sort((a, b) => b.score - a.score); // Ranking decrescente
};

import carteiraOficial from './carteira_oficial.js';
import smallCaps from './small_caps.js';

const score = computeScore(carteiraOficial);

score.forEach((acao, i) => {
    console.log(`${i + 1} - ${acao.ticker} - Score: ${acao.score}`);
});
