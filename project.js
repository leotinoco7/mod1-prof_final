// // Para o desenvolvimento do projeto final será permitido que os alunos trabalhem em trios para troca de ideias e de conhecimento e que vocês já se acostumem a
// trabalhar em colaboração, a entrega do projeto deve ser feita individualmente pelo classroom entregando o link do projeto desenvolvido por vocês pelo github.
// Vocês irão em trio desenvolver o projeto porém todos devem entregar o link do GitHub pelo classroom.

// // Você irá criar um jogo de ficção interativa que simule a rotina diária de um personagem. Você pode escolher entre rotinas matinais, rotinas de trabalho,
// rotinas de estudos, aventuras épicas, histórias assustadoras, entre outras. A ideia do jogo é que o jogador faça as
// escolhas para o seu personagem e o conduza pela história.
// Cada escolha irá gerar uma consequência diferente para o seu personagem. Você será responsável por determinar o inicio e término da história, além de avançar o tempo a
// cada escolha.

// // É importante que haja uma passagem de tempo e períodos determinados que determinarão os ciclos de repetição das possibilidades do personagem,
// por exemplo: Manhã, tarde, noite, dormir - Recomeça o ciclo.

// // Critérios de Avaliação:

// Variáveis para armazenar os status do personagem (1,0 ponto);
// Perguntas que alterarão esses status do personagem (1,0 ponto);
// Laço de repetição que determinará os ciclos em que a história vai se passar. Determinar o que acontecerá ao final do ciclo e como ficarão os status. (1,0 ponto);
// Variável para controle da passagem do tempo (1,0 ponto);
// Variáveis de controle dos status e situações da história (1,0 ponto);
// Condicionais para alterações dessas variáveis (1,5 ponto);
// Funções para executar cada uma das tarefas (1,5 ponto);
// Conteúdo de condicionais, laços, funções e objetos bem aplicados (2,0 pontos);

const prompt = require('prompt-sync')();

// DEFINED VARIABLES

let timeNow = 7; // max 22 start 7 sempre
let day = 1; // max 7
let mode = 0;
let action = ``;
let death = false;
let max = false;
const actions = [
    `fazer comida`,
    `comer fastfood`,
    `estudar`,
    `assistir serie`,
    `trabalhar`,
    `passear`,
    `fazer exercicio`,
    `tomar banho`,
];

const player = {
    Name: '',
    Saciedade: 5,
    Stamina: 5,
    Social: 5,
    Higiene: 5,
    Lazer: 5,
};

console.log(player.Saciedade);

let projeto = 0;

console.log(`Projeto Final - Modulo 1
`);
player.Nome = prompt(`Digite seu nome: `);

do {
    var start = +prompt(
        `Digite 1 para começar a jogar ou 0 e eu lhe explicarei as regras: `,
    );

    if (start !== 0 && start !== 1) {
        console.log(`
        Resposta inválida!`);
    }
} while (start !== 0 && start !== 1);

if (start == 0) {
    console.log(
        `
    Nesse jogo, seu objetivo é entregar um projeto para 
a sua empresa, seu prazo é de 7 dias. Porém, existem obstáculos
no caminho! 

    Você terá que conciliar suas necessidades diárias
com o seu trabalho, você sofrerá penalidades caso qualquer um dos status
(saciedade, Lazer, Stamina, Higiene) chegar a 0!

No Fácil: Você perderá 1 dia.
No Médio: Você perderá 2 dias.
No Difícil: Você perderá o jogo.
`,
    );
}

// intro
console.log(`Selecione o modo de dificuldade (1 a 3):
`);

do {
    mode = +prompt(`
    1) Fácil      2) Médio       3) Difícil: `);
    if (isNaN(mode) || (mode !== 1 && mode !== 2 && mode !== 3)) {
        console.log(`
        Modo inválido! Digite uma das opções acima
        `);
    }
} while (mode !== 1 && mode !== 2 && mode !== 3);

// first action

