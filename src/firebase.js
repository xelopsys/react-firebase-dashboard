// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const config = process.env;



const firebaseConfig = {
    apiKey: config.REACT_APP_FIREBASE_API_KEY,
    authDomain: config.REACT_APP_AUTH_DOMAIN,
    projectId: config.REACT_APP_PROJECT_ID,
    storageBucket: config.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,
    appId: config.REACT_APP_APP_ID,
    measurementId: config.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);