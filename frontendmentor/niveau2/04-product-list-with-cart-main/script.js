let products = [];
let cart = [];

const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartEmpty = document.getElementById('cart-empty');
const cartContent = document.getElementById('cart-content');
const cartItems = document.getElementById('cart-items');
const orderTotal = document.getElementById('order-total');
const confirmOrderBtn = document.getElementById('confirm-order');
const modalOverlay = document.getElementById('modal-overlay');
const confirmedItems = document.getElementById('confirmed-items');
const modalTotal = document.getElementById('modal-total');
const newOrderBtn = document.getElementById('new-order');

// Fetch products from data.json
async function fetchProducts() {
  try {
    const response = await fetch('./data.json');
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function renderProducts() {
  productsGrid.innerHTML = products.map((product, index) => {
    const cartItem = cart.find(item => item.name === product.name);
    const quantity = cartItem ? cartItem.quantity : 0;

    return `
      <div class="product-card ${quantity > 0 ? 'product-card--active' : ''}">
        <div class="product-card__image-container">
          <picture>
            <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
            <source media="(min-width: 768px)" srcset="${product.image.tablet}">
            <img src="${product.image.mobile}" alt="${product.name}" class="product-card__image">
          </picture>
          <div class="product-card__btn-container">
            ${quantity === 0 ? `
              <button class="btn-add-cart" data-index="${index}">
                <img src="./assets/images/icon-add-to-cart.svg" alt="">
                Add to Cart
              </button>
            ` : `
              <div class="btn-quantity">
                <button class="qty-control" data-name="${product.name}" data-action="decrease">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                </button>
                <span>${quantity}</span>
                <button class="qty-control" data-name="${product.name}" data-action="increase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </button>
              </div>
            `}
          </div>
        </div>
        <div class="product-card__info">
          <p class="product-card__category">${product.category}</p>
          <h2 class="product-card__name">${product.name}</h2>
          <p class="product-card__price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Add event listeners for product interactions
productsGrid.addEventListener('click', (e) => {
  const target = e.target.closest('button');
  if (!target) return;

  if (target.classList.contains('btn-add-cart')) {
    const index = target.dataset.index;
    addToCart(index);
  } else if (target.classList.contains('qty-control')) {
    const name = target.dataset.name;
    const action = target.dataset.action;
    const delta = action === 'increase' ? 1 : -1;
    updateQuantity(name, delta);
  }
});

// Add event listener for cart remove buttons
cartItems.addEventListener('click', (e) => {
  const target = e.target.closest('button');
  if (target && target.classList.contains('btn-remove')) {
    const name = target.dataset.name;
    removeFromCart(name);
  }
});

function addToCart(index) {
  const product = products[index];
  cart.push({
    ...product,
    quantity: 1
  });
  updateUI();
}

function updateQuantity(name, change) {
  const cartItem = cart.find(item => item.name === name);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart = cart.filter(item => item.name !== name);
    }
  }
  updateUI();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateUI();
}

function updateUI() {
  renderProducts();
  renderCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (totalItems > 0) {
    cartEmpty.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    cartEmpty.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  orderTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function renderCart() {
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__details">
        <h3>${item.name}</h3>
        <div class="cart-item__prices">
          <span class="cart-item__qty">${item.quantity}x</span>
          <span class="cart-item__unit-price">@ $${item.price.toFixed(2)}</span>
          <span class="cart-item__total-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button class="btn-remove" data-name="${item.name}">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
      </button>
    </div>
  `).join('');
}

confirmOrderBtn.addEventListener('click', () => {
  renderConfirmation();
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

function renderConfirmation() {
  confirmedItems.innerHTML = cart.map(item => `
    <div class="order-summary__item">
      <div class="order-summary__item-details">
        <img src="${item.image.thumbnail}" alt="" class="order-summary__img">
        <div class="order-summary__info">
          <h3>${item.name}</h3>
          <div class="order-summary__prices">
            <span class="order-summary__qty">${item.quantity}x</span>
            <span class="order-summary__unit-price">@ $${item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <span class="order-summary__item-total">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  modalTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

newOrderBtn.addEventListener('click', () => {
  cart = [];
  updateUI();
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

fetchProducts();
