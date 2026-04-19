document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navToggleOpen = document.querySelector('.nav__toggle-open');
  const navToggleClose = document.querySelector('.nav__toggle-close');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggleOpen.classList.toggle('hidden');
    navToggleClose.classList.toggle('hidden');
  });

  // Handle dropdowns
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
      // For mobile, we want to toggle. For desktop, it might be hover or click.
      // Frontend Mentor challenges usually expect click for these dropdowns.
      
      const isActive = dropdown.classList.contains('active');
      
      // Close all other dropdowns
      dropdowns.forEach(d => d.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        dropdown.classList.add('active');
      }
      
      e.stopPropagation();
    });
  });

  // Close menu/dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggleOpen.classList.remove('hidden');
      navToggleClose.classList.add('hidden');
    }
    
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });
});
