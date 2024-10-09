import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-tSTsctEmf03358vM9mtu5Z0-JR9yl_o",
  authDomain: "sns-test-17c91.firebaseapp.com",
  projectId: "sns-test-17c91",
  storageBucket: "sns-test-17c91.appspot.com",
  messagingSenderId: "560271038132",
  appId: "1:560271038132:web:75954cdd6471798e8da9e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
