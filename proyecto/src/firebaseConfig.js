// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA88UeGAH8gdGwfbiupMKeH0-0sEf6Pw30",
  authDomain: "proyectoapi-cdb14.firebaseapp.com",
  projectId: "proyectoapi-cdb14",
  storageBucket: "proyectoapi-cdb14.firebasestorage.app",
  messagingSenderId: "1075129824392",
  appId: "1:1075129824392:web:f8b578b7b5ae2cb9069b3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app); 
export { auth, db };