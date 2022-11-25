//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBwFJv6Hu_Ho7lRomUyamho_vzfTwvOK4w",
    authDomain: "comp1800-testproject.firebaseapp.com",
    projectId: "comp1800-testproject",
    storageBucket: "comp1800-testproject.appspot.com",
    messagingSenderId: "1074202820685",
    appId: "1:1074202820685:web:6db0e4519dc36627265c04"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();