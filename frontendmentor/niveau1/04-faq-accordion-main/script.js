document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      // Fermer toutes les réponses ouvertes
      questions.forEach((item) => {
        const response = item.querySelector(".reponse");
        const icon = item.querySelector("img");
        if (item !== question) {
          response.classList.remove("open"); // Ferme la réponse
          icon.src = "assets/images/icon-plus.svg"; // Change l'icône
        }
      });

      // Ouvrir ou fermer la réponse de la question cliquée
      const response = question.querySelector(".reponse");
      const icon = question.querySelector("img");
      if (response.classList.contains("open")) {
        response.classList.remove("open"); // Ferme la réponse
        icon.src = "assets/images/icon-plus.svg"; // Change l'icône
      } else {
        response.classList.add("open"); // Ouvre la réponse
        icon.src = "assets/images/icon-minus.svg"; // Change l'icône
      }
    });
  });
});