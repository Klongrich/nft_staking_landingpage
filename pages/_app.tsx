import '../styles/globals.css'

import type { AppProps } from 'next/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
import { firebaseConfig } from "../config/firebase_config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth();

signInAnonymously(auth);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
