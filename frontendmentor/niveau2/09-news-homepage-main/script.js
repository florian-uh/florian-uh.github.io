const menuBurger = document.getElementById('menu-burger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.querySelector('.close-menu img');

// Ouvrir le menu mobile
menuBurger.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
});

// Fermer le menu mobile
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
});