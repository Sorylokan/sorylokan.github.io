class MarkdownParser {
  constructor() {
    this.patterns = {
      // Headers
      h1: /^# (.+)$/gm,
      h2: /^## (.+)$/gm,
      h3: /^### (.+)$/gm,
      h4: /^#### (.+)$/gm,
      h5: /^##### (.+)$/gm,
      h6: /^###### (.+)$/gm,
      
      // Text formatting
      bold: /\*\*(.*?)\*\*/g,
      italic: /\*(.*?)\*/g,
      code: /`(.*?)`/g,
      
      // Links
      link: /\[([^\]]+)\]\(([^)]+)\)/g,
      
      // Images
      image: /!\[([^\]]*)\]\(([^)]+)\)/g,
      
      // Lists
      unorderedList: /^[\s]*[-*+] (.+)$/gm,
      orderedList: /^[\s]*\d+\. (.+)$/gm,
      
      // Code blocks
      codeBlock: /```(\w+)?\n([\s\S]*?)```/g,
      
      // Blockquotes
      blockquote: /^> (.+)$/gm,
      
      // Horizontal rules
      hr: /^---$/gm,
      
      // Line breaks
      lineBreak: /\n\n/g,
      singleBreak: /\n/g
    };
  }

  parse(markdown) {
    let html = markdown;
    
    // Parse code blocks first (to avoid parsing content inside them)
    html = this.parseCodeBlocks(html);
    
    // Parse headers
    html = html.replace(this.patterns.h6, '<h6>$1</h6>');
    html = html.replace(this.patterns.h5, '<h5>$1</h5>');
    html = html.replace(this.patterns.h4, '<h4>$1</h4>');
    html = html.replace(this.patterns.h3, '<h3>$1</h3>');
    html = html.replace(this.patterns.h2, '<h2>$1</h2>');
    html = html.replace(this.patterns.h1, '<h1>$1</h1>');
    
    // Parse images (before links to avoid conflicts)
    html = html.replace(this.patterns.image, '<img src="$2" alt="$1" />');
    
    // Parse links
    html = html.replace(this.patterns.link, '<a href="$2">$1</a>');
    
    // Parse text formatting
    html = html.replace(this.patterns.bold, '<strong>$1</strong>');
    html = html.replace(this.patterns.italic, '<em>$1</em>');
    html = html.replace(this.patterns.code, '<code>$1</code>');
    
    // Parse blockquotes
    html = html.replace(this.patterns.blockquote, '<blockquote>$1</blockquote>');
    
    // Parse horizontal rules
    html = html.replace(this.patterns.hr, '<hr>');
    
    // Parse lists
    html = this.parseLists(html);
    
    // Parse paragraphs (last to wrap remaining text)
    html = this.parseParagraphs(html);
    
    return html.trim();
  }

  parseCodeBlocks(html) {
    return html.replace(this.patterns.codeBlock, (match, language, code) => {
      const lang = language ? ` class="language-${language}"` : '';
      return `<pre><code${lang}>${this.escapeHtml(code.trim())}</code></pre>`;
    });
  }

  parseLists(html) {
    // Parse unordered lists
    const unorderedItems = [];
    html = html.replace(this.patterns.unorderedList, (match, item) => {
      unorderedItems.push(item);
      return '___UL_ITEM___';
    });
    
    if (unorderedItems.length > 0) {
      const listItems = unorderedItems.map(item => `  <li>${item}</li>`).join('\n');
      html = html.replace(/___UL_ITEM___(\n___UL_ITEM___)*/g, `<ul>\n${listItems}\n</ul>`);
    }
    
    // Parse ordered lists
    const orderedItems = [];
    html = html.replace(this.patterns.orderedList, (match, item) => {
      orderedItems.push(item);
      return '___OL_ITEM___';
    });
    
    if (orderedItems.length > 0) {
      const listItems = orderedItems.map(item => `  <li>${item}</li>`).join('\n');
      html = html.replace(/___OL_ITEM___(\n___OL_ITEM___)*/g, `<ol>\n${listItems}\n</ol>`);
    }
    
    return html;
  }

  parseParagraphs(html) {
    // Split by double line breaks
    const paragraphs = html.split(/\n\s*\n/);
    
    return paragraphs.map(p => {
      p = p.trim();
      if (!p) return '';
      
      // Don't wrap already formatted elements
      if (p.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr)/)) {
        return p;
      }
      
      // Replace single line breaks with <br> within paragraphs
      p = p.replace(/\n/g, '<br>');
      
      return `<p>${p}</p>`;
    }).filter(p => p).join('\n\n');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Fonction utilitaire pour parser du Markdown
function parseMarkdown(markdown) {
  const parser = new MarkdownParser();
  return parser.parse(markdown);
}

// Exemple d'utilisation
const markdownText = `# Mon titre principal

Ceci est un **paragraphe** avec du texte en *italique* et du \`code inline\`.

## Sous-titre

- Premier élément de liste
- Deuxième élément
- Troisième élément

### Code block

\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

> Ceci est une citation

[Lien vers Google](https://google.com)

![Image exemple](https://via.placeholder.com/150)

---

Dernier paragraphe.`;

// Test du parser
console.log(parseMarkdown(markdownText));

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MarkdownParser, parseMarkdown };
}
