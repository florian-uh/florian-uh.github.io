const steps = document.querySelectorAll(".step");
const forms = document.querySelectorAll(".form-step");
const nextButtons = document.querySelectorAll(".next-step");
const prevButtons = document.querySelectorAll(".prev-step");

let currentStep = 1;

function showStep(step) {
  forms.forEach((form) => form.classList.remove("active"));
  steps.forEach((stepEl) => stepEl.classList.remove("active"));

  document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active");
  document.querySelector(`.step[data-step="${step}"]`).classList.add("active");
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStep++;
    showStep(currentStep);
  });
});

prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
  });
});

// Initialize the first step
showStep(currentStep);