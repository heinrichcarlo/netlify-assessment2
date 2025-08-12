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
function registerUser(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user.updateProfile({ displayName: name });
        });
}

function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

function logoutUser() {
    return auth.signOut();
}

function getCurrentUser() {
    return new Promise(resolve => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        });
    });
}