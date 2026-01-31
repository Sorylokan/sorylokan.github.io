# Webhook Embed Builder • Documentation

## 📦 Global Variables

The extension uses two primary global variables for communication between the Web UI and Streamer.bot:

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `WEBWUI_WebhookPayload` | Stores the complete JSON payload for the webhook message | ✅ Yes |
| `WEBWUI_WebhookURL` | Discord webhook URL (can be set in Web UI or as argument) | ⚠️ Optional* |

> **Note:** If `WEBWUI_WebhookURL` is not specified in the Web UI, you must define it as an argument in Streamer.bot before executing the send action.

---

## 🔧 Using Custom Global Variables

To load a webhook payload from a **custom global variable** into the Web UI:

1. In Streamer.bot, add a **Global Variable Get** sub-action
2. Set **Variable Name** to your custom variable (e.g., `MyCustomPayload`)
3. Set **Destination Variable** to `WEBWUI_WebhookPayload`
4. The Web UI will automatically detect and load this payload

**Example of a workflow:**
```
Trigger → Global Variable Get (MyCustomPayload to WEBWUI_WebhookPayload) → Execute Action
```

---

## 🎨 Streamer.bot Variables Support

You can use **any Streamer.bot variable** within your webhook payloads:

### Variable Types
- **Arguments:** `%variableName%` - Passed from triggers or sub-actions
- **Global Variables:** `~globalVariableName~` - Persistent across sessions

### Important Rules
1. **Define variables BEFORE execution** - All variables must exist before the webhook is sent
2. **Set proper triggers** - Ensure your action has the right trigger to populate variables
3. **Test thoroughly** - The "Test Webhook" button in Web UI does **NOT** process Streamer.bot variables

### Use Case Examples
```
/-[Embed]--
| Title:       "%user% just subscribed!" 
| Description: "Welcome to ~streamerName~'s community!"
| Image URL:   "%userProfileImage%"
\----------
```

### 📚 Learn More About Streamer.bot Variables
* {"Variables Guide"-s}(https://docs.streamer.bot/guide/variables) - {"Trigger Variables"-g}(https://docs.streamer.bot/api/triggers) - {"Sub-action Variables"-n}(https://docs.streamer.bot/api/sub-actions)

---

## 🖼️ Web UI Preview Information

### Placeholder Values
The preview window displays **placeholder data** for visual reference only:

| Element | Placeholder Value | Actual Value Source |
|---------|------------------|---------------------|
| Username | `WEB•UI - Announcement` | Discord webhook settings or Web UI input |
| Avatar | `WEBWUI_Icon.svg` | Discord webhook settings or Web UI input |

> **Important:** These are **NOT** the values sent to Discord. By default, Discord webhooks use the username and avatar configured when the webhook was created on Discord's server settings.

### Preview Accuracy
The Web UI preview closely mimics Discord's appearance but **may not be 100% accurate**. Always test your embeds in a real Discord channel before deploying to production.

**Differences to note:**
- Color rendering may vary slightly
- Font sizes might differ marginally
- Markdown parsing could have minor discrepancies
- Image scaling behavior may not match exactly

---

## 📥 Load Configuration Button

**Purpose:** Import a previously saved webhook payload from Streamer.bot into the Web UI.

### ⚠️ Warning
This action will **completely overwrite** your current work in the Web UI:
- All message content
- All webhook settings (URL, username, avatar)
- All embeds and their fields
- All images and configurations

### How to Use
1. Ensure the payload is saved in Streamer.bot as a global variable (default: `WEBWUI_WebhookPayload`)
2. Connect the Web UI to Streamer.bot via WebSocket
3. Enter the global variable name if different from default
4. Click **Load Config** button
5. Confirm the overwrite action

> **Tip:** Save your current work using "Export JSON" before loading a new configuration to avoid losing unsaved changes.

---

## 💡 Best Practices

### Typical Use Cases
- Stream start notifications
- Scheduled announcements
- Game events
- Community milestones
- Dynamic embeds with static layout
- Subscription / Follow alerts
- Multi-language messages

### Testing Workflow
1. **Design** your webhook in the Web UI
2. **Save** the configuration to Streamer.bot
3. **Test** with Streamer.bot variables in a test Discord channel
4. **Refine** based on results
5. **Deploy** to production

### Variable Management
- Use descriptive variable names (`%subscriberName%` not `%var1%`)
- Document which triggers provide which variables
- Test variable population before going live
- Use fallback values when possible: `%userName% or "Anonymous"`

### Performance Tips
- Reuse payloads via global variables for consistency
- Keep embed descriptions under 4096 characters
- Limit to 10 embeds per message maximum (Discord limit)
- Optimize image URLs for fast loading

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Variables showing as literal text | Ensure variables are defined before action execution |
| Webhook not sending | Check WebSocket connection and `WEBWUI_WebhookURL` value |
| Preview looks different in Discord | Expected behavior - test in real Discord channel |
| Load Config not working | Verify variable name matches exactly in Streamer.bot |
| Images not displaying | Check URL accessibility and Discord's CDN requirements |


**Web UI Version:** 2.3 • **Extension Version:** 1 • **Last Updated:** January 2026
