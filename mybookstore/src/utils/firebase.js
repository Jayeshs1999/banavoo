import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIN86mQgDHKieTyyFuEA6Ekcv2ylXwZn8",
  authDomain: "banavoo.firebaseapp.com",
  projectId: "banavoo",
  storageBucket: "banavoo.firebasestorage.app",
  messagingSenderId: "974184990211",
  appId: "1:974184990211:web:4b26277271b094a78bb036",
  measurementId: "G-32DVJNJ68T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
