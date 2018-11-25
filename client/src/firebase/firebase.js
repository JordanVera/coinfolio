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

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app,base,facebookProvider };