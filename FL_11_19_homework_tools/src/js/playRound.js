const GAME_VARIANTS = ['Rock', 'Paper', 'Scissors'];
const MAX_ROUNDS = 3;
let roundCounter = 0;
let stat = {
  draws: 0,
  wins: 0,
  loses: 0
}

const resetGameStatistic = () => {
  roundCounter = 0;
  stat.wins = 0;
  stat.draws = 0;
  stat.loses = 0;
};

const isGameOver = () => roundCounter >= MAX_ROUNDS;

const setWinner = (bool, message) => {
  if (bool) {
    stat.wins++;
    return message += `WON!`;
  } else {
    stat.loses++;
    return message += `LOST!`; 
  }
};

const getWinner = () => {
  const whichIsTheGreatest = numericValues => {
    let max = -Infinity;
    let maxName = null;
    for (const key in numericValues) {
       const num = numericValues[key];
       if (num > max) {
           max = num;
           maxName = key;
       }
       max = (num > max && num) || max;
    }
    return maxName;
  }
  const result = whichIsTheGreatest(stat).toString();
  resetGameStatistic();
  if (result === 'draws') {
    return `Game is over. It's a DRAW!`
  } else if (result === 'wins') {
    return `Game is over. You win the game!`
  } else {
    return `Game is over. You lost the game!`
  }
};

const calcGameStatistic = (userChoice) => {
  roundCounter++;
  const randomNumber = Math.floor(Math.random() * 3);
  const compGuess = GAME_VARIANTS[randomNumber];
  let vsMessage = `Round ${roundCounter}, ${userChoice} vs. ${compGuess}`;
  if (userChoice === compGuess) {
    stat.draws++;
    return `${vsMessage}, it's a DRAW!`;
  } else {
    vsMessage += `, You’ve `;
    switch (userChoice) {
      case GAME_VARIANTS[0]:
        return compGuess === GAME_VARIANTS[1] ? setWinner(false, vsMessage) : setWinner(true, vsMessage);
      case GAME_VARIANTS[1]:
        return compGuess === GAME_VARIANTS[2] ? setWinner(false, vsMessage) : setWinner(true, vsMessage);
      case GAME_VARIANTS[2]:
        return compGuess === GAME_VARIANTS[0] ? setWinner(false, vsMessage) : setWinner(true, vsMessage);
      default:
        throw new Error('Smth went wrong in playRound function!')
    }
  }
};

export const playRound = userChoice => {
  if (userChoice === 'Reset') {
    resetGameStatistic();
    return `Try one more time!`;
  } else {
    const result = calcGameStatistic(userChoice);
    if (isGameOver()) {
      return getWinner();
    } else {
      return result;
    }
  }
};
