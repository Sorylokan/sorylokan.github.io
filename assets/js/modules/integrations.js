// EXTERNAL INTEGRATIONS - Twitch Player

// TWITCH PLAYER INTEGRATION

function createResponsiveTwitchEmbed() {
    const container = document.getElementById("twitch-embed");
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const chatWidth = 340;
    const minVideoWidth = 320;
    
    let videoWidth = Math.max(containerWidth - chatWidth, minVideoWidth);
    let height = Math.round(videoWidth * 9 / 16);
    let totalWidth = videoWidth + chatWidth;
    
    if (containerWidth < chatWidth + minVideoWidth) {
        videoWidth = minVideoWidth;
        totalWidth = chatWidth + minVideoWidth;
        height = Math.round(videoWidth * 9 / 16);
    }
    
    container.style.width = totalWidth + 'px';
    container.style.height = height + 'px';
    
    new Twitch.Embed("twitch-embed", {
        width: totalWidth,
        height: height,
        channel: "sorylokan",
        parent: [window.location.hostname, "localhost"]
    });
}

function initTwitchPlayer() {
    if (document.getElementById("twitch-embed")) {
        createResponsiveTwitchEmbed();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const container = document.getElementById("twitch-embed");
                if (container) {
                    container.innerHTML = '';
                    createResponsiveTwitchEmbed();
                }
            }, 250);
        });
    }
}
