function displayTask(collection) {
    var current_location = $(location).attr('href')
    if (current_location.endsWith("task.html")){
        let cardTemplate = document.getElementById("taskCardTemplate");
        // Calculate how many days left
        let today_date = new Date();
        let year = today_date.getFullYear();
        let month = String(today_date.getMonth() + 1).padStart(2, "0");
        let date = String(today_date.getDate()).padStart(2, "0");
        var newdate = year + month + date
        

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var docid = doc.id;
                var course_num = doc.data().course_num;
                var title = doc.data().title;
                var type = doc.data().type;
                var date = doc.data().date;
                var description = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);

                let formatted_task_date = date.replaceAll('-', '');
                var time_left = Number(formatted_task_date) - Number(newdate);

                if (time_left < -5){
                    // do something
                } else {
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-course-num').innerHTML = `${course_num} - `;
                    newcard.querySelector('.card-type').innerHTML = type
                    let only_date = date.replaceAll('-', '/').slice(5)
                    newcard.querySelector('.card-onlydate').innerHTML = ` (${only_date})`
                    newcard.querySelector('.card-date').innerHTML = `Due ${date}`
                    newcard.querySelector('.card-text').innerHTML = description;
                    newcard.querySelector('.card-id').setAttribute("docid", docid);
                    document.getElementById(collection + "-go-here").appendChild(newcard);
                }
            })
        })
    }
}


$("body").on("click", ".card-id", function() {
    var docid = $(this).attr('docid')
    setTaskData(docid);
    window.location.href="submission.html";

    // Using URL 
        // window.location.href="submission.html?docid="+docid
    
})

function setTaskData(id){
    localStorage.setItem('taskID', id)
}


$('#search').keyup(function (){
    $('.card').removeClass('d-none');
    var card_title = $(this).val();
    $('.card-deck').find('.card .card-body h5:not(:contains("'+card_title+'"))').parent().parent().addClass('d-none');
})


firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
        displayTask("tasks");
        // $(".card-id").click(findCard('tasks'));
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});
