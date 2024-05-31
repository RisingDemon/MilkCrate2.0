
import { initializeApp } from 'firebase/app';
import {getFirestore, doc,getDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();

const getNumberInfo=(request , response)=>{
    const{dId,number}=request.body;
    console.log(request.body);


    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    try{
    const phoneNumer = "+91"+number;
    const firebaseApp=initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const numRef =doc(db ,"/phoneNum/"+phoneNumer);
    readDoc();
    
    async function readDoc(){
        const mySnapshot = await getDoc(numRef);
        if(mySnapshot.exists()){
            const docData = mySnapshot.data();
            if(docData.dairyId!=dId)
            {
                return response.send({
                    status :"failure",
                    code:400,
                });
            }
            // console.log(docData);
            return response .send({
                status :"success",
                code:200,
                data:{
                    fId:docData.useruid,
                    dId:docData.dairyId,
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
    }catch{
        console.log(error);
    }

}

export {getNumberInfo};