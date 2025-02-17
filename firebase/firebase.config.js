// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDvcUFJhTW3aKsLWx0VQOZzkpCqA9kfnEc",
  authDomain: "mybooks-4a93b.firebaseapp.com",
  projectId: "mybooks-4a93b",
  storageBucket: "mybooks-4a93b.firebasestorage.app",
  messagingSenderId: "941245143406",
  appId: "1:941245143406:web:8148f3067c639d97fbc97f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;