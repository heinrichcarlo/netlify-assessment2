// /js/auth.js
const firebaseConfig = {
  apiKey: "AIzaSyBfBe_vS7zoQLaIFE6nr_uCSrjVJ-pPju8",
  authDomain: "netlify-demo-d4583.firebaseapp.com",
  projectId: "netlify-demo-d4583",
  storageBucket: "netlify-demo-d4583.firebasestorage.app",
  messagingSenderId: "952848584772",
  appId: "YOUR1:952848584772:web:459af09e05992a3e9fec11_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// Auth functions - MODIFIED TO GLOBAL EXPORT
const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName });
    return userCredential.user;
  } catch (error) {
    throw new Error(getFirebaseError(error));
  }
};

// Add this helper function
function getFirebaseError(error) {
  switch(error.code) {
    case 'auth/email-already-in-use':
      return 'Email is already registered';
    case 'auth/invalid-email':
      return 'Please enter a valid email';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    default:
      return error.message || 'Registration failed';
  }
}

// GLOBAL EXPORT - MODIFIED FOR RELIABILITY
document.addEventListener('DOMContentLoaded', () => {
  window.authFunctions = window.authFunctions || {};
  window.authFunctions.registerUser = registerUser;
});