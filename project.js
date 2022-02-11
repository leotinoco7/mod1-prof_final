const prompt = require('prompt-sync')();

// ---------------------- DEV NOTES:
// EXECUTAR O PROGRAMA COM O TERMINAL EM TELA CHEIA PARA NÃO PERDER INFORMAÇÕES IMPORTANTES
// -----------------------------------------------------------------------------------------

// DEFINED VARIABLES

do {
    // USANDO VAR POR QUE A DUDA FALOU!!! << PRA ECONOMIZAR PROCESSAMENTO - NAO TIRAR PONTO !!!!!!!!!!!
    var timeNow = 7; // max 22 start 7 sempre => Hora do Dia
    var day = 1; // max 7
    var mode = 0; // Dificuldade
    var death = false; // if true = game over
    var warning = 0; // Dias com <4 horas de trabalho
    var vit = 0; // Guardar o valor de player.Vitalidade na última execução pra não resetar
    var replay; //

    var player = {
        Name: '',
        Saciedade: 100,
        Vitalidade: 100,
        Felicidade: 100,
        Higiene: 100,
        Projeto: 0,
        'Horas Trabalhadas:': 0,
    };

    console.log(`
    ╔+++++++++++++++++++++╗
       Life as a Project!                
    ╚+++++++++++++++++++++╝
`);
    sleep(500);
    console.log(
        ` v 1.0          -- Desenvolvido por Leonardo Tinoco & Daniel Vinhas`,
    );
    sleep(1000);
    player.Name = prompt(`Digite seu nome: `);

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
        console.clear();
        console.log(
            `
    Seu objetivo nesse jogo é entregar um projeto para 
a sua empresa no prazo de 7 dias. Porém, existem obstáculos
no caminho.`,
        );

        sleep(500);

        console.log(`
    Você terá que conciliar suas necessidades diárias
com o seu trabalho e com o desenvolvimento do projeto. 
Você sofrerá penalidades caso qualquer um dos status
(Saciedade, Felicidade, Vitalidade, Higiene) chegue a 0.

No Fácil: Você perderá 1 dia.
No Médio: Você perderá 2 dias.
No Difícil: Você perderá o jogo.
`);

        sleep(500);

        console.log(`
    Você terá que trabalhar um minímo de 4 horas por dia 
para evitar demissão. A cada dia que você nao trabalhar
pelo menos 4 horas, irá ganhar uma advertência.

    Ao chegar a 3, você perderá o jogo
`);

        sleep(500);

        console.log(`
    Fique atento(a) na sua tabela de Status. Você pode
acessá-la digitando 0 na escolha de ações.

    Seu chefe avaliará seu projeto e sua aresentação ao final.

        Boa Sorte!!
`);
    }
    sleep(500);
    // intro
    console.log(`Selecione o modo de dificuldade (1 a 3):
`);

    do {
        mode = +prompt(`1) Fácil      2) Médio       3) Difícil: `);
        sleep(500);
        if (isNaN(mode) || (mode !== 1 && mode !== 2 && mode !== 3)) {
            console.log(`
        Modo inválido, digite uma das opções acima(1, 2 ou 3).
        `);
        }
    } while (mode !== 1 && mode !== 2 && mode !== 3);

    // First Action

    for (day = 1; day < 8; day++) {
        // Contador de Dias
        console.clear();
        if (day < 7) {
            console.log(
                `Dia ${day}. Faltam ${
                    7 - day
                } dias para a apresentação do seu Projeto.`,
            );
            sleep(500);
        } else if (day == 7) {
            console.log(`Dia ${day}. Hoje é o Grande Dia!`);
        }

        for (timeNow = 7; timeNow < 22; ) {
            // Contador de Horas

            console.log(
                `${dayTime()} ${
                    player.Name
                }, são ${timeNow} horas do ${day}° dia na sua jornada!
                `,
            );
            sleep(250);
            console.log(`O que você deseja fazer?
            `);
            sleep(250);
            console.log(`Digite 0 a qualquer momento e veja os status do seu personagem.
            `);
            sleep(250);
            console.log(`Ações disponíveis:`);
            sleep(250);
            console.log(`
    1)Fazer comida     2)Comer Fastfood      3)Estudar              4)Assistir Serie
    5)Trabalhar        6)Passear             7)Fazer exercicio      8)Tomar banho `);
            do {
                action = +prompt(`Digite a sua ação: `);
                sleep(500);
                if (action == 0) {
                    showStatus();
                    console.table(player);
                } else if (isNaN(action) || action < 1 || action > 8) {
                    console.log(`
            >>>>> ESSA AÇÃO NÃO FAZ SENTIDO. <<<<<
                    `);
                    sleep(1500);
                } else if (action == 1) {
                    comer();
                } else if (action == 2) {
                    fastfood();
                } else if (action == 3) {
                    estudar();
                } else if (action == 4) {
                    serie();
                } else if (action == 5) {
                    trabalhar();
                } else if (action == 6) {
                    passear();
                } else if (action == 7) {
                    exercicio();
                } else if (action == 8) {
                    banho();
                }
                CheckStatus();
                if (death == true) {
                    if (mode == 2 || mode == 1) {
                        console.log(`
                        Pra sua sorte, seu vizinho percebeu o que estava acontecendo e chamou uma ambulância.
                        
                        Você foi levado ao Hospital mais próximo, tomou medicamentos e foi liberado após ${
                            mode * 24
                        } H.
                        `);
                        sleep(500);
                        day += 1 * mode;
                        death = false;
                    } else if (mode == 3) {
                        console.log(`
                        Você cai sozinho e bate sua cabeça... 

                        Não havia ninguém por perto para lhe socorrer.
                        `);
                        sleep(500);
                        day += 4;
                    }
                    player.Saciedade = 100;
                    player.Vitalidade = 100;
                    player.Felicidade = 100;
                    player.Higiene = 100;
                }
                break;
            } while (true);
            if (day > 7) {
                break;
            }
        }
        player.Vitalidade = 100;
    }
    if (death == false) {
        relatorio();
        promocao();
    } else {
        console.log(`Você morreu!`);
        sleep(1000);
    }

    do {
        replay = prompt('Deseja jogar novamente? ').toLowerCase();
        sleep(250);
        while (replay !== 'sim' && replay !== 'nao') {
            console.log('Resposta inválida');
            sleep(250);
            break;
        }
    } while (replay !== 'sim' && replay !== 'nao');
} while (replay == 'sim');
{
    console.log('Encerrando Life as a Project!');
    sleep(500);
    console.log('Obrigado por jogar.');
    sleep(500);
    console.log('Dúvidas e sugestões:');
    sleep(500);
    console.log('Leonardo Tinoco - https://linktr.ee/leotinoco7');
    sleep(500);
    console.log('Daniel Vinhas - https://github.com/vinhas93');
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
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
function GetTime(horas) {
    // Passagem de tempo por função

    for (let x = horas; x > 0; x--) {
        if (timeNow < 22) {
            timeNow++;
            {
                player.Saciedade -= 10;
                player.Felicidade -= 5;
                player.Higiene -= 5;
                player.Vitalidade -= 5;
                // CheckStatus()
            }
        } else if (timeNow > 21) {
            if (day == 7) {
                vit = player.Vitalidade;
            }
            timeNow = 7;
            player.Saciedade -= 1.5 * mode;
            player.Vitalidade += 15 / mode;
            if (player.Vitalidade > 99) {
                player.Vitalidade = 100;
            }
            console.log(`
            Você Dormiu.
            Saciedade - ${1.5 * mode};
            Vitalidade está no Máximo`);
            console.log(`
            Você trabalhou um total de ${player['Horas Trabalhadas:']} horas.`);
            if (player['Horas Trabalhadas:'] < 4) {
                warning++;
                console.log(`
                Você trabalhou menos que 4 horas! Seu chefe não está nada satisfeito
                É o seu ${warning}° aviso.
                `);
            }
            sleep(5000);
            break;
        }
    }
}
function showStatus() {
    // Checagem no !status.

    // Saciedade
    if (player.Saciedade < 25) {
        console.log(
            `Sua Saciedade está em ${player.Saciedade}. Você está Morrendo de Fome.`,
        );
    } else if (player.Saciedade < 50) {
        console.log(
            `Sua Saciedade está em ${player.Saciedade}. Você está com Muita Fome.`,
        );
    } else if (player.Saciedade < 75) {
        console.log(
            `Sua Saciedade está em ${player.Saciedade}. Você está sentindo Fome.`,
        );
    } else if (player.Saciedade < 100) {
        console.log(
            `Sua Saciedade está em ${player.Saciedade}. Você está satisfeito.`,
        );
    } else if (player.Saciedade > 99) {
        player.Saciedade = 100;
        console.log(
            `Sua Saciedade está em ${player.Saciedade}. Você está entupido`,
        );
    }

    // Vitalidade
    if (player.Vitalidade < 25) {
        console.log(
            `Sua Vitalidade está em ${player.Vitalidade}. Você está Exausto.`,
        );
    } else if (player.Vitalidade < 50) {
        console.log(
            `Sua Vitalidade está em ${player.Vitalidade}. Você está Muito Cansado.`,
        );
    } else if (player.Vitalidade < 75) {
        console.log(
            `Sua Vitalidade está em ${player.Vitalidade}. Você começa a se sentir Cansado.`,
        );
    } else if (player.Vitalidade < 100) {
        console.log(
            `Sua Vitalidade está em ${player.Vitalidade}. Você está Descansado.`,
        );
    } else if (player.Vitalidade > 99) {
        player.Vitalidade = 100;
        console.log(
            `Sua Vitalidade está em ${player.Vitalidade}. Você está tremendo de tanta Energia.`,
        );
    }

    // Felicidade
    if (player.Felicidade < 25) {
        console.log(
            `Sua Felicidade está em ${player.Felicidade}. Você está a ponto de Desistir da vida.`,
        );
    } else if (player.Felicidade < 50) {
        console.log(
            `Sua Felicidade está em ${player.Felicidade}. Você só quer ficar trancado no seu quarto.`,
        );
    } else if (player.Felicidade < 75) {
        console.log(
            `Sua Felicidade está em ${player.Felicidade}. Você está desanimado.`,
        );
    } else if (player.Felicidade < 100) {
        console.log(
            `Sua Felicidade está em ${player.Felicidade}. Você está feliz.`,
        );
    } else if (player.Felicidade > 99) {
        player.Felicidade = 100;
        console.log(
            `Sua Felicidade está em ${player.Felicidade}. Você está Radiante de Alegria.`,
        );
    }

    // Higiene
    if (player.Higiene < 25) {
        console.log(
            `Sua Higiene está em ${player.Higiene}. Você está com irritações e pequenas feridas na pele.`,
        );
    } else if (player.Higiene < 50) {
        console.log(
            `Sua Higiene está em ${player.Higiene}. Isso começa a afetar a sua saúde.`,
        );
    } else if (player.Higiene < 75) {
        console.log(
            `Sua Higiene está em ${player.Higiene}. Você começa a se sentir sujo.`,
        );
    } else if (player.Higiene < 100) {
        console.log(
            `Sua Higiene está em ${player.Higiene}. Você se sente Limpo e saudável.`,
        );
    } else if (player.Higiene > 99) {
        player.Higiene = 100;
        console.log(
            `Sua Higiene está em ${player.Higiene}. Você está Extremamente limpo e Saudável.`,
        );
    }
}
function CheckStatus() {
    death = false;
    //Teste Fome
    if (player.Saciedade < 1) {
        player.Saciedade = 0;
        console.log(`Você não levou a sério os limites do seu corpo...
        
        Sua Saciedade chegou a ${player.Saciedade}. Você desmaiou de Fome!
        
        `);
        return (death = true);
    }

    // Teste Cansaço
    if (player.Vitalidade < 1) {
        player.Vitalidade = 0;
        console.log(`Você não levou a sério os limites do seu corpo...
        
        Sua Vitalidade chegou a ${player.Vitalidade}. Você desmaia pelo Cansaço!
        `);
        return (death = true);
    }

    // Teste Felicidade
    if (player.Felicidade < 1) {
        player.Felicidade = 0;
        console.log(`Você não levou a sério os limites da sua Mente...
            
        Sua Felicidade chegou a ${player.Felicidade}. Você atenta contra a sua própria vida!
            `);
        return (death = true);
    }

    // Teste Higine
    if (player.Higiene < 1) {
        player.Higiene = 0;
        console.log(`Você não levou a sério os limites do seu corpo...
        Sua Higiene chegou a ${player.Higiene}. Você foi consumido pela Doença.
        `);
        return (death = true);
    }
    if (player.Projeto > 99) {
        player.Projeto = 100;
    }
    if (warning > 2) {
        console.log(`
        Você tem fugido do trabalho, seu chefe já tinha lhe avisado.
        
        Você foi Demitido!`);
        death = true;
    }
}
function relatorio() {
    // Conclusão do seu chefe.

    let media =
        (player.Saciedade + player.Felicidade + player.Higiene + vit) / 4;

    if (media < 20) {
        console.log(
            `Você estava com um aspecto terrivel, você tem um teto para viver?.`,
        );
    } else if (media < 40) {
        console.log(
            `Você estava Sujo e com roupas desleixadas. Parece que isso não era tão importante para você`,
        );
    } else if (media < 60) {
        console.log(
            `Você estava um pouco abatido. Entendo que talvez esse projeto tenha exigido demais de você`,
        );
    } else if (media < 80) {
        console.log(
            `Você estava bem apresentável, mas faltou um pouco de confiança na apresentação.`,
        );
    } else if (media > 79) {
        console.log(
            `Você foi uma fera! Extremamente carismático e muito bem apresentável.`,
        );
    }
    if (player.Projeto < 20) {
        console.log(
            `Você pagou ao meu filho de 8 anos para fazer o projeto no seu lugar?.`,
        );
    } else if (player.Projeto < 40) {
        console.log(
            `Seu projeto está longe do que eu esperava. Talvez tenha colocado muita exectativa no seu trabalho.`,
        );
    } else if (player.Projeto < 60) {
        console.log(
            `Podemos usar o seu projeto depois que ele passar por algumas revisões`,
        );
    } else if (player.Projeto < 80) {
        console.log(`Seu projeto está bom. Parabéns`);
    } else if (player.Projeto > 79) {
        console.log(
            `Seu projeto é inovador!! Todos ficarão impressionados com esse resultado.`,
        );
    }
}
function promocao() {
    let media =
        (player.Saciedade + player.Felicidade + player.Higiene + vit) / 4;
    if (media > 69 && player.Projeto > 79) {
        console.log(`
        Sua apresentação e o conteúdo do seu projeto foram excelentes!

        Parabéns ${player.Name}, você agora será meu sócio!
        
        A cerveja hoje é por minha conta!!!

        🍺🍺🍺🍺🍺 🍻 
        🍺🍺🍺🍺🍺   🍻 
        🍺🍺🍺🍺🍺    🍻
        🍺🍺🍺🍺🍺   🍻
        🍺🍺🍺🍺🍺🍻
        🍺🍺🍺🍺🍺
        `);
    } else if (media > 49 && player.Projeto > 79) {
        console.log(`
        Sua apresentação foi boa e o conteúdo do seu projeto foi excelente.

        Parabéns ${player.Name}, você foi promovido!`);
    } else if (media > 69 && player.Projeto > 59) {
        console.log(`
        Sua apresentação foi excelente e o conteúdo do seu projeto foi bom.

        Parabéns ${player.Name}, você foi promovido!`);
    } else if (media > 49 && player.Projeto > 59) {
        console.log(`
        Sua apresentação e o conteúdo do seu projeto foram bons.

        Você está no caminho certo ${player.Name}! Mas ainda não foi o suficiente para lhe promover.`);
    } else {
        console.log(`
        Não tenho palavras para descrever o que vi aqui.

        ${player.Name}, percebo que seu desempenho está a quem de nossos objetivos...
        
        Você está Demitido.`);
    }
}
function comer() {
    // Ação de comer
    GetTime(3);
    player.Saciedade += 60 / mode + 60;
    player.Higiene += 45 / mode + 15;
    player.Felicidade += 5;
    console.log(`
    Você faz a sua comida. 
    Levou 3h para fazer e comer, mas ela é muito mais Saudável.
    Saciedade + ${60 / mode + 20}
    Higiene + ${45 / mode}
    Felicidade - 10
    Vitalidade - 15
                    `);
}

function fastfood() {
    // Ação de comer fastfood
    GetTime(1);
    player.Saciedade += 60 / mode + 30;
    player.Higiene -= 10 * mode - 5;
    player.Felicidade += 25;
    console.log(`
    Você pediu para entregarem a Comida. 
    Levou só 1h para chegar e comer, não é tão saudável quanto a comida caseira.
    Pelo menos foi mais rápido
    Saciedade + ${60 / mode + 20}
    Higiene - ${10 * mode}
    Felicidade + 20
    Vitalidade - 5
                    `);
}

function estudar() {
    // Ação de estudar
    GetTime(2);
    player.Felicidade -= 10 * mode - 5;
    player.Vitalidade -= 5 * mode - 5;
    player.Projeto += 10;
    console.log(`
    Você tirou um tempo para se dedicar ao Projeto. 
    Foram 2h intensas de estudo. 
    Sua cabeça estava latejando ao final mas houve algum progresso.
    
    Projeto + 10%

    Felicidade - ${10 * mode + 5}
    Vitalidade - ${10 * mode + 5}
    Saciedade - 20
    Higiene - 20
                    `);
}

function serie() {
    // Ação de assistir série
    GetTime(2);
    player.Felicidade += 45 / mode + 10;
    player.Vitalidade -= 5 * mode - 5;
    console.log(`
    Você tirou um tempo para assistir Game of Thrones. 
    
    Você nem percebeu as duas horas passando. 
    
    
    Felicidade + ${45 / mode}
    Vitalidade - ${5 * mode + 5}
    Saciedade - 20
    Higiene - 20
    `);
}

function trabalhar() {
    // Ação de trabalhar
    GetTime(2);
    player.Felicidade -= 10 * mode - 5;
    player.Vitalidade -= 8 * mode - 10;
    player['Horas Trabalhadas:'] += 2;
    console.log(`
    Você se empenha no seu trablaho. 
    
    Foram 2 Horas de produtividade máxima. 

    
    Felicidade - ${10 * mode + 5}
    Vitalidade - ${8 * mode}
    Saciedade - 20
    Higiene - 20
    `);
}

function passear() {
    // Ação de passear
    GetTime(2);
    player.Felicidade += 45 / mode + 10;
    player.Vitalidade -= 5 * mode - 10;
    console.log(`
    Você vai dar uma volta no Parque perto de sua casa. 
    
    Foram 2 Horas de um belo Passeio. 

    
    Felicidade + ${45 / mode}
    Vitalidade - ${5 * mode}
    Saciedade - 20
    Higiene - 20
    `);
}

function exercicio() {
    // Ação de se exercitar
    GetTime(2);
    player.Felicidade += 45 / mode + 10;
    player.Vitalidade -= 5 * mode - 10;
    player.Higiene += 30 / mode + 10;
    console.log(`
    Você vai para a Academia.
    
    Foram 2 Horas com o trajeto, mas você se sente muito bem.

    
    Felicidade + ${45 / mode}
    Vitalidade - ${5 * mode}
    Higiene + ${30 / mode}
    Saciedade - 20
    
    `);
}

function banho() {
    // Ação de tomar banho
    GetTime(1);
    player.Felicidade += 30 / mode + 5;
    player.Higiene += 60 / mode + 5;
    player.Vitalidade += 60 / mode + 5;
    console.log(`
    Você Toma AQUELE banho de Banheira.
    
    1 Hora depois, você se sente novo.


    Felicidade + ${30 / mode}
    Vitalidade + ${60 / mode}
    Higiene + ${60 / mode}
    Saciedade - 10
    
    `);
}
