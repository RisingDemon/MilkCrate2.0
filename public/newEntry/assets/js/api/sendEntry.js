/**
 * @param {Object} data The Diary Registration form data
 * @returns {Promise<string>} JSON
 */

 export function trailNewEntry(data) {
    console.log(data);
    // xyz logic here
    sendToAPI(data);
  }

  async function sendToAPI(info){
    const arg = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };

      const response = await fetch("/api/farmers/newEntry",arg);
      const result = await response.json();
      console.log(result);
      if(result.code===200)
      {
        alert("Entry Done !");
        const dId = result.data.dId;
        const fId = result.data.fId;
        window.location.replace(`../farmerProfile/?dId=${dId}&fId=${fId}`);
      }
      else{
        alert("Something went wrong !!");
        window.location.replace(`../farmerProfile/?dId=${dId}&fId=${fId}`);
      }
      
  }