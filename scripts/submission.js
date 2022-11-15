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

// function uploadFileHandler(){
    
//     firebase.auth().onAuthStateChanged(function(user){
//         if (user){
//             var fileInput = document.getElementById("formFileMultiple");
//             var image = document.getElementById("image-goes-here")
//             var file = fileInput.files[0];
//             var blob = URL.createObjectURL(file);

//             // image.src = blob
//             // console.log(file)
//             // console.log(blob);
//             const pickedfile = fileInput.files[0];  // file that user picked
//             image.src = URL.createObjectURL(pickedfile)

            
//             // var pickedfile = file
//             console.log(file)

//             console.log(file.name)
//             let demo = {
//                 "name": `${file.name}`,
//                 "lastModified": `${file.lastModified}`,
//                 "size": `${file.size}`,
//                 "type": `${file.type}`
//             }

//             console.log(demo);
//             var storageRef = firebase.storage().ref("images/" + user.uid + ".png");
//             storageRef.put(demo)
//                 .then(function(){
// 	                storageRef.getDownloadURL()
//                         .then(function (url) { // Get URL of the uploaded file
//                             console.log(url); // Save the URL into users collection
//                             db.collection("users").doc(user.uid).update({
//                                 "profile-pic": url
//                             })
//                         })
//                 })
            
//             // storageRef.put(file)
//             //     .then(function(){
//             //         console.log("hhh")
//             //         console.log('Uploaded to Cloud Storage');
//             //     })
//             //     .catch(function(err){
//             //         console.log(err)
//             //         console.log("error occurs:" + err);
//             //     })
//             }
//         }) 
// }
                
            // storageRef.getDownloadURL()
            //     .then(function(url){
            //         console.log(url);
            //         db.collection("users").doc(user.uid).update({
            //             "submission": url
            //         })
            //         .then(function(){
            //             console.log('Added url to Firestore.');
            //         })
            //     })

            // fileInput.addEventListener('change', function(e) {
                
            //     var file = e.target.files[0];
            //     var storageRef = storage.ref(user.uid + ".pdf");
            //     console.log("hhh")
            //     console.log(storageRef);
            //     console.log("hhh")
            //     storageRef.put(file)
            //         .then(function(){
            //             console.log('Uploaded to Cloud Storage');
            //         })
                
            //     storageRef.getDownloadURL()
            //         .then(function(url){
            //             console.log(url);
            //             db.collection("users").doc(user.uid).update({
            //                 "submission": url
            //             })
            //             .then(function(){
            //                 console.log('Added url to Firestore.');
            //             })
            //         })
            //     }
            // )
            // window.location.href="task.html"


function setup(){
    let taskID = localStorage.getItem("taskID");
    viewDetails(taskID)
    $("#uploadFile").click(uploadFileHandler);
}

$(document).ready(setup);