import { trailing } from "../api/trail.js";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { app } from "../../../../assets/js/firebase.js";

export function setDairyRegForm() {
  const container = document.querySelector("#signUP");
  const dairyRegForm = container.querySelector(".signup-form");
  const firstName = dairyRegForm.querySelector("#firstname");
  const lastName = dairyRegForm.querySelector("#lastname");
  const aadharNumber = dairyRegForm.querySelector("#adharno");
  const age = dairyRegForm.querySelector("#age");
  const phoneNumber = dairyRegForm.querySelector("#phone");
  const alternateNumber = dairyRegForm.querySelector("#phone2");
  const dairyName = dairyRegForm.querySelector("#dairyname");
  const dairyLocation = dairyRegForm.querySelector("#location");
  const taluka = dairyRegForm.querySelector("#Tal");
  const district = dairyRegForm.querySelector("#District");
  const gender =document.querySelector('input[name = "gender"]:checked');

  // Account Details

  const email = dairyRegForm.querySelector("#email");
  const password = dairyRegForm.querySelector("#password ");
  const confirmPass = dairyRegForm.querySelector("#confirm-password");
  
  
  
  dairyRegForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // console.log( document.querySelector('input[name="gender"]:checked').value);
      var checked_gender = document.querySelector('input[name = "gender"]:checked');
      console.log(checked_gender);
      if(gender===null)
      {
        console.log("Yo");
      }
      var check=checkInputs();
      if(check===false)
      {
        return false;
      }
      let dairyRegInfo = {
          ownerFirstName: firstName.value,
          ownerLastName: lastName.value,
          ownerAadharNumber: aadharNumber.value,
          ownerGender: document.querySelector('input[name="gender"]:checked').value,
          ownerAge: age.value,
          ownerPhoneNumber: phoneNumber.value,
      ownerAltNumber: alternateNumber.value,
      ownerDairyName: dairyName.value,
      ownerDairyLocation: dairyLocation.value,
      ownerTaluka: taluka.value,
      ownerDistrict: district.value,
      accEmail: email.value,
      accPass: password.value,
      accConfPass: confirmPass.value,
    };
    console.log(dairyRegInfo);
    container.style.display = "none";
    
    
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/dairyLogin/index.html",
      // This must be true.
      handleCodeInApp: true,
      //   iOS: {
        //     bundleId: "com.example.ios",
        //   },
        //   android: {
          //     packageName: "com.example.android",
          //     installApp: true,
          //     minimumVersion: "12",
          //   },
          //   dynamicLinkDomain: "http://localhost:3000/dairyLogin/index.html",
        };
    const auth = getAuth(app);
    // const auth = getAuth();
    console.log(auth);
    console.log(email.value);
    
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      alert("Please verify your Email");
      console.log(dairyRegInfo);
      window.localStorage.setItem("emailForSignIn", email.value);
      window.localStorage.setItem("objectInfo", JSON.stringify(dairyRegInfo));
    //   trailing(dairyRegInfo);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

      
    // checkInputs();

  });


  function checkInputs (){
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const aadharNumberValue = aadharNumber.value.trim();
    const ageValue =age.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const dairyNameValue = dairyName.value.trim();
    const dairyLocationValue = dairyLocation.value.trim();
    const talukaValue = taluka.value.trim();
    const districtValue = district.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPassValue= confirmPass.value.trim();

    var firstBol;
    var lastBol;
    var aadharBol;
    var phoneBol;
    var ageBol;
    var dairyNameBol;
    var dairyLocBol;
    var talukaBol;
    var disBol;
    var emailBol;
    var passBol;
    var confBol;

    if(firstNameValue === '') {
      setErrorFor(firstName, 'First Name cannot be blank');
      firstBol=false;
    } else {
      setSuccessFor(firstName);
      firstBol=true;
    }

    if(aadharNumberValue === '') {
      setErrorFor(aadharNumber, 'Aadhar Number cannot be blank');
      aadharBol=false;
    } else {
      setSuccessFor(aadharNumber);
      aadharBol=true;
    }

    if(lastNameValue === '') {
      setErrorFor(lastName, 'Last Name cannot be blank');
      lastBol=false;
    } else {
      setSuccessFor(lastName);
      lastBol=true;
    }

    if(ageValue === '') {
      setErrorFor(age, 'Age cannot be blank');
      ageBol=false;
    } else {
      setSuccessFor(age);
      ageBol=true;
    }


    if(phoneNumberValue === '') {
      setErrorFor(phoneNumber, 'Phone number cannot be blank');
      phoneBol=false;
    } else {
      setSuccessFor(phoneNumber);
      phoneBol=true;
    }

    if(dairyNameValue === '') {
      setErrorFor(dairyName, 'Dairy Name cannot be blank');
      dairyNameBol=false;
    } else {
      setSuccessFor(dairyName);
      dairyNameBol=true;
    }

    if(dairyLocationValue === '') {
      setErrorFor(dairyLocation, 'Dairy Location cannot be blank');
      dairyLocBol=false;
    } else {
      setSuccessFor(dairyLocation);
      dairyLocBol=true;
    }

    if(talukaValue === '') {
      setErrorFor(taluka, 'Taluka cannot be blank');
      talukaBol=false;
    } else {
      setSuccessFor(taluka);
      talukaBol=true;
    }

    if( districtValue=== '') {
      setErrorFor(district, 'District cannot be blank');
      disBol=false;
    } else {
      setSuccessFor(district);
      disBol=true;
    }

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
  

    if( passwordValue=== '') {
      setErrorFor(password, 'Password cannot be blank');
      passBol=false;
    } else {
      setSuccessFor(password);
      passBol=true;
    }


    if(confirmPassValue==='')
    {
      setErrorFor(confirmPass ,'Confirm Password cannot be blank');
      confBol=false;
    }
    else if(confirmPassValue!=passwordValue)
    {
      setErrorFor(confirmPass,'Passwords Do not match');
      confBol=false;

    }
    else{
      setSuccessFor(confirmPass);
      confBol=true;
    }


    if(firstBol===true && lastBol===true && aadharBol===true && phoneBol===true && ageBol===true && dairyNameBol===true && dairyLocBol===true && talukaBol===true && disBol===true && emailBol===true && passBol===true && confBol===true){
      return true;
    }
    else{
      return false;
    }

  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-icon error ';
    small.innerText = message;
  }
      
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-icon success ';
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }



}
