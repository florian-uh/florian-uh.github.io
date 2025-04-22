// Charger les données JSON dynamiquement
async function fetchProducts() {
  try {
    // Effectuer une requête pour récupérer le fichier JSON contenant les produits
    const response = await fetch('./data.json'); // Charger le fichier JSON
    const products = await response.json(); // Convertir la réponse en objet JavaScript
    renderProducts(products); // Appeler la fonction pour générer les cartes des produits
  } catch (error) {
    // Gérer les erreurs en cas de problème lors du chargement des données
    console.error('Erreur lors du chargement des produits :', error);
  }
}

// Sélectionner les éléments HTML nécessaires pour manipuler le DOM
const productList = document.getElementById('product-list'); // Conteneur pour afficher les cartes des produits
const cartItems = document.getElementById('cart-items'); // Conteneur pour afficher les articles du panier
const cartCount = document.getElementById('cart-count'); // Élément pour afficher le nombre total d'articles dans le panier
const orderTotal = document.getElementById('order-total'); // Élément pour afficher le total de la commande

// Initialiser le panier comme un tableau vide
let cart = [];

// Générer les cartes des produits
function renderProducts(products) {
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Ajouter le contenu HTML de la carte avec les boutons "Add" et "Remove"
    productCard.innerHTML = `
      <img src="${product.image.thumbnail}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p>$${product.price.toFixed(2)}</p>
      <div class="product-actions">
        <button class="add-btn" data-name="${product.name}" data-price="${product.price}">Add</button>
        <button class="remove-btn" data-name="${product.name}">Remove</button>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// Mettre à jour l'affichage du panier
function updateCart() {
  // Réinitialiser le contenu du conteneur des articles du panier
  cartItems.innerHTML = '';
  let total = 0; // Initialiser le total de la commande à 0

  // Parcourir chaque article dans le panier
  cart.forEach(item => {
    // Créer un élément div pour représenter un article dans le panier
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item'); // Ajouter une classe CSS pour le style

    // Ajouter le contenu HTML de l'article, incluant le nom, la quantité, le prix total et un bouton pour supprimer
    cartItem.innerHTML = `
      <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p> <!-- Nom, quantité et prix total -->
      <button data-name="${item.name}">Remove</button> <!-- Bouton pour supprimer l'article -->
    `;

    // Ajouter l'article au conteneur du panier
    cartItems.appendChild(cartItem);

    // Ajouter le prix total de cet article au total général
    total += item.price * item.quantity;
  });

  // Mettre à jour le nombre total d'articles dans le panier
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Mettre à jour le total de la commande
  orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Ajouter un produit au panier
function addToCart(name, price) {
  // Vérifier si le produit existe déjà dans le panier
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    // Si le produit existe, augmenter sa quantité
    existingItem.quantity++;
  } else {
    // Sinon, ajouter un nouvel article avec une quantité initiale de 1
    cart.push({ name, price, quantity: 1 });
  }
  // Mettre à jour l'affichage du panier
  updateCart();
}

// Supprimer un produit du panier
function removeFromCart(name) {
  // Filtrer le panier pour supprimer l'article correspondant au nom donné
  cart = cart.filter(item => item.name !== name);
  // Mettre à jour l'affichage du panier
  updateCart();
}

// Écouter les clics sur les boutons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    // Ajouter un produit au panier
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    addToCart(name, price);
  } else if (e.target.classList.contains('remove-btn')) {
    // Retirer un produit du panier
    const name = e.target.dataset.name;
    removeFromCart(name);
  }
});

// Initialiser l'application en chargeant les produits
fetchProducts();