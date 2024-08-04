// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCM04kaHUHqmnxxFgegxFG-K1lnytiEGnw",
  authDomain: "pantry-t-142c1.firebaseapp.com",
  projectId: "pantry-t-142c1",
  storageBucket: "pantry-t-142c1.appspot.com",
  messagingSenderId: "72593349858",
  appId: "1:72593349858:web:c0b98bac75d6dee30552bb",
  measurementId: "G-GBKD69KNEK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, deleteDoc, doc, getDocs, query, where }