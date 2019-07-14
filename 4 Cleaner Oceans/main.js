// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyC_IU_na6BGEJ7I2Ew2sB5jyiLk3kEcVqg",
    authDomain: "testcontactform-9216cccc.firebaseapp.com",
    databaseURL: "https://testcontactform-9216cccc.firebaseio.com",
    projectId: "testcontactform-9216cccc",
    storageBucket: "",
    messagingSenderId: "165815805945",
    appId: "1:165815805945:web:8c35d28832661cc2"
  };
  
  firebase.initializeApp(firebaseConfig);


  //Reference messages collection
  var messageRef = firebase.database().ref('messages');

//listen for form submit

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    console.log(123);


    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');
    console.log(name);
    saveMessage(name, phone, email, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    //hide after time
    setTimeout(function(){

        document.querySelector('.alert').style.display = 'none';


    },3000);
    return document.getElementById('contactForm').reset();
}


//Function to get form values

function getInputVal(id){

    return document.getElementById(id).value;
}
//save message to firebase
function saveMessage(name, email, phone, message){

    var newMessageRef = messageRef.push();

    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message
    });


}