import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCKiRnO6xGinuB-peh5YVX3xSyw60r2EvM",
    authDomain: "cryptotracker-af1c8.firebaseapp.com",
    databaseURL: "https://cryptotracker-af1c8.firebaseio.com",
    projectId: "cryptotracker-af1c8",
    storageBucket: "cryptotracker-af1c8.appspot.com",
    messagingSenderId: "768900213076"
 };
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app,base,facebookProvider };