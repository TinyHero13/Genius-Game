let order = [];
let clickedOrder = [];
let score = 0;
let scoreText = document.getElementById("score");

const green = document.querySelector('.green');//0
const red = document.querySelector('.red');//1
const yellow = document.querySelector('.yellow');//2
const blue = document.querySelector('.blue');//3

const wrong_answer = new Audio('./sounds/wrong_answer.wav');
const blueAudio = new Audio('./sounds/blue.wav');
const greenAudio = new Audio('./sounds/green.wav');
const yellowAudio = new Audio('./sounds/yellow.wav');
const redAudio = new Audio('./sounds/red.wav');

//Cria ordem das cores
let shuffleOrder = () => {
    let colorOrder =  Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 1);
    }
}

//acende a próxima cor
let lightColor = (color, element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
        soundColorPlay(color);
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 350);
}

//checa se os botões clicados são os mesmos da ordem do jogo
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length){
        nextLevel();
    }
}

//função clique do usuário
let click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    soundColorPlay(color);

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    }
    else if(color == 1){
        return red;
    }
    else if(color == 2){
        return yellow;
    }
    else{
        return blue;
    }
}

//funcao para som da cor
let soundColorPlay = (color) => {
    if((color == 0) || (color == 'green')){
        greenAudio.play();
        if (greenAudio.currentTime > 0.5) {
            setTimeout(() => {
                greenAudio.pause();
            }, 450);
        }
    }
    else if ((color == 1) || (color == 'red')){
        redAudio.play();
        if (redAudio.currentTime > 0.5) {
            setTimeout(() => {
                redAudio.pause();
            }, 450);
        }
    }
    else if ((color == 2) || (color == 'yellow')){
        yellowAudio.play();
        if (yellowAudio.currentTime > 0.5) {
            setTimeout(() => {
                yellowAudio.pause();
            }, 450);
        }
    }
    else if ((color == 3) || (color == 'blue')){
        blueAudio.play();
        if (blueAudio.currentTime > 0.5) {
            setTimeout(() => {
                blueAudio.pause();
            }, 450);
        }
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++; 
    scoreText.innerHTML = score;
    shuffleOrder();
}

//Função para game over 
let gameOver = () => {
    wrong_answer.play();
    alert(`Pontuação: ${score}\nVocê perdeu o jogo`);
    score = 0;
    order = [];
    clickedOrder = [];
}

//funcao de inicio do jogo
let playGame = () => {

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

