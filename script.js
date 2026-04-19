// === Mode sombre ===
const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
const body = document.body;

// Charger l'état précédent
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
  toggleDarkModeBtn.textContent = "☀️";
  toggleDarkModeBtn.setAttribute("aria-pressed", "true");
}

// Toggle mode sombre
toggleDarkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  toggleDarkModeBtn.textContent = isDark ? "☀️" : "🌙";
  toggleDarkModeBtn.setAttribute("aria-pressed", isDark);
  localStorage.setItem("darkMode", isDark);
});

// === Bouton "Voir tous les projets" ===
document.getElementById("btn1")?.addEventListener("click", () => {
  window.location.href = "projets/index.html";
});

// === Petits effets au scroll ===
const revealElements = document.querySelectorAll(".block-comp, .carte, .post");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

// Styles initiaux pour animation d’apparition
revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();