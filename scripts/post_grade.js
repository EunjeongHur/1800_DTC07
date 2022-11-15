function getUserData(uid){
    var student_info = new Object(); 
    let cardTemplate = document.getElementById("workCardTemplate");   
    user = db.collection("users").doc(uid);

    user.get()
        .then(userDoc => {
            let userStudentNumber = userDoc.data().student_num;
            let userStudentName = userDoc.data().name;
            student_info
            student_info.StudentNum = userStudentNumber
            student_info.StudentName = userStudentName

        })
}

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
                // getUserData(user_id);
                let newcard = cardTemplate.content.cloneNode(true);
                
                console.log(submission_link);
                
                newcard.querySelector('.card-class-name').innerHTML = "COMP 1510 -&nbsp;";
                if (comments != null) {
                    newcard.querySelector('.card-description').innerHTML = `<strong>Comments</strong>: <br>${comments}`;
                }
                newcard.querySelector('.card-submitted-work').innerHTML = submission_link;
                // newcard.querySelector('.card-id').setAttribute("docid", docid)
                // newcard.querySelector('#workCard').id = `workCard${counter}`
                // newcard.querySelector('#workCardtarget').setAttribute("data-bs-target",`#workCard${counter}`);
           
                document.getElementById("works-go-here").appendChild(newcard);
                counter += 1
            })
        })
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayWork("submissions");
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});