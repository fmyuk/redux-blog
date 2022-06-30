import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmNDiadN2XjMBZ28C3MJxd5iSL0E_5Uj8",
  authDomain: "redux-blog-81f5d.firebaseapp.com",
  projectId: "redux-blog-81f5d",
  storageBucket: "redux-blog-81f5d.appspot.com",
  messagingSenderId: "173068919743",
  appId: "1:173068919743:web:a067b4bf3a9012874eb70a",
  measurementId: "G-59BVD8N4WN"
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth();
