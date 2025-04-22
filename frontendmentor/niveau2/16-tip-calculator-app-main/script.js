// Sélection des éléments HTML nécessaires
const billInput = document.getElementById("bill"); // Champ de saisie pour le montant de la facture
const peopleInput = document.getElementById("people"); // Champ de saisie pour le nombre de personnes
const tipButtons = document.querySelectorAll(".tip-btn"); // Boutons de pourboire prédéfinis
const customTipInput = document.getElementById("custom-tip"); // Champ de saisie pour un pourboire personnalisé
const tipAmountDisplay = document.getElementById("tip-amount"); // Affichage du montant du pourboire par personne
const totalAmountDisplay = document.getElementById("total-amount"); // Affichage du montant total par personne
const resetButton = document.getElementById("reset"); // Bouton de réinitialisation

// Variables pour stocker les valeurs saisies
let bill = 0; // Montant de la facture
let people = 0; // Nombre de personnes
let tipPercentage = 0; // Pourcentage de pourboire

// Fonction pour calculer et afficher les montants
function calculateTip() {
  if (bill > 0 && people > 0 && tipPercentage >= 0) {
    const tipAmount = (bill * (tipPercentage / 100)) / people; // Calcul du pourboire par personne
    const totalAmount = (bill / people) + tipAmount; // Calcul du montant total par personne

    // Mise à jour des affichages
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    resetButton.disabled = false; // Activation du bouton de réinitialisation
  }
}

// Écouteurs d'événements pour les champs de saisie
billInput.addEventListener("input", () => {
  bill = parseFloat(billInput.value) || 0; // Conversion en nombre ou 0 si vide
  calculateTip(); // Recalcul des montants
});

peopleInput.addEventListener("input", () => {
  people = parseInt(peopleInput.value) || 0; // Conversion en entier ou 0 si vide
  calculateTip(); // Recalcul des montants
});

// Écouteurs d'événements pour les boutons de pourboire
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercentage = parseInt(button.dataset.tip); // Récupération du pourcentage depuis l'attribut data-tip
    customTipInput.value = ""; // Réinitialisation du champ personnalisé
    calculateTip(); // Recalcul des montants
  });
});

// Écouteur d'événement pour le champ de pourboire personnalisé
customTipInput.addEventListener("input", () => {
  tipPercentage = parseFloat(customTipInput.value) || 0; // Conversion en nombre ou 0 si vide
  calculateTip(); // Recalcul des montants
});

// Écouteur d'événement pour le bouton de réinitialisation
resetButton.addEventListener("click", () => {
  // Réinitialisation des champs et des affichages
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  resetButton.disabled = true; // Désactivation du bouton de réinitialisation
  tipPercentage = 0;
  bill = 0;
  people = 0;
});