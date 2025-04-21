const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("custom-tip");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset");

let bill = 0;
let people = 0;
let tipPercentage = 0;

// Update the tip and total amounts
function calculateTip() {
  if (bill > 0 && people > 0 && tipPercentage >= 0) {
    const tipAmount = (bill * (tipPercentage / 100)) / people;
    const totalAmount = (bill / people) + tipAmount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    resetButton.disabled = false;
  }
}

// Event listeners for inputs
billInput.addEventListener("input", () => {
  bill = parseFloat(billInput.value) || 0;
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  people = parseInt(peopleInput.value) || 0;
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercentage = parseInt(button.dataset.tip);
    customTipInput.value = "";
    calculateTip();
  });
});

customTipInput.addEventListener("input", () => {
  tipPercentage = parseFloat(customTipInput.value) || 0;
  calculateTip();
});

// Reset button
resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  resetButton.disabled = true;
  tipPercentage = 0;
  bill = 0;
  people = 0;
});