import { initializeApp } from 'firebase/app';
import {getFirestore, doc,getDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();
const dairyDateInfo = (request,response)=>{
    const{dayId,CaldId}=request.body;
    const dateId=dayId;
    console.log(dateId);
    console.log(CaldId);

    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    const firebaseApp=initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const farmerRef = doc(db,"/dairy/"+CaldId+"/dailyEntries/"+dateId);
    // const dairyRef = doc(db ,"/dairy/"+dairyId);

    readDoc();
    
    async function readDoc(){
         const mySnapshot = await getDoc(farmerRef);
         console.log(mySnapshot);
        //  const mySnapshot2 = await getDoc(dairyRef);
         if(mySnapshot.exists()){
             console.log("Snapshot exists");
             const docData = mySnapshot.data();
             console.log(docData);
            //  const docData2 = mySnapshot2.data();
             return response .send({
                 status :"success",
                 code:200,
                 data:{
                     tMoney: docData.Money,
                     buff: docData.totalBuffMilkQuantity,
                     cow:docData.totalCowMilkQuantity,
                 },
             });
         }
         else{
            console.log("No data");
            return response.send({
                status :"failure",
                code:400,
            });
         }
    }
}

export{dairyDateInfo};