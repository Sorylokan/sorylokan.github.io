// MARKDOWN & SYNTAX HIGHLIGHTING

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
        const response = await fetch(`/p/${path}.md`);
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
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('content').innerHTML = '<p>Erreur lors du chargement du contenu.</p>';
    }
}

// NAVIGATION
function handleNavigation() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('p') || 'home';
    loadContent(path);
}

window.addEventListener('popstate', handleNavigation);

// GESTION DES CLICS SUR LES LIENS DE NAVIGATION
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="?"]')) {
        e.preventDefault();
        const url = new URL(e.target.href);
        window.history.pushState({}, '', url);
        handleNavigation();
    }
});

// GESTION DU THÈME
function handleTheme() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');

    function setTheme(theme) {
        themeStyle.href = `src/style-${theme}.css`;
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

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

// COLORATION SYNTAXIQUE
function applySyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const className = block.className;
        let language = '';
        
        if (className.includes('language-')) {
            language = className.match(/language-(\w+)/)[1];
        } else if (className.includes('csharp') || className.includes('cs')) {
            language = 'csharp';
        } else if (className.includes('javascript') || className.includes('js')) {
            language = 'javascript';
        } else if (className.includes('python') || className.includes('py')) {
            language = 'python';
        } else if (className.includes('markdown') || className.includes('md')) {
            language = 'markdown';
        } else if (className.includes('yaml') || className.includes('yml')) {
            language = 'yaml';
        } else if (className.includes('html') || className.includes('htm')) {
            language = 'html';
        } else if (className.includes('bash') || className.includes('sh') || className.includes('shell')) {
            language = 'bash';
        }
        
        if (language) {
            block.className = `language-${language}`;
            highlightCode(block, language);
        }
    });
}

function highlightCode(block, language) {
    let code = block.textContent;
    code = safeHighlight(code, language);
    block.innerHTML = code;
}

function safeHighlight(code, language) {
    switch (language) {
        case 'csharp':
            return highlightCSharp(code);
        case 'javascript':
            return highlightJavaScript(code);
        case 'python':
            return highlightPython(code);
        case 'markdown':
            return highlightMarkdown(code);
        case 'yaml':
            return highlightYaml(code);
        case 'html':
            return highlightHtml(code);
        case 'bash':
            return highlightBash(code);
        default:
            return code;
    }
}

// COLORATION C#
function highlightCSharp(code) {
    const keywords = /\b(public|private|protected|internal|static|readonly|const|class|interface|namespace|using|var|int|string|bool|double|float|decimal|void|return|if|else|for|foreach|while|do|switch|case|default|break|continue|try|catch|finally|throw|new|this|base|override|virtual|abstract|sealed|partial|async|await|delegate|event|get|set|where|select|from|in|join|on|equals|group|by|into|orderby|ascending|descending|let|linq)\b/g;
    const types = /\b(Console|String|Int32|Boolean|DateTime|List|Dictionary|IEnumerable|Task|Action|Func|HttpClient|JsonSerializer)\b/g;
    const singleLineComment = /\/\/.*$/gm;
    const multiLineComment = /\/\*[\s\S]*?\*\//g;
    const strings = /"(?:[^"\\]|\\.)*"/g;
    const chars = /'(?:[^'\\]|\\.)*'/g;
    const numbers = /\b\d+(?:\.\d+)?[fFdDmM]?\b/g;
    
    return code
        .replace(multiLineComment, '<span class="comment">$&</span>')
        .replace(singleLineComment, '<span class="comment">$&</span>')
        .replace(strings, '<span class="string">$&</span>')
        .replace(chars, '<span class="string">$&</span>')
        .replace(numbers, '<span class="number">$&</span>')
        .replace(keywords, '<span class="keyword">$&</span>')
        .replace(types, '<span class="type">$&</span>');
}

// COLORATION JAVASCRIPT
function highlightJavaScript(code) {
    // Utilise des marqueurs temporaires pour éviter les conflits
    const tempMarkers = [];
    let tempCode = code;
    let markerCount = 0;
    
    // Protéger les commentaires
    tempCode = tempCode.replace(/\/\*[\s\S]*?\*\//g, function(match) {
        const marker = `__TEMP_COMMENT_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="comment">${match}</span>`});
        return marker;
    });
    
    tempCode = tempCode.replace(/\/\/.*$/gm, function(match) {
        const marker = `__TEMP_COMMENT_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="comment">${match}</span>`});
        return marker;
    });
    
    // Protéger les chaînes
    tempCode = tempCode.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, function(match) {
        const marker = `__TEMP_STRING_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="string">${match}</span>`});
        return marker;
    });
    
    // Nombres
    tempCode = tempCode.replace(/\b\d+(?:\.\d+)?\b/g, function(match) {
        const marker = `__TEMP_NUMBER_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="number">${match}</span>`});
        return marker;
    });
    
    // Mots-clés
    const keywords = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|new|this|class|extends|import|export|from|async|await|yield|typeof|instanceof|in|of|delete|void|null|undefined|true|false)\b/g;
    tempCode = tempCode.replace(keywords, function(match) {
        const marker = `__TEMP_KEYWORD_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="keyword">${match}</span>`});
        return marker;
    });
    
    // Types/objets
    const types = /\b(Array|Object|String|Number|Boolean|Date|Math|JSON|Promise|console|window|document|localStorage|fetch|setTimeout|setInterval)\b/g;
    tempCode = tempCode.replace(types, function(match) {
        const marker = `__TEMP_TYPE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="type">${match}</span>`});
        return marker;
    });
    
    // Restaurer tous les marqueurs
    tempMarkers.forEach(item => {
        tempCode = tempCode.replace(item.marker, item.replacement);
    });
    
    return tempCode;
}

