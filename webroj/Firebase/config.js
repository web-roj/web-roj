import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCSstXGI3wWN9Y7xxogXbNRHg-X_f8CvUE",
  authDomain: "webroj-edcb3.firebaseapp.com",
  projectId: "webroj-edcb3",
  storageBucket: "webroj-edcb3.appspot.com",
  messagingSenderId: "735871405558",
  appId: "1:735871405558:web:f055473ff964bc8f33cbd7",
  measurementId: "G-75PGFNKBPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
