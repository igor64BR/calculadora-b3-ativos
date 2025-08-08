// Exemplo de entrada
// Crescimento: 
//     * CAGR Receita (se empresa de crescimento)
//     * CAGR Lucro (se empresa vaca leiteira ou em reestruturação)
// Volatilidade: Encontrada em https://maisretorno.com/acoes/{ticker}
const carteira = [
    {
        ticker: 'CMIG3',
        pl: 6.0,
        pvp: 1.51,
        dy: 12.94,
        roe: 25.09,
        crescimento_receita: 9.99,
        crescimento_lucro: 19.58,
        tipo: 'estavel',
        volatilidade: 29.51
    },
    {
        ticker: 'SAPR11',
        pl: 4.48,
        pvp: 0.88,
        dy: 6.43,
        roe: 12.82,
        crescimento_receita: 7.83,
        crescimento_lucro: 17.82,
        tipo: 'estavel',
        volatilidade: 25.88
    },
    {
        ticker: 'BBAS3',
        pl: 4.98,
        pvp: 0.60,
        dy: 12.51,
        roe: 11.97,
        crescimento_receita: 18.01,
        crescimento_lucro: 13.16,
        tipo: 'estavel',
        volatilidade: 24.28
    },
    {
        ticker: 'ITSA3',
        pl: 7.87,
        pvp: 1.39,
        dy: 8.12,
        roe: 17.71,
        crescimento_receita: 6.88,
        crescimento_lucro: 15.94,
        tipo: 'estavel',
        volatilidade: 21.06
    },
    {
        ticker: 'FLRY3',
        pl: 13.13,
        pvp: 1.48,
        dy: 6.90,
        roe: 11.27,
        crescimento_receita: 21.42,
        crescimento_lucro: 17.83,
        tipo: 'crescimento',
        volatilidade: 30.6
    },
    {
        ticker: 'VALE3',
        pl: 8.48,
        pvp: 1.15,
        dy: 4.92,
        roe: 13.52,
        crescimento_receita: 0.1,
        crescimento_lucro: 2.28,
        tipo: 'estavel',
        volatilidade: 26.15
    },
    {
        ticker: 'SBSP3',
        pl: 7.44,
        pvp: 1.98,
        dy: 3.34,
        roe: 26.66,
        crescimento_receita: 16.39,
        crescimento_lucro: 60.10,
        tipo: 'crescimento',
        volatilidade: 22.99
    },
    {
        ticker: 'PETR3',
        pl: 5.91,
        pvp: 1.14,
        dy: 15.66,
        roe: 19.38,
        crescimento_receita: 12.63,
        crescimento_lucro: 65.59,
        tipo: 'estavel',
        volatilidade: 26.38
    },
    {
        ticker: 'POMO3',
        pl: 6.76,
        pvp: 1.96,
        dy: 7.99,
        roe: 28.97,
        crescimento_receita: 20.08,
        crescimento_lucro: 68.13,
        tipo: 'crescimento',
        volatilidade: 37.45
    },
    {
        ticker: 'WEGE3',
        pl: 25.61,
        pvp: 7.39,
        dy: 2.04,
        roe: 28.86,
        crescimento_receita: 18.58,
        crescimento_lucro: 23.05,
        tipo: 'crescimento',
        volatilidade: 30.69
    },
];

export default carteira;