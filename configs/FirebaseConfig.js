// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-reel-generator.firebaseapp.com",
  projectId: "ai-reel-generator",
  storageBucket: "ai-reel-generator.appspot.com",
  messagingSenderId: "852397934303",
  appId: "1:852397934303:web:ea06c0116b4925ae2a4b6a",
  measurementId: "G-HE070B74NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)