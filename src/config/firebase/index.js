import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0f3uXTvD4Q5YUVRr0HFLkgv2fvqDJIfQ",
  authDomain: "e-commercer-users.firebaseapp.com",
  projectId: "e-commercer-users",
  storageBucket: "e-commercer-users.firebasestorage.app",
  messagingSenderId: "89946135157",
  appId: "1:89946135157:web:db833de9227e29568b763c",
  measurementId: "G-YL0FJP29Y4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, signInWithPopup };