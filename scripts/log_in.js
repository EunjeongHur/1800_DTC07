firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
        console.log("User logged in.")
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});

function logged_out() {
    console.log("clicked")
    const auth = firebase.auth();
    auth.signOut().then(() => {
        console.log("User logged out.")
    }).catch((error) => {
        console.log("An error happend: " + error)
    });
}

function setting() {
    window.location.href="profile.html"
}