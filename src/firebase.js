import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwSseOE054eaAqZ6bb0UTnsQvcj3JS3ps",
  authDomain: "sns-platform-a9f1e.firebaseapp.com",
  projectId: "sns-platform-a9f1e",
  storageBucket: "sns-platform-a9f1e.appspot.com",
  messagingSenderId: "443637872256",
  appId: "1:443637872256:web:fa69921c55510798e41865",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
