var currentUser;

function viewDetails(id) {
	db.collection("tasks")
		.doc(id)
		.onSnapshot((doc) => {
			let task_title = doc.data().title;
			let task_date = doc.data().date;
			let task_description = doc.data().description;
			let task_score = doc.data().task_score;

			// Calculate how many days left
			let today_date = new Date();
			let due_date = new Date(task_date);
			var difference_in_time = due_date.getTime() - today_date.getTime();
			var time_left = Math.round(difference_in_time / (1000 * 3600 * 24));

			$("#task-title").html(`<h1>${task_title}</h1><br>`);
			$("#task-date").html(`<b>Due: </b> ${task_date}`);
			$("#task-score").html(`<b>Score</b>: - / ${task_score}`);
			$("#task-text").html(`<b>Description:</b><br>${task_description}`);

			if (time_left < 0) {
				$("#task-time-left").html(
					`<b>Days Past Due: </b>${-time_left}`
				);
				$("#task-time-left").css({
					"text-decoration": "3px underline #ffc300",
					"text-underline-offset": "5px",
				});
			} else if (time_left < 3) {
				$("#task-time-left").html(`<b>Days left: </b>${time_left}`);
				$("#task-time-left").css({
					"text-decoration": "3px underline #ffc300",
					"text-underline-offset": "5px",
				});
			} else {
				$("#task-time-left").html(`<b>Days left: </b>${time_left}`);
			}
		});
}

function DoneTaskHandler(taskID) {
	currentUser
		.set(
			{
				done_tasks: firebase.firestore.FieldValue.arrayUnion(taskID),
			},
			{
				merge: true,
			}
		)
		.then(function () {
			window.location.href = "task.html";
		});
}

function setup() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			currentUser = db.collection("users").doc(user.uid);
			let taskID = localStorage.getItem("taskID");
			viewDetails(taskID);
			$(".submission_submit_btn").attr("doneTask", taskID);
			$("body").on("click", ".submission_submit_btn", function () {
				DoneTaskHandler(taskID);
			});

			$("body").on("click", ".submission_cancel_btn", function () {
				window.location.href = "task.html";
			});
		}
	});
}

$(document).ready(setup);
