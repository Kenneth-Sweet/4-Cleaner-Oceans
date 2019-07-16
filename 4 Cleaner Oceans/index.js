
// Conditional Menu Items
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
	if (user){
		//toggle UI elements
		loggedInLinks.forEach(item => item.style.display ='block');
		loggedOutLinks.forEach(item => item.style.display ='none');
	} 
	else {
		loggedInLinks.forEach(item => item.style.display ='none');
		loggedOutLinks.forEach(item => item.style.display ='block');
	}
}

