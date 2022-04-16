import criarClube from './clube.js';
import criarRodadas from './rodada.js';

const buttonInscrever = document.querySelector('#button-inscrever');
const inputTimes = document.querySelector('#input-times');
const tabelaRodadas = document.querySelector('#tabela-rodadas');
const secaoRodadas = document.querySelector('#secao-rodadas');

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
        casa: partida.casa,
        golsCasa: partida.golsCasa,
        simboloPlacar: 'X',
        golsFora: partida.golsFora,
        fora: partida.fora,
        local: partida.local,
        tipoRodada: ''
    };

    for(var prop in dadosCelula){
        linha.appendChild(criarCelulaTabelaRodadas(dadosCelula[prop]));
    }

    return linha;
}

function imprimirPartidas(partidas){
    partidas.forEach(partida => {
        tabelaRodadas.appendChild(criarLinhaTabelaRodadas(partida));
    });
}

function realizarInscricao(){
    const listaTimes = extrairTimes(inputTimes.value);
    const partidas = criarRodadas(listaTimes);
    imprimirPartidas(partidas);
    secaoRodadas.classList.remove('hidden');
}

buttonInscrever.addEventListener('click', realizarInscricao);