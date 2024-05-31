import { initializeApp } from 'firebase/app';
import {getFirestore, doc,getDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();
const FarmerProfile = (request,response)=>{
    const{farmerId , dairyId}=request.body;


    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    const firebaseApp=initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const farmerRef = doc(db,"/dairy/"+dairyId+"/farmers/"+farmerId);
    const dairyRef = doc(db ,"/dairy/"+dairyId);

    readDoc();
    
    async function readDoc(){
         const mySnapshot = await getDoc(farmerRef);
         const mySnapshot2 = await getDoc(dairyRef);
         if(mySnapshot.exists()&& mySnapshot2.exists()){
             const docData = mySnapshot.data();
             const docData2 = mySnapshot2.data();
             return response .send({
                 status :"success",
                 code:200,
                 data:{
                     dairyName: docData2.ownerDairyName,
                     Fname: docData.userFname,
                     Lname:docData.userLname,
                     phoneNumber: docData.userPhone,
                     aadharNo:docData.userAadhar,
 
                 },
             });
         }
    }
}

export{FarmerProfile};