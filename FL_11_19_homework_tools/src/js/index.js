import { playRound } from "./playRound";

let userChoice = '';

const gameNode = document.querySelector('.game');
const resultNode = document.querySelector('.result');

const drawResult = text => {
  resultNode.innerText = text;
};

const onButtonsClick = evt => {
  if (evt.target.nodeName === 'BUTTON') {
    userChoice = evt.target.innerText;
    const resultMessage = playRound(userChoice);
    drawResult(resultMessage);
  }
};

gameNode.addEventListener('click', onButtonsClick, false);
