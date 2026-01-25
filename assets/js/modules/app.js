// APP INITIALIZATION & ORCHESTRATION

// Initialize all modules on page load
window.addEventListener('load', () => {
    handleNavigation();
    handleTheme();
    setupCopyButtons();
    initExternalLinkModal();
    initNavigation();
});
