import { criarRodadasIda, criarRodadasVolta } from './rodada.js';

function getVencedor(tabela){
    let vencedor = { ...tabela[0] };
    tabela.forEach(item => {
        if(vencedor.pontuacao<item.pontuacao) vencedor = { ...item };
    });

    return vencedor;
}

function pontuarClubes(tabela, casa, pontosCasa, fora, pontosFora){
    for(var i=0; i<tabela.length; i++){
        if(tabela[i].nome == casa.nome) tabela[i].pontuacao += pontosCasa;
        else if(tabela[i].nome == fora.nome) tabela[i].pontuacao += pontosFora;
    }
    return tabela;
}

export function gerarResultadoRandomicoPorPartida(campeonato){
    campeonato.rodadasIda.forEach(rodada => rodada.partidas.forEach(partida => {
        partida.golsCasa = Math.round(Math.random() * 6);
        partida.golsFora = Math.round(Math.random() * 6);
        if(partida.golsCasa > partida.golsFora){
            campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 3, partida.fora, 0);
        }
        else if(partida.golsFora > partida.golsCasa){
            campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 0, partida.fora, 3);
        }
        else
        campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 1, partida.fora, 1);
    }));

    campeonato.rodadasVolta.forEach(rodada => rodada.partidas.forEach(partida => {
        partida.golsCasa = Math.round(Math.random() * 6);
        partida.golsFora = Math.round(Math.random() * 6);
        if(partida.golsCasa > partida.golsFora){
            campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 3, partida.fora, 0);
        }
        else if(partida.golsFora > partida.golsCasa){
            campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 0, partida.fora, 3);
        }
        else
        campeonato.tabela = pontuarClubes(campeonato.tabela, partida.casa, 1, partida.fora, 1);
    }));

    return campeonato;
}

export function criarCampeonato(clubes){
    const rodadasIda = criarRodadasIda(clubes);
    const tabela = [];

    clubes.forEach(clube => {
        tabela.push({
            ...clube,
            pontuacao: 0
        })
    });

    const campeonato = {
        tabela: tabela,
        rodadasIda: rodadasIda,
        rodadasVolta: criarRodadasVolta(rodadasIda),
        getVencedor: getVencedor
    }

    return campeonato;
}
