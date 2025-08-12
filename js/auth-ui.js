// UI helpers for auth
function showAuthMessage(message, type = 'info') {
    const element = document.getElementById('auth-message');
    if (element) {
        element.textContent = message;
        element.className = `auth-message ${type}`;
        element.style.display = 'block';
    }
}

function protectPage() {
    getCurrentUser().then(user => {
        const isAuthPage = window.location.pathname.includes('/auth/');
        
        if (!user && !isAuthPage) {
            window.location.href = '/auth/login.html';
        } else if (user && isAuthPage) {
            window.location.href = '/dashboard.html';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', protectPage);