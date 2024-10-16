import "firebase/compat/storage";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDIrRWIuOWl9Sx7en8ZagOK6HUOw9DJNaQ",
//   authDomain: "facebook-ez-ba531.firebaseapp.com",
//   projectId: "facebook-ez-ba531",
//   storageBucket: "facebook-ez-ba531.appspot.com",
//   messagingSenderId: "142488866969",
//   appId: "1:142488866969:web:7020e0185bbd17ec676808",
// };
//yerim
const firebaseConfig = {
  apiKey: "AIzaSyCuKGx47j3rKI7wO3Pw-tJaLbptAvpjb5E",
  authDomain: "facebook-ez.firebaseapp.com",
  projectId: "facebook-ez",
  storageBucket: "facebook-ez.appspot.com",
  messagingSenderId: "395519394088",
  appId: "1:395519394088:web:ed11d29baa450319ad901d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
