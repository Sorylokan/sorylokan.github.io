// Preview HTML generation and display
export class WebUIRenderer {
    constructor() {
        this.previewMessage = document.getElementById('previewMessage');
        this.jsonViewer = document.getElementById('jsonViewer');
    }

    updatePreview(payload, webhookUsername = 'WEB•UI - Announcement', webhookAvatarUrl = 'WEBWUI_Icon.svg') {
        let previewHTML = this._renderWebhookHeader(webhookUsername, webhookAvatarUrl);

        if (payload.content) {
            previewHTML += `<div class="message-content">${this.parseDiscordMarkdown(payload.content)}</div>`;
        }

        if (payload.embeds && payload.embeds.length) {
            payload.embeds.forEach(embed => {
                previewHTML += this.renderEmbedPreview(embed);
            });
        }

        if (!payload.content && (!payload.embeds || !payload.embeds.length)) {
            previewHTML += '<div class="message-content">No message configured yet</div>';
        }

        if (this.previewMessage) {
            this.previewMessage.innerHTML = previewHTML;
        }
    }

    _renderWebhookHeader(webhookUsername, webhookAvatarUrl) {
        return `<div class="webhook-header">
            <img src="${webhookAvatarUrl}" class="webhook-avatar" onerror="this.src='WEBWUI_Icon.svg'">
            <span class="webhook-name">${this.escapeHtml(webhookUsername)}</span>
        </div>`;
    }

    renderEmbedPreview(embed) {
        const color = embed.color ? '#' + embed.color.toString(16).padStart(6, '0') : '#5865f2';
        let html = `<div class="embed-preview" style="border-left: 4px solid ${color}"><div class="embed-grid"><div class="embed-content">`;

        // Author section
        if (embed.author) {
            html += '<div class="embed-header">';
            if (embed.author.icon_url) {
                html += `<img src="${embed.author.icon_url}" class="embed-author-icon" onerror="this.style.display='none'">`;
            }
            html += `<span class="embed-author-name">${this.escapeHtml(embed.author.name || '')}</span></div>`;
        }

        // Title and description
        if (embed.title) {
            html += `<div class="embed-title">${this.escapeHtml(embed.title)}</div>`;
        }
        if (embed.description) {
            html += `<div class="embed-description">${this.parseDiscordMarkdown(embed.description).replace(/\n/g, '<br>')}</div>`;
        }

        // Close content column
        html += '</div>';

        // Thumbnail in separate column
        if (embed.thumbnail && embed.thumbnail.url) {
            html += `<div class="embed-thumbnail-container"><img src="${embed.thumbnail.url}" class="embed-thumbnail" onerror="this.style.display='none'"></div>`;
        }

        // Close grid, start fields
        html += '</div>';

        // Fields with inline/non-inline rendering
        if (embed.fields && embed.fields.length) {
            html += this._renderEmbedFields(embed.fields);
        }

        // Main image
        if (embed.image && embed.image.url) {
            html += `<img src="${embed.image.url}" class="embed-image" onerror="this.style.display='none'">`;
        }

        // Footer
        if (embed.footer || embed.timestamp) {
            html += this._renderEmbedFooter(embed.footer, embed.timestamp);
        }

        html += '</div>';
        return html;
    }

    _renderEmbedFields(fields) {
        let html = '';
        let currentInlineGroup = [];

        fields.forEach((field, index) => {
            if (field.inline && currentInlineGroup.length < 3) {
                currentInlineGroup.push(field);

                // Render group if we're at the last field, next field isn't inline, or we have 3 fields
                if (index === fields.length - 1 || !fields[index + 1]?.inline || currentInlineGroup.length === 3) {
                    html += '<div class="embed-fields">';
                    currentInlineGroup.forEach(inlineField => {
                        html += `<div class="embed-field">
                            <div class="embed-field-name">${this.escapeHtml(inlineField.name)}</div>
                            <div class="embed-field-value">${this.parseSmallOnly(inlineField.value).replace(/\n/g, '<br>')}</div>
                        </div>`;
                    });
                    html += '</div>';
                    currentInlineGroup = [];
                }
            } else {
                html += `<div class="embed-field">
                    <div class="embed-field-name">${this.escapeHtml(field.name)}</div>
                    <div class="embed-field-value">${this.parseSmallOnly(field.value).replace(/\n/g, '<br>')}</div>
                </div>`;
                currentInlineGroup = []; // Reset inline group
            }
        });

        return html;
    }

