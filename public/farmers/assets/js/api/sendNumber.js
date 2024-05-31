/**
 * @param {Object} data The Diary Registration form data
 * @returns {Promise<string>} JSON
 */

 export function trailNumber(data) {
    console.log(data);
    // xyz logic here
    sendToAPI(data);
  }

  async function sendToAPI (info){
    const arg = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };
      try{
      const response = await fetch("/api/numberInfo",arg);
      const result = await response.json();
      if(result.code===200)
      {
        const dId = result.data.dId;
        const fId = result.data.fId;
        window.location.replace(`../farmerProfile/?dId=${dId}&fId=${fId}`);
      }
      else if(result.code===400)
      {
        alert("The Farmer does not belong to this dairy or does not exist!!");
        window.location.reload();
      }
    }
    catch{
      alert("Something went wrong!!");
      window.location.replace(`../dairyDashboard/?token=${result.data.dId}`);
    }
  }