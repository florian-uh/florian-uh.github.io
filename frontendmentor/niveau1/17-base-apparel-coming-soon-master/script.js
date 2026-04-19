const form = document.getElementById('email-form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailValue = emailInput.value;
  
  if (!validateEmail(emailValue)) {
    form.classList.add('invalid');
  } else {
    form.classList.remove('invalid');
    alert('Email submitted successfully!');
    emailInput.value = '';
  }
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Remove error state when typing
emailInput.addEventListener('input', () => {
  if (form.classList.contains('invalid')) {
    form.classList.remove('invalid');
  }
});