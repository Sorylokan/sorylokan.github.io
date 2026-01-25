# Welcome to YVA !
YouTube Video Alert (YVA), allows you to send a Discord webhook of your latest video

## How to setup :
* YVA is easy to set up. All you need to do is provide 4 elements:
> * your Discord webhook URL,
> * the ID of the role to mention,
> * your YouTube channel ID,
> * a Google Api key. *(It's free!)*
> *► You can find a link under each argument on how to get them !*
* Enable the timer in the trigger area (*or check if it is*)
And there you have it! The action is triggered automatically every 12 hours!

## How it works
**After setting all arguments correctly, make sure the timer is enabled.**
> It is set to 12h by default, so every 12h it will check if a new video is published, and if so, a new message is sent to your discord as a webhook!
**Why a 12h timer?**
> Well it's a purely arbitrary choice on my part, not knowing your publishing rhythm, I chose to cover a large time slot with 2 checks per day. But you are completely free to change this timer to adapt it to your needs.
> However, if using a timer is not convenient for you, you can trigger this action using tawmae's [Date Time trigger](https://tawmae.github.io/date_time_trigger.html)

:::info
Note: I forgot to say; when your API project is open and you have created a key, don't forget to add the [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com?authuser=1&project=polished-leaf-436613-t3&supportedpurview=project) library !
More info here ! https://developers.google.com/youtube/v3/getting-started
:::