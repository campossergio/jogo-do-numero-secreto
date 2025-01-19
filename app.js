/**
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um Número entre 1 e 10';
*/
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numero = gerarNumeroAleatorio();
let tentativas = 1;

// Criando função para exibir texto na tela e otimizar o código
function exibirTextoNaTela(tag, mensagem) {
    let texto = document.querySelector(tag);
    texto.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.1} );
    /*if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }*/
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p' , 'Escolha um Número entre 1 e 10');
}

mensagemInicial();

// Criando função para verificar chute
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numero) {
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numero) {
        exibirTextoNaTela('h1', 'O número é menor!');
        exibirTextoNaTela('p', 'Tente novamente!');
    } else { // chute < numero
        exibirTextoNaTela('h1', 'O número é maior!');
        exibirTextoNaTela('p', 'Tente novamente!');
    }
    tentativas++;
    limparCampo();
    //console.log(chute == numero);
}

// Criando função para gerar número aleatório.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeNumerosSorteados = listaNumerosSorteados.length;
    if (quantidadeNumerosSorteados ==  numeroLimite) {
        listaNumerosSorteados = [];
    }   
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numero = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

