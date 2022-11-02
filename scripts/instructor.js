function taskHandler(){
    // Get the submitted form
    var form = document.forms.instructorform

    // Get the task title
    const task_title = form.querySelector('input[name=taskTitle]').value;
    
    // Get the task type 
    const task_type = form.querySelector('input[name=options]:checked').id;
    
    //Get the due date
    const due_date = form.querySelector('input[name=dueDate]').value;
    
    // Get the task description
    const task_description = form.querySelector('textarea[id=exampleFormControlTextarea1]').value;

    console.log(task_title);
    console.log(task_type);
    console.log(due_date);
    console.log(task_description);

    var taskRef = db.collection("tasks");

    taskRef.add({
        title: task_title,
        type: task_type,
        date: due_date,
        description: task_description
    }).then(function() {
        console.log("New task is added to firestore");
        window.location.assign("main.html");
    }).catch(function(error){
        console.log("Error occurs: " + error);
    })
}

function setup(){
    $("#submit_form").click(taskHandler);
}

$(document).ready(setup);