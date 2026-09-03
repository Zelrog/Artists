// Target email address
const targetEmail = "mailto:muskydemon@gmail.com";

// DOM Elements
const manualBtn = document.getElementById('manualBtn');
const progressFill = document.getElementById('progressFill');

// Configuration
let hasRedirected = false;

function executeRedirect() {
    if (hasRedirected) return;
    hasRedirected = true;

    // Primary native navigation
    window.location.href = targetEmail;

    // Background fallback trigger for strict browser engines
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = targetEmail;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 100);
}

// Auto-redirect runs after 2.5 seconds (in sync with progress bar)
const redirectTimer = setTimeout(executeRedirect, 2500);

// Prevent duplicate execution if user manually clicks
if (manualBtn) {
    manualBtn.addEventListener('click', () => {
        hasRedirected = true;
        clearTimeout(redirectTimer);
        if (progressFill) {
            progressFill.style.animationPlayState = 'paused';
        }
    });
}
