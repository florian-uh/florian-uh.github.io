const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}


function changeTabPanel(e) {
    const targetTab = e.target;
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    const type = targetTab.dataset.type; // destination, crew, technology
    const value = targetTab.dataset.value;

    updateData(type, value);
}

async function updateData(type, value) {
    const response = await fetch('data.json');
    const data = await response.json();
    
    let item;
    if (type === 'destination') {
        item = data.destinations.find(d => d.name === value);
        updateDestinationUI(item);
    } else if (type === 'crew') {
        item = data.crew.find(c => c.name === value);
        updateCrewUI(item);
    } else if (type === 'technology') {
        item = data.technology.find(t => t.name === value);
        updateTechnologyUI(item);
    }
}

function updateDestinationUI(destination) {
    if (!destination) return;
    document.getElementById('destination-name').innerText = destination.name;
    document.getElementById('destination-description').innerText = destination.description;
    document.getElementById('destination-distance').innerText = destination.distance;
    document.getElementById('destination-travel').innerText = destination.travel;
    
    const picture = document.getElementById('destination-image');
    picture.querySelector('source').srcset = destination.images.webp;
    picture.querySelector('img').src = destination.images.png;
    picture.querySelector('img').alt = `the ${destination.name}`;
}

function updateCrewUI(crew) {
    if (!crew) return;
    document.getElementById('crew-role').innerText = crew.role;
    document.getElementById('crew-name').innerText = crew.name;
    document.getElementById('crew-bio').innerText = crew.bio;
    
    const picture = document.getElementById('crew-image');
    picture.querySelector('source').srcset = crew.images.webp;
    picture.querySelector('img').src = crew.images.png;
    picture.querySelector('img').alt = crew.name;
}

function updateTechnologyUI(tech) {
    if (!tech) return;
    document.getElementById('tech-name').innerText = tech.name;
    document.getElementById('tech-description').innerText = tech.description;
    
    const picture = document.getElementById('tech-image');
    // Technology uses portrait/landscape instead of webp/png in data.json
    picture.querySelector('source').srcset = tech.images.landscape;
    picture.querySelector('img').src = tech.images.portrait;
    picture.querySelector('img').alt = tech.name;
}
