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
  apiKey: "AIzaSyBYeuo-EPq744pRHWJNMV3wZeCI-GwquSQ",
  authDomain: "teamproject-facebook-ez.firebaseapp.com",
  projectId: "teamproject-facebook-ez",
  storageBucket: "teamproject-facebook-ez.appspot.com",
  messagingSenderId: "970648790828",
  appId: "1:970648790828:web:548d0376041d6c32c42e89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
