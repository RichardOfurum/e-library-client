// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAksOGveXrCV2B2pnFxs7l_6nwJxoYMKkA",
  authDomain: "speedload-fc3d6.firebaseapp.com",
  projectId: "speedload-fc3d6",
  storageBucket: "speedload-fc3d6.appspot.com",
  messagingSenderId: "929590766830",
  appId: "1:929590766830:web:364af01f38080f77c517ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export {storage}