import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ-V0dRt5Jr2VSKHSSCUH15xDyqvgARlE",
  authDomain: "next-social-39790.firebaseapp.com",
  projectId: "next-social-39790",
  storageBucket: "next-social-39790.appspot.com",
  messagingSenderId: "536257933913",
  appId: "1:536257933913:web:8c37eeb78a96c9957c3748",
  databaseUrl: "https://next-social-39790-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);