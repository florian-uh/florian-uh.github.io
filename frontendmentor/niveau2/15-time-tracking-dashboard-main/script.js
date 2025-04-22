// Sélectionne tous les éléments de menu (Daily, Weekly, Monthly) dans le DOM
const menuItems = document.querySelectorAll("#menu li");

// Sélectionne toutes les cartes (Work, Play, Study, etc.) dans le DOM
const cards = document.querySelectorAll(".card");

// Fonction pour mettre à jour les cartes avec les données JSON
function updateCards(timeframe) {
    // Récupère les données correspondant au "timeframe" sélectionné (daily, weekly, monthly)
    const timeframeData = data[timeframe];

    // Parcourt chaque entrée des données pour mettre à jour les cartes
    timeframeData.forEach((entry) => {
        // Sélectionne la carte correspondante en fonction de l'ID
        const card = document.getElementById(entry.id);
        // Sélectionne l'élément où les données seront affichées
        const display = card.querySelector(".display");

        // Met à jour le contenu HTML de la carte avec les heures actuelles et précédentes
        display.innerHTML = `
            <h3>${entry.current}hrs</h3>
            <p>Last ${timeframe === "daily" ? "Day" : timeframe === "weekly" ? "Week" : "Month"} - ${entry.previous}hrs</p>
        `;
    });
}

// Ajoute des écouteurs d'événements "click" à chaque élément de menu
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Supprime la classe "active" de tous les éléments de menu
        menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        // Ajoute la classe "active" à l'élément cliqué
        item.classList.add("active");

        // Met à jour les cartes en fonction du "timeframe" sélectionné (daily, weekly, monthly)
        const timeframe = item.id; // Récupère l'ID de l'élément cliqué
        updateCards(timeframe);
    });
});

// Ajoute des écouteurs d'événements "click" aux ellipses (icônes de menu) dans chaque carte
cards.forEach((card) => {
    // Sélectionne l'icône ellipse dans la carte
    const ellipse = card.querySelector("img[alt='icon-ellipsis']");
    ellipse.addEventListener("click", () => {
        // Récupère l'élément de menu actuellement actif
        const currentActive = document.querySelector("#menu li.active");
        // Détermine le prochain "timeframe" à afficher (daily -> weekly -> monthly -> daily)
        const nextTimeframe =
            currentActive.id === "daily"
                ? "weekly"
                : currentActive.id === "weekly"
                ? "monthly"
                : "daily";

        // Met à jour l'état actif dans le menu
        menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        document.getElementById(nextTimeframe).classList.add("active");

        // Met à jour les cartes avec le nouveau "timeframe"
        updateCards(nextTimeframe);
    });
});

// Initialise l'affichage par défaut en sélectionnant "weekly"
document.getElementById("weekly").click();