for (d = 1; d < 8; d++) {
    // Contador de Dias
    if (d < 7) {
        console.log(
            `Dia ${d}. Faltam ${7 - d} para a apresentação do seu Projeto.`,
        );
    } else if (d == 7) {
        console.log(`Dia ${d}. Hoje é o Grande Dia!`);
    }

    for (timeNow = 7; timeNow < 22; ) {
        // Contador de Horas
        if (timeNow >= 7 && timeNow < 23 && day < 8 && death == false) {
            console.log(
                `${dayTime()} ${
                    player.Nome
                }, são ${timeNow} horas do seu ${day}° dia na sua jornada!`,
            );

            console.log(player.Saciedade);
            console.log(`O que você deseja fazer?
            `);
            console.log(`Digite 0 a qualquer momento e veja os status do seu personagem.
            `);
            console.log(`Ações disponíveis:`);
            console.log(`
    1)Fazer comida     2)Comer Fastfood      3)Estudar              4)Assistir Serie
    5)Trabalhar        6)Passear             7)Fazer exercicio      8)Tomar banho `);
            do {
                action = +prompt(`Digite a sua ação: `);

                if (action == 0) {
                    console.table(player);
                } else if (isNaN(action) || action < 1 || action > 8) {
                    console.log(`
-------------------------------------------------------------
                    `);
                    console.log(`
            >>>>> ESSA AÇÃO NÃO FAZ SENTIDO. <<<<<
                    `);
                    console.log(`
-------------------------------------------------------------
                    `);
                } else if (action == 1) {
                    comer();
                    console.table(player);
                } else if (action == 2) {
                    fastfood();
                    console.table(player);
                } else if (action == 3) {
                    estudar();
                    projeto += 10;
                    console.table(player);
                } else if (action == 4) {
                    serie();
                    console.table(player);
                } else if (action == 5) {
                    trabalhar();
                    console.table(player);
                } else if (action == 6) {
                    passear();
                    console.table(player);
                } else if (action == 7) {
                    exercicio();
                    console.table(player);
                } else if (action == 8) {
                    banho();
                    console.table(player);
                }
                // checkStatus();
                if (death == true) {
                    break;
                }
                if (max == true) {
                    continue;
                }
                break;
            } while (true);
        }
        if (death == true) {
            break;
        }
    }
    if (death == true) {
        break;
    }
    console.log(`
    O dia acabou! Você dormirá agora`);
    timeNow = 7;
    day++;
}
//
//
//
//
//
//
//
//
//
//
//
//

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

