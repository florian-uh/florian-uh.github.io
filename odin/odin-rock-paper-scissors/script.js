const choices = ["pierre", "feuille", "ciseaux"];
let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultText = document.getElementById("result-text");

document.querySelectorAll(".choices img").forEach(img => {
  img.addEventListener("click", () => {
    const playerChoice = img.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    playRound(playerChoice, computerChoice);
  });
});

function playRound(player, computer) {
  let result = "";

  if (player === computer) {
    result = `Égalité ! Vous avez tous les deux choisi ${player}.`;
  } else if (
    (player === "pierre" && computer === "ciseaux") ||
    (player === "feuille" && computer === "pierre") ||
    (player === "ciseaux" && computer === "feuille")
  ) {
    playerScore++;
    result = `Vous gagnez ! ${player} bat ${computer}.`;
  } else {
    computerScore++;
    result = `Vous perdez ! ${computer} bat ${player}.`;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultText.textContent = result;
}
