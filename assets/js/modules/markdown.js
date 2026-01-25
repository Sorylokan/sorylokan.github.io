// MARKDOWN & SYNTAX HIGHLIGHTING SETUP

const md = new window.markdownit({
    html: true,
    linkify: true,
    typographer: true
})
.use(window.markdownitContainer, 'warning')
.use(window.markdownitContainer, 'info')
.use(window.markdownitContainer, 'success')
.use(window.markdownitContainer, 'danger');

function getButtonClass(type) {
    const buttonTypes = {
        'n': 'btn-normal',
        's': 'btn-success',
        'p': 'btn-primary',
        'g': 'btn-gray'
    };
    return buttonTypes[type] || 'btn-normal';
}

const copyIcons = {
    normal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"/>
        <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"/>
    </svg>`,
    success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z"/>
        <path d="M17.2391 4.81949C17.2391 6.40949 15.9391 7.70949 14.3491 7.70949H9.64906C8.05906 7.70949 6.75906 6.40949 6.75906 4.81949C6.75906 4.25949 6.15906 3.90949 5.65906 4.16949C4.24906 4.91949 3.28906 6.40949 3.28906 8.11949V17.5295C3.28906 19.9895 5.29906 21.9995 7.75906 21.9995H16.2391C18.6991 21.9995 20.7091 19.9895 20.7091 17.5295V8.11949C20.7091 6.40949 19.7491 4.91949 18.3391 4.16949C17.8391 3.90949 17.2391 4.25949 17.2391 4.81949ZM15.3391 12.7295L11.3391 16.7295C11.1891 16.8795 10.9991 16.9495 10.8091 16.9495C10.6191 16.9495 10.4291 16.8795 10.2791 16.7295L8.77906 15.2295C8.48906 14.9395 8.48906 14.4595 8.77906 14.1695C9.06906 13.8795 9.54906 13.8795 9.83906 14.1695L10.8091 15.1395L14.2791 11.6695C14.5691 11.3795 15.0491 11.3795 15.3391 11.6695C15.6291 11.9595 15.6291 12.4395 15.3391 12.7295Z"/>
    </svg>`,
    error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z"/>
        <path d="M17.2391 4.81949C17.2391 6.40949 15.9391 7.70949 14.3491 7.70949H9.64906C8.05906 7.70949 6.75906 6.40949 6.75906 4.81949C6.75906 4.25949 6.15906 3.90949 5.65906 4.16949C4.24906 4.91949 3.28906 6.40949 3.28906 8.11949V17.5295C3.28906 19.9895 5.29906 21.9995 7.75906 21.9995H16.2391C18.6991 21.9995 20.7091 19.9895 20.7091 17.5295V8.11949C20.7091 6.40949 19.7491 4.91949 18.3391 4.16949C17.8391 3.90949 17.2391 4.25949 17.2391 4.81949ZM14.5291 16.6895C14.3791 16.8395 14.1891 16.9095 13.9991 16.9095C13.8091 16.9095 13.6191 16.8395 13.4691 16.6895L12.0191 15.2395L10.5291 16.7295C10.3791 16.8795 10.1891 16.9495 9.99906 16.9495C9.80906 16.9495 9.61906 16.8795 9.46906 16.7295C9.17906 16.4395 9.17906 15.9595 9.46906 15.6695L10.9591 14.1795L9.50906 12.7295C9.21906 12.4395 9.21906 11.9595 9.50906 11.6695C9.79906 11.3795 10.2791 11.3795 10.5691 11.6695L12.0191 13.1195L13.4191 11.7195C13.7091 11.4295 14.1891 11.4295 14.4791 11.7195C14.7691 12.0095 14.7691 12.4895 14.4791 12.7795L13.0791 14.1795L14.5291 15.6295C14.8191 15.9195 14.8191 16.3895 14.5291 16.6895Z"/>
    </svg>`
};

function setupCopyButtons() {
    document.querySelectorAll('.copy-btn-container').forEach(container => {
        container.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    this.innerHTML = copyIcons.success;
                    this.setAttribute('data-tooltip', 'Copié !');
                    this.querySelector('svg').style.color = '#28a745';
                    
                    setTimeout(() => {
                        this.innerHTML = copyIcons.normal;
                        this.setAttribute('data-tooltip', 'Copier ?');
                        this.querySelector('svg').style.color = '';
                    }, 2500);
                })
                .catch(() => {
                    this.innerHTML = copyIcons.error;
                    this.setAttribute('data-tooltip', 'Erreur !');
                    this.querySelector('svg').style.color = '#dc3545';
                    
                    setTimeout(() => {
                        this.innerHTML = copyIcons.normal;
                        this.setAttribute('data-tooltip', 'Copier ?');
                        this.querySelector('svg').style.color = '';
                    }, 2500);
                });
        });
    });
}

// CHARGEMENT ET AFFICHAGE DU CONTENU MARKDOWN
async function loadContent(path) {
    try {
        const response = await fetch(`/${path}.md`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let content = await response.text();
        
        content = content.replace(/\{"([^"]+)"-([nspg])\}\(([^)]+)\)/g, (match, text, type, url) => {
            const className = getButtonClass(type);
            return `<a class="btn ${className}" href="${url}">${text}</a>`;
        });
        
        content = content.replace(/\[copy:([^\]]+)\]/g, (match, textToCopy) => {
            return `<copybutton data-text="${textToCopy.replace(/"/g, '&quot;')}"></copybutton>`;
        });
        
        // Traitement des séparateurs pour différencier les styles
        content = content.replace(/^---+$/gm, '<hr class="hr-line">');
        content = content.replace(/^\*\*\*+$/gm, '<hr class="hr-stars">');
        content = content.replace(/^___+$/gm, '<hr class="hr-dots">');
        
        // Traitement des spoilers ||texte||
        content = content.replace(/\|\|([^|]+)\|\|/g, '<span class="spoiler" onclick="this.classList.add(\'revealed\')">$1</span>');
        
        let html = md.render(content);
        
        html = html.replace(/<copybutton data-text="([^"]*)"[^>]*><\/copybutton>/g, (match, textToCopy) => {
            const decodedText = textToCopy.replace(/&quot;/g, '"');
            return `<span class="copy-btn-container" data-copy="${decodedText}" data-tooltip="Copier ?">${copyIcons.normal}</span>`;
        });
        
        document.getElementById('content').innerHTML = html;
        
        // Appliquer la coloration syntaxique
        applySyntaxHighlighting();
        
        // Améliorer les tableaux
        enhanceTables();
        
        // Initialiser les fonctionnalités
        setupCopyButtons();
        initExternalLinkModal();
        initTwitchPlayer();
        initImageModal();
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('content').innerHTML = '<p>Erreur lors du chargement du contenu.</p>';
    }
}

// Exporté pour utilisation dans app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadContent, setupCopyButtons, md };
}
