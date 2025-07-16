// Données pour les cartes principales et les aperçus
const mainCardsData = [
  { platform: "facebook", username: "@nathanf", followers: "1987", today: 12 },
  { platform: "twitter", username: "@nathanf", followers: "1044", today: 99 },
  { platform: "instagram", username: "@realnathanf", followers: "11k", today: 1099 },
  { platform: "youtube", username: "Nathan F.", followers: "8239", today: -144 },
];

const overviewCardsData = [
  { title: "Page Views", platform: "facebook", views: 87, change: 3 },
  { title: "Likes", platform: "facebook", views: 52, change: -2 },
  { title: "Likes", platform: "instagram", views: 5462, change: 2257 },
  { title: "Profile Views", platform: "instagram", views: "52k", change: 1375 },
  { title: "Retweets", platform: "twitter", views: 117, change: 303 },
  { title: "Likes", platform: "twitter", views: 507, change: 553 },
  { title: "Likes", platform: "youtube", views: 107, change: -19 },
  { title: "Total Views", platform: "youtube", views: 1407, change: -12 },
];

// Fonction pour créer une carte
function createCard(data, isOverview = false) {
  const card = document.createElement("div");
  card.className = "card";

  if (isOverview) {
    card.innerHTML = `
      <h3>${data.title}</h3>
      <p class="followers">${data.views}</p>
      <p class="today ${data.change < 0 ? "negative" : ""}">
        ${data.change < 0 ? "↓" : "↑"} ${Math.abs(data.change)}%
      </p>
    `;
  } else {
    card.innerHTML = `
      <h3>${data.platform}</h3>
      <p class="followers">${data.followers}</p>
      <p class="today ${data.today < 0 ? "negative" : ""}">
        ${data.today < 0 ? "↓" : "↑"} ${Math.abs(data.today)} Today
      </p>
    `;
  }

  return card;
}

// Insérer les cartes dans le DOM
const mainCardsContainer = document.getElementById("main-cards");
mainCardsData.forEach((data) => {
  mainCardsContainer.appendChild(createCard(data));
});

const overviewCardsContainer = document.getElementById("overview-cards");
overviewCardsData.forEach((data) => {
  overviewCardsContainer.appendChild(createCard(data, true));
});

// Gestion du mode sombre
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});