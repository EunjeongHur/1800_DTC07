firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
        console.log("User logged in.")
        db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                var current_user_type = userDoc.data().type;
                if (current_user_type == 'Student'){
                    console.log("student")
                    $('#nav_for_instructor').css('display', 'none');
                } else {
                    console.log("This user is an Instructor")
                    $('#nav_for_instructor').css('display', 'block');
                }
            });
        
        // var current_user_type = currentUser.
        // console.log(current_user_type)
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});

function logged_out() {
    const auth = firebase.auth();
    auth.signOut().then(() => {
        console.log("User logged out.")
        window.location.href="index.html"
    }).catch((error) => {
        console.log("An error happened: " + error)
    });
}

function setting() {
    window.location.href="profile.html"
}