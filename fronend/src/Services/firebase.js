// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {  getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDIVlZXG7JZrDAZyBOWZnEZzwPHnMHKiqI",
    authDomain: "fir-b695f.firebaseapp.com",
    databaseURL: "https://fir-b695f-default-rtdb.firebaseio.com",
    projectId: "fir-b695f",
    storageBucket: "fir-b695f.appspot.com",
    messagingSenderId: "371562973589",
    appId: "1:371562973589:web:e06576beea232a00ab8e9c",
    measurementId: "G-JR82Q0NZ9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);


