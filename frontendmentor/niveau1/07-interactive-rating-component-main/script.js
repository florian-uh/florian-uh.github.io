// Sélectionner les éléments nécessaires
const ratingCard = document.getElementById('rating'); // Carte de notation
const thankCard = document.getElementById('thank'); // Carte de remerciement
const ratingButtons = document.querySelectorAll('.rating-button'); // Boutons de notation
const submitButton = document.querySelector('button[type="submit"]'); // Bouton "Submit"
const scoreElement = document.getElementById('score'); // Élément pour afficher le score

// Sélectionner le bouton "Back"
const backButton = document.getElementById('back-button');

// Variable pour stocker la note sélectionnée
let selectedRating = null;

// Ajouter un gestionnaire d'événements pour chaque bouton de notation
ratingButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Mettre à jour la note sélectionnée
    selectedRating = button.textContent;

    // Supprimer la classe active de tous les boutons
    ratingButtons.forEach(btn => btn.classList.remove('active'));

    // Ajouter la classe active au bouton cliqué
    button.classList.add('active');
  });
});

// Ajouter un gestionnaire d'événements pour le bouton "Submit"
submitButton.addEventListener('click', () => {
  // Vérifier si une note a été sélectionnée
  if (selectedRating) {
    // Mettre à jour le texte de l'élément score avec la note sélectionnée
    scoreElement.textContent = selectedRating;

    // Masquer la carte de notation et afficher la carte de remerciement
    ratingCard.style.display = 'none';
    thankCard.style.display = 'flex';
  } else {
    // Si aucune note n'est sélectionnée, afficher un message d'erreur (optionnel)
    alert('Veuillez sélectionner une note avant de soumettre.');
  }
});

// Ajouter un gestionnaire d'événements pour le bouton "Back"
backButton.addEventListener('click', () => {
  // Masquer la carte de remerciement et afficher la carte de notation
  thankCard.style.display = 'none';
  ratingCard.style.display = 'flex';

  // Réinitialiser la sélection de la note
  selectedRating = null;
  ratingButtons.forEach(btn => btn.classList.remove('active'));
});