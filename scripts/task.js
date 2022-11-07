function displayTask(collection) {
    let cardTemplate = document.getElementById("taskCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var docid = doc.id;
                var title = doc.data().title;
                var type = doc.data().type;
                var date = doc.data().date;
                var description = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-date').innerHTML = `Due ${date}`
                newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-id').innerHTML = docid;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
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
    } else {
        document.getElementById("logged_in").style.display="none";
        window.location.href="index.html"
    }
});
