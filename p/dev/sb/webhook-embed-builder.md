<div class="center icon"><img src="web-ui/WEBWUI_Icon.svg" alt="WEB UI Logo" title="Webhook Embed Builder"></div>
<div class="center">

# **Webhook Embed Builder with User Interface • [WEB•UI]**
## Visual Discord Webhook Creator for StreamerBot

***

**Webhook Embed Builder with User Interface • [WEB•UI]** *(or WEB•UI for short)*<br/>
A powerful tool to automate sending **rich messages** on **Discord** via custom **webhooks**, designed to easily integrate with **StreamerBot**.<br/>
Create **dynamic embeds** and modify every detail on the fly!

</div>

---

## **✨ What makes WEB•UI unique?**

**Webhook Embed Builder** goes far beyond simple Discord messages. With **WEB•UI**, you get access to **advanced embed customization** via **StreamerBot**. You can update information in real-time, making announcements and interactions smoother.

> WEB•UI simplifies Discord notification automation, giving you complete control and total flexibility to adapt your communications to your community, without tedious manual management.

### **🎯 Key Features:**
* **🎨 Intuitive Web Interface** : Visual interface similar to Discohook with real-time preview
* **⚡ StreamerBot Integration** : Direct WebSocket connection with dynamic variable support
* **🛠️ Advanced Customization** : Multiple embeds support, images, custom fields
* **📤 Export/Import** : Save and share your JSON configurations
* **🧪 Live Testing** : Immediate webhook validation

## **🚀 How it works:**

### **Setup**:
> *Configuration in a few simple steps*
* Open the web interface `index.html`
* Connect to **StreamerBot** via WebSocket
* Configure your **Discord webhook URL**
* ||Create beautiful embeds effortlessly||

:::info
**📋 What you need :**
- A modern web browser
- StreamerBot running
- A Discord webhook URL
- *(Optional)* Knowledge of using StreamerBot variables
:::

### **🎨 Creating an embed:**
1. **Add your main content** in the Content tab
2. **Configure embeds** (title, description, color, images)
3. **Add custom fields** for additional information
4. **Preview in real-time** the final result
5. **Save** to StreamerBot or export to JSON

### **⚙️ StreamerBot Integration:**
1. **Save** the configuration (default variable `WEBWUI_WebhookPayload`)
2. **Import the provided C# script** into your actions (Prefer using "Execute C# Method")
3. **Trigger** via your preferred events (follows, subs, raids, etc.)

> Note: Find example guides when importing into StreamerBot!

---

## **🔧 Variables & Configuration:**

### **Main Variables:**
| Variable | Description | Type | Copy |
|----------|-------------|------|------|
| `WEBWUI_WebhookPayload` | Complete JSON configuration | Global |[copy:WEBWUI_WebhookPayload]|
| `WEBWUI_WebhookURL` | Fallback webhook URL | Argument |[copy:WEBWUI_WebhookURL]|

### **Supported Dynamic Variables:**
- `%argument%` : Import and use any variable with triggers or sub-actions then use them as you wish!
- `~GlobalVar~` : Use custom global variables!

---

## **💡 Use Cases & Examples:**

<details>
<summary>💜 **Streamers & Creators**</summary>

- **🎉 Follower notifications** with custom embeds and images
- **📺 Stream start/end announcements** automated
- **💎 Donation/bits alerts** with detailed information
- **🎮 Game changes** with automatic updates
- **🔴 Live/offline status** for your Discord servers

</details>

<details>
<summary>👥 **Communities & Servers**</summary>

- **📅 Community events** with rich embeds
- **🤖 Existing Discord bot integration**
- **📢 Coordinated multi-server announcements**
- **📊 Real-time statistics** with variables
- **🏆 Rankings** and automated leaderboards

</details>

---

## **🎮 User Interface:**

The WEB•UI interface is divided into **two main panels**:

### **📝 Configuration Panel (Left):**
> - **⚙️ Information Tab** : Webhook URL, StreamerBot settings, WebSocket connection
> - **🎨 Content Tab** : Main message, embed creation and management

### **👁️ Preview Panel (Right):**
> - **🖼️ Discord Preview** : Real-time visualization of your message
> - **📄 JSON Viewer** : Generated code with export/import/copy options

:::warning
**⚠️ Important Note:** <br/>
- StreamerBot variables (`%user%`, `~globals~`) only work when sending via StreamerBot, not with the interface's "Test Webhook" button.
:::

---

## **🌟 Advantages & Strengths:**

:::danger
**🔥 Why choose WEB•UI?**

- **🎯 Intuitive interface** : No code required, all visual
- **⚡ Native integration** : Specifically designed for StreamerBot
- **👀 Real-time preview** : See results instantly
- **🔄 Dynamic variables** : Automatic adaptive content
- **💾 Flexible saving** : JSON export + StreamerBot variables
- **🛠️ Optimized script** : Professional C# code provided
- **📱 Modern interface** : Responsive and accessible design
:::

---

## **📥 Installation & Download:**

Import string: [copy:PLACEHOLDER]
```
PLACEHOLDER
```

{"Access WEB•UI Interface"-s}(https://sorylokan.github.io/web-ui/index.html)

---

## **📋 What's New? *(Changelog)*:**

<details>
<summary>**📅 Changelog**</summary>

```changelog
[XX.01.26] # WEB•UI v1.0.0 - Initial Release!
+ Added: Complete web interface with real-time preview
+ Added: Live webhook testing from interface
+ Added: Native StreamerBot WebSocket integration
+ Added: JSON import/export for saving/sharing
+ Added: Standardized WEBWUI_* technical nomenclature
+ Added: Multiple embeds support with custom fields
+ Added: StreamerBot dynamic variables (%user%, ~globals~)
+ Added: Optimized C# script
- Removed: Herobrine (But... He was there!?)
```

</details>

---

▼ ***Discover my other StreamerBot creations!*** ▼
> {"**🎬 YouTube Video Alert**"-s}(?p=dev/sb/youtube-video-alert) - Automatic new video notifications
>
> {"**🎵 MPVar - Media Variables**"-g}(?p=dev/sb/mpvar) - Media player info retrieval
>
> {"**⏱️ OBS Timer**"-p}(?p=dev/sb/obs-timer) - Flexible timer for your scenes
>
> {"**🎁 Essential Starter Kit**"-n}(?p=dev/sb/essential-starter-kit) - Complete starter pack

---

**💖 Developed with passion by Sorylokan for the StreamerBot community**

*Webhook Embed Builder with User Interface • [WEB•UI] - Create professional Discord embeds effortlessly*
