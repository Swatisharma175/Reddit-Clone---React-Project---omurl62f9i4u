import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDIjcbtdmIw5GThqPKjTICgTDP-UD8wBWM",
  authDomain: "reddit-clone-addd1.firebaseapp.com",
  projectId: "reddit-clone-addd1",
  storageBucket: "reddit-clone-b89d8.appspot.com",
  messagingSenderId: "727460445726",
  appId: "1:727460445726:web:08d103d483d46fe845380f",
  measurementId: "G-QJM3YKQ0Z5"
};


const initFirebase = firebase.initializeApp(firebaseConfig);
const db = initFirebase.firestore();


export default db;