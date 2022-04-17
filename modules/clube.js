// Dados corresponde a uma string com nome do time + estado separados por ";"
function criarClube(dados){
    if(dados){
        let dadosFormatado = dados.split(';');
        const time = {
            nome: dadosFormatado[0],
            estado: dadosFormatado[1]
        }
        return time;
    }
    return {};
}

export default criarClube;