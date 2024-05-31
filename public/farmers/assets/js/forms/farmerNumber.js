import { trailNumber } from "../api/sendNumber.js";
export function getFarmerProfile(){
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const numForm = document.getElementById("num");
    const phoneNumber = document.getElementById("phoneNum");

    numForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        let phoneInfo={
            dId : token,
            number:phoneNumber.value,
        }

        console.log(phoneInfo);
        trailNumber(phoneInfo);
    })
}