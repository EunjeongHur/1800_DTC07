firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayWork("tasks");
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});

function displayWork(collection){
    let cardTemplate = document.getElementById("workCardTemplate");
    console.log("inside function")
    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var taskid = doc.id;
                var title = doc.data().title;
                let newcard = cardTemplate.content.cloneNode(true);
                
                newcard.querySelector('.card-task-name').innerHTML = title;
                newcard.querySelector('.card').setAttribute("taskid", taskid);
                document.getElementById("works-go-here").appendChild(newcard);
            })
            
        })
}

$("body").on("click", ".card", function() {
    var taskid = $(this).attr('taskid')
    window.location.href="submit_grade.html?taskid="+taskid
    
})