// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuKGx47j3rKI7wO3Pw-tJaLbptAvpjb5E",
  authDomain: "facebook-ez.firebaseapp.com",
  projectId: "facebook-ez",
  storageBucket: "facebook-ez.appspot.com",
  messagingSenderId: "395519394088",
  appId: "1:395519394088:web:ed11d29baa450319ad901d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);