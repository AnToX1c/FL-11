const MAX_ATTEMPTS = 3;
const RANGE_STEP = 4;
const PRIZE_STEP = 2;
const INITIAL_MAX_PRIZE = 100;
const INITIAL_MAX_RANGE_NUMBER = 8;
const MIN_RANGE_NUMBER = 0;

let isPlaying = confirm(`Do you want to play a game?`);

while (isPlaying) {
  let maxRangeNumber = INITIAL_MAX_RANGE_NUMBER;
  let numberToGuess = Math.floor(Math.random() * (maxRangeNumber - MIN_RANGE_NUMBER + 1)) + MIN_RANGE_NUMBER;
  let maxPrize = INITIAL_MAX_PRIZE;
  let currentPrize = maxPrize;
  let totalPrize = 0;
  let attemptsLeft = MAX_ATTEMPTS;
  let isContinue = true;
  while (attemptsLeft && isContinue) {
    let playerAnswer = parseFloat(prompt(`Choose a roulette pocket number from ${MIN_RANGE_NUMBER} to ${maxRangeNumber}
Attempts left: ${attemptsLeft}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$
`, ``));
    if (playerAnswer === numberToGuess) {
      totalPrize += currentPrize;
      isContinue = confirm(`Congratulation, you won!   Your prize is: ${totalPrize} $. Do you want to continue?`);
      if (isContinue) {
        maxRangeNumber += RANGE_STEP;
        numberToGuess = Math.floor(Math.random() * (maxRangeNumber - MIN_RANGE_NUMBER + 1)) + MIN_RANGE_NUMBER;
        maxPrize *= PRIZE_STEP;
        currentPrize = maxPrize;
        attemptsLeft = MAX_ATTEMPTS;
      }
    } else {
      currentPrize /= PRIZE_STEP;
      attemptsLeft--;
    }
  }
  totalPrize = attemptsLeft === 0 ? 0 : totalPrize;
  alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
  isPlaying = confirm(`Do you want to play again?`);
}
alert(`You did not become a billionaire, but can.`);
