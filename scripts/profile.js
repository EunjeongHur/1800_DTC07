var currentUser;
var ImageFile;




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
                        document.getElementById('user_name_goes_here').innerHTML = userName;
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
    document.getElementById('emailInput').disabled = true;
}


function chooseFileListener(){
    const fileInput = document.getElementById("mypic-input");
    const image = document.getElementById("mypic-goes-here");

    fileInput.addEventListener('change', function(e){
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        image.src = blob;
    })
}
chooseFileListener()

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log('inside function')
        var storageRef = storage.ref("images/" + user.uid + ".jpg")

        storageRef.put(ImageFile)
            .then(function() {
                console.log('Uploaded to Cloud Storage.');
                storageRef.getDownloadURL()
                    .then(function (url) {
                        console.log('Got the download URL');
                        userName = document.getElementById('nameInput').value;
                        userSchool = document.getElementById('schoolInput').value;
                        userEmail = document.getElementById('emailInput').value;
                        userType = document.getElementById('user_type').selectedOptions[0].value;
                        userSet = document.getElementById('user_set').selectedOptions[0].value;

                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            school: userSchool,
                            email: userEmail,
                            type: userType,
                            set: userSet
                        })
                        .then(() => {
                            console.log("Document successfully updated!");
                            document.getElementById('personalInfoFields').disabled = true;
                            alert("Profile is updated!")
                        })
                    })
            })
    })

    
}