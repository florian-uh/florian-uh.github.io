document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  const form = e.target;
  
  // Clear previous errors
  form.querySelectorAll('.form-control').forEach(ctrl => ctrl.classList.remove('error'));
  
  // Validate First Name
  const firstName = document.getElementById('first-name');
  if (!firstName.value.trim()) {
    firstName.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Last Name
  const lastName = document.getElementById('last-name');
  if (!lastName.value.trim()) {
    lastName.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Email
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    email.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Query Type
  const queryType = form.querySelector('input[name="query-type"]:checked');
  if (!queryType) {
    document.querySelector('.radio-group').parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Message
  const message = document.getElementById('message');
  if (!message.value.trim()) {
    message.parentElement.classList.add('error');
    isValid = false;
  }
  
  // Validate Consent
  const consent = document.getElementById('consent');
  if (!consent.checked) {
    consent.closest('.form-control').classList.add('error');
    isValid = false;
  }
  
  if (isValid) {
    const toast = document.getElementById('success-toast');
    toast.classList.remove('hidden');
    form.reset();
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 5000);
  }
});

// Add click listeners to radio controls for better UX
document.querySelectorAll('.radio-control').forEach(control => {
  control.addEventListener('click', () => {
    control.querySelector('input').click();
  });
});
