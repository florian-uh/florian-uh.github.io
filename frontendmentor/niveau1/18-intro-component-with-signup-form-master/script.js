const form = document.getElementById('signup-form');
const inputs = form.querySelectorAll('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  inputs.forEach(input => {
    validateInput(input);
  });
});

function validateInput(input) {
  const inputGroup = input.parentElement;
  const value = input.value.trim();
  
  if (value === '') {
    setError(inputGroup, input);
  } else if (input.type === 'email' && !validateEmail(value)) {
    setError(inputGroup, input);
  } else {
    removeError(inputGroup);
  }
}

function setError(group, input) {
  group.classList.add('error');
  if (input.type === 'email') {
    input.placeholder = 'email@example/com';
  } else {
    input.placeholder = '';
  }
}

function removeError(group) {
  group.classList.remove('error');
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Remove error on input
inputs.forEach(input => {
  input.addEventListener('input', () => {
    const inputGroup = input.parentElement;
    if (inputGroup.classList.contains('error')) {
      removeError(inputGroup);
    }
  });
});