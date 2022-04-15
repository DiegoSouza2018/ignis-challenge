import criarTime from './times.js';
import times from './times.js';

const buttonInscrever = document.querySelector('#button-inscrever');
const inputTimes = document.querySelector('#input-times');

function extrairTimes(dados){
    const listaTimes = dados.split('\n');
    const times = [];
    listaTimes.forEach(
        item => {
            let time = criarTime(item);
            times.push(time);
        }
    );
    return times;
}

function realizarInscricao(){
    const listaTimes = extrairTimes(inputTimes.value);
    listaTimes.forEach(item => console.log(item));
}

buttonInscrever.addEventListener('click', realizarInscricao);