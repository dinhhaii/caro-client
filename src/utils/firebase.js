import * as firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcgheffLoOUMJH0qren5oT8YFJWHoQpkA",
  authDomain: "dinhhai-caro.firebaseapp.com",
  databaseURL: "https://dinhhai-caro.firebaseio.com",
  projectId: "dinhhai-caro",
  storageBucket: "dinhhai-caro.appspot.com",
  messagingSenderId: "1096476817213",
  appId: "1:1096476817213:web:7d2fdb69f347557858b754",
  measurementId: "G-C41SHNHE3B"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const f = firebase;
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const database = firebase.firestore();
