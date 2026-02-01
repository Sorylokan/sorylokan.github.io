// UI ENHANCEMENTS - Tables, Modals, Spoilers

// AMÉLIORATION DES TABLEAUX
function enhanceTables() {
    const tables = document.querySelectorAll('#content table');
    
    tables.forEach(table => {
        if (table.closest('.table-wrapper')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        
        const rows = table.querySelectorAll('tr');
        const cols = rows.length > 0 ? rows[0].querySelectorAll('th, td').length : 0;
        
        if (rows.length <= 5 && cols <= 4) {
            table.classList.add('compact');
        }
        
        // Indicateur de scroll pour mobile
        if (cols > 3) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '← Faites défiler pour voir plus →';
            indicator.style.cssText = `
                display: none;
                text-align: center;
                font-size: 0.75rem;
                color: var(--text-muted);
                padding: 0.5rem;
                background: var(--table-header-bg);
                border-radius: 0 0 0.5rem 0.5rem;
                margin-top: -0.5rem;
                position: sticky;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 10;
            `;
            
            wrapper.appendChild(indicator);
            
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            const updateIndicator = () => {
                indicator.style.display = mediaQuery.matches ? 'block' : 'none';
            };
            
            updateIndicator();
            mediaQuery.addListener(updateIndicator);
        }
    });
}

// MODAL LIENS EXTERNES
function initExternalLinkModal() {
    let popup = document.getElementById('popup-container');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup-container';
        popup.innerHTML = `
            <div class="popup" role="dialog" aria-modal="true" tabindex="-1">
                <h2>Ouvrir le lien ?</h2>
                <button class="cancel" id="cancel">Annuler</button>
                <button id="same-tab">Cet onglet</button>
                <button id="new-tab">Nouvel onglet</button>
            </div>`;
        popup.style.display = 'none';
        document.body.appendChild(popup);
    }
    
    let linkHref = '';
    let lastActive = null;
    
    // Nettoyage des anciens listeners
    popup.querySelectorAll('button').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Détection et gestion des liens externes
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://')) && !href.includes(window.location.hostname)) {
            link.classList.add('external-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                linkHref = href;
                lastActive = document.activeElement;
                popup.style.display = 'flex';
                const dialog = popup.querySelector('.popup');
                dialog.focus();
            });
        }
    });
    
    // Boutons de la modal
    popup.querySelector('#new-tab').addEventListener('click', () => {
        window.open(linkHref, '_blank');
        popup.style.display = 'none';
        if (lastActive) lastActive.focus();
    });
    
    popup.querySelector('#same-tab').addEventListener('click', () => {
        window.location.href = linkHref;
        popup.style.display = 'none';
        if (lastActive) lastActive.focus();
    });
    
    popup.querySelector('#cancel').addEventListener('click', () => {
        popup.style.display = 'none';
        if (lastActive) lastActive.focus();
    });
    
    // Accessibilité
    popup.querySelector('.popup').addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popup.style.display = 'none';
            if (lastActive) lastActive.focus();
        }
    });
    
    // Clic sur le fond pour fermer
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            if (lastActive) lastActive.focus();
        }
    });
}

// MODAL D'IMAGE
function initImageModal() {
    // Créer la modal si elle n'existe pas
    if (!document.getElementById('image-modal')) {
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.innerHTML = `
            <button class="close-modal" aria-label="Fermer">&times;</button>
            <img src="" alt="">
        `;
        document.body.appendChild(modal);
    }

    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-modal');

    // Ajouter les événements de clic sur toutes les images du contenu
    document.querySelectorAll('#content img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            modalImg.src = img.src;
            modalImg.alt = img.alt || 'Image agrandie';
            modal.style.display = 'flex';
            
            // Animation d'ouverture
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    // Fermer la modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Événements de fermeture
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}
