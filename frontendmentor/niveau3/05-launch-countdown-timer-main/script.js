// Set countdown date (9 days from now for demo)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 9);

function updateCountdown() {
  const now = new Date();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  updateElement('days', days);
  updateElement('hours', hours);
  updateElement('minutes', minutes);
  updateElement('seconds', seconds);
}

function updateElement(id, value) {
  const formattedValue = value.toString().padStart(2, '0');
  const card = document.getElementById(id);
  const top = card.querySelector('.top');
  const bottom = card.querySelector('.bottom');

  if (top.textContent !== formattedValue) {
    // Add simple flip animation class if desired
    top.textContent = formattedValue;
    bottom.textContent = formattedValue;
  }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
