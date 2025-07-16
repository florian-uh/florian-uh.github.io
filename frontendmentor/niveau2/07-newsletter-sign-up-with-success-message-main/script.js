// Sélection des éléments nécessaires
// On récupère les éléments HTML dont on a besoin pour interagir avec eux dans le script.
const newsletter = document.getElementById("newletter"); // Section contenant le formulaire de newsletter.
const success = document.getElementById("success"); // Section contenant le message de succès.
const form = document.querySelector("form"); // Le formulaire HTML.
const emailInput = document.getElementById("mail"); // Le champ d'entrée pour l'adresse email.
const dismissButton = success.querySelector("button"); // Le bouton "Dismiss message" dans la section de succès.

// Fonction pour valider l'email
// Cette fonction vérifie si l'email entré par l'utilisateur est valide en utilisant une expression régulière.
function validateEmail(email) {
  // L'expression régulière vérifie que l'email suit le format standard (texte@texte.domaine).
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase()); // Retourne "true" si l'email est valide, sinon "false".
}

// Gestion de la soumission du formulaire
// On écoute l'événement "submit" (soumission) du formulaire.
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire.
  const email = emailInput.value.trim(); // Récupère la valeur du champ email et enlève les espaces inutiles.

  if (validateEmail(email)) {
    // Si l'email est valide :
    newsletter.style.display = "none"; // Cache la section du formulaire de newsletter.
    success.style.display = "block"; // Affiche la section du message de succès.
  } else {
    // Si l'email n'est pas valide :
    emailInput.classList.add("error"); // Ajoute une classe "error" au champ email pour le styliser en rouge.
    emailInput.setAttribute("aria-invalid", "true"); // Indique que le champ contient une valeur invalide.
    emailInput.setAttribute("aria-describedby", "error-message"); // Associe un message d'erreur au champ.

    // Création d'un message d'erreur :
    const errorMessage = document.createElement("p"); // Crée un élément <p> pour afficher le message d'erreur.
    errorMessage.id = "error-message"; // Donne un ID au message d'erreur.
    errorMessage.textContent = "Please enter a valid email address."; // Texte du message d'erreur.
    errorMessage.style.color = "var(--red)"; // Applique une couleur rouge au texte du message.
    form.appendChild(errorMessage); // Ajoute le message d'erreur à la fin du formulaire.
  }
});

// Gestion de l'entrée dans le champ email
// On écoute l'événement "input" (modification) sur le champ email.
emailInput.addEventListener("input", function () {
  // Si l'utilisateur modifie le contenu du champ email :
  emailInput.classList.remove("error"); // Retire la classe "error" pour supprimer le style rouge.
});

// Gestion du clic sur le bouton "Dismiss message"
// On écoute l'événement "click" sur le bouton "Dismiss message".
dismissButton.addEventListener("click", function () {
  // Lorsque l'utilisateur clique sur le bouton :
  success.style.display = "none"; // Cache la section du message de succès.
  newsletter.style.display = "flex"; // Réaffiche la section du formulaire de newsletter.
  form.reset(); // Réinitialise le formulaire (vide le champ email).
});