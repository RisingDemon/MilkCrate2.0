import { request } from "express";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as dotenv from 'dotenv';
dotenv.config();

const farmerReg = (request, response) => {
  // console.log(request.body);

  const { userFname, userLname, userAadhar, userPhone, appVerifier, useruid, dairyId } =
    request.body;
  const phoneNumber = userPhone;
  const dID = dairyId;
  const fID = useruid;
  // console.log(fID);
  // console.log(dID);

  // console.log(phone);


  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
 
  //  deleteDoc(doc(db, "dairy/" + dID + "/farmers/" + ));
  try{
  const farmerRef = doc(db, "dairy/" + dID + "/farmers/" + fID);
  const farmerRef2 = doc(db, "dairyIds/" + fID);
  const farmerRef3 = doc(db, "phoneNum/" + phoneNumber);

  setDoc(farmerRef, request.body ).then(() => {
    console.log("Account Created");
  });
  setDoc((farmerRef2),{
    userPhone:phoneNumber,
    dairyId:dID
    // console.log("Account Created");
  });
  setDoc((farmerRef3),{
    dairyId:dID,
    useruid:fID
    // console.log("Account Created");
  });

  return response.send({
    status: "success",
    code: 200,
    data: {
      dUid: dID,
    },
  });
} catch{
  console.log(error);
  return response.send({
    status: "failure",
    message: "Something went wrong",
    code: 400,
  });
}


};


export { farmerReg };
