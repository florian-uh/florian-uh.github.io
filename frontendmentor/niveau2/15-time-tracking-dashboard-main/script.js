const data = {
    daily: [
        { id: "work", current: 5, previous: 7 },
        { id: "play", current: 1, previous: 2 },
        { id: "study", current: 0, previous: 1 },
        { id: "exercice", current: 1, previous: 1 },
        { id: "social", current: 1, previous: 3 },
        { id: "selfcare", current: 0, previous: 1 },
    ],
    weekly: [
        { id: "work", current: 32, previous: 36 },
        { id: "play", current: 10, previous: 8 },
        { id: "study", current: 4, previous: 7 },
        { id: "exercice", current: 4, previous: 5 },
        { id: "social", current: 5, previous: 10 },
        { id: "selfcare", current: 2, previous: 2 },
    ],
    monthly: [
        { id: "work", current: 103, previous: 128 },
        { id: "play", current: 23, previous: 29 },
        { id: "study", current: 13, previous: 19 },
        { id: "exercice", current: 11, previous: 18 },
        { id: "social", current: 21, previous: 23 },
        { id: "selfcare", current: 7, previous: 11 },
    ],
};

const menuItems = document.querySelectorAll("#menu li");
const cards = document.querySelectorAll(".card");

// Function to update the cards based on the selected timeframe
function updateCards(timeframe) {
    const timeframeData = data[timeframe];

    timeframeData.forEach((entry) => {
        const card = document.getElementById(entry.id);
        const display = card.querySelector(".display");

        // Update current and previous hours
        display.innerHTML = `
            <h3>${entry.current}hrs</h3>
            <p>Last ${timeframe === "daily" ? "Day" : timeframe === "weekly" ? "Week" : "Month"} - ${entry.previous}hrs</p>
        `;
    });
}

// Add click event listeners to menu items
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Remove active class from all menu items
        menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        // Add active class to the clicked item
        item.classList.add("active");

        // Update the cards based on the selected timeframe
        const timeframe = item.id; // "daily", "weekly", or "monthly"
        updateCards(timeframe);
    });
});

// Add click event listeners to ellipses
cards.forEach((card) => {
    const ellipse = card.querySelector("img[alt='icon-ellipsis']");
    ellipse.addEventListener("click", () => {
        // Toggle between timeframes (daily -> weekly -> monthly)
        const currentActive = document.querySelector("#menu li.active");
        const nextTimeframe =
            currentActive.id === "daily"
                ? "weekly"
                : currentActive.id === "weekly"
                ? "monthly"
                : "daily";

        // Update the active menu item
        menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        document.getElementById(nextTimeframe).classList.add("active");

        // Update the cards
        updateCards(nextTimeframe);
    });
});

// Set default view to "Weekly"
document.getElementById("weekly").click();
