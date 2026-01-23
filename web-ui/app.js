// Webhook Embed Builder with User Interface • [WEB•UI] - Web Configuration Interface
// Main application logic (clean refactor)

class DiscordWebhookUI {
    constructor() {
        this.ws = null;
        this.wsConnected = false;
        this._notifTimeout = null;

        this.initializeElements();
        this.attachEventListeners();
        this.loadFromLocalStorage();
        this.updateWebhookButtonState();
        this.updatePreview();
    }

    initializeElements() {
        // Header / connection
        this.connectBtn = document.getElementById('connectBtn');
        this.loadVarBtn = document.getElementById('loadVarBtn');
        this.testWebhookBtn = document.getElementById('testWebhookBtn');
        this.wsStatusDot = document.getElementById('wsStatus');
        this.wsStatusText = document.getElementById('wsStatusText');
        this.wsAddress = document.getElementById('wsAddress');
        this.wsPort = document.getElementById('wsPort');
        this.globalVarName = document.getElementById('globalVarName');

        // Message / info
        this.msgContent = document.getElementById('msgContent');
        this.webhookUsername = document.getElementById('webhookUsername');
        this.webhookAvatarUrl = document.getElementById('webhookAvatarUrl');
        this.webhookUrl = document.getElementById('webhookUrl');

        // Embeds and controls
        this.addEmbedBtn = document.getElementById('addEmbedBtn');
        this.embedsContainer = document.getElementById('embedsContainer');

        // Preview / JSON
        this.previewMessage = document.getElementById('previewMessage');
        this.jsonViewer = document.getElementById('jsonViewer');
        this.exportJsonBtn = document.getElementById('exportJsonBtn');
        this.importJsonBtn = document.getElementById('importJsonBtn');
        this.jsonImportArea = document.getElementById('jsonImportArea');

        // Other buttons
        this.saveBtn = document.getElementById('saveToStreamerBtn');
        this.copyJsonBtn = document.getElementById('copyJsonBtn');
        this.clearBtn = document.getElementById('clearBtn');

        // Notification element
        this.notificationEl = document.getElementById('notification');
    }

