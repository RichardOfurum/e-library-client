// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB37AYYEq9sPWuqiSMbxTP3JlLUt1hnBp8",
  authDomain: "e-library-1a236.firebaseapp.com",
  projectId: "e-library-1a236",
  storageBucket: "e-library-1a236.appspot.com",
  messagingSenderId: "86936492020",
  appId: "1:86936492020:web:7062c5d1d02d7bd10e8ba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export {storage}