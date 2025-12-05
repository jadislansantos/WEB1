let vidas;
let palavras = [];
let palavraAtual;
let numPalavra = 0;
let exibicao = [];

const btnIniciar = document.getElementById("btn_iniciar");
const imagem = document.getElementById("img-menino");
const palavra = document.getElementById("palavra");
const boxTeclado = document.getElementById("box-teclado");

btnIniciar.addEventListener("click", novoJogo);

carregarFase();

async function carregarFase() {
    btnIniciar.style.pointerEvents = "none";

    try {
        const response = await fetch("fases.json");
        const data = await response.json();
        palavras = data.frutas.map(p => p.toUpperCase());

        btnIniciar.style.pointerEvents = "auto";

    } catch (e) {
        console.error("Erro ao carregar JSON:", e);
    }
}

function novoJogo() {
    numPalavra = 0;
    vidas = 6;
    imagem.src = "imagens/menino1.png";
    carregarPalavra();
}

function carregarPalavra() {
    if (numPalavra >= palavras.length) {
        alert("Você completou TODAS as palavras! Parabéns!");
        desativarTeclado();
        return;
    }

    palavraAtual = palavras[numPalavra];
    exibicao = Array(palavraAtual.length).fill("_");

    palavra.textContent = exibicao.join(" ");
    carregarTeclado();
}

function carregarTeclado() {
    boxTeclado.innerHTML = "";

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < letras.length; i++) {
        let botao = document.createElement("button");
        botao.textContent = letras[i];
        botao.classList.add("tecla");

        botao.addEventListener("click", () => verificarLetra(letras[i], botao));

        boxTeclado.appendChild(botao);
    }
}

function verificarLetra(letra, botao) {
    botao.disabled = true;
    let acertou = false;

    for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra) {
            exibicao[i] = letra;
            acertou = true;
        }
    }

    palavra.textContent = exibicao.join(" ");

    if (!acertou) {
        vidas--;
        if (vidas >= 0) {
            imagem.src = `imagens/menino${7 - vidas}.png`;
        }
    }

    if (vidas === 0) {
        alert("Fim de jogo! A palavra era: " + palavraAtual);
        desativarTeclado();
        return;
    }

    if (!exibicao.includes("_")) {
        alert("Parabéns! Você acertou!");
        numPalavra++;
        vidas = 6;
        imagem.src = "imagens/menino1.png";
        carregarPalavra();
    }
}

function desativarTeclado() {
    const botoes = document.querySelectorAll(".tecla");
    botoes.forEach(b => b.disabled = true);
}