// COLORATION PYTHON
function highlightPython(code) {
    const tempMarkers = [];
    let tempCode = code;
    let markerCount = 0;
    
    // Chaînes de caractères (triple quotes en premier)
    tempCode = tempCode.replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, function(match) {
        const marker = `__TEMP_PYTHON_TRIPLESTRING_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="string">${match}</span>`});
        return marker;
    });
    
    tempCode = tempCode.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, function(match) {
        const marker = `__TEMP_PYTHON_STRING_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="string">${match}</span>`});
        return marker;
    });
    
    // Commentaires
    tempCode = tempCode.replace(/#.*$/gm, function(match) {
        const marker = `__TEMP_PYTHON_COMMENT_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="comment">${match}</span>`});
        return marker;
    });
    
    // Nombres
    tempCode = tempCode.replace(/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, function(match) {
        const marker = `__TEMP_PYTHON_NUMBER_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="number">${match}</span>`});
        return marker;
    });
    
    // Mots-clés Python
    const keywords = /\b(def|class|if|elif|else|for|while|break|continue|return|import|from|as|try|except|finally|raise|with|pass|yield|lambda|global|nonlocal|True|False|None|and|or|not|in|is)\b/g;
    tempCode = tempCode.replace(keywords, function(match) {
        const marker = `__TEMP_PYTHON_KEYWORD_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="keyword">${match}</span>`});
        return marker;
    });
    
    // Fonctions built-in
    const types = /\b(int|str|float|bool|list|dict|set|tuple|len|range|enumerate|zip|map|filter|print|input|open|type|isinstance|hasattr|getattr|setattr)\b/g;
    tempCode = tempCode.replace(types, function(match) {
        const marker = `__TEMP_PYTHON_TYPE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="type">${match}</span>`});
        return marker;
    });
    
    // Restaurer tous les marqueurs
    tempMarkers.forEach(item => {
        tempCode = tempCode.replace(item.marker, item.replacement);
    });
    
    return tempCode;
}

// COLORATION BASH
function highlightBash(code) {
    const tempMarkers = [];
    let tempCode = code;
    let markerCount = 0;
    
    // Protéger les commentaires
    tempCode = tempCode.replace(/#.*$/gm, function(match) {
        const marker = `__TEMP_BASH_COMMENT_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="comment">${match}</span>`});
        return marker;
    });
    
    // Protéger les chaînes de caractères
    tempCode = tempCode.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, function(match) {
        const marker = `__TEMP_BASH_STRING_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="string">${match}</span>`});
        return marker;
    });
    
    // Variables
    tempCode = tempCode.replace(/\$\{?[a-zA-Z_][a-zA-Z0-9_]*\}?|\$[0-9]+|\$[@*#?$!]/g, function(match) {
        const marker = `__TEMP_BASH_VAR_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="type">${match}</span>`});
        return marker;
    });
    
    // Mots-clés Bash
    const keywords = /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|break|continue|local|export|readonly|declare|echo|printf|read|test|true|false)\b/g;
    tempCode = tempCode.replace(keywords, function(match) {
        const marker = `__TEMP_BASH_KEYWORD_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="keyword">${match}</span>`});
        return marker;
    });
    
    // Commandes courantes
    const commands = /\b(ls|cd|pwd|mkdir|rmdir|rm|cp|mv|chmod|chown|grep|sed|awk|sort|uniq|wc|head|tail|cat|less|more|find|which|whereis|man|ps|kill|jobs|bg|fg|nohup|screen|tmux|ssh|scp|rsync|tar|gzip|gunzip|zip|unzip|curl|wget|git|npm|pip|docker)\b/g;
    tempCode = tempCode.replace(commands, function(match) {
        const marker = `__TEMP_BASH_COMMAND_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="type">${match}</span>`});
        return marker;
    });
    
    // Restaurer tous les marqueurs
    tempMarkers.forEach(item => {
        tempCode = tempCode.replace(item.marker, item.replacement);
    });
    
    return tempCode;
}

