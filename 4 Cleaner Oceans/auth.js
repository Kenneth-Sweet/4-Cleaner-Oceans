//get event detail records from database
db.collection('events').get().then(snapshot => {
	getEvents(snapshot.docs);
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
	if (user) {
		console.log("user logged in: ", user);
		setupUI(user);
	} else {
		console.log("user logged out");
		setupUI();
	}
});


// signup
const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", (e)=>{
	e.preventDefault();

	//get user info
	const firstName = signupForm["inputFirstName"].value;
	const lastName = signupForm["inputLastName"].value;
	const email = signupForm["inputEmail"].value;
	const password = signupForm["inputPassword"].value;

	//sign up the user
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		signupForm.reset();
	});
	confirm("Your account has been created!");

	//saves data to database
	db.collection("users").add({
		"First Name": signupForm.firstname.value,
		"Last Name": signupForm.lastname.value,
		Email: signupForm.useremail.value
	});
});

// new event form (from UI)
const eventForm = document.querySelector("#eventForm");

eventForm.addEventListener("submit", (e)=>{
	e.preventDefault();

	//get user info
	const eid = eventForm["inputEID"].value;
	const date = eventForm["inputDate"].value;
	const city = eventForm["inputCity"].value;
	const location = eventForm["inputLocation"].value;
	const supervisor = eventForm["inputSupervisor"].value;
	const time = eventForm["inputTime"].value;

	//saves data to database
	db.collection("events").add({
		id: eventForm.eid.value,
		date: eventForm.date.value,
		city: eventForm.city.value,
		location: eventForm.location.value,
		supervisor: eventForm.supervisor.value,
		time: eventForm.time.value,
		
	});
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener("click", (e) => {
	e.preventDefault();
	auth.signOut();
});


// login
const loginForm = document.querySelector('.loginform');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// get user info
	const email = loginForm["loginEmail"].value;
	const password = loginForm["loginPassword"].value;

	auth.signInWithEmailAndPassword(email, password).then(cred => {
		loginForm.reset();
	});
});





