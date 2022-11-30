function taskHandler() {
	var form = document.forms.instructorform;
	const course_number = form.querySelector("input[name=course_number]").value;
	const school_set =
		document.getElementById("set_options").selectedOptions[0].value;
	const task_title = form.querySelector("input[name=taskTitle]").value;
	const task_type =
		document.getElementById("task_options").selectedOptions[0].value;
	const due_date = form.querySelector("input[name=dueDate]").value;
	const task_score = document.getElementById("taskScore").value;
	let task_description = form.querySelector(
		"textarea[id=exampleFormControlTextarea1]"
	).value;
	var taskRef = db.collection("tasks");

	if (
		course_number != "" &&
		school_set != "" &&
		task_title != "" &&
		task_type != "" &&
		due_date != "" &&
		task_score != ""
	) {
		if (task_description == "") {
			task_description = "No description";
		}
		taskRef
			.add({
				course_num: course_number,
				title: task_title,
				type: task_type,
				date: due_date,
				description: task_description,
				task_score: task_score,
				school_set: school_set,
			})
			.then(function (docRef) {
				console.log("New task is added to firestore");
				window.location.assign("confirmation.html");
			})
			.catch(function (error) {
				console.log("Error occurs: " + error);
			});
	} else {
		alert("Data entry is required");
	}
}

function cancelBtnHandler() {
	alert("Posting is cancelled");
	window.location.assign("post_grade.html");
}

function setup() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			$("#submit_form").click(taskHandler);
			$("#cancel_post").click(cancelBtnHandler);
		} else {
			document.getElementById("logged_in").style.display = "none";
			window.location.href = "index.html";
		}
	});
}

$(document).ready(setup);
