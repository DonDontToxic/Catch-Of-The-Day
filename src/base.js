import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdsSITA6Db4HAiTX9w-NliXeCYfmpnkKs",
  authDomain: "catch-of-the-day-ce317.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ce317.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
