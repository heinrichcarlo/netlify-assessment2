// Show authentication messages
function showAuthMessage(message, type = 'info') {
    const messageEl = document.getElementById('auth-message');
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.className = 'auth-message ' + type;
    messageEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    if (type !== 'error') {
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Route protection
async function protectRoute() {
    const user = await getCurrentUser();
    const isAuthPage = window.location.pathname.includes('/auth/');
    
    if (!user && !isAuthPage) {
        window.location.href = '/auth/login.html';
    } else if (user && isAuthPage) {
        window.location.href = '/dashboard.html';
    }
}

// Initialize auth state listener
function initAuthState() {
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log('User is logged in:', user.email);
        } else {
            // User is signed out
            console.log('User is logged out');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAuthState();
    protectRoute();
});