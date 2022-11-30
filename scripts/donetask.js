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

function displayDoneTask(user) {
	// Read the database collection called "users"
	db.collection("users")
		.doc(user.uid)
		.get()
		.then((userDoc) => {
			var doneTasks = userDoc.data().done_tasks;
			let cardTemplate = document.getElementById("donetaskCardTemplate");
			var counter = 0;
			
			// For each of the donetask array, populate each donetask in html
			doneTasks.forEach((thisTaskID) => {
				db.collection("tasks")
					.doc(thisTaskID)
					.get()
					.then((snap) => {
						var doc = snap.data();
						var course_num = doc.course_num;
						var title = doc.title;
						var type = doc.type;
						var date = doc.date;
						var description = doc.description;
						let newcard = cardTemplate.content.cloneNode(true);

						newcard.querySelector(".card-title").innerHTML = title;
						newcard.querySelector(
							".card-course-num"
						).innerHTML = `${course_num} -&nbsp;`;
						newcard.querySelector(".card-type").innerHTML = type;

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
					});
			});
		});
}

function setup() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			displayDoneTask(user);
		} else {
			console.log("Not signed in yet.");
		}
	});
}

$(document).ready(setup);
