// NAVIGATION & ROUTING

// NAVIGATION HANDLER
function getBasePath() {
    return window.location.pathname.includes('/fr/') ? '/fr/' : '/';
}

function handleNavigation() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('p') || 'home';
    const hub = getHubFromPath(path);

    applyHubStyles(hub);
    loadLocalNavigation(hub);
    loadContent(path);
}

function getCurrentPath() {
    const params = new URLSearchParams(window.location.search);
    return params.get('p') || 'home';
}

function buildEnLink(path) {
    const encodedPath = encodeURIComponent(path);
    return `/index.html?p=${encodedPath}`;
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
        const basePath = getBasePath();
        const response = await fetch(`${basePath}nav.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const navData = await response.json();
        
        // Générer le HTML de navigation
        if (window.innerWidth <= 768) {
            // Sur mobile, injecter dans le panel global
            const mobileGlobalNav = document.getElementById('mobile-global-nav');
            if (mobileGlobalNav) {
                mobileGlobalNav.innerHTML = generateNavHTML(navData);
            }
        } else {
            // Sur desktop, injecter directement dans nav-menu
            const navMenu = document.getElementById('nav-menu');
            navMenu.innerHTML = generateNavHTML(navData);
        }
        
        setupNavigationEvents();
        
    } catch (error) {
        console.error('Erreur lors du chargement de la navigation:', error);
        // Fallback navigation statique
        const target = window.innerWidth <= 768 ? 
            document.getElementById('mobile-global-nav') : 
            document.getElementById('nav-menu');
        if (target) {
            target.innerHTML = `
                <div class="nav-item"><a href="?p=about" class="nav-link">À propos</a></div>
            `;
        }
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
let navigationEventsSetup = false;

function setupNavigationEvents() {
    // Éviter les event listeners dupliqués
    if (navigationEventsSetup) return;
    navigationEventsSetup = true;
    
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && !mobileToggle._clickHandlerAttached) {
        mobileToggle._clickHandlerAttached = true;
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Setup mobile tabs switching
    setupMobileTabs();
    
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

// Setup mobile tabs for switching between global and local nav
function setupMobileTabs() {
    const tabButtons = document.querySelectorAll('.mobile-tab-btn');
    const tabPanels = document.querySelectorAll('.mobile-tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`mobile-${targetTab}-nav`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// NAVIGATION LOCALE PAR HUB
async function loadLocalNavigation(hub) {
    const desktopContainer = document.getElementById('local-nav');
    const mobileContainer = document.getElementById('mobile-local-nav');
    
    if (!hub) {
        if (desktopContainer) {
            desktopContainer.innerHTML = '';
            desktopContainer.classList.remove('visible');
        }
        if (mobileContainer) {
            mobileContainer.innerHTML = '<div class="mobile-no-local-nav">Pas de navigation locale</div>';
        }
        document.body.classList.remove('has-local-nav');
        hideMobileLocalTab();
        return;
    }

    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}content/${hub}/nav.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const navData = await response.json();
        const innerHtml = generateNavHTML(navData);
        const currentPath = getCurrentPath();
        const enLink = buildEnLink(currentPath);
        const langSwitchHtml = `
            <div class="nav-item lang-switch">
                <a href="${enLink}" title="Also available in English" aria-label="Also available in English">🇬🇧</a>
            </div>
        `;
        
        // Desktop
        if (desktopContainer) {
            desktopContainer.innerHTML = `<div class="local-nav-menu">${innerHtml}${langSwitchHtml}</div>`;
            desktopContainer.classList.add('visible');
        }
        
        // Mobile
        if (mobileContainer) {
            mobileContainer.innerHTML = `${innerHtml}${langSwitchHtml}`;
        }
        
        document.body.classList.add('has-local-nav');
        showMobileLocalTab();
        
        // Réinitialiser les dropdowns après injection de la nav locale
        if (window.innerWidth <= 768) {
            setupMobileDropdowns();
        }
    } catch (error) {
        console.warn(`Navigation locale indisponible pour le hub ${hub}:`, error);
        if (desktopContainer) {
            desktopContainer.innerHTML = '';
            desktopContainer.classList.remove('visible');
        }
        if (mobileContainer) {
            mobileContainer.innerHTML = '<div class="mobile-no-local-nav">Pas de navigation locale</div>';
        }
        document.body.classList.remove('has-local-nav');
        hideMobileLocalTab();
    }
}

function showMobileLocalTab() {
    const localTabBtn = document.querySelector('.mobile-tab-btn[data-tab="local"]');
    if (localTabBtn) {
        localTabBtn.style.display = 'block';
    }
}

function hideMobileLocalTab() {
    const localTabBtn = document.querySelector('.mobile-tab-btn[data-tab="local"]');
    if (localTabBtn) {
        localTabBtn.style.display = 'none';
        // Switch to global tab if local was active
        if (localTabBtn.classList.contains('active')) {
            const globalTabBtn = document.querySelector('.mobile-tab-btn[data-tab="global"]');
            if (globalTabBtn) {
                globalTabBtn.click();
            }
        }
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
    // Cleanup old event listeners first
    cleanupMobileDropdowns();
    
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    const hasDropdownItems = document.querySelectorAll('.nav-item.has-dropdown, .dropdown-item.has-dropdown');
    
    hasDropdownItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        
        // Créer un nouveau link sans les anciens listeners
        const newLink = link.cloneNode(true);
        link.replaceWith(newLink);
        
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
    
    // Fermer le menu quand on clique sur un lien de navigation (pas un dropdown)
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-item > a:not([href="#"]), .dropdown-item > a:not([href="#"])');
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }
    });
    
    // Fermer le menu quand on clique sur le logo
    const logo = document.querySelector('.logo a');
    if (logo) {
        logo.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    }
}

function cleanupMobileDropdowns() {
    const expandedItems = document.querySelectorAll('.nav-item.expanded, .dropdown-item.expanded');
    expandedItems.forEach(item => {
        item.classList.remove('expanded');
    });
}
