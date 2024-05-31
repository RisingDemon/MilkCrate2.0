import { initializeApp } from 'firebase/app';
import {getFirestore, doc,getDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();

const profileInfo =(request,response)=>{

    const{token}=request.body;

    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    const firebaseApp=initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const dairyRef = doc(db,'dairy/'+token) ;
    readDoc();
    
   async function readDoc(){
        const mySnapshot = await getDoc(dairyRef);
        if(mySnapshot.exists()){
            const docData = mySnapshot.data();
            return response .send({
                status :"success",
                code:200,
                data:{
                    Fname: docData.ownerFirstName,
                    Lname:docData.ownerLastName,
                    dairyName : docData.ownerDairyName,
                    email: docData.accEmail,
                    dairyLoc:docData.ownerDairyLocation,
                    taluka:docData.ownerTaluka,
                    district:docData.ownerDistrict,
                    age: docData.ownerAge,
                    phoneNumber: docData.ownerPhoneNumber,
                    aadharNo:docData.ownerAadharNumber,

                },
            });
        }
   }
}

export{profileInfo};