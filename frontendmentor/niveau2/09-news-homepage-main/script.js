const menuBurger = document.getElementById('menu-burger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.querySelector('.close-menu img');

console.log(menuBurger); // Vérifie si le bouton menu est bien sélectionné
console.log(mobileMenu); // Vérifie si le menu mobile est bien sélectionné
console.log(closeMenu);  // Vérifie si le bouton de fermeture est bien sélectionné

// Vérifiez que les éléments existent avant d'ajouter des écouteurs d'événements
if (menuBurger && mobileMenu && closeMenu) {
  // Ouvrir le menu mobile
  menuBurger.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Empêche le défilement en arrière-plan
  });

  // Fermer le menu mobile
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Réactive le défilement
  });

  // Fermer le menu en cliquant en dehors
  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !menuBurger.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
} else {
  console.error('Un ou plusieurs éléments du menu burger sont introuvables.');
}