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
        const response = await fetch("/api/getDairyInfo/date", arg);

        const result = await response.json();
        if(result.code===200)
        {
          document.querySelector("#exampleModalLongTitle").innerHTML=info.dayId;
          document.querySelector("#calModal-body").innerHTML=("Amount : " + result.data.tMoney +" rupees"+ "\r\n" +"Buffal0 Milk : "+ result.data.buff +" liters"+ "\r\n" +"Cow  Milk : " + result.data.cow +" liters");
          // alert("Money: " + result.data.tMoney+ "    Buffalo Milk: "+ result.data.buff+ "    Cow Milk: "+ result.data.cow );
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