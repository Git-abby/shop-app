// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWR1oOdkHSzPMoY6pYEY0BkXWdo0kfj9o",
  authDomain: "shop-app-d0503.firebaseapp.com",
  projectId: "shop-app-d0503",
  storageBucket: "shop-app-d0503.appspot.com",
  messagingSenderId: "1040738373291",
  appId: "1:1040738373291:web:1ee696408da46f3a9e31ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};