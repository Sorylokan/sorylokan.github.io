// Preview HTML generation and display
export class WebUIRenderer {
    constructor() {
        this.previewMessage = document.getElementById('previewMessage');
        this.jsonViewer = document.getElementById('jsonViewer');
    }

    updatePreview(payload, webhookUsername = 'WEB•UI - Announcement', webhookAvatarUrl = 'WEBWUI_Icon.svg') {
        let previewHTML = this._renderWebhookHeader(webhookUsername, webhookAvatarUrl);
        
        if (payload.content) {
            previewHTML += `<div class="message-content">${this.escapeHtml(payload.content)}</div>`;
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
        let html = `<div class="embed-preview" style="border-left: 4px solid ${color}">`;
        
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
            html += `<div class="embed-description">${this.escapeHtml(embed.description).replace(/\n/g, '<br>')}</div>`;
        }
        
        // Thumbnail
        if (embed.thumbnail && embed.thumbnail.url) {
            html += `<img src="${embed.thumbnail.url}" class="embed-thumbnail" onerror="this.style.display='none'">`;
        }
        
        // Fields with proper inline/non-inline rendering
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
                            <div class="embed-field-value">${this.escapeHtml(inlineField.value).replace(/\n/g, '<br>')}</div>
                        </div>`;
                    });
                    html += '</div>';
                    currentInlineGroup = [];
                }
            } else {
                // Non-inline field, render immediately
                html += `<div class="embed-field">
                    <div class="embed-field-name">${this.escapeHtml(field.name)}</div>
                    <div class="embed-field-value">${this.escapeHtml(field.value).replace(/\n/g, '<br>')}</div>
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
        
        // Apply syntax highlighting if available
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

    showNotification(message, type = 'info') {
        const notificationEl = document.getElementById('notification');
        if (!notificationEl) return;
        
        // Clear existing timeout
        if (this._notifTimeout) {
            clearTimeout(this._notifTimeout);
        }
        
        // Set message and type
        notificationEl.textContent = message;
        notificationEl.className = `notification ${type}`;
        notificationEl.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        this._notifTimeout = setTimeout(() => {
            notificationEl.classList.add('hidden');
        }, 3000);
    }
}