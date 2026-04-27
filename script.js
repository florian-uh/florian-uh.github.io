// ===== Dark Mode Toggle =====
const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
const body = document.body;
const DARK_MODE_KEY = 'theme_preference';

/**
 * Sets the dark mode state and updates UI/storage
 * @param {boolean} isDark - Whether dark mode should be enabled
 */
const setDarkMode = (isDark) => {
  if (isDark) {
    body.classList.add('dark-mode');
    toggleDarkModeBtn.textContent = '☀️';
    toggleDarkModeBtn.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('dark-mode');
    toggleDarkModeBtn.textContent = '🌙';
    toggleDarkModeBtn.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem(DARK_MODE_KEY, isDark ? 'dark' : 'light');
};

/**
 * Initializes dark mode based on user preference or system setting
 */
const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem(DARK_MODE_KEY);
  
  // Check for saved preference first
  if (savedTheme) {
    setDarkMode(savedTheme === 'dark');
  } else {
    // Fall back to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }
};

// Initialize dark mode on page load
initializeDarkMode();

// Toggle dark mode on button click
toggleDarkModeBtn.addEventListener('click', () => {
  const isDark = !body.classList.contains('dark-mode');
  setDarkMode(isDark);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(DARK_MODE_KEY)) {
    setDarkMode(e.matches);
  }
});

// ===== Scroll Reveal Animation =====
/**
 * Reveals elements as they come into view
 */
const initializeScrollReveal = () => {
  const revealElements = document.querySelectorAll(
    '.skill-card, .carte, .post-card'
  );

  if (revealElements.length === 0) return;

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementIsVisible = elementTop < windowHeight - 50;
      
      if (elementIsVisible) {
        el.classList.add('visible');
      }
    });
  };

  // Add initial styles and class for animation
  revealElements.forEach((el) => {
    el.classList.add('reveal');
  });

  // Initial check on page load
  setTimeout(revealOnScroll, 100);

  // Check on scroll
  window.addEventListener('scroll', revealOnScroll, { passive: true });
};

initializeScrollReveal();

// ===== Update Footer Year =====
const updateFooterYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

updateFooterYear();

// ===== Navigation Active State =====
/**
 * Updates the active navigation link based on current page
 */
const updateActiveNavigation = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

updateActiveNavigation();

// ===== Smooth Link Handling =====
/**
 * Handles anchor link clicks for smooth navigation
 */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    e.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
});