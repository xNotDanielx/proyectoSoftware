// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEIIASjCnFg_OEaSv7JemGrDHydytUBuI",
  authDomain: "healthy-9edeb.firebaseapp.com",
  projectId: "healthy-9edeb",
  storageBucket: "healthy-9edeb.appspot.com",
  messagingSenderId: "133023835756",
  appId: "1:133023835756:web:8d1f2327b1b2e543275a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializar Firestore

export { db, app, auth };
