const run = () => {
    const createAction = (pl, pvp, dy, roe) => {
        return (1/pl + 1/pvp + dy/100 + roe/100)
    }

    const actions = {
        vale3: createAction(7.64, 1.19, 9.01, 15.57),
        bbas3: createAction(6.36, 0.93, 9.01, 14.67),
        flry3: createAction(11.57, 1.35, 7.86, 11.65),
        cmig4: createAction(4.15, 1.08, 17.96, 26.00),
        petr4: createAction(10.74, 1.07, 18.45, 10.00),
        itsa4: createAction(7.74, 1.26, 8.74, 16.34),
        sapr11: createAction(5.65, 0.84, 5.19, 14.81),
        sbsp3: createAction(8.11, 2.10, 3.27, 25.94)
    }

    let max = 0;

    for (const pair of Object.entries(actions)) {
        if (pair[1] > max) max = pair[1];
    }

    for (const pair of Object.entries(actions)) {
        console.log(pair[0], pair[1] / max * 100);
    }
}

run();