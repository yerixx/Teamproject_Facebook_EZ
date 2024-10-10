// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYeuo-EPq744pRHWJNMV3wZeCI-GwquSQ",
    authDomain: "teamproject-facebook-ez.firebaseapp.com",
    projectId: "teamproject-facebook-ez",
    storageBucket: "teamproject-facebook-ez.appspot.com",
    messagingSenderId: "970648790828",
    appId: "1:970648790828:web:548d0376041d6c32c42e89"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
