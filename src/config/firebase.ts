// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4ucs1Ip-Gbe6Lty_yXFz-JYFK_3f95i8",
  authDomain: "jeweleryantwerpen.firebaseapp.com",
  projectId: "jeweleryantwerpen",
  storageBucket: "jeweleryantwerpen.appspot.com",
  messagingSenderId: "850883783518",
  appId: "1:850883783518:web:6b2d849b2ef53e1f1a3dcf",
  measurementId: "G-Q6N21HQP7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;

