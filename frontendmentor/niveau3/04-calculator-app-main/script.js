const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const displayInput = document.querySelector('.input');
const displayResult = document.querySelector('.result');
const btnClear = document.querySelector('.btn_clear');
const btnDelete = document.querySelector('.btn_delete');
const buttons = document.querySelectorAll('.btn');

// Fonction pour appliquer le thème en fonction de la valeur
function applyTheme(theme) {
  body.classList.remove('theme-1', 'theme-2', 'theme-3');
  body.classList.add(`theme-${theme}`);
}

// Écouteur d'événement pour détecter les changements de l'input range
themeToggle.addEventListener('input', (e) => {
  const theme = e.target.value; // Récupère la valeur (1, 2 ou 3)
  applyTheme(theme);
});

// Appliquer le thème par défaut au chargement de la page
applyTheme(themeToggle.value);

// Effacer tout (Clear)
btnClear.addEventListener('click', () => {
  displayInput.textContent = '0'; // Réinitialise l'équation en cours
  displayResult.textContent = '0'; // Réinitialise le résultat
});

// Supprimer un chiffre (Delete)
btnDelete.addEventListener('click', () => {
  const currentInput = displayInput.textContent;

  if (currentInput.length > 1) {
    // Supprime le dernier caractère
    displayInput.textContent = currentInput.slice(0, -1);
  } else {
    // Si un seul caractère reste, réinitialise à 0
    displayInput.textContent = '0';
  }
});

// Fonction pour effectuer le calcul
function calculate() {
  try {
    const equation = displayInput.textContent;
    const result = eval(equation); // Utilise eval pour évaluer l'équation
    displayResult.textContent = result;
  } catch (error) {
    displayResult.textContent = 'Erreur';
  }
}

// Gestion des clics sur les boutons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('btn-number') || button.classList.contains('btn-dot')) {
      // Ajouter un chiffre ou un point à l'équation
      if (displayInput.textContent === '0') {
        displayInput.textContent = value;
      } else {
        displayInput.textContent += value;
      }
    } else if (button.classList.contains('btn-operator')) {
      // Ajouter un opérateur à l'équation
      const lastChar = displayInput.textContent.slice(-1);
      if (!['+', '-', '*', '/'].includes(lastChar)) {
        displayInput.textContent += value;
      }
    } else if (button.classList.contains('btn-equal')) {
      // Calculer le résultat
      calculate();
    }
  });
});