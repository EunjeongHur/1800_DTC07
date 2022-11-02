function displayTask(collection) {
    let cardTemplate = document.getElementById("taskCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().title;
                var type = doc.data().type;
                var date = doc.data().date;
                var description = doc.data().description;
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-date').innerHTML = `Due ${date}`
                newcard.querySelector('.card-text').innerHTML = description;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}
displayTask("tasks");