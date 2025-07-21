const switchDiv = document.querySelector('.switch');
const btn = document.querySelector('.btn');
const priceMonthly = document.querySelectorAll('.price-monthly');
const priceAnnually = document.querySelectorAll('.price-annually');

let isMonthly = true;

switchDiv.addEventListener('click', () => {
  isMonthly = !isMonthly;
  btn.classList.toggle('btn-change');
  switchDiv.classList.toggle('switch-change');
  priceMonthly.forEach(el => el.style.display = isMonthly ? 'block' : 'none');
  priceAnnually.forEach(el => el.style.display = isMonthly ? 'none' : 'block');
});

// Initial state
priceMonthly.forEach(el => el.style.display = 'block');
priceAnnually.forEach(el => el.style.display = 'none');

// Gestion du focus sur les cartes
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});