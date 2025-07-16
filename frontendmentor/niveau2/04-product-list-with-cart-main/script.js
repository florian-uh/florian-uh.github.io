document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les produits (cartes) et les éléments du panier
  const productList = document.querySelectorAll(".card");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const orderTotal = document.getElementById("order-total");

  // Objet pour stocker les produits ajoutés au panier
  let cart = {};

  // Parcourt chaque carte produit
  productList.forEach((card) => {
    const addToCartButton = card.querySelector(".btn-ajout"); // Bouton "Add to cart"
    const quantityContainer = card.querySelector(".quantite"); // Conteneur des boutons de quantité
    const decrementButton = card.querySelector(".btn-moins, .moins"); // Bouton pour diminuer la quantité
    const incrementButton = card.querySelector(".btn-plus, .plus"); // Bouton pour augmenter la quantité
    const quantityDisplay = quantityContainer.querySelector("span"); // Affichage de la quantité
    const priceElement = card.querySelector("#prix"); // Prix du produit
    const productName = card.querySelector("h3").textContent.trim(); // Nom du produit
    const productPrice = parseFloat(priceElement.textContent.replace("$", "").trim()); // Prix en tant que nombre

    // Cache les contrôles de quantité au départ
    quantityContainer.style.display = "none";

    // Événement pour ajouter un produit au panier
    addToCartButton.addEventListener("click", () => {
      quantityContainer.style.display = "flex"; // Affiche les contrôles de quantité
      updateCart(productName, productPrice, 1); // Ajoute 1 produit au panier
      quantityDisplay.textContent = "1"; // Met à jour l'affichage de la quantité
    });

    // Événement pour augmenter la quantité
    incrementButton.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityDisplay.textContent); // Quantité actuelle
      const newQuantity = currentQuantity + 1; // Nouvelle quantité
      quantityDisplay.textContent = newQuantity; // Met à jour l'affichage
      updateCart(productName, productPrice, newQuantity); // Met à jour le panier
    });

    // Événement pour diminuer la quantité
    decrementButton.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityDisplay.textContent); // Quantité actuelle
      if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1; // Diminue la quantité
        quantityDisplay.textContent = newQuantity; // Met à jour l'affichage
        updateCart(productName, productPrice, newQuantity); // Met à jour le panier
      } else {
        // Si la quantité atteint 0, retire le produit du panier
        quantityContainer.style.display = "none"; // Cache les contrôles de quantité
        quantityDisplay.textContent = "0"; // Réinitialise l'affichage
        updateCart(productName, productPrice, 0); // Supprime le produit du panier
      }
    });
  });

  // Fonction pour mettre à jour le panier
  function updateCart(productName, productPrice, quantity) {
    if (quantity > 0) {
      // Ajoute ou met à jour le produit dans le panier
      cart[productName] = { price: productPrice, quantity: quantity };
    } else {
      // Supprime le produit du panier si la quantité est 0
      delete cart[productName];
    }

    renderCart(); // Met à jour l'affichage du panier
  }

  // Fonction pour afficher le contenu du panier
  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Vide l'affichage actuel du panier
    let totalItems = 0; // Compteur pour le nombre total d'articles
    let totalPrice = 0; // Total du prix

    // Parcourt chaque produit dans le panier
    for (const [productName, productDetails] of Object.entries(cart)) {
      const { price, quantity } = productDetails;
      totalItems += quantity; // Ajoute la quantité au total
      totalPrice += price * quantity; // Calcule le prix total

      // Crée un élément pour afficher le produit dans le panier
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p>${productName} x${quantity}</p>
        <p>$${(price * quantity).toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(cartItem); // Ajoute l'élément au conteneur du panier
    }

    // Met à jour le compteur d'articles et le prix total
    cartCount.textContent = totalItems;
    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;

    // Affiche un message si le panier est vide
    if (totalItems === 0) {
      cartItemsContainer.innerHTML = `
        <img src="assets/images/illustration-empty-cart.svg" alt="illustration-empty-cart">
        <p>Your added items will appear here</p>
      `;
    }
  }
});