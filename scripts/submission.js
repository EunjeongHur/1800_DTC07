var currentUser;

function viewDetails(id) {
    // Using URL 
        // const url = window.location.search;
        // const urlParams = new URLSearchParams(url);
        // const docid = urlParams.get('docid');

    db.collection('tasks').doc(id)
        .onSnapshot(doc => {
            let task_title = doc.data().title;
            let task_date = doc.data().date;
            let task_description = doc.data().description;
            let task_score = doc.data().task_score;
            console.log(task_score);

            // Calculate how many days left
            let today_date = new Date();
            let year = today_date.getFullYear();
            let month = String(today_date.getMonth() + 1).padStart(2, "0");
            let date = String(today_date.getDate()).padStart(2, "0");
            var newdate = year + month + date
            let formatted_task_date = task_date.replaceAll('-', '');

            var time_left = Number(formatted_task_date) - Number(newdate);
            
            $("#task-title").html(`<h1>${task_title}</h1><br>`);
            $("#task-date").html(`<b>Due: </b> ${task_date}`);
            $("#task-score").html(`<b>Score</b>: - / ${task_score}`)
            $("#task-text").html(`<b>Description:</b><br>${task_description}`);

            if(time_left < 0){
                $("#task-time-left").html(`<b>Days Past Due: </b>${-time_left}`);
                $("#task-time-left").css({"text-decoration": "3px underline #ffc300", "text-underline-offset": "5px"})
            } else if(time_left < 3){
                $("#task-time-left").html(`<b>Days left: </b>${time_left}`);
                $("#task-time-left").css({"text-decoration": "3px underline #ffc300", "text-underline-offset": "5px"})
            } else {
                $("#task-time-left").html(`<b>Days left: </b>${time_left}`);
            }
        })
}

function DoneTaskHandler(taskID){
    console.log("button clicked")
    currentUser.set({
        done_tasks: firebase.firestore.FieldValue.arrayUnion(taskID)
    },{
            merge: true
    })
    .then(function(){
        console.log("This task is done for: " + currentUser )
        // var 
    })
    window.location.href="task.html";
}


function setup(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            let taskID = localStorage.getItem("taskID");
            viewDetails(taskID)
            $(".submission_submit_btn").attr("doneTask", taskID)
            $("body").on('click', '.submission_submit_btn', function(){
                DoneTaskHandler(taskID)
            })
           
        } else {
            // do something else
        }
    })
}

$(document).ready(setup);