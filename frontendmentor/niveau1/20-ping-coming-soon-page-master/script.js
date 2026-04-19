const form = document.getElementById('notify-form');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();
  if (!validateEmail(value)) {
    emailInput.classList.add('error');
    errorMsg.style.display = 'block';
  } else {
    emailInput.classList.remove('error');
    errorMsg.style.display = 'none';
    alert('Thanks! You will be notified.');
    form.reset();
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('error')) {
    emailInput.classList.remove('error');
    errorMsg.style.display = 'none';
  }
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}