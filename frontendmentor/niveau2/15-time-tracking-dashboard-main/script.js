let data = [];
const cardsContainer = document.getElementById('cards-container');
const filterBtns = document.querySelectorAll('.filter-btn');

const timeframeLabels = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month'
};

async function init() {
  try {
    const response = await fetch('./data.json');
    data = await response.json();
    renderCards('weekly');
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function renderCards(timeframe) {
  cardsContainer.innerHTML = data.map(item => {
    const current = item.timeframes[timeframe].current;
    const previous = item.timeframes[timeframe].previous;
    const categoryClass = item.title.toLowerCase().replace(/\s+/g, '-');

    return `
      <article class="card category-card category-card--${categoryClass}">
        <div class="category-card__content">
          <div class="category-card__header">
            <h2 class="category-card__title">${item.title}</h2>
            <button aria-label="More options"><img src="./images/icon-ellipsis.svg" alt=""></button>
          </div>
          <div class="category-card__stats">
            <p class="category-card__current">${current}hrs</p>
            <p class="category-card__previous">${timeframeLabels[timeframe]} - ${previous}hrs</p>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active class
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const timeframe = btn.getAttribute('data-timeframe');
    renderCards(timeframe);
  });
});

document.addEventListener('DOMContentLoaded', init);