    _renderEmbedFooter(footer, timestamp) {
        let html = '<div class="embed-footer">';

        if (footer) {
            if (footer.icon_url) {
                html += `<img src="${footer.icon_url}" class="embed-footer-icon" onerror="this.style.display='none'">`;
            }
            html += `<span class="embed-footer-text">${this.escapeHtml(footer.text)}</span>`;
        }

        if (timestamp) {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                const timeStr = date.toLocaleString();
                html += `<span class="embed-timestamp">${footer ? ' • ' : ''}${timeStr}</span>`;
            }
        }

        html += '</div>';
        return html;
    }

    updateJSONViewer(json) {
        if (!this.jsonViewer) return;

        const jsonString = JSON.stringify(json, null, 2);
        this.jsonViewer.textContent = jsonString;

        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(this.jsonViewer);
        }
    }

    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    parseSmallOnly(text) {
        if (typeof text !== 'string') return '';
        
        // First escape HTML to prevent XSS
        let result = this.escapeHtml(text);
        
        // Only parse -# for small text (Discord field value special formatting)
        result = result.replace(/^-# (.+)$/gm, '<small>$1</small>');
        
        return result;
    }

    parseDiscordMarkdown(text) {
        if (typeof text !== 'string') return '';

        // First escape HTML to prevent XSS
        let result = this.escapeHtml(text);

        // Titles: # ## ### etc (consume trailing newline to avoid extra <br>)
        result = result.replace(/^### (.*?)$\n?/gm, '<h3>$1</h3>');
        result = result.replace(/^## (.*?)$\n?/gm, '<h2>$1</h2>');
        result = result.replace(/^# (.*?)$\n?/gm, '<h1>$1</h1>');

        // Bold: **text** 
        result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic: *text*
        result = result.replace(/\*([^*]+?)\*/g, (match, content, offset, string) => {
            // Check if it's part of ** bold syntax
            if (offset > 0 && string[offset - 1] === '*') return match;
            if (offset + match.length < string.length && string[offset + match.length] === '*') return match;
            return '<em>' + content + '</em>';
        });

        // Underline/Bold: __text__
        result = result.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Italic: _text_ (but not if it's part of __)
        result = result.replace(/_([^_]+?)_/g, (match, content, offset, string) => {
            // Check if it's part of __ syntax
            if (offset > 0 && string[offset - 1] === '_') return match;
            if (offset + match.length < string.length && string[offset + match.length] === '_') return match;
            return '<em>' + content + '</em>';
        });

        // Strikethrough: ~~text~~
        result = result.replace(/~~(.*?)~~/g, '<del>$1</del>');

        // Code block: ```text``` or ```language\ntext```
        result = result.replace(/```(?:(\w+)\s*)?\n?([\s\S]*?)```\n?/g, '<pre class="discord-code-block"><code>$2</code></pre>');

        // Code inline: `text`
        result = result.replace(/`([^`]+)`/g, '<code class="discord-code-inline">$1</code>');

        // Quote: > text (at start of line)
        result = result.replace(/^&gt; (.+)$/gm, '<div class="discord-quote">$1</div>');

        // Spoiler: ||text||
        result = result.replace(/\|\|(.*?)\|\|/g, '<span class="discord-spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>');

        return result;
    }

    showNotification(message, type = 'info') {
        const notificationEl = document.getElementById('notification');
        if (!notificationEl) return;

        if (this._notifTimeout) {
            clearTimeout(this._notifTimeout);
        }

        notificationEl.textContent = message;
        notificationEl.className = `notification ${type}`;
        notificationEl.classList.remove('hidden');

        this._notifTimeout = setTimeout(() => {
            notificationEl.classList.add('hidden');
        }, 3000);
    }
}