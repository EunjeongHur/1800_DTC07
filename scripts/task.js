var currentUser;
var user_set;

function getMonthName(input) {
	var input_date = input.slice(-2);
	var input_month = input.slice(0, 2);
	const date = new Date();
	date.setMonth(input_month - 1);

	return `${date.toLocaleString([], { month: "short" })}-${input_date}`;
}

function getuserSet(uid) {
	return db
		.collection("users")
		.doc(uid)
		.get()
		.then(function (snap) {
			return snap.data();
		});
}


function displayTaskforInstructor(uid) {
	var current_location = $(location).attr("href");
	if (current_location.endsWith("task.html")) {
		let cardTemplate = document.getElementById("taskCardTemplate");
		// Calculate how many days left
		let today_date = new Date();
		let year = today_date.getFullYear();
		let month = String(today_date.getMonth() + 1).padStart(2, "0");
		let date = String(today_date.getDate()).padStart(2, "0");
		var newdate = year + month + date;
		
		db.collection("tasks")
			.orderBy("date")
			.get()
			.then((snap) => {
				var counter = 0;
				snap.forEach((doc) => {
					var docid = doc.id;
					
					var course_num = doc.data().course_num;
					var title = doc.data().title;
					var type = doc.data().type;
					var date = doc.data().date;
					var description = doc.data().description;
					let newcard = cardTemplate.content.cloneNode(true);

					let formatted_task_date = date.replaceAll("-", "");
					var time_left =
						Number(formatted_task_date) - Number(newdate);

					if (time_left < -1) {
						// do something
					} else {
						newcard.querySelector(".card-title").innerHTML =
							title;
						newcard.querySelector(
							".card-course-num"
						).innerHTML = `${course_num} -&nbsp;`;
						newcard.querySelector(".card-type").innerHTML =
							type;
						let only_date = date.replaceAll("-", "/").slice(5);
						let translated_date = getMonthName(only_date);
						newcard.querySelector(
							".card-onlydate"
						).innerHTML = `&nbsp;(${translated_date})`;
						newcard.querySelector(
							".card-date"
						).innerHTML = `Due ${date}`;
						newcard.querySelector(".card-text").innerHTML =
							description;
						newcard
							.querySelector(".card-id")
							.setAttribute("docid", docid);
						newcard.querySelector(
							"#collapseCard"
						).id = `collapseCard${counter}`;
						newcard
							.querySelector("#collapseCardtarget")
							.setAttribute(
								"data-bs-target",
								`#collapseCard${counter}`
							);
						document
							.getElementById("tasks" + "-go-here")
							.appendChild(newcard);
						counter += 1;
					}
			});
		});

	};
}



function displayTask(uid) {
	var current_location = $(location).attr("href");
	if (current_location.endsWith("task.html")) {
		let cardTemplate = document.getElementById("taskCardTemplate");
		// Calculate how many days left
		let today_date = new Date();
		let year = today_date.getFullYear();
		let month = String(today_date.getMonth() + 1).padStart(2, "0");
		let date = String(today_date.getDate()).padStart(2, "0");
		var newdate = year + month + date;
		getuserSet(uid).then((result) => {
			thisSet = result;
            var users_set = thisSet.set;
			var done_tasks = thisSet.done_tasks;
			
			db.collection("tasks")
                .where("school_set", "==", users_set)
				.orderBy("date")
				.get()
				.then((snap) => {
					var counter = 0;
					snap.forEach((doc) => {
						var docid = doc.id;
						if (jQuery.inArray(docid, done_tasks) < 0) {
							var course_num = doc.data().course_num;
							var title = doc.data().title;
							var type = doc.data().type;
							var date = doc.data().date;
							var description = doc.data().description;
							let newcard = cardTemplate.content.cloneNode(true);

							let formatted_task_date = date.replaceAll("-", "");
							var time_left =
								Number(formatted_task_date) - Number(newdate);

							if (time_left < -5) {
								// do something
							} else {
								newcard.querySelector(".card-title").innerHTML =
									title;
								newcard.querySelector(
									".card-course-num"
								).innerHTML = `${course_num} -&nbsp;`;
								newcard.querySelector(".card-type").innerHTML =
									type;
								let only_date = date.replaceAll("-", "/").slice(5);
								let translated_date = getMonthName(only_date);
								newcard.querySelector(
									".card-onlydate"
								).innerHTML = `&nbsp;(${translated_date})`;
								newcard.querySelector(
									".card-date"
								).innerHTML = `Due ${date}`;
								newcard.querySelector(".card-text").innerHTML =
									description;
								newcard
									.querySelector(".card-id")
									.setAttribute("docid", docid);
								newcard.querySelector(
									"#collapseCard"
								).id = `collapseCard${counter}`;
								newcard
									.querySelector("#collapseCardtarget")
									.setAttribute(
										"data-bs-target",
										`#collapseCard${counter}`
									);
								document
									.getElementById("tasks" + "-go-here")
									.appendChild(newcard);
								counter += 1;
							}
						} else {
							console.log("There's no remaining tasks")
						}
					});
				});

		});
	}
}


$("body").on("click", ".card-id", function () {
	var docid = $(this).attr("docid");
	setTaskData(docid);
	window.location.href = "submission.html";

	// Using URL
	// window.location.href="submission.html?docid="+docid
});

function setTaskData(id) {
	console.log(id)
	localStorage.setItem("taskID", id);
}

$("#search").keyup(function () {
	$(".card").removeClass("d-none");
	var card_title = $(this).val();
	$(".card-deck")
		.find('.card .card-body h5:not(:contains("' + card_title + '"))')
		.parent()
		.parent()
		.addClass("d-none");
});

firebase.auth().onAuthStateChanged((user) => {
	$("#success-alert").hide();
	// Check if a user is signed in:
	if (user) {
		currentUser = db.collection("users").doc(user.uid);
		var current_uid = user.uid;
		$("#name-goes-here").text(user.displayName);
		db.collection("users").doc(user.uid).get()
			.then(userDoc => {
				var current_user_type = userDoc.data().type;
				if (current_user_type == 'Student'){
					// console.log("student")
					displayTask(current_uid);
				} else {
					displayTaskforInstructor(current_uid);
					$('h1').html('Posted Tasks')
				}
			})
		
		$("#success-alert")
			.fadeTo(2000, 500)
			.slideUp(500, function () {
				$("#success-alert").slideUp(500);
			});
	} else {
		document.getElementById("logged_in").style.display = "none";
		window.location.href = "index.html";
	}
});
