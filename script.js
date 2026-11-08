const perguntas = [
    {
        pergunta: "O que significa HTML?",
        alternativas: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Tool Markup Language",
        ],
        correta: 0
    },
    {

        pergunta: "Qual Linguagem é utilizada para estilizar páginas?",
        alternativas: [
            "Java",
            "CSS",
            "Python",
            "SQL",
        ],
        correta: 1
    },
    {

        pergunta: "O que é o Java?",
        alternativas: [
            "Um navegador",
            "Uma linguagem de programação",
            "Um sistema operacional",
            "Um banco de dados",

        ],
        correta: 2


    },
    {
        pergunta: "Qual destas opções é uma linguagem de programação?",
        alternativas: [
            "Python",
            "HTML",
            "CSS",
            "XML",

        ],
        correta: 0

    },
    {

        pergunta: "O que significa CSS?",
        alternativas: [
            "Computer Style System",
            "Cascading Style Sheets",
            "Creative Style Software",
            "Code Style Source",

        ],
        correta: 1
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoProgresso = document.getElementById("progresso");
const botaoIniciar = document.getElementById("iniciar");
const botaoProximo = document.getElementById("proximo");
const elementoResultado = document.getElementById("resultado");

function iniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    respondeu = false;

    elementoResultado.replaceChildren();
    elementoPergunta.hidden = false;
    elementoAlternativas.hidden = false;
    elementoProgresso.hidden = false;
    botaoIniciar.hidden = true;
    botaoProximo.hidden = true;

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;
    const atual = perguntas[indiceAtual];

    elementoPergunta.textContent = atual.pergunta;
    elementoProgresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    elementoAlternativas.replaceChildren();
    botaoProximo.hidden = true;

    atual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = alternativa;
        botao.className = "alternativa";
        botao.onclick = () => verificarResposta(indice);
        elementoAlternativas.appendChild(botao);
    });
}

function verificarResposta(indice) {
    if (respondeu) return;
    respondeu = true;

    const atual = perguntas[indiceAtual];
    const acertou = indice === atual.correta;

    if (acertou) pontuacao++;

    const botoes = elementoAlternativas.querySelectorAll("button");
    botoes.forEach((botao, posicao) => {
        botao.disabled = true;
        if (posicao === atual.correta) {
            botao.classList.add("correta");
        } else if (posicao === indice) {
            botao.classList.add("errada");
        }
    });

    elementoProgresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}\n`
    botaoProximo.textContent = indiceAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
    botaoProximo.hidden = false;
}

function proximaPergunta() {
    if (!respondeu) return;
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    elementoPergunta.hidden = true;
    elementoAlternativas.hidden = true;
    elementoProgresso.hidden = true;
    botaoProximo.hidden = true;

    const percentual = Math.round((pontuacao / perguntas.length) * 100);
    const titulo = document.createElement("h2");
    titulo.textContent = "Quiz finalizado!";
    const pontos = document.createElement("p");
    pontos.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas (${percentual}%).`;

    const mensagem = document.createElement("p");
    mensagem.textContent = percentual === 100
        ? "Excelente! Você acertou todas as perguntas!"
        : percentual >= 60
            ? "Muito bem! Continue praticando."
            : "Continue estudando e tente novamente!";

    elementoResultado.replaceChildren(titulo, pontos, mensagem);
    botaoIniciar.textContent = "Jogar novamente";
    botaoIniciar.hidden = false;
}