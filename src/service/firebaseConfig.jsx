// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDKs v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-trip-planner-8fdb0.firebaseapp.com",
  projectId: "ai-trip-planner-8fdb0",
  storageBucket: "ai-trip-planner-8fdb0.firebasestorage.app",
  messagingSenderId: "671215404195",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-TB3BE38QFQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
const analytics = getAnalytics(app);