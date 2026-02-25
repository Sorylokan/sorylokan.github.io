[TOC-true]
<div class="center">

# Essential Starter Kit
## Documentations</div>

***

## 📌 What This Kit Actually Is

This is **not just a pack of commands**.

It is:

* A structured action system
* Pre-configured triggers
* Moderation tools
* Automated announcements
* Ready-to-use interactive commands

***

## 📥 Installation Guide

### Step 1 — Requirements

Make sure:

* Streamer.bot is updated
* Twitch is connected
* (Optional) Discord bot is connected if using the Discord embed feature

---

### Step 2 — Import

1. Open Streamer.bot
2. Go to **Actions**
3. Click **Import**
4. Load the provided JSON file
5. Confirm

If everything imports correctly, you will see new folders and actions appear.

***

## 🔄 Automations (Core System)

These are background systems that work automatically.

---

### 📣 Discord Embed

Automatically announces when you go live.

<br>\# How it works:

* Detects stream going live
* Builds an embed message
* Sends it to a configured Discord channel

<br>\# What you should check:

* Bot permissions (Send Messages + Embed Links)
* Correct channel ID
* Optional role ping

<br>\# Why it's important:

Consistency. Your Discord always knows you're live.

---

### 💬 Chat Announcements

Sends periodic messages in chat.

<br>\# What you can adjust:

* Interval (not too short)
* Message content
* Activation state

<br>\# Recommendation:

Keep it subtle.
A good chat feels alive — not automated.

---

### 👋 Greets System

Welcomes viewers when they enter chat.

<br>\# Important notes:

* Greeting everyone can become overwhelming
* Consider adding cooldowns
* Avoid greeting the same user repeatedly

This system is intentionally simple so you can expand it later.

---

### ⛓️ Auto Delete Links

One of the most useful moderation tools included.

<br>\# What it does:

* Detects links in chat
* Deletes the message
* Applies timeout automatically

<br>\# Why it's powerful:

It reduces spam instantly.

⚠️ Important:

It does **not replace human moderation**.

You can combine it with:

* VIP exemptions
* Moderator exemptions
* Temporary authorization command

***

## 🎮 Interactive Commands

These are chat commands your viewers can use.

---

### 😂 !dadjokes

Sends a random dad joke.

<br>Simple structure:

* Trigger: `!dadjokes`
* Sub-action: send random message

<br>You can expand it by:

* Adding more jokes
* Using API-based jokes later

---

### 🪙 !headsortails

A simple RNG-based game.
Use : !headsortails `<heads or tails>`

<br>It’s a perfect beginner example of:

* Variables
* Random selection
* Conditional logic

<br>You can extend it with:

* Points system
* VIP rewards
* Cooldowns

---

### 🎲 !FiftyFever

Mini gambling system.
Use : !FiftyFever `<0-50>`

<br>Great example of:

* Temporary rewards
* Conditional logic
* Time-based role assignment

<br>If you want to improve it later:

* Connect it to channel points
* Add leaderboard tracking

***

## 🛡️ Moderator Tools

These commands are restricted to moderators.

---

### 🐌 Slow Mode Control

Allows mods to enable slow mode quickly.

Why useful:

* During raids
* During heated discussions
* During high traffic moments

---

### ✒️ Set Category / Set Title

Allows fast stream adjustments without opening Twitch dashboard.

Very practical mid-stream.

---

### ✅ Authorize Link

Temporarily allows a user to post a link without being blocked by Auto Delete Links.

Perfect balance between automation and flexibility.

***

## ❗Commands Aliases

<details>
<summary><strong>🎮 Fun</strong></summary>

|Command|Aliases|
|:-|:-|
| **!HeadsOrTails** `<heads or tails>` | `!HdsOrTls`, `!HoT` |
| **!DadJokes** | `!Daddy`, `!DadJoke`, `!Jokes` |
| **!FiftyFever** `<0-50>` | `!Fifty`, `!Fever` |
| **!hug** `<@user>` | `!hugs`, `!cuddle`, `!cuddles` |

</details><details>
<summary><strong>🛡️ Modération</strong></summary>

|Command|Aliases|
|:-|:-|
| **!AuthorizeLink** `<@user>` | `!PermLink` |
| **!FollowersOnly** `<minutes>` | `!FollowerOnly`, `!FollowOnly`, `!Followers`, `!Follower` |
| **!EmoteOnly** | `!Emote`, `!EmOnly` |
| **!SubscribersOnly** | `!SubscriberOnly`, `!SubOnly` |
| **!Slow** `<seconds>` | `!SlowOff` |
| **!so** | `!Shout`, `!Shoutout` |
| **!SetTitle** `<new title>` | - |
| **!SetCategory** `<new category>` | `!SetGame` |

</details><details>
<summary><strong>🌐 Social</strong></summary>

|Command|Aliases|
|:-|:-|
| **!Commands** | `!command`, `!cmds`, `!cmd`, `!cmdlist` |
| **!social** | `!socials`, `!link`, `!links` |
| **!discord** | `!dsc`, `!dscrd`, `!dc` |
| **!lurk** | `!lurker`, `!lurks`, `!lurkers` |
| **!FollowStats** | `!FollowStat`, `!FStats`, `!FStat`, `!FollowAge`, `!FAge` |

</details>

---

## 🎨 Customization Guide

You are encouraged to:

* Rename actions to your liking
* Rewrite chat responses
* Adjust cooldowns
* Add your own variables
* Duplicate commands and experiment

***

## ❤️ Final Notes

This kit is meant to be:

* A starting point
* A learning tool
* A structured base

You are expected to modify it! That’s the best way to learn Streamer.bot!

---

### ☕ Support

If this kit helps you, you can support the project on Ko-fi (optional):
{"My ☕Ko-fi"-n}(https://ko-fi.com/s/459b3b6797)

> No obligation.
> If it helps you, that’s already a win.
