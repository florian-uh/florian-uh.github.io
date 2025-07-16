const choices = ["rock", "paper", "scissors"];
const sheldonChoices = ["rock", "paper", "scissors", "lizard", "spock"];
const rules = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

let score = 0;
let isSheldon = false;

// Elements
const scoreDisplay = document.querySelector(".score-number");
const gameSection = document.getElementById("game-section");
const resultSection = document.getElementById("result-section");
const playAgainBtn = document.getElementById("play-again");
const resultMessage = document.getElementById("result-message");
const playerPicked = document.getElementById("player-picked");
const housePicked = document.getElementById("house-picked");
const toggleSheldonBtn = document.getElementById("toggle-sheldon");
const optionsTriangle = document.getElementById("options-triangle");
const optionsPentagon = document.getElementById("options-pentagon");
const gameTitle = document.getElementById("game-title");

// Helper pour créer le bouton choisi
function createPicked(choice) {
  if (!choice) return "";
  const borderColors = {
    rock: "var(--rock)",
    paper: "var(--paper)",
    scissors: "var(--scissors)",
    lizard: "var(--lizard)",
    spock: "var(--spock)",
  };
  return `<div class="picked-option" style="border-color: ${borderColors[choice]};">
    <img src="images/icon-${choice}.svg" alt="${choice}"/>
  </div>`;
}

// Affiche la section de choix
function showGame() {
  gameSection.style.display = "flex";
  resultSection.classList.remove("active");
}

// Affiche la section résultat
function showResult(playerChoice, computerChoice, result) {
  gameSection.style.display = "none";
  resultSection.classList.add("active");
  playerPicked.innerHTML = createPicked(playerChoice);
  housePicked.innerHTML = createPicked(computerChoice);
  resultMessage.textContent = result;
}

// Gère le choix du joueur
function handleChoice(choice) {
  const availableChoices = isSheldon ? sheldonChoices : choices;
  const computerChoice = availableChoices[Math.floor(Math.random() * availableChoices.length)];
  let result;
  if (choice === computerChoice) {
    result = "DRAW";
  } else if (rules[choice].includes(computerChoice)) {
    result = "YOU WIN";
    score++;
  } else {
    result = "YOU LOSE";
    score = Math.max(0, score - 1);
  }
  scoreDisplay.textContent = score;
  showResult(choice, computerChoice, result);
}

// Ajoute les listeners sur les boutons de choix
function setupOptions() {
  document.querySelectorAll(".option").forEach(btn => {
    btn.onclick = () => {
      handleChoice(btn.dataset.choice);
    };
  });
}

// Play again
playAgainBtn.onclick = showGame;

// Toggle Sheldon mode
toggleSheldonBtn.onclick = () => {
  isSheldon = !isSheldon;
  document.body.classList.toggle("sheldon", isSheldon);
  gameTitle.innerHTML = isSheldon
    ? "ROCK<br>PAPER<br>SCISSORS<br>LIZARD<br>SPOCK"
    : "ROCK<br>PAPER<br>SCISSORS";
  showGame();
};

// Initialisation
showGame();
setupOptions();