function GetTime(horas) {
    // Passagem de tempo por função

    for (let x = horas; x > 0; x--) {
        if (timeNow < 22) {
            timeNow++;
            {
                player.Saciedade -= 1;
                player.Social -= 1;
                player.Higiene -= 1;
                // CheckStatus()
            }
        } else if (timeNow == 22) {
            timeNow = 7;
            player.Saciedade -= 1.5 * mode;
            player.Stamina += 15 / mode;
            if (player.Stamina > 10) {
                player.Stamina == 10;
            }
            console.log(`Você Dormiu`);
            break;
        }
    }
}
function showStatus() {
    // Checagem no !status.

    // Saciedade
    if (player.Saciedade < 2) {
        console.log(
            `Sua saciedade é ${player.Saciedade}. Você está Morrendo de Fome.`,
        );
    } else if (player.Saciedade > 1 && player.Saciedade < 5) {
        console.log(
            `Sua saciedade é ${player.Saciedade}. Você está com Muita Fome.`,
        );
    } else if (player.Saciedade > 4 && player.Saciedade < 7) {
        console.log(
            `Sua saciedade é ${player.Saciedade}. Você está sentindo Fome.`,
        );
    } else if (player.Saciedade > 6 && player.Saciedade < 10) {
        console.log(
            `Sua saciedade é ${player.Saciedade}. Você está satisfeito.`,
        );
    }

    // Stamina
    if (player.Stamina < 2) {
        console.log(`Você está Exausto.`);
    } else if (player.Stamina > 1 && player.Stamina < 5) {
        console.log(`Você está Muito Cansado.`);
    } else if (player.Stamina > 4 && player.Stamina < 7) {
        console.log(`Você começa a se sentir Cansado.`);
    } else if (player.Stamina > 6 && player.Stamina < 10) {
        console.log(`Você está Descansado.`);
    }

    // Social
    if (player.Social < 2) {
        console.log(`Você está a ponto de Desistir da vida.`);
    } else if (player.Social > 1 && player.Social < 5) {
        console.log(`Você só quer ficar trancado no seu quarto.`);
    } else if (player.Social > 4 && player.Social < 7) {
        console.log(`Você está desanimado.`);
    } else if (player.Social > 6 && player.Social < 10) {
        console.log(`Você está feliz.`);
    }

    //
}
function CheckStatus() {
    death = false;
    max = false;
    //Teste Fome
    if (player.Saciedade == 0) {
        console.log(`Você não levou a sério os limites do seu corpo...
        
        Você desmaiou de Fome!
        
        `);
        return (death = true);
    } else if (player.Saciedade > 9) {
        player.Saciedade = 10;
        console.log(`Sua saciedade é ${player.Saciedade}. Você está entupido`);
        return (max = true);
    }

    // Teste Cansaço
    if (player.Stamina == 0) {
        console.log(`Você não levou a sério os limites do seu corpo...
        
        Você colaps pelo Cansaço!
        `);
        return (death = true);
    } else if (player.Stamina > 9) {
        console.log(`Você está tremendo de tanta Energia.`);
    }
    // Teste Social
    if (player.Social == 0) {
        console.log(`Você não levou a sério os limites da sua Mente...
            
        Você atenta contra a sua própria vida!
            `);
        return (death = true);
    } else if (player.Social > 9) {
        console.log(`Você está Radiante de Alegria.`);
    }
    // Teste Higine
    if (player.Higiene) {
        console.log(`Você não levou a sério os limites do seu corpo...

        Você caiu Doente!
        `);
        return (death = true);
    } else if (player.Higiene < 2) {
        console.log(`Você está com Febre Alta e dores no corpo.`);
    } else if (player.Higiene > 1 && player.Higiene < 5) {
        console.log(`Você está Muito Cansado.`);
    } else if (player.Higiene > 4 && player.Higiene < 7) {
        console.log(`Você começa a se sentir Cansado.`);
    } else if (player.Higiene > 6 && player.Higiene < 10) {
        console.log(`Você está Descansado.`);
    } else if (player.Higiene > 9) {
        console.log(`Você está tremendo de tanta Energia.`);
    }
    // // Teste Trabalho
    // if (player.Social == 0) {
    //     console.log(`Você não levou a sério os limites do seu corpo...

    //     Você morreu de Cansaço!
    //     `);
    //     return (death = true);
    // } else if (player.Social < 2) {
    //     console.log(`Você está Exausto.`);
    // } else if (player.Social > 1 && player.Social < 5) {
    //     console.log(`Você está Muito Cansado.`);
    // } else if (player.Social > 4 && player.Social < 7) {
    //     console.log(`Você começa a se sentir Cansado.`);
    // } else if (player.Social > 6 && player.Social < 10) {
    //     console.log(`Você está Descansado.`);
    // } else if (player.Social > 9) {
    //     console.log(`Você está tremendo de tanta Energia.`);
    // }
}
function dayTime() {
    if (timeNow >= 7 && timeNow <= 12) {
        return `
        Bom dia`;
    } else if (timeNow > 12 && timeNow < 18) {
        return `
        Boa tarde`;
    } else if (timeNow > 17 && timeNow < 22) {
        return `
        Boa noite`;
    }
}
function comer() {
    // Ação de comer
    GetTime(2);
    player.Saciedade += 1.5 / mode + 2;
}

function fastfood() {
    // Ação de comer fastfood
    GetTime(2);
    player.Saciedade += 1.5 / mode + 2;
    player.Higiene -= 1 / mode;
}

function estudar() {
    // Ação de estudar
    GetTime(2);
    player.Social -= 1.5 / mode + 2;
    player.Stamina -= 1.5 / mode + 2;
    (projeto += 0), 5;
}

function serie() {
    // Ação de assistir série
    GetTime(2);
    player.Lazer += 1.5 / mode + 2;
    player.Stamina -= 0.5 / mode + 2;
}

function trabalhar() {
    // Ação de trabalhar
    GetTime(2);
    player.Social -= 1.5 / mode + 2;
    player.Stamina -= 1.5 / mode + 2;
    player.Lazer -= 0.5 / mode + 2;
    projeto++;
}

function passear() {
    // Ação de passear
    GetTime(2);
    player.Social += 1.5 / mode + 2;
    player.Stamina -= 1 / mode + 2;
    player.Lazer += 0.5 / mode + 2;
}

function exercicio() {
    // Ação de se exercitar
    GetTime(2);
    player.Social += 1.5 / mode + 2;
    player.Stamina -= 1 / mode + 2;
    player.Lazer += 0.5 / mode + 2;
    player.Higiene += 0.5 / mode + 2;
}

function banho() {
    // Ação de tomar banho
    GetTime(2);
    player.Lazer += 0.5 / mode + 2;
    player.Higiene += 2 / mode + 2;
}
