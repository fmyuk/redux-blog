import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth();
export const firestore = fire.firestore();
export const storage = fire.storage();
