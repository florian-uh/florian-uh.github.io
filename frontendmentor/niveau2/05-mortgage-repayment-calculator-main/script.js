document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mortgage-form');
  const clearAllBtn = document.getElementById('clear-all');
  const emptyResults = document.getElementById('empty-results');
  const completedResults = document.getElementById('completed-results');
  const monthlyRepaymentDisplay = document.getElementById('monthly-repayment');
  const totalRepaymentDisplay = document.getElementById('total-repayment');

  const inputs = form.querySelectorAll('input[type="text"]');
  const radioInputs = form.querySelectorAll('input[type="radio"]');

  // Clear all functionality
  clearAllBtn.addEventListener('click', () => {
    form.reset();
    resetErrors();
    showEmptyResults();
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrors();

    if (validateForm()) {
      calculateResults();
    }
  });

  // Real-time validation/styling for inputs
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      // Allow only numbers and decimal point
      let value = e.target.value.replace(/[^0-9.]/g, '');
      
      // Prevent multiple decimal points
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      
      e.target.value = value;
    });

    input.addEventListener('focus', () => {
      input.closest('.form-group').classList.remove('has-error');
      input.closest('.input-wrapper').classList.remove('error');
    });
  });

  function validateForm() {
    let isValid = true;

    // Validate text inputs
    inputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      const inputWrapper = input.closest('.input-wrapper');
      
      if (!input.value || isNaN(parseFloat(input.value))) {
        formGroup.classList.add('has-error');
        inputWrapper.classList.add('error');
        isValid = false;
      }
    });

    // Validate radio buttons
    const mortgageType = form.querySelector('input[name="type"]:checked');
    if (!mortgageType) {
      document.querySelector('.radio-group').closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    return isValid;
  }

  function resetErrors() {
    const errorGroups = form.querySelectorAll('.form-group.has-error');
    errorGroups.forEach(group => group.classList.remove('has-error'));
    
    const errorWrappers = form.querySelectorAll('.input-wrapper.error');
    errorWrappers.forEach(wrapper => wrapper.classList.remove('error'));
  }

  function calculateResults() {
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const type = form.querySelector('input[name="type"]:checked').value;

    let monthlyRepayment;
    let totalRepayment;

    if (type === 'repayment') {
      const monthlyRate = rate / 12;
      const numberOfPayments = term * 12;
      
      if (monthlyRate === 0) {
        monthlyRepayment = amount / numberOfPayments;
      } else {
        monthlyRepayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
      totalRepayment = monthlyRepayment * numberOfPayments;
    } else {
      // Interest Only
      const annualInterest = amount * rate;
      monthlyRepayment = annualInterest / 12;
      totalRepayment = annualInterest * term + amount; // Total repay is interest + principal at the end
    }

    displayResults(monthlyRepayment, totalRepayment);
  }

  function displayResults(monthly, total) {
    monthlyRepaymentDisplay.textContent = formatCurrency(monthly);
    totalRepaymentDisplay.textContent = formatCurrency(total);
    
    emptyResults.classList.add('hidden');
    completedResults.classList.remove('hidden');
    
    // Smooth scroll to results on mobile
    if (window.innerWidth <= 768) {
      completedResults.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showEmptyResults() {
    emptyResults.classList.remove('hidden');
    completedResults.classList.add('hidden');
  }

  function formatCurrency(num) {
    return '£' + num.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
});
