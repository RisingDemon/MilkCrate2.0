import { trailNewEntry } from "../api/sendEntry.js";
export function getNewEntryFormdata(){

    const urlParams = new URLSearchParams(window.location.search);
    const fId = urlParams.get("fId");
    const dId = urlParams.get("dId");

    const time = document.getElementById("time");
    const entryForm = document.getElementById("newEntry");
    const buffMilkQuantity = document.getElementById("Bmilkquantity");
    const buffFatQuantity = document.getElementById("Bmilkfat");
    const buffMilkRate = document.getElementById("Bmilkrate");
    const cowMilkQuantity = document.getElementById("CmilkQuantity");
    const cowFatQuantity = document.getElementById("Cmilkfat");
    const cowMilkRate = document.getElementById("Cmilkrate");
   
    const d = new Date();
    const date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    const month =( d.getMonth()+1)+"-"+d.getFullYear();
    


    entryForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        var num1 =buffMilkQuantity.value;
        var num2 =buffMilkRate.value;
        var num3 = cowMilkQuantity.value;
        var num4 = cowMilkRate.value;
        const money = (num1 * num2) + (num3 * num4);
        console.log(money);
        let milkData={
            dayTime : time.value,
            bMilkQuantity : Number(buffMilkQuantity.value),
            bMilkFat : Number(buffFatQuantity.value),
            bMilkRate : Number(buffMilkRate.value),
            cMilkQuantity : Number(cowMilkQuantity.value),
            cMilkFat : Number(cowFatQuantity.value),
            cMilkRate : Number(cowMilkRate.value),
            dairyId : dId,
            farmerId : fId,
            todayDate : date,
            totalMoney : money,
            Month :month,
        }

        console.log(milkData);

        trailNewEntry(milkData);
    })



}