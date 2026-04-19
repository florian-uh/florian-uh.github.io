document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navClose = document.querySelector('.nav-close');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.nav-overlay');

  const openMenu = () => {
    nav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  navToggle.addEventListener('click', openMenu);
  navClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu on link click (important for mobile)
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Handle resize (if window becomes large while menu is open)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});
