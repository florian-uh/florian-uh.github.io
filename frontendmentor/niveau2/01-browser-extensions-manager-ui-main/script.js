document.addEventListener('DOMContentLoaded', () => {
    const extensionsGrid = document.getElementById('extensions-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let extensionsData = [];
    let currentFilter = 'all';

    // Load data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            extensionsData = data;
            renderExtensions();
        })
        .catch(error => console.error('Error loading extensions:', error));

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeIcon.src = newTheme === 'dark' ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
    });

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderExtensions();
        });
    });

    function renderExtensions() {
        extensionsGrid.innerHTML = '';
        
        const filteredExtensions = extensionsData.filter(ext => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'active') return ext.isActive;
            if (currentFilter === 'inactive') return !ext.isActive;
            return true;
        });

        filteredExtensions.forEach((ext, index) => {
            const card = document.createElement('div');
            card.className = 'extension-card';
            card.innerHTML = `
                <div class="extension-header">
                    <div class="extension-icon">
                        <img src="${ext.logo}" alt="${ext.name} logo">
                    </div>
                    <div class="extension-info">
                        <h2>${ext.name}</h2>
                        <p>${ext.description}</p>
                    </div>
                </div>
                <div class="extension-footer">
                    <button class="remove-btn" onclick="removeExtension('${ext.name}')">Remove</button>
                    <label class="toggle-switch">
                        <input type="checkbox" ${ext.isActive ? 'checked' : ''} onchange="toggleExtension('${ext.name}')">
                        <span class="slider"></span>
                    </label>
                </div>
            `;
            extensionsGrid.appendChild(card);
        });
    }

    // Window functions for global access (from HTML strings)
    window.toggleExtension = (name) => {
        const ext = extensionsData.find(e => e.name === name);
        if (ext) {
            ext.isActive = !ext.isActive;
            // Re-render if filter is not 'all' to hide/show according to status
            if (currentFilter !== 'all') {
                renderExtensions();
            }
        }
    };

    window.removeExtension = (name) => {
        extensionsData = extensionsData.filter(e => e.name !== name);
        renderExtensions();
    };
});
