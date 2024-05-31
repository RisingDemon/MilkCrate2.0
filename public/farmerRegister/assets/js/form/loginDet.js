import { trailuserReg } from "../api/userReg.js";

import { app } from "../../../../assets/js/firebase.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

export function getlogin() {
  const loginForm = document.querySelector("#userLogin");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log(token);
  
  const auth = getAuth(app);
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
  );
  window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const Fname = document.getElementById("firstname");
    const Lname = document.getElementById("lastname");
    const Aadhar = document.getElementById("aadhar");
    const phone = document.getElementById("phone");
    const phoneNumber = phone.value;

    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth(app);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).

        window.confirmationResult = confirmationResult;
        // window.location.href = "./otp_page/"
        let code = prompt("Type OTP");
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            const userid=user.uid;
            // console.log(result);
            console.log(user);
            let userLogInfo = {
                userFname: Fname.value,
                userLname: Lname.value,
                userAadhar: Aadhar.value,
                userPhone: phone.value,
                useruid:userid,
                dairyId:token,
                //   appVerifier: window.recaptchaVerifier,
              };
          
              console.log(userLogInfo);
          
              trailuserReg(userLogInfo);
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });

    

  });
}
