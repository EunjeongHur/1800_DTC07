firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                var current_user_type = userDoc.data().type;
                if (current_user_type == 'Student'){
                    $('#nav_for_instructor').css('display', 'none');
                } else {
                    $('#nav_for_instructor').css('display', 'block');
                }
            });
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});

function logged_out() {
    const auth = firebase.auth();
    auth.signOut().then(() => {
        window.location.href="index.html"
    }).catch((error) => {
        console.log("An error happened: " + error)
    });
}

function setting() {
    window.location.href="profile.html"
}