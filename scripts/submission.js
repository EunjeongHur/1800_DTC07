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
            // let task_time_left = 
            $("#task-title").html(task_title);
            $("#task-date").html(`Due ${task_date}`);
            $("#task-text").html(task_description);
        })
}

function setup(){
    let taskID = localStorage.getItem("taskID");
    viewDetails(taskID)
}

$(document).ready(setup);