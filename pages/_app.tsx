import '../styles/globals.css'

import type { AppProps } from 'next/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATwaDTRX6tCRTGg99qbfAmU1Zoszw5iQg",
  authDomain: "nftimages.firebaseapp.com",
  projectId: "nftimages",
  storageBucket: "nftimages.appspot.com",
  messagingSenderId: "441807869904",
  appId: "1:441807869904:web:d38e8dc2e0ed1fbc0d8bd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth();

signInAnonymously(auth);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
