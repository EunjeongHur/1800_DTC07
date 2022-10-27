//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyB4LdPH8kG1E8EwCeOHMeAVbFZsyb2vRS4",
    authDomain: "comp1800-project-4d66b.firebaseapp.com",
    projectId: "comp1800-project-4d66b",
    storageBucket: "comp1800-project-4d66b.appspot.com",
    messagingSenderId: "207998491831",
    appId: "1:207998491831:web:06dd0f854bf53d5fe4c132"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();