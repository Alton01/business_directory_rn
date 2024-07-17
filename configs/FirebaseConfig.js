import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEQPUy23RZOTexOGIVUYhLvY0mg1NqKy8",
  authDomain: "business-directory-27066.firebaseapp.com",
  projectId: "business-directory-27066",
  storageBucket: "business-directory-27066.appspot.com",
  messagingSenderId: "670261003243",
  appId: "1:670261003243:web:d574cea84de99434f5cfae",
  measurementId: "G-38YP8RYLSG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const storage = getStorage(app)
//const analytics = getAnalytics(app);