import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as dotenv from "dotenv";
dotenv.config();
const dairyLogin = (request, response) => {
  // console.log(request.body);
  const { ownerEmail, ownerPassword } = request.body;
  console.log(ownerEmail, ownerPassword);

  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  // console.log(firebaseApp);
  // console.log(auth);
  const email = ownerEmail;
  const password = ownerPassword;

  console.log(email, password);
  // console.log(firebaseConfig);

  // SignUp code
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return response.send({
        status: "success",
        code: 200,
        data: {
          uid: user.uid,
          email: user.email,
        },
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);

      //This send the responce for invalid credentials
      if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        return response.send({
          status: "failure",
          message: "Invalid Email Or Password!!!!",
          code: 400,
        });
      } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        return response.send({
          status: "failure",
          message: "User does not exit!! Please SignUp",
          code: 400,
        });
      } else {
        return response.send({
          status: "failure",
          message: "Something went wrong!!",
          code: 500,
        });
      }
    });

  // loginWithFirebase(email,password);
};
// async function loginWithFirebase(auth,email,password){
//         try{
//             const result = await signInWithEmailAndPassword(auth,email,password);
//             console.log(result.user);
//         }catch(err){
//             console.log(err)
//             // M.toast({html: err.message,classes:"red"})
//         }
// }

export { dairyLogin };
