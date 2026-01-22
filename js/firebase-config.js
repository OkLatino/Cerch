// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIe4Etwj_C_A5TniuqTfHFEsL5uYedZAY",
    authDomain: "cerch-app.firebaseapp.com",
    projectId: "cerch-app",
    storageBucket: "cerch-app.firebasestorage.app",
    messagingSenderId: "881069781418",
    appId: "1:881069781418:web:f03bee969d2848e2ddbbd3",
    measurementId: "G-3HGG18SJB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
