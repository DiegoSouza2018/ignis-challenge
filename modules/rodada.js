function calcularQuantidadeRodadas(qtdClubes){
    if(qtdClubes%2 == 0)
        return qtdClubes - 1;
    return qtdClubes;
}

/*
    O algoritmo consiste em dividir os clubes e montar um "relógio", onde o primeiro
    clube fica fixo e os demais giram no sentido horário.
    A cada giro define uma rodada.
*/
function proximaRodada(clubesCasa, clubesFora){
    let ultimoClube = { ...clubesCasa[clubesCasa.length-1] };

    for(var i=clubesCasa.length-2; i>0; i--){
        clubesCasa[i+1] = { ...clubesCasa[i] }; // Mover clubes para frente "direita", exceto o primeiro.
    }

    clubesCasa[1] = { ...clubesFora[0] }; // O primeiro clube FORA vai para 2ª posição da CASA.

    for(var i=0; i<clubesFora.length-1; i++){
        clubesFora[i] = { ...clubesFora[i+1] }; // Mover clubes para trás "esquerda".
    }

    clubesFora[clubesFora.length-1] = { ...ultimoClube }; // O último clube CASA vai para a última posição FORA
}

function definirRodadasQuantidadeClubesPares(clubes){
    var clubesCasa = [];
    var clubesFora = [];
    const rodadas = [];

    // Divide os clubes em dois Arrays (CASA x FORA)
    for(var i=0; i<clubes.length; i++){
        if(i<clubes.length/2) clubesCasa.push({ ...clubes[i]});
        else clubesFora.push({ ...clubes[i] });
    }

    const totalRodadas = calcularQuantidadeRodadas(clubes.length); // Flag para parar de rodar o algoritmo

    var qtdRodadas = 0;

    while(qtdRodadas<totalRodadas){
        rodadas.push({
            numero: qtdRodadas + 1,
            partidas: new Array()
        });

        for(var i=0; i<clubesCasa.length; i++){
            rodadas[qtdRodadas].partidas.push(
                {
                    casa: { ...clubesCasa[i] },
                    fora: { ...clubesFora[i] },
                    golsCasa: 0,
                    golsFora: 0,
                    turno: 'IDA',
                    local: clubesCasa[i].estado,
                    rodada: qtdRodadas + 1
                }
            );
        }
        proximaRodada(clubesCasa, clubesFora);
        qtdRodadas++;
    }

    return rodadas;
}

/*
    A lógica desse algoritmo é a mesma pra quantidade de clubes pares.
    A única diferença é que precisa adicionar um "clube" extra que quando algum
    clube é selecionado para enfrentá-lo está automaticamente de descanso na rodada.
*/
function definirRodadasQuantidadeClubesImpares(clubes){
    var clubesCasa = [];
    var clubesFora = [];
    const rodadas = [];

    // Indica a rodada de descanso
    clubesCasa.push({
        nome: 'Descanso',
        estado: ''
    });

    // Divide os clubes em dois Arrays (CASA x FORA)
    for(var i=0; i<clubes.length; i++){
        if(i<(clubes.length-1)/2) clubesCasa.push({ ...clubes[i]});
        else clubesFora.push({ ...clubes[i] });
    }

    const totalRodadas = calcularQuantidadeRodadas(clubes.length); // Flag para parar de rodar o algoritmo

    var qtdRodadas = 0;

    while(qtdRodadas<totalRodadas){
        rodadas.push({
            numero: qtdRodadas + 1,
            partidas: new Array()
        });

        for(var i=1; i<clubesCasa.length; i++){
            rodadas[qtdRodadas].partidas.push(
                {
                    casa: { ...clubesCasa[i] },
                    fora: { ...clubesFora[i] },
                    golsCasa: 0,
                    golsFora: 0,
                    turno: 'IDA',
                    local: clubesCasa[i].estado,
                    rodada: qtdRodadas + 1
                }
            );
        }
        proximaRodada(clubesCasa, clubesFora);
        qtdRodadas++;
    }

    return rodadas;
}

export function criarRodadasIda(clubes){
    let rodadas = [];

    if(clubes.length%2 == 0)
        rodadas = definirRodadasQuantidadeClubesPares(clubes);
    else rodadas = definirRodadasQuantidadeClubesImpares(clubes);

    return rodadas;
}

function inverterMandoDePartidas(partidas, numeroRodada){
    const partidasVolta = [];

    partidas.forEach(partida => {
        partidasVolta.push({
            casa: { ...partida.fora },
            fora: { ...partida.casa },
            golsCasa: 0,
            golsFora: 0,
            turno: 'VOLTA',
            local: partida.fora.estado,
            rodada: numeroRodada
        });
    });

    return partidasVolta;
}

export function criarRodadasVolta(rodadasIda){
    const qtdRodadas = rodadasIda.length;
    const rodadasVolta = [];

    rodadasIda.forEach(rodada => {
        rodadasVolta.push({
            numero: qtdRodadas + rodada.numero,
            partidas: inverterMandoDePartidas(rodada.partidas, qtdRodadas + rodada.numero),
        });
    });

    return rodadasVolta;
}