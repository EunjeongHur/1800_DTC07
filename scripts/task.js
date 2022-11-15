function getMonthName(input){
    var input_date = input.slice(-2);
    var input_month = input.slice(0, 2);
    console.log(input_month, input_date)
    const date = new Date();
    date.setMonth(input_month - 1 );


    return `${date.toLocaleString([], { month: 'short'})}-${input_date}`;
}

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
            var counter = 0
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
                    newcard.querySelector('.card-course-num').innerHTML = `${course_num} -&nbsp;`;
                    newcard.querySelector('.card-type').innerHTML = type
                    let only_date = date.replaceAll('-', '/').slice(5)
                    let translated_date = getMonthName(only_date)
                    newcard.querySelector('.card-onlydate').innerHTML = `&nbsp;(${translated_date})`
                    newcard.querySelector('.card-date').innerHTML = `Due ${date}`
                    newcard.querySelector('.card-text').innerHTML = description;
                    newcard.querySelector('.card-id').setAttribute("docid", docid);
                    newcard.querySelector('#collapseCard').id = `collapseCard${counter}`
                    newcard.querySelector('#collapseCardtarget').setAttribute("data-bs-target",`#collapseCard${counter}`);
                    document.getElementById(collection + "-go-here").appendChild(newcard);
                    counter += 1
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
    $("#success-alert").hide();
    // Check if a user is signed in:
    if (user) {
        $("#name-goes-here").text(user.displayName);
        displayTask("tasks");
        // $(".card-id").click(findCard('tasks'));
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
            $("#success-alert").slideUp(500);
        })
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});