    attachEventListeners() {
        // Tabs (data-tab elements)
        document.querySelectorAll('[data-tab]').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(btn.getAttribute('data-tab')));
        });

        // Connection
        if (this.connectBtn) this.connectBtn.addEventListener('click', () => { if (!this.wsConnected) this.connectWebSocket(); else this.disconnectWebSocket(); });
        if (this.loadVarBtn) this.loadVarBtn.addEventListener('click', () => this.loadGlobalVariable());
        if (this.testWebhookBtn) this.testWebhookBtn.addEventListener('click', () => this.testWebhook());

        // Message inputs
        [this.msgContent, this.webhookUsername, this.webhookAvatarUrl, this.webhookUrl].forEach(el => {
            if (!el) return;
            el.addEventListener('input', () => { this.updateWebhookButtonState(); this.updatePreview(); this.saveToLocalStorage(); });
        });

        // Embeds
        if (this.addEmbedBtn) this.addEmbedBtn.addEventListener('click', () => { this.addEmbed(); this.updatePreview(); this.saveToLocalStorage(); });

        // Preview / JSON controls
        if (this.saveBtn) this.saveBtn.addEventListener('click', () => { console.log('Save button clicked'); this.saveToStreamerBot(); });
        if (this.exportJsonBtn) this.exportJsonBtn.addEventListener('click', () => this.exportJSON());
        if (this.importJsonBtn) this.importJsonBtn.addEventListener('click', () => { document.getElementById('importModal').classList.remove('hidden'); });
        if (this.copyJsonBtn) this.copyJsonBtn.addEventListener('click', () => this.copyJSON());
        if (this.clearBtn) this.clearBtn.addEventListener('click', () => { document.getElementById('clearModal').classList.remove('hidden'); });

        // JSON Collapse functionality
        const jsonCollapseBtn = document.getElementById('jsonCollapseBtn');
        const jsonContent = document.getElementById('jsonContent');
        if (jsonCollapseBtn && jsonContent) {
            jsonCollapseBtn.addEventListener('click', () => {
                const isCollapsed = jsonContent.classList.contains('collapsed');
                if (isCollapsed) {
                    jsonContent.classList.remove('collapsed');
                    jsonCollapseBtn.classList.remove('collapsed');
                    jsonCollapseBtn.textContent = '▼';
                } else {
                    jsonContent.classList.add('collapsed');
                    jsonCollapseBtn.classList.add('collapsed');
                    jsonCollapseBtn.textContent = '▼';
                }
            });
        }

        // Import modal actions
        const importConfirm = document.getElementById('importConfirmBtn');
        const importCancel = document.getElementById('importCancelBtn');
        if (importConfirm) importConfirm.addEventListener('click', () => this.importJSON());
        if (importCancel) importCancel.addEventListener('click', () => { document.getElementById('importModal').classList.add('hidden'); this.jsonImportArea.value = ''; });

        // Clear modal actions
        const clearConfirm = document.getElementById('clearConfirmBtn');
        if (clearConfirm) clearConfirm.addEventListener('click', () => { this.clearAll(); document.getElementById('clearModal').classList.add('hidden'); });
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        // Show selected tab
        const el = document.querySelector(`[data-content="${tabName}"]`);
        if (el) el.classList.add('active');
        // Update button states
        document.querySelectorAll('[data-tab]').forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    connectWebSocket() {
        const host = this.wsAddress?.value || 'ws://localhost';
        const port = this.wsPort?.value || '8080';
        const url = host.includes('://') ? `${host}:${port}` : `ws://${host}:${port}`;
        try {
            this.ws = new WebSocket(url);
            this.ws.addEventListener('open', () => { this.wsConnected = true; this.updateConnectionStatus(); this.showNotification('Connected to Streamer.bot', 'success'); });
            this.ws.addEventListener('message', (ev) => this.handleWsMessage(ev));
            this.ws.addEventListener('close', () => { this.wsConnected = false; this.updateConnectionStatus(); this.showNotification('Disconnected from Streamer.bot', 'warn'); });
            this.ws.addEventListener('error', (e) => { console.error('WebSocket error', e); this.showNotification('WebSocket error', 'error'); });
        } catch (err) {
            console.error(err);
            this.showNotification('Failed to connect', 'error');
        }
    }

    disconnectWebSocket() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.wsConnected = false;
        this.updateConnectionStatus();
    }

    updateConnectionStatus() {
        if (!this.wsStatusDot || !this.wsStatusText) return;
        if (this.wsConnected) {
            this.wsStatusDot.classList.remove('offline');
            this.wsStatusDot.classList.add('online');
            this.wsStatusText.textContent = 'Connected';
            this.connectBtn.textContent = 'Disconnect';
        } else {
            this.wsStatusDot.classList.remove('online');
            this.wsStatusDot.classList.add('offline');
            this.wsStatusText.textContent = 'Disconnected';
            this.connectBtn.textContent = 'Connect';
        }
    }

    handleWsMessage(event) {
        let data = null;
        try { data = JSON.parse(event.data); } catch (e) { console.error('Failed to parse WS message:', e); return; }
        console.log('WS Message received:', data);
        
        // Handle GetGlobal response - returns variables object
        if (data && data.status === 'ok' && data.variables) {
            console.log('✓ GetGlobal response detected');
            const varName = this.globalVarName?.value || 'WEBWUI_WebhookPayload';
            console.log('Looking for variable:', varName);
            console.log('Available variables:', Object.keys(data.variables));
            const varData = data.variables[varName];
            console.log('Variable data:', varData);
            
            if (varData) {
                try {
                    let parsed;
                    // Streamer.bot returns {name, value, lastWrite}
                    // The actual JSON is in varData.value
                    const jsonString = typeof varData.value === 'string' ? varData.value : JSON.stringify(varData.value);
                    console.log('JSON string to parse:', jsonString.substring(0, 100) + '...');
                    parsed = JSON.parse(jsonString);
                    console.log('Parsed data:', parsed);
                    this.loadFromJSON(parsed);
                    this.showNotification('Global variable loaded', 'success');
                } catch (err) {
                    console.error('Failed to parse variable value:', err, 'varData:', varData);
                    this.showNotification('Global variable is not valid JSON', 'error');
                }
            } else {
                console.warn('Variable value is empty or undefined');
                this.showNotification('Global variable not found or empty', 'warn');
            }
        } else {
            console.log('Not a GetGlobal response:', { status: data?.status, hasVariables: !!data?.variables });
        }
    }

    loadGlobalVariable() {
        if (!this.wsConnected || !this.ws) { 
            this.showNotification('Not connected to Streamer.bot', 'error'); 
            return; 
        }
        const varName = this.globalVarName?.value || 'WEBWUI_WebhookPayload';
        // Correct GetGlobal format per Streamer.bot docs
        const req = { request: 'GetGlobal', id: '1', variable: varName, persisted: true };
        console.log('Sending GetGlobal request:', req);
        this.ws.send(JSON.stringify(req));
        this.showNotification(`Loading global variable: ${varName}`, 'info');
    }

    updateWebhookButtonState() {
        if (this.testWebhookBtn) {
            const hasWebhook = this.webhookUrl && this.webhookUrl.value.trim().length > 0;
            this.testWebhookBtn.disabled = !hasWebhook;
            this.testWebhookBtn.title = hasWebhook ? 'Send a test message to the webhook' : 'Enter a Discord Webhook URL to test';
        }
    }

    testWebhook() {
        if (!this.webhookUrl || !this.webhookUrl.value.trim()) {
            this.showNotification('Discord Webhook URL is required', 'error');
            return;
        }
        
        const json = this.buildJSON();
        const payload = json.payload || json;
        
        // Check if payload has content
        if (!payload.content && (!payload.embeds || payload.embeds.length === 0)) {
            this.showNotification('Message content or embeds required', 'error');
            return;
        }
        
        // Use native fetch with proper error handling
        console.log('Sending test webhook:', this.webhookUrl.value, payload);
        
        fetch(this.webhookUrl.value, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => {
            console.log('Webhook response:', res.status, res.statusText);
            if (res.status === 204) {
                this.showNotification('Test webhook sent successfully! 📤', 'success');
            } else if (res.ok) {
                this.showNotification('Test webhook sent successfully! 📤', 'success');
            } else if (res.status === 401 || res.status === 404) {
                this.showNotification('Invalid webhook URL or expired', 'error');
            } else {
                this.showNotification(`Webhook error: ${res.status} ${res.statusText}`, 'error');
            }
        })
        .catch(err => {
            console.error('Webhook fetch error:', err);
            this.showNotification(`Failed to send webhook: ${err.message}`, 'error');
        });
    }

    // Embeds: create UI block for one embed
    addEmbed(data = {}) {
        const container = document.createElement('div');
        container.className = 'embed-item';
        container.innerHTML = `
            <div class="embed-item-header"><span>Embed</span><div class="embed-item-controls"><button class="collapse-toggle" title="Toggle collapse">▼</button><button class="btn btn-remove" data-remove-embed>Remove</button></div></div>
            <div class="embed-section"><strong>Basic Info</strong><div class="basic-info-row"><input class="emb-title" placeholder="Title"><div class="embed-row-color"><input class="emb-color" placeholder="#3366ff"><input type="color" class="emb-color-picker"></div></div><textarea class="emb-desc" placeholder="Description" rows="3"></textarea><input class="emb-url" placeholder="URL"></div>
            <div class="embed-section"><strong>Author</strong><input class="emb-author-name" placeholder="Name"><input class="emb-author-url" placeholder="URL"><input class="emb-author-icon" placeholder="Icon URL"></div>
            <div class="embed-section"><strong>Fields</strong><div class="embed-fields-container"></div><button class="btn embed-add-field-btn">Add Field</button></div>
            <div class="embed-section"><strong>Images</strong><input class="emb-thumbnail" placeholder="Thumbnail URL"><input class="emb-image" placeholder="Image URL"></div>
            <div class="embed-section"><strong>Footer</strong><input class="emb-footer-text" placeholder="Footer text"><input class="emb-footer-icon" placeholder="Footer icon URL"></div>
            <div class="embed-section"><label><input type="checkbox" class="emb-timestamp-enabled"> Use timestamp</label><input type="datetime-local" class="emb-timestamp"></div>
        `;

        // populate
        if (data.title) container.querySelector('.emb-title').value = data.title;
        if (data.description) container.querySelector('.emb-desc').value = data.description;
        if (data.url) container.querySelector('.emb-url').value = data.url;
        if (data.color !== undefined && data.color !== null) container.querySelector('.emb-color').value = '#' + (Number(data.color).toString(16).padStart(6, '0'));
        if (data.author) {
            container.querySelector('.emb-author-name').value = data.author.name || '';
            container.querySelector('.emb-author-url').value = data.author.url || '';
            container.querySelector('.emb-author-icon').value = data.author.icon_url || '';
        }
        if (data.footer) {
            container.querySelector('.emb-footer-text').value = data.footer.text || '';
            container.querySelector('.emb-footer-icon').value = data.footer.icon_url || '';
        }
        if (data.thumbnail) container.querySelector('.emb-thumbnail').value = data.thumbnail.url || '';
        if (data.image) container.querySelector('.emb-image').value = data.image.url || '';
        if (data.timestamp) { container.querySelector('.emb-timestamp-enabled').checked = true; try { container.querySelector('.emb-timestamp').value = new Date(data.timestamp).toISOString().slice(0,16); } catch(e){} }

        // fields
        const fieldsContainer = container.querySelector('.embed-fields-container');
        if (data.fields && Array.isArray(data.fields)) data.fields.forEach(f => this._appendFieldToContainer(fieldsContainer, f));

        // events
        container.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', () => { this.updatePreview(); this.saveToLocalStorage(); }));
        container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', () => { this.updatePreview(); this.saveToLocalStorage(); }));
        container.querySelectorAll('.emb-color-picker').forEach(p => p.addEventListener('input', (e) => { const input = p.parentElement.querySelector('.emb-color'); if (input) input.value = e.target.value; this.updatePreview(); this.saveToLocalStorage(); }));
        container.querySelector('.embed-add-field-btn').addEventListener('click', () => { this._appendFieldToContainer(fieldsContainer); this.updatePreview(); this.saveToLocalStorage(); });
        container.querySelector('[data-remove-embed]').addEventListener('click', () => { container.remove(); this.updatePreview(); this.saveToLocalStorage(); });
        const collapseBtn = container.querySelector('.collapse-toggle');
        if (collapseBtn) collapseBtn.addEventListener('click', (e) => { e.preventDefault(); collapseBtn.classList.toggle('collapsed'); container.classList.toggle('collapsed'); });

        this.embedsContainer.appendChild(container);
        this.updatePreview();
    }

    _appendFieldToContainer(fieldsContainer, fieldData = {}) {
        const fid = Date.now() + Math.floor(Math.random()*1000);
        const fieldItem = document.createElement('div');
        fieldItem.className = 'field-item';
        fieldItem.innerHTML = `
            <div class="field-item-header"><span>Field</span><button class="collapse-toggle" title="Toggle collapse">▼</button><button class="btn btn-remove">Remove</button></div>
            <input class="field-name" placeholder="Name">
            <textarea class="field-value" rows="2" placeholder="Value"></textarea>
            <label><input type="checkbox" class="field-inline" id="inline-${fid}"> Inline</label>
        `;
        fieldsContainer.appendChild(fieldItem);
        if (fieldData.name) fieldItem.querySelector('.field-name').value = fieldData.name;
        if (fieldData.value) fieldItem.querySelector('.field-value').value = fieldData.value;
        if (fieldData.inline) fieldItem.querySelector('.field-inline').checked = !!fieldData.inline;

        fieldItem.querySelector('.field-name').addEventListener('input', () => { this.updatePreview(); this.saveToLocalStorage(); });
        fieldItem.querySelector('.field-value').addEventListener('input', () => { this.updatePreview(); this.saveToLocalStorage(); });
        fieldItem.querySelector('.field-inline').addEventListener('change', () => { this.updatePreview(); this.saveToLocalStorage(); });
        fieldItem.querySelector('.btn-remove').addEventListener('click', () => { fieldItem.remove(); this.updatePreview(); this.saveToLocalStorage(); });
        const fieldCollapseBtn = fieldItem.querySelector('.collapse-toggle');
        if (fieldCollapseBtn) fieldCollapseBtn.addEventListener('click', (e) => { e.preventDefault(); fieldCollapseBtn.classList.toggle('collapsed'); fieldItem.classList.toggle('collapsed'); });
    }

    getEmbedsData() {
        const out = [];
        if (!this.embedsContainer) return out;
        this.embedsContainer.querySelectorAll('.embed-item').forEach(container => {
            const embed = {};
            const title = container.querySelector('.emb-title')?.value || '';
            const desc = container.querySelector('.emb-desc')?.value || '';
            const url = container.querySelector('.emb-url')?.value || '';
            const color = container.querySelector('.emb-color')?.value || '';
            if (title) embed.title = title;
            if (desc) embed.description = desc;
            if (url) embed.url = url;
            if (color) embed.color = parseInt(color.replace('#',''), 16);
            const authorName = container.querySelector('.emb-author-name')?.value || '';
            if (authorName) embed.author = { name: authorName };
            const authorUrl = container.querySelector('.emb-author-url')?.value || '';
            if (authorUrl) {
                embed.author = embed.author || {};
                embed.author.url = authorUrl;
            }
            const authorIcon = container.querySelector('.emb-author-icon')?.value || '';
            if (authorIcon) {
                embed.author = embed.author || {};
                embed.author.icon_url = authorIcon;
            }

            // fields
            const fields = [];
            container.querySelectorAll('.field-item').forEach(fi => {
                const name = fi.querySelector('.field-name')?.value || '';
                const value = fi.querySelector('.field-value')?.value || '';
                const inline = fi.querySelector('.field-inline')?.checked || false;
                if (name || value) fields.push({ name, value, inline });
            });
            if (fields.length) embed.fields = fields;

            const thumb = container.querySelector('.emb-thumbnail')?.value || '';
            if (thumb) embed.thumbnail = { url: thumb };
            const image = container.querySelector('.emb-image')?.value || '';
            if (image) embed.image = { url: image };
            const footerText = container.querySelector('.emb-footer-text')?.value || '';
            if (footerText) embed.footer = { text: footerText };
            const footerIcon = container.querySelector('.emb-footer-icon')?.value || '';
            if (footerIcon) {
                embed.footer = embed.footer || {};
                embed.footer.icon_url = footerIcon;
            }

            const tsEnabled = container.querySelector('.emb-timestamp-enabled')?.checked || false;
            const tsVal = container.querySelector('.emb-timestamp')?.value || '';
            if (tsEnabled) embed.timestamp = tsVal ? new Date(tsVal).toISOString() : new Date().toISOString();

            // Only add embed if it has meaningful content
            const hasContent = title || desc || url || color || authorName || authorUrl || authorIcon || 
                              fields.length > 0 || thumb || image || footerText || footerIcon || tsEnabled;
            if (hasContent) {
                out.push(embed);
            }
        });
        return out;
    }

    buildJSON() {
        const payload = { content: this.msgContent?.value || '' };
        const embeds = this.getEmbedsData();
        if (embeds.length) payload.embeds = embeds;
        if (this.webhookUsername?.value) payload.username = this.webhookUsername.value;
        if (this.webhookAvatarUrl?.value) payload.avatar_url = this.webhookAvatarUrl.value;
        const result = { payload, WebHookUrl: this.webhookUrl?.value || '' };
        return result;
    }

    updatePreview() {
        const json = this.buildJSON();
        const payload = json.payload || json;
        
        // Webhook header with avatar and username
        const webhookUsername = this.webhookUsername ? this.webhookUsername.value || 'WEB•UI - Announcement' : 'WEB•UI - Announcement';
        const webhookAvatarUrl = this.webhookAvatarUrl ? this.webhookAvatarUrl.value || 'WEBWUI_Icon.svg' : 'WEBWUI_Icon.svg';
        
        let previewHTML = `<div class="webhook-header">
            <img src="${webhookAvatarUrl}" class="webhook-avatar" onerror="this.src='WEBWUI_Icon.svg'">
            <span class="webhook-name">${this.escapeHtml(webhookUsername)}</span>
        </div>`;
        
        if (payload.content) previewHTML += `<div class="message-content">${this.escapeHtml(payload.content)}</div>`;
        if (payload.embeds && payload.embeds.length) payload.embeds.forEach(e => previewHTML += this.renderEmbedPreview(e));
        if (!payload.content && (!payload.embeds || !payload.embeds.length)) previewHTML += '<div class="message-content">No message configured yet</div>';
        if (this.previewMessage) this.previewMessage.innerHTML = previewHTML;
        this.updateJSONViewer();
    }

    renderEmbedPreview(embed) {
        const color = embed.color ? '#' + embed.color.toString(16).padStart(6, '0') : '#5865f2';
        let html = `<div class="embed-preview" style="border-left: 4px solid ${color}">`;
        if (embed.author) { html += '<div class="embed-header">'; if (embed.author.icon_url) html += `<img src="${embed.author.icon_url}" class="embed-author-icon" onerror="this.style.display='none'">`; html += `<span class="embed-author-name">${this.escapeHtml(embed.author.name || '')}</span></div>`; }
        if (embed.title) html += `<div class="embed-title">${this.escapeHtml(embed.title)}</div>`;
        if (embed.description) html += `<div class="embed-description">${this.escapeHtml(embed.description).replace(/\n/g,'<br>')}</div>`;
        if (embed.thumbnail && embed.thumbnail.url) html += `<img src="${embed.thumbnail.url}" class="embed-thumbnail" onerror="this.style.display='none'">`;
        
        // Handle fields with proper inline/non-inline rendering
        if (embed.fields && embed.fields.length) { 
            let currentInlineGroup = [];
            embed.fields.forEach((field, index) => {
                if (field.inline && currentInlineGroup.length < 3) {
                    // Add to current inline group
                    currentInlineGroup.push(field);
                    // If we're at the last field or next field is not inline or we have 3 fields, render the group
                    if (index === embed.fields.length - 1 || !embed.fields[index + 1]?.inline || currentInlineGroup.length === 3) {
                        html += '<div class="embed-fields">'; 
                        currentInlineGroup.forEach(inlineField => {
                            html += `<div class="embed-field"><div class="embed-field-name">${this.escapeHtml(inlineField.name)}</div><div class="embed-field-value">${this.escapeHtml(inlineField.value).replace(/\n/g,'<br>')}</div></div>`;
                        });
                        html += '</div>';
                        currentInlineGroup = [];
                    }
                } else {
                    // Non-inline field - render any pending inline group first
                    if (currentInlineGroup.length > 0) {
                        html += '<div class="embed-fields">'; 
                        currentInlineGroup.forEach(inlineField => {
                            html += `<div class="embed-field"><div class="embed-field-name">${this.escapeHtml(inlineField.name)}</div><div class="embed-field-value">${this.escapeHtml(inlineField.value).replace(/\n/g,'<br>')}</div></div>`;
                        });
                        html += '</div>';
                        currentInlineGroup = [];
                    }
                    // Render non-inline field
                    html += `<div class="embed-field-full"><div class="embed-field-name">${this.escapeHtml(field.name)}</div><div class="embed-field-value">${this.escapeHtml(field.value).replace(/\n/g,'<br>')}</div></div>`;
                }
            }); 
        }
        
        if (embed.image && embed.image.url) html += `<img src="${embed.image.url}" class="embed-image" onerror="this.style.display='none'">`;
        if (embed.footer) { html += '<div class="embed-footer">'; if (embed.footer.icon_url) html += `<img src="${embed.footer.icon_url}" class="embed-footer-icon" onerror="this.style.display='none'">`; html += `<span>${this.escapeHtml(embed.footer.text || '')}`; if (embed.timestamp) html += ` • ${new Date(embed.timestamp).toLocaleString()}`; html += '</span></div>'; } else if (embed.timestamp) html += `<div class="embed-footer"><span>${new Date(embed.timestamp).toLocaleString()}</span></div>`;
        html += '</div>';
        return html;
    }

    updateJSONViewer() { if (this.jsonViewer) this.jsonViewer.textContent = JSON.stringify(this.buildJSON(), null, 2); }

    escapeHtml(text = '') { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

    showNotification(message, type = 'info') {
        const el = this.notificationEl || document.getElementById('notification');
        if (!el) return;
        el.textContent = message;
        el.className = 'notification ' + (type || 'info');
        el.classList.remove('hidden');
        clearTimeout(this._notifTimeout);
        this._notifTimeout = setTimeout(() => el.classList.add('hidden'), 5000);
    }

    saveToLocalStorage() {
        const data = {
            msgContent: this.msgContent?.value || '',
            webhookUsername: this.webhookUsername?.value || '',
            webhookAvatarUrl: this.webhookAvatarUrl?.value || '',
            webhookUrl: this.webhookUrl?.value || '',
            embeds: this.getEmbedsData()
        };
        localStorage.setItem('webwuiConfig', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('webwuiConfig');
            if (!data) return;
            const config = JSON.parse(data);
            if (this.msgContent) this.msgContent.value = config.msgContent || '';
            if (this.webhookUsername) this.webhookUsername.value = config.webhookUsername || '';
            if (this.webhookAvatarUrl) this.webhookAvatarUrl.value = config.webhookAvatarUrl || '';
            if (this.webhookUrl) this.webhookUrl.value = config.webhookUrl || '';
            if (config.embeds && Array.isArray(config.embeds)) {
                if (this.embedsContainer) this.embedsContainer.innerHTML = '';
                config.embeds.forEach(e => this.addEmbed(e));
            }
        } catch (err) { console.error('Failed loading config', err); }
    }

    processStreamerBotVariables(obj) {
        // This implementation is intentionally a passthrough so server-side Streamer.bot can process variables
        return obj;
    }

    saveToStreamerBot() {
        if (!this.wsConnected || !this.ws) { this.showNotification('Not connected to Streamer.bot','error'); return; }
        const json = this.buildJSON();
        const varName = this.globalVarName?.value || 'WEBWUI_WebhookPayload';
        const processed = this.processStreamerBotVariables(json);
        const jsonString = JSON.stringify(processed);
        
        console.log('Saving to Streamer.bot:', { varName, jsonString });
        
        // Correct DoAction format per Streamer.bot docs - args as simple object
        const request = { 
            request: 'DoAction', 
            id: '1', 
            action: { id: '18a2b5ad-fa1d-444b-b2ed-c40a37bd24ce' }, 
            args: {
                variableName: varName,
                JsonPayload: jsonString
            }
        };
        
        this.ws.send(JSON.stringify(request));
        this.showNotification('Payload sent to Streamer.bot action','success');
    }

    exportJSON() { const json = this.buildJSON(); const dataStr = JSON.stringify(json, null, 2); const blob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `webwui-payload-${Date.now()}.json`; a.click(); }

    importJSON() {
        try {
            const json = JSON.parse(this.jsonImportArea.value);
            this.loadFromJSON(json);
            this.showNotification('JSON imported successfully','success');
            document.getElementById('importModal').classList.add('hidden');
            this.jsonImportArea.value = '';
        } catch (err) {
            this.showNotification('Invalid JSON: ' + err.message,'error');
        }
    }

    loadFromJSON(json) {
        const payload = json.payload || json;
        if (this.msgContent) this.msgContent.value = payload.content || '';
        if (this.webhookUsername) this.webhookUsername.value = payload.username || '';
        if (this.webhookAvatarUrl) this.webhookAvatarUrl.value = payload.avatar_url || '';
        if (this.webhookUrl) this.webhookUrl.value = json.WebHookUrl || '';
        if (payload.embeds && Array.isArray(payload.embeds)) {
            if (this.embedsContainer) this.embedsContainer.innerHTML = '';
            payload.embeds.forEach(e => this.addEmbed(e));
        }
        this.updatePreview();
        this.saveToLocalStorage();
    }

    copyJSON() { const json = this.buildJSON(); navigator.clipboard.writeText(JSON.stringify(json, null, 2)).then(() => this.showNotification('JSON copied to clipboard','success')).catch(() => this.showNotification('Failed to copy JSON','error')); }

    clearAll() { document.querySelectorAll('input[type="text"], input[type="number"], textarea, input[type="datetime-local"]').forEach(el => el.value = ''); document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false); if (this.embedsContainer) this.embedsContainer.innerHTML = ''; localStorage.removeItem('webwuiConfig'); this.updatePreview(); this.showNotification('All data cleared','info'); }
}

