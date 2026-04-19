const adviceId = document.getElementById('advice-id');
const adviceText = document.getElementById('advice-text');
const diceBtn = document.getElementById('dice-btn');

async function getAdvice() {
  try {
    // Add timestamp to prevent caching
    const response = await fetch(`https://api.adviceslip.com/advice?t=${new Date().getTime()}`);
    const data = await response.json();
    
    adviceId.textContent = data.slip.id;
    adviceText.textContent = data.slip.advice;
  } catch (error) {
    console.error('Error fetching advice:', error);
    adviceText.textContent = "An error occurred. Please try again.";
  }
}

diceBtn.addEventListener('click', getAdvice);

// Load initial advice
getAdvice();
