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

// Exemplo de entrada
// Crescimento: 
//     * CAGR Receita (se empresa de crescimento)
//     * CAGR Lucro (se empresa vaca leiteira ou em reestruturação)
// Volatilidade: Encontrada em https://maisretorno.com/acoes/{ticker}
const carteira = [
    {
        ticker: 'CMIG4',
        pl: 4.25,
        pvp: 1.07,
        dy: 18.51,
        roe: 25.09,
        crescimento_receita: 9.99,
        crescimento_lucro: 19.58,
        tipo: 'estavel',
        volatilidade: 24.30
    },
    {
        ticker: 'SAPR11',
        pl: 4.64,
        pvp: 0.94,
        dy: 4.21,
        roe: 20.21,
        crescimento_receita: 7.7,
        crescimento_lucro: 18.96,
        tipo: 'estavel',
        volatilidade: 26.08
    },
    {
        ticker: 'BBAS3',
        pl: 5.61,
        pvp: 0.67,
        dy: 11.11,
        roe: 11.97,
        crescimento_receita: 18.01,
        crescimento_lucro: 13.16,
        tipo: 'estavel',
        volatilidade: 22.77
    },
    {
        ticker: 'ITSA4',
        pl: 7.77,
        pvp: 1.38,
        dy: 8.24,
        roe: 17.71,
        crescimento_receita: 6.88,
        crescimento_lucro: 15.94,
        tipo: 'estavel',
        volatilidade: 20.20
    },
    {
        ticker: 'FLRY3',
        pl: 11.32,
        pvp: 1.36,
        dy: 7.88,
        roe: 12.01,
        crescimento_receita: 21.27,
        crescimento_lucro: 18.92,
        tipo: 'crescimento',
        volatilidade: 26.78
    },
    {
        ticker: 'VALE3',
        pl: 7.47,
        pvp: 1.16,
        dy: 9.43,
        roe: 15.57,
        crescimento_receita: 0.29,
        crescimento_lucro: 3.98,
        tipo: 'estavel',
        volatilidade: 25.46
    },
    {
        ticker: 'SBSP3',
        pl: 7.62,
        pvp: 2.03,
        dy: 3.28,
        roe: 26.66,
        crescimento_receita: 16.36,
        crescimento_lucro: 60.10,
        tipo: 'crescimento',
        volatilidade: 23.59
    },
    {
        ticker: 'PETR4',
        pl: 8.41,
        pvp: 1.02,
        dy: 17.75,
        roe: 12.16,
        crescimento_receita: 12.77,
        crescimento_lucro: 50.67,
        tipo: 'estavel',
        volatilidade: 23.85
    },
    {
        ticker: 'POMO3',
        pl: 6.39,
        pvp: 1.83,
        dy: 9.14,
        roe: 28.66,
        crescimento_receita: 19.14,
        crescimento_lucro: 66.15,
        tipo: 'crescimento',
        volatilidade: 40.10
    },
    {
        ticker: 'WEGE3',
        pl: 28.54,
        pvp: 8.40,
        dy: 2.10,
        roe: 29.42,
        crescimento_receita: 18.04,
        crescimento_lucro: 22.39,
        tipo: 'crescimento',
        volatilidade: 31.78
    },
    {
        ticker: 'GOAU3',
        pl: 7.96,
        pvp: 0.46,
        dy: 3.88,
        roe: 5.74,
        crescimento_receita: 9.25,
        crescimento_lucro: 6.79,
        tipo: 'crescimento',
        volatilidade: 27.48
    },
];

console.log(computeScore(carteira));
