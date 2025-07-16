const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar');
toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  // Change burger to close icon if needed
  toggle.querySelector('img').src = nav.classList.contains('open')
    ? 'images/icon-close.svg'
    : 'images/icon-hamburger.svg';
});

// Dropdowns for mobile
document.querySelectorAll('.navbar > li > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('open');
      // Ferme les autres dropdowns
      document.querySelectorAll('.navbar > li').forEach(li => {
        if (li !== parent) li.classList.remove('open');
      });
    }
  });
});