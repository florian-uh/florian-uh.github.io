const gridContainer = document.getElementById("grid-container");
const resetButton = document.getElementById("reset-btn");
const toggleModeButton = document.getElementById("toggle-mode-btn");

let currentMode = "normal"; // ou "rainbow"

function createGrid(size) {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("mouseover", () => {
      if (currentMode === "normal") {
        square.style.backgroundColor = "black";
      } else if (currentMode === "rainbow") {
        square.style.backgroundColor = getRandomColor();
      }
    });

    gridContainer.appendChild(square);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // 0 à 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

resetButton.addEventListener("click", () => {
  let size = prompt("Taille de la grille ? (max 100)", 16);
  size = parseInt(size);
  if (isNaN(size) || size < 1 || size > 100) {
    alert("Veuillez entrer un nombre entre 1 et 100.");
    return;
  }
  createGrid(size);
});

toggleModeButton.addEventListener("click", () => {
  currentMode = currentMode === "normal" ? "rainbow" : "normal";
  toggleModeButton.textContent = `Mode : ${currentMode === "normal" ? "Normal" : "Arc-en-ciel"}`;
});

// Grille initiale
createGrid(16);
