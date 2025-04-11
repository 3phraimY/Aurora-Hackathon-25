// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// The web app's Firebase configuration

const firebaseConfig = {
  apiKey: "APIKEY",

  authDomain: "sample-firebase-ai-app-365d1.firebaseapp.com",

  databaseURL:
    "https://sample-firebase-ai-app-365d1-default-rtdb.firebaseio.com",

  projectId: "sample-firebase-ai-app-365d1",

  storageBucket: "sample-firebase-ai-app-365d1.firebasestorage.app",

  messagingSenderId: "425966379931",

  appId: "1:425966379931:web:90555a3ac5d5e19696373e",
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);

export default cong;
// Now you can use Firebase services
