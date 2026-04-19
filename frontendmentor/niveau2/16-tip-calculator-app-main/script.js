document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.getElementById('bill');
  const tipBtns = document.querySelectorAll('.btn-tip');
  const customTipInput = document.getElementById('custom-tip');
  const peopleInput = document.getElementById('people');
  const peopleError = document.getElementById('people-error');
  const tipResult = document.getElementById('tip-per-person');
  const totalResult = document.getElementById('total-per-person');
  const resetBtn = document.getElementById('reset-btn');

  let billValue = 0;
  let tipPercentage = 0;
  let peopleValue = 0;

  const calculate = () => {
    if (billValue > 0 && tipPercentage >= 0 && peopleValue > 0) {
      const totalTip = billValue * (tipPercentage / 100);
      const tipPerPerson = totalTip / peopleValue;
      const totalPerPerson = (billValue + totalTip) / peopleValue;

      tipResult.textContent = tipPerPerson.toFixed(2);
      totalResult.textContent = totalPerPerson.toFixed(2);
      resetBtn.disabled = false;
    } else {
      tipResult.textContent = '0.00';
      totalResult.textContent = '0.00';
    }
  };

  billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculate();
  });

  tipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from others
      tipBtns.forEach(b => b.classList.remove('active'));
      customTipInput.value = '';
      
      btn.classList.add('active');
      tipPercentage = parseFloat(btn.getAttribute('data-tip'));
      calculate();
    });
  });

  customTipInput.addEventListener('input', (e) => {
    tipBtns.forEach(b => b.classList.remove('active'));
    tipPercentage = parseFloat(e.target.value) || 0;
    calculate();
  });

  peopleInput.addEventListener('input', (e) => {
    peopleValue = parseInt(e.target.value) || 0;
    if (peopleValue <= 0 && e.target.value !== '') {
      peopleError.classList.remove('hidden');
      peopleInput.classList.add('error');
    } else {
      peopleError.classList.add('hidden');
      peopleInput.classList.remove('error');
    }
    calculate();
  });

  resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipBtns.forEach(b => b.classList.remove('active'));
    
    billValue = 0;
    tipPercentage = 0;
    peopleValue = 0;
    
    tipResult.textContent = '0.00';
    totalResult.textContent = '0.00';
    resetBtn.disabled = true;
    
    peopleError.classList.add('hidden');
    peopleInput.classList.remove('error');
  });
});
