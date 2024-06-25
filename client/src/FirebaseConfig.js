// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfDWYejAv5PoTkCwLoeuzBKsMjKJOWVXI",
  authDomain: "healing-hope.firebaseapp.com",
  projectId: "healing-hope",
  storageBucket: "healing-hope.appspot.com",
  messagingSenderId: "200988583507",
  appId: "1:200988583507:web:0f938f13f073d624c048a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firebase auth and get a ref to the service
const auth = getAuth(app);

// init cloud firestore and get a ref to the service 
const db = getFirestore(app);

// init cloud storage and get a ref to the service 
const storage = getStorage(app);

export const userCollectionRef = collection(db, "users")

export {app, auth, db, storage}