import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBZvZUMLh8pZGf4F_ZEuVdDjzH4JmWoYYA",
  authDomain: "react-project-9ee19.firebaseapp.com",
  projectId: "react-project-9ee19",
  storageBucket: "react-project-9ee19.appspot.com",
  messagingSenderId: "832210551115",
  appId: "1:832210551115:web:5de496ae43b9fb314528ce",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();
export { db, auth ,providerGoogle};
