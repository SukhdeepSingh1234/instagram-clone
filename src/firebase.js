// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDs4x_R3SEZT8Qy54cdVRbdzXb902wgI18",
    authDomain: "instagram-clone-ae426.firebaseapp.com",
    projectId: "instagram-clone-ae426",
    storageBucket: "instagram-clone-ae426.appspot.com",
    messagingSenderId: "149291610653",
    appId: "1:149291610653:web:825e16c62f46f562888cf4",
    measurementId: "G-K438X0QT2L"
  };

const firebaseApp =firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore()
const auth=firebase.auth(); // it is used to authenticate the user while login, register ,etc
const storage=firebase.storage();

export {db,auth,storage}