const eventDetails = document.querySelector(".eventDetails");

// get event details
const getEvents = (data) => {

	let html = '';
	data.forEach(doc => {
		const event = doc.data();
		const div = `
			<div>
				<div class="panel-heading" role="tab">
					<h2 class="panel-title">
						<a role="button" data-toggle="collapse" href="#${event.id}" data-parent="#accordion" aria-expanded="false" aria-controls="#${event.id}">${event.date} - ${event.city}</a>
					</h2>
				</div>
				<div class="panel-collapse collapse" id="${event.id}" role="tabpanel">
					<div class="panel-body">
						<p>City: ${event.city}</p>
						<p>Time: ${event.time}</p>
						<p>Meeting Location: ${event.location}</p>
						<p>On-Site Supervisor: ${event.supervisor}</p>
					</div>
				</div>
			</div>
		`;

		html += div
	
	});

	eventDetails.innerHTML = html;
}

// Conditional Menu Items
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.accountDetails');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
	if (user){
		if(user.admin){
			adminItems.forEach(item => item.style.display = 'block');
		}
		// account info
		db.collection('users').doc(user.uid).get().then(doc => {
			const html = `
				<div>Name: ${doc.data().firstName} ${doc.data().lastName}</div>
				<div>Email: ${user.email}</div>
				<div class="admin-status">${user.admin ? 'Admin' : ''}</div>

				`;

		accountDetails.innerHTML = html;
		})
		
		//toggle UI elements
		loggedInLinks.forEach(item => item.style.display ='block');
		loggedOutLinks.forEach(item => item.style.display ='none');
	} 
	else {

		loggedInLinks.forEach(item => item.style.display ='none');
		loggedOutLinks.forEach(item => item.style.display ='block');
		adminItems.forEach(item => item.style.display = 'none');
	}
}

