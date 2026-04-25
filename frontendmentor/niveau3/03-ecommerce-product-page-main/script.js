const mainImg = document.querySelector('.main-img');
const thumbnails = document.querySelectorAll('.gallery .thumb');
const lightbox = document.querySelector('.lightbox');
const lightboxMainImg = document.querySelector('.lightbox-main-img img');
const lightboxThumbnails = document.querySelectorAll('.lightbox .thumb');
const closeLightbox = document.querySelector('.close-lightbox');

const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('.cart-modal');
const cartContent = document.querySelector('.cart-content');
const cartCount = document.querySelector('.cart-count');

const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const quantityDisplay = document.querySelector('.quantity-selector span');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

const menuBtn = document.querySelector('.menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

const prevBtn = document.querySelector('.main-img-container .prev-btn');
const nextBtn = document.querySelector('.main-img-container .next-btn');
const lbPrevBtn = document.querySelector('.lightbox .prev-btn');
const lbNextBtn = document.querySelector('.lightbox .next-btn');

let currentQuantity = 0;
let cartItems = 0;
let currentImgIndex = 1;

const product = {
    name: "Fall Limited Edition Sneakers",
    price: 125.00,
    image: "./images/image-product-1-thumbnail.jpg"
};

// Gallery Logic
function updateGallery(index, isLightbox = false) {
    currentImgIndex = index;
    const imgPath = `./images/image-product-${index}.jpg`;
    
    if (isLightbox) {
        lightboxMainImg.src = imgPath;
        lightboxThumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i + 1 === index);
        });
    } else {
        mainImg.src = imgPath;
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i + 1 === index);
        });
    }
}

thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateGallery(i + 1));
});

lightboxThumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateGallery(i + 1, true));
});

mainImg.addEventListener('click', () => {
    if (window.innerWidth > 900) {
        updateGallery(currentImgIndex, true);
        lightbox.classList.add('active');
    }
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Navigation Buttons
function nextImg(isLightbox = false) {
    let nextIndex = currentImgIndex + 1;
    if (nextIndex > 4) nextIndex = 1;
    updateGallery(nextIndex, isLightbox);
}

function prevImg(isLightbox = false) {
    let prevIndex = currentImgIndex - 1;
    if (prevIndex < 1) prevIndex = 4;
    updateGallery(prevIndex, isLightbox);
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImg();
});
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImg();
});
lbNextBtn.addEventListener('click', () => nextImg(true));
lbPrevBtn.addEventListener('click', () => prevImg(true));

// Quantity Logic
minusBtn.addEventListener('click', () => {
    if (currentQuantity > 0) {
        currentQuantity--;
        quantityDisplay.innerText = currentQuantity;
    }
});

plusBtn.addEventListener('click', () => {
    currentQuantity++;
    quantityDisplay.innerText = currentQuantity;
});

// Cart Logic
cartBtn.addEventListener('click', () => {
    cartModal.classList.toggle('active');
});

function updateCartUI() {
    if (cartItems === 0) {
        cartContent.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        cartCount.style.display = 'none';
    } else {
        cartCount.innerText = cartItems;
        cartCount.style.display = 'block';
        
        cartContent.innerHTML = `
            <div class="cart-item">
                <img src="${product.image}" alt="">
                <div class="cart-item-info">
                    <p class="cart-item-title">${product.name}</p>
                    <p class="cart-item-price">$${product.price.toFixed(2)} x ${cartItems} <span class="total">$${(product.price * cartItems).toFixed(2)}</span></p>
                </div>
                <button class="delete-btn"><img src="./images/icon-delete.svg" alt="delete"></button>
            </div>
            <button class="checkout-btn">Checkout</button>
        `;
        
        const deleteBtn = cartContent.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            cartItems = 0;
            updateCartUI();
        });
    }
}

addToCartBtn.addEventListener('click', () => {
    if (currentQuantity > 0) {
        cartItems += currentQuantity;
        currentQuantity = 0;
        quantityDisplay.innerText = currentQuantity;
        updateCartUI();
    }
});

// Mobile Menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.add('active');
    overlay.classList.add('active');
});

const closeMenu = () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
};

closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Initial Cart UI
updateCartUI();
