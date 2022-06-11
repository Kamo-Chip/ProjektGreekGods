// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYSPc4ylqsIxpFIR-kXfiZ43ksWdX_Wc",
  authDomain: "workout-log-74ba9.firebaseapp.com",
  projectId: "workout-log-74ba9",
  storageBucket: "workout-log-74ba9.appspot.com",
  messagingSenderId: "1081727390126",
  appId: "1:1081727390126:web:71a45927d6b95eea93b83f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };