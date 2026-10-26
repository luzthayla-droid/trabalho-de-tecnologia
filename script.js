// =====================================
// CONTROLE DO TAMANHO DA FONTE
// =====================================

const botaoAumentar = document.getElementById("aumentarFonte");
const botaoDiminuir = document.getElementById("diminuirFonte");

let tamanhoFonte = 18;

botaoAumentar.addEventListener("click", function () {
    if (tamanhoFonte < 24) {
        tamanhoFonte += 1;
        document.documentElement.style.setProperty(
            "--fonte-base",
            tamanhoFonte + "px"
        );
    }
});

botaoDiminuir.addEventListener("click", function () {
    if (tamanhoFonte > 14) {
        tamanhoFonte -= 1;
        document.documentElement.style.setProperty(
            "--fonte-base",
            tamanhoFonte + "px"
        );
    }
});


// =====================================
// MODO CLARO / ESCURO
// =====================================

const botaoModoEscuro = document.getElementById("modoEscuro");

botaoModoEscuro.addEventListener("click", function () {

    document.body.classList.toggle("modo-escuro");

    const modoAtivo =
        document.body.classList.contains("modo-escuro");

    if (modoAtivo) {
        botaoModoEscuro.textContent = "☀️ Modo claro";
    } else {
        botaoModoEscuro.textContent = "🌙 Modo escuro";
    }
});


// =====================================
// LEITOR DE TEXTO
// Utiliza a API de síntese de voz
// do próprio navegador.
// =====================================

const botaoLer = document.getElementById("lerPagina");

botaoLer.addEventListener("click", function () {

    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não possui suporte à síntese de voz.");
        return;
    }

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        botaoLer.textContent = "🔊 Ler conteúdo";
        return;
    }

    const conteudo = document.getElementById("conteudo");

    const texto = conteudo.innerText;

    const fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 0.9;
    fala.pitch = 1;

    fala.onend = function () {
        botaoLer.textContent = "🔊 Ler conteúdo";
    };

    botaoLer.textContent = "⏹️ Parar leitura";

    speechSynthesis.speak(fala);
});


// =====================================
// BOTÃO VOLTAR AO TOPO
// =====================================

const botaoTopo = document.getElementById("voltarTopo");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =====================================
// QUIZ
// =====================================

const botoesQuiz = document.querySelectorAll(".opcoes button");

const resultadoQuiz =
    document.getElementById("resultadoQuiz");

let pontuacao = 0;
let perguntasRespondidas = 0;

botoesQuiz.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const pergunta = botao.closest(".pergunta");

        // Evita responder a mesma pergunta mais de uma vez
        if (pergunta.dataset.respondida === "true") {
            return;
        }

        pergunta.dataset.respondida = "true";
        perguntasRespondidas++;

        const botoes = pergunta.querySelectorAll("button");

        botoes.forEach(function (item) {
            item.disabled = true;
        });

        if (botao.dataset.correta === "true") {

            botao.classList.add("correta");
            pontuacao++;

            resultadoQuiz.textContent =
                "Resposta correta! 🎉";

        } else {

            botao.classList.add("errada");

            botoes.forEach(function (item) {

                if (item.dataset.correta === "true") {
                    item.classList.add("correta");
                }

            });

            resultadoQuiz.textContent =
                "Resposta incorreta. A resposta correta está destacada em verde.";
        }

        // Resultado final
        if (perguntasRespondidas === 3) {

            resultadoQuiz.textContent =
                `Quiz finalizado! Você acertou ${pontuacao} de 3 questões.`;
        }
    });
});


// =====================================
// TECLADO
// Atalho: tecla "Home" volta ao topo.
// =====================================

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Home") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

});
