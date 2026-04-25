const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slides = document.querySelectorAll('.slide');
const contentItems = document.querySelectorAll('.content-item');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

let currentIndex = 0;

function updateSlider(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    contentItems.forEach(item => item.classList.remove('active'));
    
    slides[index].classList.add('active');
    contentItems[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    updateSlider(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    updateSlider(currentIndex);
});

// Mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.add('active');
    overlay.classList.add('active');
});

const closeMenu = () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
};

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});
