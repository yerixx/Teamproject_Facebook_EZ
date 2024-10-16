import "firebase/compat/storage";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// yerim
// const firebaseConfig = {
//   apiKey: "AIzaSyCuKGx47j3rKI7wO3Pw-tJaLbptAvpjb5E",
//   authDomain: "facebook-ez.firebaseapp.com",
//   projectId: "facebook-ez",
//   storageBucket: "facebook-ez.appspot.com",
//   messagingSenderId: "395519394088",
//   appId: "1:395519394088:web:ed11d29baa450319ad901d",
// };
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
