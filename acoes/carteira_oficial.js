// Exemplo de entrada
// Crescimento: 
//     * CAGR Receita (se empresa de crescimento)
//     * CAGR Lucro (se empresa vaca leiteira ou em reestruturação)
// Volatilidade: Encontrada em https://maisretorno.com/acoes/{ticker}
const carteira = [
    {
        ticker: 'CMIG3',
        pl: 6.33,
        pvp: 1.59,
        dy: 12.26,
        roe: 25.09,
        crescimento_receita: 9.99,
        crescimento_lucro: 19.58,
        tipo: 'estavel',
        volatilidade: 41.61
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
        ticker: 'ITSA3',
        pl: 8.06,
        pvp: 1.43,
        dy: 7.96,
        roe: 17.71,
        crescimento_receita: 6.88,
        crescimento_lucro: 15.94,
        tipo: 'estavel',
        volatilidade: 20.65
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
        ticker: 'PETR3',
        pl: 9.39,
        pvp: 1.14,
        dy: 15.75,
        roe: 12.16,
        crescimento_receita: 12.77,
        crescimento_lucro: 50.67,
        tipo: 'estavel',
        volatilidade: 26.85
    },
    {
        ticker: 'POMO3',
        pl: 6.42,
        pvp: 1.84,
        dy: 8.82,
        roe: 28.66,
        crescimento_receita: 19.14,
        crescimento_lucro: 66.15,
        tipo: 'crescimento',
        volatilidade: 40.10
    },
    {
        ticker: 'WEGE3',
        pl: 28.46,
        pvp: 8.37,
        dy: 1.91,
        roe: 29.42,
        crescimento_receita: 18.04,
        crescimento_lucro: 22.39,
        tipo: 'crescimento',
        volatilidade: 31.78
    },
];

export default carteira;