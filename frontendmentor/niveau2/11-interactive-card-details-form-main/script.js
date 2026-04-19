document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('card-form');
  const completedState = document.getElementById('completed-state');
  const continueBtn = document.getElementById('continue-btn');

  // Input elements
  const nameInput = document.getElementById('cardholder-name');
  const numberInput = document.getElementById('card-number');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const cvcInput = document.getElementById('cvc');

  // Display elements
  const displayName = document.getElementById('display-name');
  const displayNumber = document.getElementById('display-number');
  const displayDate = document.getElementById('display-date');
  const displayCvc = document.getElementById('display-cvc');

  // Helper to show/hide errors
  const setError = (input, message, show) => {
    const errorMsg = input.closest('.form__group').querySelector('.error-msg');
    if (show) {
      input.classList.add('error');
      errorMsg.textContent = message;
      errorMsg.classList.remove('hidden');
    } else {
      input.classList.remove('error');
      errorMsg.classList.add('hidden');
    }
  };

  // Live updates
  nameInput.addEventListener('input', (e) => {
    displayName.textContent = e.target.value || 'Jane Appleseed';
  });

  numberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formattedValue += ' ';
      formattedValue += value[i];
    }
    e.target.value = formattedValue;
    displayNumber.textContent = formattedValue || '0000 0000 0000 0000';
  });

  const updateDate = () => {
    const mm = monthInput.value.padStart(2, '0');
    const yy = yearInput.value.padStart(2, '0');
    displayDate.textContent = `${mm === '00' ? '00' : mm}/${yy === '00' ? '00' : yy}`;
  };

  monthInput.addEventListener('input', updateDate);
  yearInput.addEventListener('input', updateDate);

  cvcInput.addEventListener('input', (e) => {
    displayCvc.textContent = e.target.value || '000';
  });

  // Validation on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, "Can't be blank", true);
      isValid = false;
    } else {
      setError(nameInput, "", false);
    }

    // Validate Number
    const rawNumber = numberInput.value.replace(/\s+/g, '');
    if (!rawNumber) {
      setError(numberInput, "Can't be blank", true);
      isValid = false;
    } else if (!/^\d+$/.test(rawNumber)) {
      setError(numberInput, "Wrong format, numbers only", true);
      isValid = false;
    } else if (rawNumber.length < 16) {
      setError(numberInput, "Card number too short", true);
      isValid = false;
    } else {
      setError(numberInput, "", false);
    }

    // Validate Date
    if (!monthInput.value.trim() || !yearInput.value.trim()) {
      setError(monthInput, "Can't be blank", true);
      isValid = false;
    } else if (isNaN(monthInput.value) || isNaN(yearInput.value)) {
      setError(monthInput, "Numbers only", true);
      isValid = false;
    } else if (parseInt(monthInput.value) < 1 || parseInt(monthInput.value) > 12) {
      setError(monthInput, "Invalid month", true);
      isValid = false;
    } else {
      setError(monthInput, "", false);
    }

    // Validate CVC
    if (!cvcInput.value.trim()) {
      setError(cvcInput, "Can't be blank", true);
      isValid = false;
    } else if (isNaN(cvcInput.value)) {
      setError(cvcInput, "Numbers only", true);
      isValid = false;
    } else if (cvcInput.value.length < 3) {
      setError(cvcInput, "CVC too short", true);
      isValid = false;
    } else {
      setError(cvcInput, "", false);
    }

    if (isValid) {
      form.classList.add('hidden');
      completedState.classList.remove('hidden');
    }
  });

  continueBtn.addEventListener('click', () => {
    location.reload();
  });
});
