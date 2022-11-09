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

            // Calculate how many days left
            let today_date = new Date();
            let year = today_date.getFullYear();
            let month = String(today_date.getMonth() + 1).padStart(2, "0");
            let date = String(today_date.getDate()).padStart(2, "0");
            var newdate = year + month + date
            let formatted_task_date = task_date.replaceAll('-', '');

            var time_left = Number(formatted_task_date) - Number(newdate);
            
            $("#task-title").html(task_title);
            $("#task-date").html(`Due ${task_date}`);
            $("#task-text").html(task_description);

            if(time_left < 0){
                $("#task-time-left").html(`${-time_left} days late`);
                $("#task-time-left").css({"color": "red", "text-decoration": "underline"})
            } else if(time_left < 3){
                $("#task-time-left").html(`${time_left} days left`);
                $("#task-time-left").css("color", "red")
            } else {
                $("#task-time-left").html(`${time_left} days left`);
            }
        })
}

function setup(){
    let taskID = localStorage.getItem("taskID");
    viewDetails(taskID)
}

$(document).ready(setup);