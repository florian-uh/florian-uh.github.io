document.addEventListener('DOMContentLoaded', () => {
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

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

  menuOpen.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Toggle Dropdowns
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dropdown = btn.parentElement;
      
      // Close other dropdowns on desktop
      if (window.innerWidth >= 1024) {
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
      }

      dropdown.classList.toggle('active');
    });
  });

  // Close dropdowns when clicking outside (on desktop)
  document.addEventListener('click', (e) => {
    if (window.innerWidth >= 1024) {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
});
