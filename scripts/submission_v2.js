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
                $("#task-time-left").css("color", "red")
            } else {
                $("#task-time-left").html(`<b>Days left: </b>${time_left}`);
            }
        })
}





/////////////////////////////////////////////


function submitWorkHandler(id){

	
	// variables for task info data	
    db.collection('tasks').doc(id)
        .onSnapshot(doc => {
            let task_title = doc.data().title;
            let due_date = doc.data().date;
            let task_description = doc.data().description;
            let task_score = doc.data().task_score;
            let course_num = doc.data().course_num;
            console.log(task_title);
            console.log(due_date);
            console.log(task_score)
            console.log(course_num);
            console.log(task_description);


            var form = document.forms.submitWork
	
            // Get the task description
            // let task_description = form.querySelector('textarea[id=submission_textarea]').value;
            let submittedWork = form.querySelector('textarea[id=submission_textarea]').value;
            
            var submissionRef = db.collection("submission_v2");
        
            // if (task_title != ""  && due_date != "" && task_score != "") {
             if (submittedWork == ""){
                    submittedWork = "No Submitted Work"
               
                submissionRef.add({
                    course_number: course_num,
                    title: task_title,
                    date: due_date,
                    description: task_description,
                    task_score: task_score,
                    submitted_work: submittedWork
                }).then(function(docRef) {
                    console.log("New task is added to firestore");
                    window.location.assign("confirmation.html");
                }).catch(function(error){
                    console.log("Error occurs: " + error);
                })
            } else {
                alert("Data entry is required")
            }

           
        })


    
}


function cancelBtnHandler(){
    alert("Work submission is cancelled");
    window.location.assign("submission_v2.html");
}

function setup(){
       let taskID = localStorage.getItem("taskID");
              
       viewDetails(taskID)
	   // submitWorkHandler(taskID)
    //    firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         $("#submitWork").click(submitWorkHandler(taskID));
    //         $("#cancel_post").click(cancelBtnHandler);
    //     } else {
    //         document.getElementById("logged_in").style.display="none";
    //         window.location.href="index.html"
    //     }
}

$(document).ready(setup);