firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayWork("submissions");
        // getUserData()

    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});
// function getTaskData(course_id){

// }

function displayWork(collection){
    let cardTemplate = document.getElementById("workCardTemplate");
    console.log("inside function")
    db.collection(collection).get()
        .then(snap => {
            var counter = 0
            snap.forEach(doc => {
                var docid = doc.id;
                var user_id = doc.data().uid;
                var submission_link = doc.data().submission;
                var comments = doc.data().comment;
                var course_id = doc.data().course_id;
                // console.log(comments)
                
                let newcard = cardTemplate.content.cloneNode(true);
                
                newcard.querySelector('.card-class-name').innerHTML = "COMP 1510 -&nbsp;";
                if (comments != null) {
                    newcard.querySelector('.card-description').innerHTML = `<strong>Comments</strong>: <br>${comments}`;
                }
                newcard.querySelector('.card-submitted-work').innerHTML = submission_link;
                newcard.querySelector('.card-student-num').id = 'userNum-' + user_id;
                newcard.querySelector('.card-student-name').id = 'userName-' + user_id;
                
                // newcard.querySelector('.card-id').setAttribute("docid", docid)
                newcard.querySelector('#workCard').id = `workCard${counter}`
                newcard.querySelector('#workCardtarget').setAttribute("data-bs-target",`#workCard${counter}`);
                document.getElementById("works-go-here").appendChild(newcard);
                getUserData(user_id);
                counter += 1

                // newcard.querySelector('.card-student-num').
                
            })
        })
}



async // SEND GRADE INPUT and TASK INFO (student, course, task title to firestore)



function getUserData(uid){

    var student_info = new Object(); 
    // let cardTemplate = document.getElementById("workCardTemplate");

    console.log(uid)

    // db.collection("users").doc(uid)
    //     .onSnapshot(somedoc => {
    //         $("#userNum-"+uid).html() = somedoc.data().student_num
    //         console.log(somedoc.data().student_num);
    //     })


    user = db.collection("users").doc(uid)

    user.get()
        .then(userDoc => {
            let userStudentNumber = userDoc.data().student_num;
            let userStudentName = userDoc.data().name;
            console.log(userStudentName, userStudentNumber)
            student_info.studentName = userStudentName
            $("#userNum-"+uid).html() = userStudentNumber

        })
    console.log(student_info)
}

