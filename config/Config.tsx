import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwtBcRgdQadMEKndFWbnXWb_nYHrI5pRY",
  authDomain: "proyecto-b38e8.firebaseapp.com",
  databaseURL: "https://proyecto-b38e8-default-rtdb.firebaseio.com",
  projectId: "proyecto-b38e8",
  storageBucket: "proyecto-b38e8.firebasestorage.app",
  messagingSenderId: "510793246403",
  appId: "1:510793246403:web:a2227132a81b9214cd6476"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app);
