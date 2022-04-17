# Sobre o Sistema

- O sistema busca realizar um torneio de futebol de pontos corridos, onde os
clubes se enfrentam em dois turnos (IDA - VOLTA).

- O sistema utiliza HTML, CSS, JavaScript.

- O código JavaScript foi desenvolvido em módulos, logo o código para ser executado precisa rodar em um servidor (Apache, NGINX e etc) para que o navegador não bloqueie o CORS da aplicação. No
meu caso, utilizei uma extensão do VSCode (Live Server).

- Os módulos utilizam o padrão ES6 (ECMAScript 6 ou ECMAScript 2015).

- Outros conceitos importantes utilizados foram Padrões de Projetos e princípios S.O.L.I.D

## Sobre os módulos

### Clube.js

- Este módulo é responsável pela criação de clubes, definindo os atributos: nome e estado.

### Rodada.js

- Este módulo é responsável pela criação/definição de rodadas, retornando um Array de rodadas, onde cada objeto do array possui número e um array de partidas.

- Como a definição das partidas depende das rodadas, para que não haja um mesmo time jogando 2 vezes na mesma rodada. O sistema utiliza um algoritmo muito utilizado para definição de jogos de Ligas.

- Para detalhes do algoritmo de definição de partidas por rodada, acesse: https://pt.wikipedia.org/wiki/Competições_de_todos_contra_todos

### Campeonato.js

- Este módulo é responsável pela criação do campeonato, retornado um objeto com uma tabela de pontuação, rodadas de IDA, rodadas de VOLTA, uma função para obter o vencedor do Campeonato.

- A tabela de pontuação é um array contendo cada clube e sua pontuação no campeonato.

- As rodadas tanto de IDA, quanto de VOLTA, são arrays que contém número da rodada + partidas da rodada.

- A função getVencedor é uma função que tem como parâmetro uma tabela de pontuação e retorna o time com maior pontuação na tabela. Caso tenha mais de um vencedor, a função retorna o primeiro em ordem de inscrição na tabela.

### DIEGO_ROCHA_DESAFIO_DEV_2022.js

- Este módulo é o "coração" da aplicação, ele é responsável por gerenciar. Aqui tanto as interações do usuário são tratados, bem como a renderização na tela.

## Como utilizar

1. Insira os dados na caixa no formato informado e clique em inscrever.

2. Após o clique irá aparecer as combinações de jogos de IDA + botão para exibir jogos de VOLTA.

3. Ao clicar em "Exibir jogos de VOLTA", irá aparecer as combinações de jogos de VOLTA + botão para exibir resultados.

4. Ao clicar em "Exibir resultados", o sistema irá gerar placares randômicos e atribuir a pontuação conforme placar. Na tela de exibição irá aparecer o resultado de cada partida + botão para exibir campeão.

5. Ao clicar em "Exibir campeão", o sistema irá buscar na tabela de pontuação o time que possui maior pontuação, caso tenha mais de um, o sistema escolhe o primeiro em ordem de inscrição. Na tela de exibição aparecerá um troféu + medalha + nome do time vencedor + quantidade de pontos obtidos no campeonato.

## Objetivo

- O objetivo desse projeto é demonstrar um pouco dos meus conhecimentos em HTML, CSS e JavaScript.

## Sugestões

- O projeto é aberto a sugestões/modificações, só deixar comentários ou realizar fork/clone do projeto.