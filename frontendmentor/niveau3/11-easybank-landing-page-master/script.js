document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const hamburgerImg = hamburger.querySelector('img');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
      hamburgerImg.src = './images/icon-close.svg';
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerImg.src = './images/icon-hamburger.svg';
      document.body.style.overflow = 'auto';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburgerImg.src = './images/icon-hamburger.svg';
      document.body.style.overflow = 'auto';
    }
  });

  // Close menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburgerImg.src = './images/icon-hamburger.svg';
      document.body.style.overflow = 'auto';
    }
  });
});
