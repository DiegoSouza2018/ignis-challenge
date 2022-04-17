import { criarRodadasIda, criarRodadasVolta } from './rodada.js';

function getVencedor(tabela){
    let vencedor = { ...tabela[0] };
    tabela.forEach(item => {
        if(vencedor.pontuacao<item.pontuacao) vencedor = { ...item };
    });

    return vencedor;
}

function gerarResultadoRandomicoPorPartida(campeonato){
    
}

function criarCampeonato(clubes){
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

export default criarCampeonato;
