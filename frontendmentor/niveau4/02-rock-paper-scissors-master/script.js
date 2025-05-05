// Sélection des éléments nécessaires
const choices = ["rock", "paper", "scissors", "lizard", "spock"]; // Les choix possibles
const gameElements = document.querySelectorAll(".game > div"); // Les boutons du jeu
const scoreDisplay = document.querySelector(".display"); // Affichage du score
const rulesButton = document.querySelector(".rules"); // Bouton pour afficher les règles
const rulesModal = document.createElement("div"); // Modal pour afficher les règles
let score = 0; // Score initial

// Fonction pour obtenir le choix aléatoire de l'ordinateur
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Fonction pour déterminer le gagnant
function determineWinner(playerChoice, computerChoice) {
  // Règles du jeu
  const winConditions = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"],
  };

  if (playerChoice === computerChoice) {
    return "draw"; // Égalité
  } else if (winConditions[playerChoice].includes(computerChoice)) {
    return "win"; // Le joueur gagne
  } else {
    return "lose"; // L'ordinateur gagne
  }
}

// Fonction pour mettre à jour le score
function updateScore(result) {
  if (result === "win") {
    score++;
  } else if (result === "lose") {
    score = Math.max(0, score - 1); // Le score ne peut pas être négatif
  }
  scoreDisplay.textContent = score; // Mise à jour de l'affichage du score
}

// Fonction pour afficher les règles
function showRules() {
  rulesModal.classList.add("rules-modal");
  rulesModal.innerHTML = `
    <div class="rules-content">
      <h2>Règles</h2>
      <p>Pierre bat Ciseaux et Lézard</p>
      <p>Papier bat Pierre et Spock</p>
      <p>Ciseaux bat Papier et Lézard</p>
      <p>Lézard bat Spock et Papier</p>
      <p>Spock bat Ciseaux et Pierre</p>
      <button class="close-rules">Fermer</button>
    </div>
  `;
  document.body.appendChild(rulesModal);

  // Gestion de la fermeture des règles
  const closeButton = rulesModal.querySelector(".close-rules");
  closeButton.addEventListener("click", () => {
    rulesModal.remove();
  });
}

// Gestion des clics sur les choix du joueur
gameElements.forEach((element) => {
  element.addEventListener("click", () => {
    const playerChoice = element.id; // Récupère l'id du choix du joueur
    const computerChoice = getComputerChoice(); // Choix aléatoire de l'ordinateur

    // Détermine le résultat
    const result = determineWinner(playerChoice, computerChoice);

    // Met à jour le score
    updateScore(result);

    // Affiche le résultat dans la console (vous pouvez personnaliser l'affichage)
    console.log(`Vous avez choisi : ${playerChoice}`);
    console.log(`L'ordinateur a choisi : ${computerChoice}`);
    console.log(`Résultat : ${result}`);
  });
});

// Gestion du clic sur le bouton des règles
rulesButton.addEventListener("click", showRules);
