import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyC1P9Klx_Aqa_-bYfS2J-qDlTvlr1CvQtM",
    authDomain: "shosan-landing-page.firebaseapp.com",
    projectId: "shosan-landing-page",
    storageBucket: "shosan-landing-page.appspot.com",
    messagingSenderId: "679519220619",
    appId: "1:679519220619:web:101c2a17510da97003358e",
    measurementId: "G-9QD56KD318"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);






