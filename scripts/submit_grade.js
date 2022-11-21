function populateSubmissions(){
    let params = new URL(window.location.href);
    let taskId = params.searchParams.get("taskid");
    let cardTemplate = document.getElementById("taskCardTemplate")

    db.collection("tasks").doc(taskId)
        .onSnapshot(doc => {
            let submissions = doc.data().submission;
            let task_score = doc.data().task_score;
            console.log(submissions[0])
            if (submissions != null){
                var counter = 0
                for (i of submissions){
                    let newcard = cardTemplate.content.cloneNode(true);

                    newcard.querySelector('.card-student-name').innerHTML = `<b>Name: </b>${i.student_name}`
                    newcard.querySelector('.card-student-num').innerHTML = i.student_num
                    newcard.querySelector('.card-submitted-work').innerHTML = `<b>File: </b>${i.files}`
                    newcard.querySelector('.task_score').innerHTML = `&nbsp;/ ${task_score}`
                    newcard.querySelector('.inputGrade').setAttribute('max', task_score)
                    newcard.querySelector('.submission_submit_btn').setAttribute('counter', counter)
                    newcard.querySelector('.inputGrade').setAttribute('id', `grade${counter}`)

                    if (i.comment != null){
                        newcard.querySelector('.card-description').innerHTML = `<b>Comments: </b>${i.comment}`
                    }
                    newcard.querySelector('#taskCard').id = `taskCard${counter}`
                    newcard.querySelector('#taskCardtarget').setAttribute("data-bs-target",`#taskCard${counter}`);
                    counter += 1
                    document.getElementById("task-goes-here").appendChild(newcard);
                }
               
            } else {
                $("#task-goes-here").html(`<h1 class="mx-auto py-2">No submissions yet.</h1>`)
            }
        })
}


$("body").on("click", ".submission_submit_btn", function() {
    var counter = $(this).attr('counter')
    var thisgrade = $(`#grade${counter}`).val();
    let params = new URL(window.location.href);
    let taskId = params.searchParams.get("taskid");

    // db.collection("tasks").doc(taskId).where("submissions.${counter}", "==", `submissions.${counter}`).update({
    //     files: 'hello.pdf'
    // })
    console.log(counter)
    console.log(thisgrade)
    console.log(taskId)
    db.collection("tasks").doc(taskId).up
})


function setup(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            populateSubmissions()
        } else {
            document.getElementById("logged_in").style.display="none";
            window.location.href="index.html"
        }
    });
}

$(document).ready(setup);