import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"
import "firebase/firebase-functions"
const app = firebase.initializeApp({
    apiKey: "AIzaSyAYL0U_DWmYV7epeS_i8gJNXoROBLhAVg0",
    authDomain: "online-grand-test-series.firebaseapp.com",
    databaseURL: "https://online-grand-test-series.firebaseio.com",
    projectId: "online-grand-test-series",
    storageBucket: "online-grand-test-series.appspot.com",
    messagingSenderId: "726966815611",
    appId: "1:726966815611:web:1c7f6b1cc7cd4acabf8bde",
    measurementId: "G-CT8RFNQPF3"
  
});
const storage=firebase.storage();
const functions=firebase.functions();
export  {functions,storage,app as default}