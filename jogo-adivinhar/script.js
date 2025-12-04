let numeroSecreto;
let vidas;

let tentativas = document.getElementById("vidas");
let btnIniciar = document.getElementById("btnIniciar");
let numTentar = document.getElementById("num");
let btnTentar = document.getElementById("btnTentar");
let resultado = document.getElementById("txt-respostas");

btnIniciar.addEventListener("click", novoJogo);
btnTentar.addEventListener("click", tentar);

numTentar.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        tentar();
    }
});

numTentar.disabled = true;
btnTentar.disabled = true;


function novoJogo() {
    numTentar.disabled = false;
    btnTentar.disabled = false;
    numeroSecreto = parseInt(Math.random() * 10 + 1);
    vidas = 5;
    numVidas();
    numTentar.value = "";
    resultado.innerHTML = "";
    numTentar.focus();
}

function numVidas() {
    tentativas.innerHTML = "";
    for (let i = 1; i <= vidas; i++) {
        tentativas.innerHTML += '❤️ ';
    }
    if (vidas == 0) {
        resultado.innerHTML += "Você Perdeu!";
        numTentar.disabled = true;
        btnTentar.disabled = true;
    }
}

function tentar() {
    let num = numTentar.value;
    if (num < 1 || num > 10) {
        alert("O número não pode ser maior que 10. Você perdeu uma Vida!");
        vidas--;
    }
    else if (num == numeroSecreto) {
        resultado.innerHTML += "Parabéns, você acertou!";
        numTentar.disabled = true;
        btnTentar.disabled = true;
    }
    else if (num > numeroSecreto) {
        resultado.innerHTML += "Palpite: " + num;
        resultado.innerHTML += " - O número é menor! <br>";
        vidas--;
    }
    else if (num < numeroSecreto) {
        resultado.innerHTML += "Palpite: " + num;
        resultado.innerHTML += " - O número é maior! <br>"
        vidas--;
    }

    numTentar.value = "";
    numTentar.focus();

    numVidas();
}