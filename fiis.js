const run = () => {
    const funds = {
        // Tijolo
        hglg11: createFii(0.97, 8.79, 8.72),
        xpml11: createFii(0.86, 10.99, 10.91),
        btlg11: createFii(0.92, 9.78, 9.71),
        xplg11: createFii(0.88, 10.06, 10.02),
        knri11: createFii(0.83, 9.02, 8.98),
        // Papel
        mxrf11: createFii(0.95, 8.79, 8.72),
        knsc11: createFii(0.82, 10.05, 9.99),
        kncr11: createFii(1.01, 11.85, 11.84)
    }

    let max = 0;

    for (const pair of Object.entries(funds)) {
        if (pair[1] > max) max = pair[1];
    }

    for (const pair of Object.entries(funds)) {
        console.log(pair[0], pair[1] / max * 100);
    }
}

const createFii = (pvp, dy, yoc) => {
    return 1/pvp + dy/100 + yoc/100
}

run();