function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const choice = choices[Math.floor(Math.random() * choices.length)];
  let cpuChoiceImg = document.querySelector('.cpu-pick .choice-display img');
  cpuChoiceImg.src = `assets/${choice}.png`;
  return choice;
}

function playRound(playerChoice, computerChoice) {
  const player = playerChoice.toLowerCase();
  const comp = computerChoice.toLowerCase();
  if (player === comp) return 'Tie';
  else {
    if (player === 'rock' && comp === 'scissors') {
      return 'Player';
    } else if (player === 'paper' && comp === 'rock') {
      return 'Player';
    } else if (player === 'scissors' && comp === 'paper') {
      return 'Player';
    } else {
      return 'Computer';
    }
  }
}

function main() {
  const choiceButtons = document.querySelectorAll('.choices .choice-container');
  choiceButtons.forEach(choice => {
    const chosen = choice.id;
    const playerChoiceDisplay = document.querySelector('.player-pick .choice-display');
    const cpuChoiceDisplay = document.querySelector('.cpu-pick .choice-display');
    const feedback = document.querySelector('.feedback-container');
    
    choice.addEventListener('mouseenter', () => {
      const cpuChoiceImg = document.querySelector('.cpu-pick .choice-display img');
      cpuChoiceImg.src = "";
      playerChoiceDisplay.style.border = '2px dotted gray';
      cpuChoiceDisplay.style.border = '2px dotted gray';
      const playerChoiceContainer = document.querySelector('.player-pick .choice-display');
      const oldChoice = document.querySelector('.player-pick .choice-display img');
      const playerChoiceImg = document.createElement('img');
      playerChoiceImg.src = `assets/${chosen}.png`;
      playerChoiceContainer.replaceChild(playerChoiceImg, oldChoice);
      feedback.textContent = "";
    });

    choice.addEventListener('click', () => {
      const cpuChoice = computerPlay();
      const result = playRound(chosen, cpuChoice);
      const playerScore = document.querySelector('.player-score');
      const cpuScore = document.querySelector('.cpu-score');

      if (result === 'Player') {
        playerChoiceDisplay.style.border = '2px solid green';
        cpuChoiceDisplay.style.border = '2px solid red';
        playerScore.textContent = parseInt(playerScore.textContent)+1;
        feedback.textContent = 'Player Wins!';
      } else if (result === 'Computer') {
        playerChoiceDisplay.style.border = '2px solid red';
        cpuChoiceDisplay.style.border = '2px solid green';
        cpuScore.textContent = parseInt(cpuScore.textContent)+1;
        feedback.textContent = 'Computer Wins!';
      } else if (result === 'Tie') {
        playerChoiceDisplay.style.border = '2px solid orange';
        cpuChoiceDisplay.style.border = '2px solid orange';
        feedback.textContent = 'Tie!';
      } else ( console.error('Unexpected result:', result) );
    })
  });

}

main();