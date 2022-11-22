var currentUser;

function populateInfo(){
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            // go and get the current user info from firestore
            currentUser = db.collection("users").doc(user.uid);
            console.log(user.uid);
            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userSet = userDoc.data().set;
                    let userEmail = userDoc.data().email;
                    let userType = userDoc.data().type;
                    let userNum = userDoc.data().student_num;

                    if (userName != null){
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null){
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userEmail != null){
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userNum != null){
                        document.getElementById("stuNumInput").value = userNum;
                    }
                    if (userType != null){
                        $(`select option[value='${userType}']`).attr("selected", "selected");
                    }
                    if (userSet != null){
                        $(`select option[value='${userSet}']`).attr("selected", "selected");
                    } 
                })
        } else { 
            console.log("no user is logged in");
        }
    }

    )
}

populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userSchool = document.getElementById('schoolInput').value;
    userEmail = document.getElementById('emailInput').value;
    userType = document.getElementById('user_type').selectedOptions[0].value;
    userSet = document.getElementById('user_set').selectedOptions[0].value;
    console.log(userType);

    currentUser.update({
        name: userName,
        school: userSchool,
        email: userEmail,
        type: userType,
        set: userSet
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('personalInfoFields').disabled = true;
}