// COLORATION MARKDOWN
function highlightMarkdown(code) {
    const headers = /^#{1,6}\s+.*$/gm;
    const inlineCode = /`[^`]+`/g;
    const links = /\[([^\]]+)\]\(([^)]+)\)/g;
    const bold = /\*\*([^*]+)\*\*/g;
    const italic = /\*([^*]+)\*/g;
    
    return code
        .replace(headers, '<span class="md-header">$&</span>')
        .replace(inlineCode, '<span class="md-code">$&</span>')
        .replace(links, '<span class="md-link">$&</span>')
        .replace(bold, '<span class="md-bold">$&</span>')
        .replace(italic, '<span class="md-italic">$&</span>');
}

// COLORATION YAML
function highlightYaml(code) {
    const keys = /^(\s*)([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/gm;
    const strings = /(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;
    const comments = /#.*$/gm;
    const special = /\b(true|false|null|~)\b/g;
    const numbers = /\b\d+(?:\.\d+)?\b/g;
    
    return code
        .replace(comments, '<span class="comment">$&</span>')
        .replace(strings, '<span class="string">$&</span>')
        .replace(special, '<span class="keyword">$&</span>')
        .replace(numbers, '<span class="number">$&</span>')
        .replace(keys, '$1<span class="yaml-key">$2</span>:');
}

// COLORATION HTML
function highlightHtml(code) {
    const tempMarkers = [];
    let tempCode = code;
    let markerCount = 0;
    
    // Protéger les commentaires HTML
    tempCode = tempCode.replace(/<!--[\s\S]*?-->/g, function(match) {
        const marker = `__TEMP_HTML_COMMENT_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="comment">${match}</span>`});
        return marker;
    });
    
    // Protéger DOCTYPE
    tempCode = tempCode.replace(/<!DOCTYPE[^>]*>/gi, function(match) {
        const marker = `__TEMP_DOCTYPE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="html-doctype">${match}</span>`});
        return marker;
    });
    
    // Protéger les entités HTML
    tempCode = tempCode.replace(/&[a-zA-Z][a-zA-Z0-9]*;|&#[0-9]+;|&#x[0-9a-fA-F]+;/g, function(match) {
        const marker = `__TEMP_ENTITY_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="html-entity">${match}</span>`});
        return marker;
    });
    
    // Protéger les valeurs d'attributs (chaînes entre guillemets)
    tempCode = tempCode.replace(/"[^"]*"|'[^']*'/g, function(match) {
        const marker = `__TEMP_ATTR_VALUE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="string">${match}</span>`});
        return marker;
    });
    
    // Protéger les noms d'attributs
    tempCode = tempCode.replace(/\s([a-zA-Z-]+)=/g, function(match, attrName) {
        const marker = `__TEMP_ATTR_NAME_${markerCount++}__`;
        tempMarkers.push({marker, replacement: ` <span class="html-attr">${attrName}</span>=`});
        return marker;
    });
    
    // Protéger les noms de balises
    tempCode = tempCode.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g, function(match, tagName) {
        const marker = `__TEMP_TAG_${markerCount++}__`;
        const prefix = match.startsWith('</') ? '&lt;/' : '&lt;';
        tempMarkers.push({marker, replacement: `${prefix}<span class="html-tag">${tagName}</span>`});
        return marker;
    });
    
    // Restaurer tous les marqueurs
    tempMarkers.forEach(item => {
        tempCode = tempCode.replace(item.marker, item.replacement);
    });
    
    return tempCode;
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

// INITIALISATION GLOBALE
window.addEventListener('load', () => {
    handleNavigation();
    handleTheme();
    setupCopyButtons();
    initExternalLinkModal();
    initNavigation();
});

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

// TWITCH PLAYER INTEGRATION

function createResponsiveTwitchEmbed() {
    const container = document.getElementById("twitch-embed");
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const chatWidth = 340;
    const minVideoWidth = 320;
    
    let videoWidth = Math.max(containerWidth - chatWidth, minVideoWidth);
    let height = Math.round(videoWidth * 9 / 16);
    let totalWidth = videoWidth + chatWidth;
    
    if (containerWidth < chatWidth + minVideoWidth) {
        videoWidth = minVideoWidth;
        totalWidth = chatWidth + minVideoWidth;
        height = Math.round(videoWidth * 9 / 16);
    }
    
    container.style.width = totalWidth + 'px';
    container.style.height = height + 'px';
    
    new Twitch.Embed("twitch-embed", {
        width: totalWidth,
        height: height,
        channel: "sorylokan",
        parent: [window.location.hostname, "localhost"]
    });
}

function initTwitchPlayer() {
    if (document.getElementById("twitch-embed")) {
        createResponsiveTwitchEmbed();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const container = document.getElementById("twitch-embed");
                if (container) {
                    container.innerHTML = '';
                    createResponsiveTwitchEmbed();
                }
            }, 250);
        });
    }
}
