// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfBe_vS7zoQLaIFE6nr_uCSrjVJ-pPju8",
    authDomain: "netlify-demo-d4583.firebaseapp.com",
    projectId: "netlify-demo-d4583",
    storageBucket: "netlify-demo-d4583.firebasestorage.app",
    messagingSenderId: "952848584772",
    appId: "YOUR1:952848584772:web:459af09e05992a3e9fec11_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Auth functions
export async function registerUser(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName });
        return userCredential.user;
    } catch (error) {
        throw new Error(getFirebaseErrorMessage(error));
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(getFirebaseErrorMessage(error));
    }
}

export function getCurrentUser() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        });
    });
}

export function logoutUser() {
    return auth.signOut();
}

function getFirebaseErrorMessage(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'This email is already registered.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        default:
            return error.message || 'Authentication failed.';
    }
}