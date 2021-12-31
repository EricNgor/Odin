function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice, computerChoice) {
  const player = playerChoice.toLowerCase();
  const comp = computerChoice.toLowerCase();
  if (player === comp) return 'Tie';
  else {
    if (player === 'rock' && comp === 'scissors') {
      return 'Player Wins'
    } else if (player === 'paper' && comp === 'rock') {
      return 'Player Wins';
    } else if (player === 'scissors' && comp === 'paper') {
      return 'Player Wins';
    } else {
      return 'Computer Wins'
    }
  }
}

const playerChoice = 'rock';

for (let i=0; i < 5; ++i) {
  console.log(playRound(playerChoice, computerPlay()));
}