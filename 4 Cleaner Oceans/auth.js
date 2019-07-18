
//add admin cloud function
const adminForm = document.querySelector('.adminForm')
adminForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const adminEmail = document.querySelector('#inputAdminEmail').value;
	const addAdminRole = functions.httpsCallable('addAdminRole');
	addAdminRole({ email: adminEmail }).then(result => {
		console.log(result);
		adminForm.reset();
		$('#adminModal').modal('hide');
	})
})
//get event detail records from database
db.collection('events').get().then(snapshot => {
	getEvents(snapshot.docs);
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
	if (user) {
		user.getIdTokenResult().then(idTokenResult => {
			user.admin = idTokenResult.claims.admin;
			setupUI(user);
		})
		console.log("user logged in: ", user);
		
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
	const email = signupForm["inputEmail"].value;
	const password = signupForm["inputPassword"].value;

	//sign up the user
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		return db.collection('users').doc(cred.user.uid).set({
			firstName: signupForm["inputFirstName"].value,
			lastName: signupForm["inputLastName"].value,
			email: signupForm["inputEmail"].value
			});	
		}).then(() => {
			signupForm.reset();
			confirm("Your account has been created!");
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
		eventForm.reset();
		$('#eventModal').modal('hide');
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





