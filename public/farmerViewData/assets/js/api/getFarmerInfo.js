/**
 * @param {Object} data The Diary Registration form data
 * @returns {Promise<string>} JSON
 */
 export function trailFarmerData(fdata) {
    
    console.log(fdata);
    // xyz logic here
    sendToAPI(fdata);
  }

  async function sendToAPI(info) {
    // next xyz login here
    const arg = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };

    try{
        const response = await fetch("/api/getFarmerInfo/date", arg);

        const result = await response.json();
        if(result.code===200)
        {
          document.querySelector("#exampleModalLongTitle").innerHTML=info.dayId;
          document.querySelector("#calModal-body").innerHTML=("Amount : " + result.data.tMoney +" rupees"+ '\n' +"Buffalo Milk : "+ result.data.buff +" liters"+ '\n' +"Cow Milk : " + result.data.cow +" liters");
          // alert("Money: " + result.data.tMoney+ "    Buffalo Milk: "+ result.data.buff+ "    Cow Milk: "+ result.data.cow );
          document.getElementById("profile").href="../dairyProfile/?token="+dId;
          document.getElementById("farmerSearch").href="../farmers/?token="+dId;
          document.getElementById("dash").href="../dairyDashboard/?token="+dId;
          document.getElementById("dCal").href="../dairyViewData/?token="+dId;
        }
        else if(result.code===400){
          // alert("No data found!!");
          document.querySelector("#exampleModalLongTitle").innerHTML=info.dayId;
          document.querySelector("#calModal-body").innerHTML="No data found!!"

        }

      }catch(error){
        console.log(error);
      }
}