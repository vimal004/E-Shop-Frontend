// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOiwsif4xVeiRA_Lin-wTlNxe9UUQcIrM",
  authDomain: "e-shop-31f1e.firebaseapp.com",
  projectId: "e-shop-31f1e",
  storageBucket: "e-shop-31f1e.appspot.com",
  messagingSenderId: "1070925354967",
  appId: "1:1070925354967:web:6ad22aaafc5396bdd71d92",
  measurementId: "G-32SRLE9PBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app); // Ensure app is passed correctly
const auth = getAuth(app); // For Firebase Auth
const db = getFirestore(app); // For Firestore DB

// Export the services to use them in other parts of your project
export { app, analytics, auth, db };
