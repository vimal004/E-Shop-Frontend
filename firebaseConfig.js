// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
