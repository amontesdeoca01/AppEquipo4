import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYYrdLNL2uTtY4pxZgtMDFMWC_ZyQHFuk",
  authDomain: "serviapp-b9d14.firebaseapp.com",
  projectId: "serviapp-b9d14",
  storageBucket: "serviapp-b9d14.appspot.com",
  messagingSenderId: "834020927780",
  appId: "1:834020927780:web:1dd2d798bf6181bebbebb1",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
