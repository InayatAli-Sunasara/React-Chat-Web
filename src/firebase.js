import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBnKk6UOtNksSNvHTg7_ZZiOHlrtnfJmiE",
  authDomain: "chat-web-69da4.firebaseapp.com",
  projectId: "chat-web-69da4",
  storageBucket: "chat-web-69da4.appspot.com",
  messagingSenderId: "834917815171",
  appId: "1:834917815171:web:e462979e8207cf61a61cb6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
