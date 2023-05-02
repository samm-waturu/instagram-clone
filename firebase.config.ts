// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBynhEeurgPBVL-HuyjZT9ZKFwRmhQxLoU",
    authDomain: "clone-build-6.firebaseapp.com",
    projectId: "clone-build-6",
    storageBucket: "clone-build-6.appspot.com",
    messagingSenderId: "478116626982",
    appId: "1:478116626982:web:d605852c48ef0432ae9ce7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}
