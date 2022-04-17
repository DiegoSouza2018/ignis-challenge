import criarClube from './clube.js';
import { criarCampeonato, gerarResultadoRandomicoPorPartida } from './campeonato.js';

const buttonInscrever = document.querySelector('#button-inscrever');
const buttonExibirJogosVolta = document.querySelector('#button-exibir-jogos-volta');
const buttonExibirResultados = document.querySelector('#button-exibir-resultados');
const buttonExibirCampeao = document.querySelector('#button-exibir-campeao');
const inputTimes = document.querySelector('#input-times');
const tabelaRodadasIda = document.querySelector('#tabela-rodadas-ida');
const tabelaRodadasVolta = document.querySelector('#tabela-rodadas-volta');
const tabelaRodadasResultados = document.querySelector('#tabela-rodadas-resultados');
const secaoRodadasIda = document.querySelector('#secao-rodadas-ida');
const secaoRodadasVolta = document.querySelector('#secao-rodadas-volta');
const secaoRodadasResultados = document.querySelector('#secao-rodadas-resultados');
const secaoRodadasCampeao = document.querySelector('#secao-rodadas-campeao');
const campoCampeao = document.querySelector('#campo-campeao');

var listaTimes;
var campeonato;

function extrairTimes(dados){
    const listaTimes = dados.split('\n');
    const times = [];
    listaTimes.forEach(
        item => {
            let time = criarClube(item);
            if(time) times.push(time); // Se o time estiver vazio é ignorado na lista.
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
        tipoRodada: partida.tipoRodada
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
    campeonato.rodadasVolta.forEach(rodada => imprimirPartidas(tabelaRodadasVolta, rodada.partidas));
    secaoRodadasVolta.classList.remove('hidden');
}

function realizarInscricao(){
    listaTimes = extrairTimes(inputTimes.value);
    campeonato = criarCampeonato(listaTimes);
    campeonato.rodadasIda.forEach(rodada => imprimirPartidas(tabelaRodadasIda, rodada.partidas));
    secaoRodadasIda.classList.remove('hidden');
}

function incluirResultadosTabela(){
    campeonato.rodadasIda.forEach(rodada => imprimirPartidas(tabelaRodadasResultados, rodada.partidas));
    campeonato.rodadasVolta.forEach(rodada => imprimirPartidas(tabelaRodadasResultados, rodada.partidas));
    secaoRodadasResultados.classList.remove('hidden');
}

function exibirResultados(){
    campeonato = gerarResultadoRandomicoPorPartida(campeonato);
    incluirResultadosTabela();
}

function exibirCampeao(){
    const campeao = campeonato.getVencedor(campeonato.tabela);
    const texto = document.createTextNode(campeao.nome + ' = ' + campeao.pontuacao + ' pontos');
    campoCampeao.appendChild(texto);
    secaoRodadasCampeao.classList.remove('hidden');
}

buttonInscrever.addEventListener('click', realizarInscricao);
buttonExibirJogosVolta.addEventListener('click', exibirJogosVolta);
buttonExibirResultados.addEventListener('click', exibirResultados);
buttonExibirCampeao.addEventListener('click', exibirCampeao);