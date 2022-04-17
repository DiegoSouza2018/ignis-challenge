import criarClube from './clube.js';
import criarCampeonato from './campeonato.js';

const buttonInscrever = document.querySelector('#button-inscrever');
const buttonExibirJogosVolta = document.querySelector('#button-exibir-jogos-volta');
const inputTimes = document.querySelector('#input-times');
const tabelaRodadasIda = document.querySelector('#tabela-rodadas-ida');
const tabelaRodadasVolta = document.querySelector('#tabela-rodadas-volta');
const secaoRodadasIda = document.querySelector('#secao-rodadas-ida');
const secaoRodadasVolta = document.querySelector('#secao-rodadas-volta');

function extrairTimes(dados){
    const listaTimes = dados.split('\n');
    const times = [];
    listaTimes.forEach(
        item => {
            let time = criarClube(item);
            if(time) times.push(time);
        }
    );
    return times;
}

function criarCelulaTabelaRodadas(info){
    const celula = document.createElement('td');
    const texto = document.createTextNode(info);
    celula.appendChild(texto);
    return celula;
}

function criarLinhaTabelaRodadas(partida){
    const linha = document.createElement('tr');

    const dadosCelula = {
        numeroRodada: partida.rodada,
        casa: partida.casa.nome,
        golsCasa: partida.golsCasa,
        simboloPlacar: 'X',
        golsFora: partida.golsFora,
        fora: partida.fora.nome,
        local: partida.local,
        tipoRodada: ''
    };

    for(var prop in dadosCelula){
        linha.appendChild(criarCelulaTabelaRodadas(dadosCelula[prop]));
    }

    return linha;
}

function imprimirPartidas(tabelaRodadas, partidas){
    partidas.forEach(partida => {
        tabelaRodadas.appendChild(criarLinhaTabelaRodadas(partida));
    });
}

function exibirJogosVolta(){
    secaoRodadasVolta.classList.remove('hidden');
}

function realizarInscricao(){
    const listaTimes = extrairTimes(inputTimes.value);
    const campeonato = criarCampeonato(listaTimes);
    campeonato.rodadasIda.forEach(rodada => imprimirPartidas(tabelaRodadasIda, rodada.partidas));
    campeonato.rodadasVolta.forEach(rodada => imprimirPartidas(tabelaRodadasVolta, rodada.partidas));
    secaoRodadasIda.classList.remove('hidden');
}

buttonInscrever.addEventListener('click', realizarInscricao);
buttonExibirJogosVolta.addEventListener('click', exibirJogosVolta);