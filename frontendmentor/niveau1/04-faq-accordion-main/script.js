// Sélectionne toutes les questions et réponses
const questions = document.querySelectorAll('.question');
const responses = document.querySelectorAll('.reponse');

// Ajoute un gestionnaire d'événements à chaque question
questions.forEach((question, index) => {
  question.addEventListener('click', () => {
    // Vérifie si la réponse associée est déjà ouverte
    const response = responses[index];
    const isOpen = response.classList.contains('open');

    // Ferme toutes les réponses et remet les icônes à "plus"
    responses.forEach((res, i) => {
      res.classList.remove('open');
      questions[i].querySelector('img').src = 'assets/images/icon-plus.svg';
    });

    // Si la réponse n'était pas ouverte, ouvre-la et change l'icône en "moins"
    if (!isOpen) {
      response.classList.add('open');
      question.querySelector('img').src = 'assets/images/icon-minus.svg';
    }
  });
});
