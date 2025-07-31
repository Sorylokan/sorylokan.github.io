# \# :MPVarIco:﻿ - MPVar: Automate Your Music Flow
**MPVar *(MediaPlayerVariables)*** is a powerful extension designed to automate the retrieval of media information from local media players like VLC and Foobar. Built to integrate with StreamerBOT, MPVar captures key data, such as song titles, artists, and album covers, and stores them as variables for further automation. Whether you want to display song information during a stream or trigger custom actions based on the current media, MPVar makes it all possible.
### \# What makes MPVar unique?
Originally a continuation of the ***VLC-TV*** project (which only worked with VLC), MPVar expands the scope by supporting multiple media players, including Foobar. It is more versatile, more flexible, and opens up new possibilities for streamers, creators, and developers using StreamerBOT.
> MPVar simplifies the complex task of media automation, giving you control and flexibility over your media players. It enhances the streaming experience by automating tasks that you would otherwise need to handle manually. Plus, it’s scalable: whether you’re using VLC or Foobar, MPVar lets you focus on creation, not configuration.
> The retrieved data is stored as global variables in StreamerBOT, allowing you to create custom triggers, overlays or notifications.
> MPVar is more than just a tool for streamers; it’s an extension that, when integrated with StreamerBOT, will unlock a world of possibilities for improving the interactivity of your stream and keeping your viewers engaged with dynamic, real-time media updates.

### Key Features:
* Multi-media player support: Works with VLC and Foobar media players. *And more players can be added over time!*
* Customizable automation: Store media data in global variables, allowing for countless automation possibilities in StreamerBOT.
* Simple integration: Easy to set up and use with StreamerBOT, making your streaming automation smoother and more interactive.

## \# How it works:
**Configuration:**
> *`(Screenshots and latest version here:` https://discord.com/channels/834650675224248362/1283489841836720128/1296993405087514645 `)`*
* Import the plugin into StreamerBOT
* At the __top__ of the sub-actions you will find a "Settings" folder with the needed variables.
> Set the arguments to suit your needs
### For VLC : `Set argument %MPVar_Player% to 'VLC'`
> With the IP adress, Port and password, and you're done :EkValide:﻿ 
### For Foobar2000 : `Set argument %MPVar_Player% to 'Foobar'`
> You also need to install the HTTP Control plugin, and download the MPVar template.
> *(Tutorial and links here : https://discord.com/channels/834650675224248362/1283489841836720128/1297019143056396319 )*
> - The password isn't required.

### \# Whats new ? *(changelog)*
```yaml
[19.10.24] # MPVar rework | (v1.3)
* New: Renamed VLC-TV > MPVar
+ Added: Parameter arguments
+ Added: Foobar2000 compatibility
+ Added: Simplified future media player integrations
+ Added: Custom Logs
- removed: Boring logs
- removed: Herobrine

[12.02.24] # VLC-TV (v3) - PREVIOUS VERSION
* New: Slight rework of the code
+ New: Standardization of variable names (Prefix "VLC-TV_")
+ Added: Everything was condensed into one action instead of (3)
- removed: Herobrine
```

Demonstration Video: https://youtu.be/uNSTX2XXsms (old version but still valid)

> # \# <:MPVarIco:1296638162785013760>﻿﻿ - VLC set up :
* Open VLC, do CTRL+P *(or menu > tools > preferences)*
* In the bottom left corner, select "all" in the "show settings" square.
* Go to the interface section and select "Main interfaces > Lua"
* Set the password and port (and remember them for later!) (see screen 1)
> > Save and restart VLC.
*More here : https://github.com/azrafe7/vlc4youtube/blob/master/instructions/how-to-enable-vlc-web-interface.md *

> # \# <:MPVarIco:1296638162785013760>﻿﻿﻿ - Foobar2000 set up :
* Download and install the foo_httpcontrol plugin on https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/
> *`foo_httpcontrol_0_97_28.fb2k-component` to install it
> You can found very useful tip in the readme file on the bitbucket website
Download the MPvar Template below and open the readme file in your browser
> go to `http://<your_IP_adress>:<your_port>/MPVar/`. You should see something like the screen below !
> If so, GG you're done <a:EkValide:525235566678376448>