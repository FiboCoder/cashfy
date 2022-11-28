// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQn41osyOCm_hYjvUeb-Q4XcSOrrL6A28",
  authDomain: "cashfy-8d941.firebaseapp.com",
  projectId: "cashfy-8d941",
  storageBucket: "cashfy-8d941.appspot.com",
  messagingSenderId: "815918664596",
  appId: "1:815918664596:web:8df7321fc5a7c8d4c45d81",
  measurementId: "G-G1MCBZLKPX"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);