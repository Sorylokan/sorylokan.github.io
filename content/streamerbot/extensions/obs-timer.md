# **⌛ OBS Timer for Streamer.bot**
### **A Flexible Countdown Timer for Starting Soon and BRB Scenes**

After weeks of tinkering, learning, and fine-tuning, I’m thrilled to share this timer script! :tada:  
I’m not a developer—just learning as I go—but I’ve built something functional and flexible, perfect for enhancing your stream. It’s not perfect, but with your feedback and impressions, I can make it even better. Let me know what you think!  

## **What This Timer Does**
- **Perfect for Starting Soon or Pause Scenes**: Automatically display a countdown on OBS to inform your viewers.  
- **Highly Customizable**: 
  - Define your timer duration and actions directly in Streamer.bot.  
  - Customize the appearance and style of the timer in OBS.  
- **Flexible Triggering**: Activate the timer from any Streamer.bot trigger—chat commands, channel points, subscriptions, or custom actions.  
- **Dynamic End Actions**: Automatically display a message, switch scenes, or restart the timer when it ends.  

## **How to Use It**
### Required Arguments:
1. **`textSourceName`**: The OBS GDI Text source to display the timer countdown.  
2. **`timerStart`**: The starting countdown duration, either in `hh:mm:ss` or `mm:ss` format.  
3. **`timerOutcome`**: What happens when the timer ends:  
> - **Set to `"message"`**: Displays the value of `actionDetail` as text in OBS.  
> - **Set to `"scene"`**: Switches to the OBS scene specified in `actionDetail`.  
> - **Set to `"restart"`**: Restarts the timer with the original duration from `timerStart`.  

4. **`actionDetail`**: Specifies the message or OBS scene name for the end action.  
> - *Example*: `"Break is over!"` (for messages) or `"LiveScene"` (for scene changes).

## **Examples**
### 1. **Countdown with a Message**
- **Arguments**:
  - `textSourceName`: `"CountdownTimer"`  
  - `timerStart`: `"02:30"`  
  - `timerOutcome`: `"message"`  
  - `actionDetail`: `"Let's Go!"`  
- **Result**: The timer starts from 2:30 and displays `"Let's Go!"` when it ends.
### 2. **Switch Scenes Automatically**
- **Arguments**:
  - `textSourceName`: `"Timer"`  
  - `timerStart`: `"05:00"`  
  - `timerOutcome`: `"scene"`  
  - `actionDetail`: `"LiveScene"`  
- **Result**: The timer starts from 5:00 and switches to the OBS scene `"LiveScene"` when it ends.
### 3. **Restart Timer in a Loop**
- **Arguments**:
  - `textSourceName`: `"CountdownTimer"`  
  - `timerStart`: `"01:00"`  
  - `timerOutcome`: `"restart"`  
- **Result**: The timer starts from 1:00 and restarts to 1:00 when it reaches 0.
### 4. **Let the Timer Continue into Negative Time**
* **Arguments**:
  * `textSourceName`: `"CountdownTimer"`
  * `timerStart`: `"00:30"`
  * `timerOutcome`: `"continue"`
* **Result**: The timer starts from 30 seconds, reaches 0, then continues into negative time (e.g., `-00:01`, `-00:02`, ...).
:::warning
The timer stops automatically after reaching **-2:00** to avoid running indefinitely. Editable in the script, line 8.
:::

## **Why You’ll Love It**
- **Streamlined for Streamers**: Simplifies scene transitions and break management with automated countdowns.  
- **Easy to Use**: Fully configurable within Streamer.bot without modifying the script.  
- **Collaborative and Open-Ended**: I built this while learning and am open to feedback to make it even better!  

I’m looking forward to hearing what you think of this timer!  
Let me know your impressions, share ideas for improvements, or just let me know how it works for your stream. :blush:  

**🎉 Get started now and add a polished touch to your stream!**