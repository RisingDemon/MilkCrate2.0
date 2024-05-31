const dairySignForm = document.querySelector('.dairySignUp');
const email = document.getElementById('InputEmail1');
const password1 = document.getElementById('InputPassword1');
const password2 = document.getElementById('InputPassword2');



dairySignForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkInputs();

    dairysignUpInfo = {
        dairyEmail : email.value.trim(),
        dairyPass : password1.value.trim(),
    };

    console.log(dairysignUpInfo);
});

function checkInputs(){
    const userEmail = email.value.trim();
    const userPassword1 = password1.value.trim();
    const userPassword2 = password2.value.trim();
  

    if(userEmail === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(userEmail)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(userPassword1 === '') {
		setErrorFor(password1, 'Password cannot be blank');
	} else {
		setSuccessFor(password1);
	}
	
	if(userPassword2 === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} 
    else if(userPassword1 !== userPassword2) {
		setErrorFor(password2, 'Passwords does not match');
	} 
    else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
