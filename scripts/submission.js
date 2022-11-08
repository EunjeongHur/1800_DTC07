function viewDetails(docRef) {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const docid = urlParams.get('docid');
    console.log(docid);
    // $("#task-title").html(docid);
    db.collection(docRef).doc(docid)
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
    viewDetails('tasks')
}

$(document).ready(setup);