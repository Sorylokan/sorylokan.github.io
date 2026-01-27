<div class="center icon"><img src="https://sorylokan.github.io/content/streamerbot/web-ui/WEBWUI_Icon.svg" alt="WEB•UI Logo" title="Webhook Embed Builder"></div>
<div class="center">

# **WEB•UI**
## Build Discord embeds visually. Use them everywhere in StreamerBot.

***

**Stop fighting JSON and argument spaghetti.**
**WEB•UI** is a visual editor that lets you **design Discord webhook embeds exactly as they will appear**, then **store them once** as StreamerBot global variables and reuse them in any action.

*What you see is what Discord gets.*
</div>

---

## ✨ Why WEB•UI exists

Creating Discord embeds inside StreamerBot usually means:

* dozens of arguments
* manual JSON editing
* fragile configs that are hard to reuse

**WEB•UI flips the workflow.**
You design first, automate second.

* Visual editor instead of raw data
* One saved payload instead of repeated configuration
* Full compatibility with StreamerBot variables

---

## 🚀 Core Features

* 🎨 **Visual Embed Builder**
  Create Discord embeds visually with a live Discord-style preview

* 👁️ **Real-time Preview**
  See exactly what will be sent to Discord as you edit

* 🔌 **Native StreamerBot Integration**
  Save payloads directly into global variables via WebSocket

* 🔁 **Dynamic Variables Support**

  * Action arguments: `%myArgument%`
  * Global variables: `~myGlobalVar~`

* 💾 **Reusable Payloads**
  Design once, reuse everywhere

* 📤 **Import / Export JSON**
  Backup, share, and version your embeds easily

* 🧪 **Live Webhook Testing**
  Test payloads instantly without touching StreamerBot

---

## 🎯 Who is this for?

<details>
<summary><strong>🎮 Streamers & Content Creators</strong></summary>

* Stream start / end announcements
* Follow, sub, raid, donation notifications
* Game or category changes
* Automated status updates

</details>

<details>
<summary><strong>👥 Communities & Discord Servers</strong></summary>

* Event announcements
* Multi-server notifications
* Rich informational messages
* Statistics and leaderboards

</details>

---

## 🧠 How WEB•UI works

### Simple workflow

1. Open the WEB•UI interface
2. Design your embed visually
3. Preview the final Discord message
4. Save it to StreamerBot
5. Reuse it in any action

> From idea to automation in under 5 minutes.

---

## 🖥️ User Interface Overview

WEB•UI is split into two main panels:

### 📝 Configuration Panel

* Webhook & StreamerBot settings
* Content and embed configuration
* Embed and field management

### 👁️ Preview Panel

* Discord-style message preview
* Generated JSON viewer
* Copy / export / import tools

---

## ⚙️ StreamerBot Integration

### Saving a payload

By default, WEB•UI saves your configuration into:

* `WEBWUI_WebhookPayload` *(Global Variable)*

You can change the variable name if needed.

### Using the payload

1. Add **Core → C# → Execute C# Method**
2. Method group: `[WEB•UI] > Mode`
3. Method:

   * `SendOnly` – send the embed
   * `EditMode` – edit an existing message

> Payloads can be reused across unlimited actions.

---

## 🔧 Variables

### Main variables

| Variable                | Description               | Type     |
| ----------------------- | ------------------------- | -------- |
| `WEBWUI_WebhookPayload` | Full webhook payload JSON | Global   |
| `WEBWUI_WebhookURL`     | Fallback webhook URL      | Argument |

### Dynamic text support

* `%argument%` → Action arguments
* `~globalVar~` → StreamerBot global variables

> Variables are resolved when sending via StreamerBot.

---

## 📥 Installation

### Quick install

1. Download the `.sb` import file *(or copy the string [copy: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])*
2. Drag & drop it into StreamerBot

That’s it. No manual setup required.

### Requirements

* StreamerBot running
* WebSocket enabled
* A Discord webhook URL
* A modern web browser

---

## 🧭 Coming Soon

* 🌗 Dark / light theme toggle
* 🖥️ **WEB•UI Desktop App**

  * Fully offline
  * No browser required
  * No local server

---

### 🔗 Useful Links

* 🌐 **Open WEB•UI**
  {"Web UI"-s}(https://sorylokan.github.io/content/streamerbot/web-ui/)

* 📦 **Download StreamerBot Import**
  {"Github Repo"-n}(https://github.com/Sorylokan/sorylokan.github.io/blob/main/content/streamerbot/web-ui/Script/WEBWUI-import.sb)

* 🧠 **View C# Script**
  {"look at the c# scrit"-g}(https://github.com/Sorylokan/sorylokan.github.io/blob/main/content/streamerbot/web-ui/Script/WEBWUI-Sender.cs)

---

## 📜 Changelog

<details>
<summary><strong>WEB•UI v1.0.0 – Initial Release</strong></summary>

```changelog
+ Visual web interface
+ Real-time Discord preview
+ StreamerBot WebSocket integration
+ JSON import / export
+ Multiple embeds & fields support
+ Dynamic StreamerBot variables
+ Optimized C# sender script
- Removed Herobrine (But... He was there!?)
```

</details>

---

<div class="center">

**Developed with passion by Sorylokan**
*WEB•UI — Because great Discord embeds should be easy.*

</div>
