import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {collection, getFirestore, setDoc,doc,getDoc,addDoc} from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();

const newMilkEntry = (request , response)=>{
    console.log(request.body);
    const{dairyId,farmerId,todayDate,dayTime,totalMoney,bMilkQuantity, cMilkQuantity,Month}=request.body;

    let dateData = {
        date : todayDate,
        totalBuffMilkQuantity:bMilkQuantity,
        totalCowMilkQuantity:cMilkQuantity,
        Money: totalMoney, 
        
    }

    let dmonthlyEntries = {
        totalBuffMilkQuantity:bMilkQuantity,
        totalCowMilkQuantity:cMilkQuantity,
        Money: totalMoney, 
        
    }

    

    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        try{
        // initialize Firebase app
        const firebaseApp=initializeApp(firebaseConfig);

        // init services
        // const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
        const dateRef = doc(db,"/dairy/"+dairyId+"/farmers/"+farmerId+"/milkDates/"+todayDate);
        const dairyDailyEntriesRef = doc(db,"/dairy/"+dairyId+"/dailyEntries/"+todayDate);
        const dairyMonthlyEntriesRef = doc(db ,"/dairy/"+dairyId+"/monthlyEntries/"+Month);
        const farmerMonthlyEntriesRef = doc(db ,"/dairy/"+ dairyId+"/farmers/"+farmerId+"/farmerMonthlyEntries/"+Month);

        setDateDoc();
        setDairyDailyEntires();
        setDairyMonthlyEntries();
        setFarmerMonthlyEntries();


        async function setDateDoc(){
            const mySnapshot = await getDoc(dateRef);
            if(mySnapshot.exists())
            {
                const docData = mySnapshot.data();
                let dateData2 ={
                    totalBuffMilkQuantity : docData.totalBuffMilkQuantity+bMilkQuantity,
                    totalCowMilkQuantity : docData.totalCowMilkQuantity+cMilkQuantity,
                    Money : docData.Money+totalMoney,

                }
                setDoc(dateRef,dateData2)
                .then(()=>{
            
                });
            }
            else{
                setDoc(dateRef,dateData)
                .then(()=>{
            
                });

            }
        }

        //Dairy Daily Entires
        async function setDairyDailyEntires(){
            const mySnapshot2 = await getDoc(dairyDailyEntriesRef);
            if(mySnapshot2.exists())
            {
                const docData2 = mySnapshot2.data();
                let dailyData ={
                    totalBuffMilkQuantity : docData2.totalBuffMilkQuantity+bMilkQuantity,
                    totalCowMilkQuantity : docData2.totalCowMilkQuantity+cMilkQuantity,
                    Money : docData2.Money+totalMoney,
                }
                setDoc(dairyDailyEntriesRef,dailyData).then(()=>{

                });
            }
            else{
                setDoc(dairyDailyEntriesRef,dateData)
                .then(()=>{
            
                });

            }
        }
        

        // Dairy Monthly Entries

        async function setDairyMonthlyEntries(){
            const mySnapshot3 = await getDoc(dairyMonthlyEntriesRef);
            if(mySnapshot3.exists())
            {
                const docData3 = mySnapshot3.data();
                let dmonthlyData = {
                    totalBuffMilkQuantity : docData3.totalBuffMilkQuantity+bMilkQuantity,
                    totalCowMilkQuantity : docData3.totalCowMilkQuantity+cMilkQuantity,
                    Money : docData3.Money+totalMoney,

                }
                setDoc(dairyMonthlyEntriesRef,dmonthlyData).then(()=>{

                });
            }
            else{
                setDoc(dairyMonthlyEntriesRef,dmonthlyEntries)
                .then(()=>{
            
                });


            }
        }

        // Farmer Monthly Entries

        async function setFarmerMonthlyEntries(){
            const mySnapshot4 = await getDoc(farmerMonthlyEntriesRef);
            if(mySnapshot4.exists())
            {
                const docData4 = mySnapshot4.data();
                let fmonthlyData = {
                    totalBuffMilkQuantity : docData4.totalBuffMilkQuantity+bMilkQuantity,
                    totalCowMilkQuantity : docData4.totalCowMilkQuantity+cMilkQuantity,
                    Money : docData4.Money+totalMoney,

                }
                setDoc(farmerMonthlyEntriesRef,fmonthlyData).then(()=>{

                });
            }
            else{
                setDoc(farmerMonthlyEntriesRef,dmonthlyEntries)
                .then(()=>{
            
                });

            }
        }


        const entryRef = doc(db,"/dairy/"+dairyId+"/farmers/"+farmerId+"/milkDates/"+todayDate+"/dayTime/"+dayTime) ;
        setDoc(entryRef,request.body)
        .then(()=>{
            console.log("Entry Created");
            return response .send({
                status :"success",
                code:200,
                data:{
                    fId:farmerId,
                    dId:dairyId,
                },
            });
        });
    } catch{
        console.log(error.message);
        return response.send({
            status :"failure",
            code:400,
        });
    }
}

export{newMilkEntry};