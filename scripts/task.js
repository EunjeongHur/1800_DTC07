var currentUser;
var user_set;
var sort_by = "date";

function filter_change(){
	firebase.auth().onAuthStateChanged((user) =>{
		if(user) {
			$("#content").empty()
			var user_sort_option = document.getElementById("sort_options");
			sort_by = user_sort_option[user_sort_option.selectedIndex].value;
			db.collection("users").doc(user.uid).get().then(userDoc => {
				var current_user_type = userDoc.data().type;
				if (current_user_type == 'Student'){
					displayTask(user.uid, sort_by);
				} else {
					displayTaskforInstructor(user.uid, sort_by);
					$('h1').html('Posted Tasks')
				}
			})
		}
		
	})
	
	
}

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


function displayTaskforInstructor(uid, sort_option) {
	var current_location = $(location).attr("href");
	if (current_location.endsWith("task.html")) {
		// Calculate how many days left
		let today_date = new Date();
		
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
					var set = doc.data().school_set;

					let due_date = new Date(date);
					var difference_in_time = due_date.getTime() - today_date.getTime();
					var time_left = Math.round(difference_in_time / (1000 * 3600 * 24));

					if (time_left > -1){
						let only_date = date.replaceAll("-", "/").slice(5);
						let translated_date = getMonthName(only_date);
						$('#content').append(
							`
							<div class="card mx-auto my-2" style="width: 90%;">
								<div class='card-body px-1'>
									<button id='collapseCardtarget' class='btn text-start outside-card d-flex shadow-none' type='button' data-bs-toggle='collapse' data-bs-target='#collapseCard${counter}' aria-expanded='false' aria-controls='collapseExample' style='width: 100%'>
										<span style="color: #393939;">${course_num} -&nbsp;</span>
										<span style="color: #393939;">${type}</span>
										<span style="color: #393939;">&nbsp;(${translated_date})</span>
										<span id="icon_open_in_full" class="material-icons">open_in_full</span>
									</button>
								</div>
								<div class="collapse" id="collapseCard${counter}">
									<div class="inside_card px-3">
										<p><b>Title:&nbsp</b>${title}</p>
										<p><b>Due</b> ${date}</p>
										<p><b>Set: </b>${set}</p>
										<p><b>Description:&nbsp</b>${description}</p>
										<div
											class="d-flex justify-content-end"
											style="padding-bottom: 20px;"
										>
											<button class="btn delete-this-task shadow-none delete_btn" docid="${docid}">Delete</button>
										</div>
									</div>
								</div>
							</div>
							`
						)
						counter += 1;
					}
			});
		});

	};
}



function displayTask(uid, sort_option) {
	var current_location = $(location).attr("href");
	if (current_location.endsWith("task.html")) {
		// Calculate how many days left
		let today_date = new Date();
		getuserSet(uid).then((result) => {
			thisSet = result;
            var users_set = thisSet.set;
			var done_tasks = thisSet.done_tasks;
			
			db.collection("tasks")
                .where("school_set", "==", users_set)
				.orderBy(sort_option)
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
							
							let due_date = new Date(date);
							var difference_in_time = due_date.getTime() - today_date.getTime();

							var time_left = Math.round(difference_in_time / (1000 * 3600 * 24));

							if (time_left < -5) {
								// do not display anything
							} else {
								let only_date = date.replaceAll("-", "/").slice(5);
								let translated_date = getMonthName(only_date);
								$('#content').append(
									`
									<div class="card mx-auto my-2" style="width: 90%;">
										<div class='card-body px-1'>
											<button id='collapseCardtarget' class='btn text-start outside-card d-flex shadow-none' type='button' data-bs-toggle='collapse' data-bs-target='#collapseCard${counter}' aria-expanded='false' aria-controls='collapseExample' style='width: 100%'>
												<span style="color: #393939;">${course_num} -&nbsp;</span>
												<span style="color: #393939;">${type}</span>
												<span style="color: #393939;">&nbsp;(${translated_date})</span>
												<span id="icon_open_in_full" class="material-icons">open_in_full</span>
								 	 		</button>
										</div>
										<div class="collapse" id="collapseCard${counter}">
            								<div class="inside_card px-3">
												<p><b>Title:&nbsp</b>${title}</p>
												<p><b>Due</b> ${date}</p>
												<p><b>Description:&nbsp</b>${description}</p>
												<div
													class="d-flex justify-content-end"
													style="padding-bottom: 20px;"
												>
													<button class="btn card-id shadow-none submission_submit_btn" docid="${docid}">View Details</button>
												</div>
											</div>
										</div>
									</div>
									`
								)
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
});

$("body").on("click", ".delete-this-task", function () {
	var docid = $(this).attr("docid");
	db.collection("tasks").doc(docid).delete();
	$("#content").empty()
	displayTaskforInstructor(currentUser.id, sort_by)
})

function setTaskData(id) {
	localStorage.setItem("taskID", id);
}


firebase.auth().onAuthStateChanged((user) => {
	$("#success-alert").hide();
	if (user) {
		currentUser = db.collection("users").doc(user.uid);
		var current_uid = user.uid;
		$("#name-goes-here").text(user.displayName);
		db.collection("users").doc(user.uid).get()
			.then(userDoc => {
				var current_user_type = userDoc.data().type;
				if (current_user_type == 'Student'){
					displayTask(current_uid, sort_by);
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
