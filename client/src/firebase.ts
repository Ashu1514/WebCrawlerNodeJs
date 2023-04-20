import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP__FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP__FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP__FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP__FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP__FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP__FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP__FIREBASE_APPID,
    measurementId: process.env.REACT_APP__FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default app;