let app;
document.addEventListener('DOMContentLoaded', () => { 
    app = new DiscordWebhookUI(); 
    initExternalLinkModal();
});

// ============================================================
// MODAL POUR LIENS EXTERNES
// ============================================================

function initExternalLinkModal() {
    const popup = document.getElementById('popup-container');
    let linkHref = '';
    let lastActive = null;
    
    if (!popup) {
        console.warn('Popup container not found');
        return;
    }
    
    // Détection et gestion des liens externes
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Vérifie si c'est un lien externe (commence par http/https et n'est pas le domaine actuel)
        if (href && (href.startsWith('http://') || href.startsWith('https://')) && !href.includes(window.location.hostname)) {
            link.classList.add('external-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                linkHref = href;
                lastActive = document.activeElement;
                
                // Afficher l'URL dans la modal
                const urlDisplay = popup.querySelector('.popup-url');
                if (urlDisplay) {
                    urlDisplay.textContent = href;
                }
                
                popup.classList.remove('hidden');
                const dialog = popup.querySelector('.popup');
                if (dialog) {
                    dialog.focus();
                }
            });
        }
    });
    
    // Nettoyage des anciens listeners pour éviter les doublons
    const buttons = popup.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Boutons de la modal
    const newTabBtn = popup.querySelector('#new-tab');
    const sameTabBtn = popup.querySelector('#same-tab');
    const cancelBtn = popup.querySelector('#cancel');
    
    if (newTabBtn) {
        newTabBtn.addEventListener('click', () => {
            window.open(linkHref, '_blank');
            popup.classList.add('hidden');
            if (lastActive) lastActive.focus();
        });
    }
    
    if (sameTabBtn) {
        sameTabBtn.addEventListener('click', () => {
            window.location.href = linkHref;
            popup.classList.add('hidden');
            if (lastActive) lastActive.focus();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
            if (lastActive) lastActive.focus();
        });
    }
    
    // Accessibilité : touche Échap pour fermer
    const dialog = popup.querySelector('.popup');
    if (dialog) {
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popup.classList.add('hidden');
                if (lastActive) lastActive.focus();
            }
        });
    }
    
    // Clic sur le fond pour fermer
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
            if (lastActive) lastActive.focus();
        }
    });
}

