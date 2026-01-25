// NAVIGATION & ROUTING

// NAVIGATION HANDLER
function handleNavigation() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('p') || 'home';
    const hub = getHubFromPath(path);

    applyHubStyles(hub);
    loadLocalNavigation(hub);
    loadContent(path);
}

// Listen for back/forward buttons
window.addEventListener('popstate', handleNavigation);

// Handle clicks on navigation links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="?"]')) {
        e.preventDefault();
        const url = new URL(e.target.href);
        window.history.pushState({}, '', url);
        handleNavigation();
    }
});

// Déterminer le hub à partir du chemin ?p=...
function getHubFromPath(path) {
    if (!path) return null;
    const parts = path.split('/');
    if (parts.length >= 2 && parts[0] === 'content') {
        return parts[1];
    }
    return null;
}

// SYSTÈME DE NAVIGATION DYNAMIQUE

async function initNavigation() {
    try {
        const response = await fetch('/nav.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const navData = await response.json();
        
        // Générer le HTML de navigation
        const navMenu = document.getElementById('nav-menu');
        navMenu.innerHTML = generateNavHTML(navData);
        
        setupNavigationEvents();
        
    } catch (error) {
        console.error('Erreur lors du chargement de la navigation:', error);
        // Fallback navigation statique
        document.getElementById('nav-menu').innerHTML = `
            <div class="nav-item"><a href="?p=about" class="nav-link">À propos</a></div>
        `;
    }
}

// GÉNÉRATION HTML DE NAVIGATION
function generateNavHTML(navItems) {
    return navItems.map(item => {
        if (item.dropdown) {
            return `
                <div class="nav-item has-dropdown">
                    <a href="${item.href || '#'}" class="nav-link">${item.label}</a>
                    <div class="dropdown-menu">
                        ${generateDropdownHTML(item.dropdown)}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="nav-item">
                    <a href="${item.href}" class="nav-link">${item.label}</a>
                </div>
            `;
        }
    }).join('');
}

// GÉNÉRATION HTML DES DROPDOWNS
function generateDropdownHTML(dropdownItems) {
    return dropdownItems.map(item => {
        if (item.dropdown) {
            return `
                <div class="dropdown-item has-dropdown">
                    <a href="${item.href || '#'}">${item.label}</a>
                    <div class="dropdown-menu">
                        ${generateDropdownHTML(item.dropdown)}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="dropdown-item">
                    <a href="${item.href}">${item.label}</a>
                </div>
            `;
        }
    }).join('');
}

// ÉVÉNEMENTS DE NAVIGATION
function setupNavigationEvents() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    if (window.innerWidth <= 768) {
        setupMobileDropdowns();
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            setupMobileDropdowns();
        } else {
            cleanupMobileDropdowns();
        }
    });
    
    // Fermer le menu mobile en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// NAVIGATION LOCALE PAR HUB
async function loadLocalNavigation(hub) {
    const container = document.getElementById('local-nav');
    if (!container) return;

    if (!hub) {
        container.innerHTML = '';
        container.classList.remove('visible');
        document.body.classList.remove('has-local-nav');
        return;
    }

    try {
        const response = await fetch(`/content/${hub}/nav.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const navData = await response.json();
        const innerHtml = generateNavHTML(navData);
        container.innerHTML = `<div class="local-nav-menu">${innerHtml}</div>`;
        container.classList.add('visible');
        document.body.classList.add('has-local-nav');
    } catch (error) {
        console.warn(`Navigation locale indisponible pour le hub ${hub}:`, error);
        container.innerHTML = '';
        container.classList.remove('visible');
        document.body.classList.remove('has-local-nav');
    }
}

// STYLE SPÉCIFIQUE AU HUB
function applyHubStyles(hub) {
    const hubLink = document.getElementById('hub-style');
    if (!hubLink) return;

    if (!hub) {
        hubLink.removeAttribute('href');
        document.body.removeAttribute('data-hub');
        return;
    }

    const href = `assets/css/hub-${hub}.css`;
    hubLink.setAttribute('href', href);
    document.body.setAttribute('data-hub', hub);
}

function setupMobileDropdowns() {
    const hasDropdownItems = document.querySelectorAll('.nav-item.has-dropdown, .dropdown-item.has-dropdown');
    
    hasDropdownItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        
        link.replaceWith(link.cloneNode(true));
        const newLink = item.querySelector(':scope > a');
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('expanded');
            
            if (newLink.getAttribute('href') !== '#' && !item.classList.contains('expanded')) {
                setTimeout(() => {
                    window.location.href = newLink.getAttribute('href');
                }, 100);
            }
        });
    });
}

function cleanupMobileDropdowns() {
    const expandedItems = document.querySelectorAll('.nav-item.expanded, .dropdown-item.expanded');
    expandedItems.forEach(item => {
        item.classList.remove('expanded');
    });
}
