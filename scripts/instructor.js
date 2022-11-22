function taskHandler(){
    // Get the submitted form
    var form = document.forms.instructorform

    // Get the Course Number
    const course_number = form.querySelector('input[name=course_number]').value;

    // Get the set number
    const school_set = form.querySelector('input[name=school_set]').value;

    // Get the task title
    const task_title = form.querySelector('input[name=taskTitle]').value;
    
    // Get the task type 
    //////////////////
    // Original Way //
    //////////////////
    // const task_type = form.querySelector('input[name=options]:checked').id;
    const task_type = document.getElementById('task_options').selectedOptions[0].value;
    
    //Get the due date
    const due_date = form.querySelector('input[name=dueDate]').value;

    const task_score = document.getElementById('taskScore').value;

    // Get the task description
    let task_description = form.querySelector('textarea[id=exampleFormControlTextarea1]').value;

    console.log(task_title);
    console.log(task_type);
    console.log(due_date);
    console.log(task_score)
    console.log(task_description);
    console.log(school_set);

    var taskRef = db.collection("tasks");

    if (course_number != "" && school_set != "" && task_title != "" && task_type != "" && due_date != "" && task_score != "") {
        if (task_description == ""){
            task_description = "No description"
        }
        taskRef.add({
            course_num: course_number,
            title: task_title,
            type: task_type,
            date: due_date,
            description: task_description,
            task_score: task_score,
            school_set: school_set
        }).then(function(docRef) {
            console.log("New task is added to firestore");
            window.location.assign("confirmation.html");
        }).catch(function(error){
            console.log("Error occurs: " + error);
        })
    } else {
        alert("Data entry is required")
    }
}

function cancelBtnHandler(){
    alert("Posting is cancelled");
    window.location.assign("post_grade.html");
}

function setup(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#submit_form").click(taskHandler);
            $("#cancel_post").click(cancelBtnHandler);
        } else {
            document.getElementById("logged_in").style.display="none";
            window.location.href="index.html"
        }
    });
}

$(document).ready(setup);

