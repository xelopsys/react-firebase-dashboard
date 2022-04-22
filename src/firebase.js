// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const API = process.env.REACT_APP_FIREBASE_API_KEY;
// console.log(process.env.REACT)
console.log(API)


const firebaseConfig = {
    apiKey: API,
    authDomain: "xelopsys-347121.firebaseapp.com",
    projectId: "xelopsys-347121",
    storageBucket: "xelopsys-347121.appspot.com",
    messagingSenderId: "545755506882",
    appId: "1:545755506882:web:91c8c1cc8bc2f199a6335b",
    measurementId: "G-SJZEKX6L4Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);