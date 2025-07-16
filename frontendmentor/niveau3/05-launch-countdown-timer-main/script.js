let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("secondes");

let daysTop = document.getElementById("days-top");
let daysBottom = document.getElementById("days-bottom");
let hoursTop = document.getElementById("hours-top");
let hoursBottom = document.getElementById("hours-bottom");
let minutesTop = document.getElementById("minutes-top");
let minutesBottom = document.getElementById("minutes-bottom");
let secondsTop = document.getElementById("seconds-top");
let secondsBottom = document.getElementById("seconds-bottom");

function updateCountdown() {
    const now = new Date();
    const launchDate = new Date("2025-05-15T00:00:00");
    const diff = launchDate - now;

    if (diff <= 0) {
        clearInterval(interval);
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    animateFlip(daysTop, daysBottom, d);
    animateFlip(hoursTop, hoursBottom, h);
    animateFlip(minutesTop, minutesBottom, m);
    animateFlip(secondsTop, secondsBottom, s);
}

function animateFlip(topElement, bottomElement, newValue) {
    const currentValue = topElement.textContent;

    if (currentValue !== String(newValue)) {
        topElement.textContent = newValue;
        bottomElement.textContent = newValue;

        const parent = topElement.parentElement;
        parent.classList.remove("animate");
        void parent.offsetWidth; // Trigger reflow
        parent.classList.add("animate");
    }
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

