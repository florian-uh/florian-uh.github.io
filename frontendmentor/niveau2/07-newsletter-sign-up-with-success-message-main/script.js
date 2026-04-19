document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const signupCard = document.getElementById('signup-card');
  const successCard = document.getElementById('success-card');
  const submittedEmail = document.getElementById('submitted-email');
  const dismissBtn = document.getElementById('dismiss-btn');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();

    if (!validateEmail(emailValue)) {
      emailInput.classList.add('error');
      emailError.classList.remove('hidden');
    } else {
      emailInput.classList.remove('error');
      emailError.classList.add('hidden');
      
      // Show success card
      submittedEmail.textContent = emailValue;
      signupCard.classList.add('hidden');
      successCard.classList.remove('hidden');
    }
  });

  dismissBtn.addEventListener('click', () => {
    successCard.classList.add('hidden');
    signupCard.classList.remove('hidden');
    emailInput.value = '';
    emailInput.classList.remove('error');
    emailError.classList.add('hidden');
  });

  // Real-time validation removal
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      if (validateEmail(emailInput.value.trim())) {
        emailInput.classList.remove('error');
        emailError.classList.add('hidden');
      }
    }
  });
});
