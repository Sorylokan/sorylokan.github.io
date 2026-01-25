// SYNTAX HIGHLIGHTING - All language-specific highlighting functions

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
        } else if (className.includes('changelog') || className.includes('changes')) {
            language = 'changelog';
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
        case 'changelog':
            return highlightChangelog(code);
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

// COLORATION CHANGELOG
function highlightChangelog(code) {
    const tempMarkers = [];
    let tempCode = code;
    let markerCount = 0;
    
    // Dates entre crochets [DD.MM.YY] ou [-----]
    tempCode = tempCode.replace(/^\[([^\]]+)\]/gm, function(match) {
        const marker = `__TEMP_CHANGELOG_DATE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-date">${match}</span>`});
        return marker;
    });
    
    // Versions avec # (titre de version)
    tempCode = tempCode.replace(/^# (.+)$/gm, function(match, version) {
        const marker = `__TEMP_CHANGELOG_VERSION_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-version"># ${version}</span>`});
        return marker;
    });
    
    // Types de changements avec leurs préfixes - format Minecraft standard
    tempCode = tempCode.replace(/^(\*) (Changed:|Fixed:)/gm, function(match, symbol, text) {
        const marker = `__TEMP_CHANGELOG_NEW_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-new">${symbol}</span> <strong>${text}</strong>`});
        return marker;
    });
    
    tempCode = tempCode.replace(/^(\+) (Added:)/gm, function(match, symbol, text) {
        const marker = `__TEMP_CHANGELOG_ADD_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-add">${symbol}</span> <strong>${text}</strong>`});
        return marker;
    });
    
    tempCode = tempCode.replace(/^(-) (Removed:)/gm, function(match, symbol, text) {
        const marker = `__TEMP_CHANGELOG_REMOVE_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-remove">${symbol}</span> <strong>${text}</strong>`});
        return marker;
    });
    
    // Versions entre parenthèses (BETA-1.8) (public release)
    tempCode = tempCode.replace(/\(([^)]+)\)/g, function(match) {
        const marker = `__TEMP_CHANGELOG_META_${markerCount++}__`;
        tempMarkers.push({marker, replacement: `<span class="changelog-meta">${match}</span>`});
        return marker;
    });
    
    // Restaurer tous les marqueurs
    tempMarkers.forEach(item => {
        tempCode = tempCode.replace(item.marker, item.replacement);
    });
    
    return tempCode;
}
