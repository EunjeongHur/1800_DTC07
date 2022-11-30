var currentUser;
var ImageFile;

function populateInfo() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// Read the "users" collection database and populate those information on the profile.html
			currentUser = db.collection("users").doc(user.uid);
			currentUser.get().then((userDoc) => {
				let userName = userDoc.data().name;
				let userSchool = userDoc.data().school;
				let userSet = userDoc.data().set;
				let userEmail = userDoc.data().email;
				let userType = userDoc.data().type;
				let userNum = userDoc.data().student_num;
				let picUrl = userDoc.data().profilePic;

				if (userName != null) {
					document.getElementById("nameInput").value = userName;
					document.getElementById("user_name_goes_here").innerHTML =
						userName;
				}
				if (userSchool != null) {
					document.getElementById("schoolInput").value = userSchool;
				}
				if (userEmail != null) {
					document.getElementById("emailInput").value = userEmail;
				}
				if (userNum != null) {
					document.getElementById("stuNumInput").value = userNum;
				}
				if (userType != null) {
					$(`select option[value='${userType}']`).attr(
						"selected",
						"selected"
					);
				}
				if (userSet != null) {
					$(`select option[value='${userSet}']`).attr(
						"selected",
						"selected"
					);
				}
				if (picUrl != null) {
					$("#profile-container").html(
						`<img class="rounded-circle" id="mypic-goes-here" src="" width="150">`
					);
					$("#mypic-goes-here").attr("src", picUrl);
				} else {
					$("#profile-container").html(
						`<span class="material-icons mx-auto d-block" id="account_circle_in_profile">account_circle</span>`
					);
				}
			});
		} else {
			console.log("no user is logged in");
		}
	});
}

populateInfo();

function editUserInfo() {
	document.getElementById("personalInfoFields").disabled = false;
	document.getElementById("emailInput").disabled = true;
}

function chooseFileListener() {
	const fileInput = document.getElementById("mypic-input");
	const image = document.getElementById("mypic-goes-here");

	fileInput.addEventListener("change", function (e) {
		ImageFile = e.target.files[0];
		var blob = URL.createObjectURL(ImageFile);
		image.src = blob;
	});
}
chooseFileListener();

function saveUserInfo() {
	firebase.auth().onAuthStateChanged(function (user) {
		var storageRef = storage.ref("images/" + user.uid + ".jpg");

		// save user input image file in the storage and get the url of image
		storageRef.put(ImageFile).then(function () {
			storageRef.getDownloadURL().then(function (url) {
				userName = document.getElementById("nameInput").value;
				userSchool = document.getElementById("schoolInput").value;
				userEmail = document.getElementById("emailInput").value;
				userType =
					document.getElementById("user_type").selectedOptions[0]
						.value;
				userSet =
					document.getElementById("user_set").selectedOptions[0]
						.value;

				// Update the database "users" collection with the new information
				db.collection("users")
					.doc(user.uid)
					.update({
						name: userName,
						school: userSchool,
						email: userEmail,
						type: userType,
						set: userSet,
						profilePic: url,
					})
					.then(() => {
						console.log("Document successfully updated!");
						document.getElementById(
							"personalInfoFields"
						).disabled = true;
						alert("Profile is updated!");
					});
			});
		});
	});
}
