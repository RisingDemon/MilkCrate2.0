import { trailLogin } from "../api/loginData.js";
// import{sendToAPI} from "../../../../dairyRegister/assets/js/api/trail.js";
import {
    getAuth,
    updatePassword,
    isSignInWithEmailLink,
    signInWithEmailLink,
  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
  import { app } from "../../../../assets/js/firebase.js";
import { trailing } from "../../../../dairyRegister/assets/js/api/trail.js";


export function setLoginForm(){

    const auth = getAuth(app);
    if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let uEmail = window.localStorage.getItem('emailForSignIn');
        console.log(uEmail);
        if (!uEmail) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          uEmail = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, uEmail, window.location.href)
          .then((result) => {
            // Clear email from storage.
            console.log(result.user);
            // const token = urlParams.get("token");
            //  console.log(token);
             const Utoken= result.user.uid;
             console.log(Utoken);
            // console.log(window.location.href);
            alert("Email confirmed");
            window.localStorage.removeItem('emailForSignIn');
            let dRegInfo = JSON.parse(window.localStorage.getItem('objectInfo'));
            const user = auth.currentUser;
            const newPassword = dRegInfo.accPass;
            console.log(newPassword);
            updatePassword(user, newPassword).then(() => {
                // Update successful.
              }).catch((error) => {
                // An error ocurred
                // ...
              });
            console.log(dRegInfo);
            let totalInfo={
                fullinfo: dRegInfo,
                token: Utoken,
            };
            console.log(totalInfo);
            trailing(totalInfo);
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
    const loginForm = document.querySelector('.login-form');
    const email=document.getElementById('exampleInputEmail1');
    const password = document.getElementById('exampleInputPassword1');
    
    
    
    console.log(loginForm);
    
    loginForm.addEventListener('submit',(e)=>{
       
        e.preventDefault();
        var check=checkInputs();
        if(check===false){
          return false;
        }
    
        let loginInfo={
            ownerEmail : email.value,
            ownerPassword : password.value,
        };
        console.log(loginInfo);
    
        trailLogin(loginInfo);
    })

    function checkInputs(){
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      var emailBol;
      var pasBol;
      console.log(emailValue);

      if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        emailBol=false;
      } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        emailBol=false;
      } else {
        setSuccessFor(email);
        emailBol=true;
      }

      if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        pasBol=false;
      } else {
        setSuccessFor(password);
        pasBol=true;

      }

      if(emailBol===true && pasBol===true){
        return true;
      }
      else{
        return false;
      }
      
    }
        

    function setErrorFor(input, message) {
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      formControl.className = 'form-icon error';
      small.innerText = message;
    }
        
    function setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-icon success';
    }

    function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


    }

