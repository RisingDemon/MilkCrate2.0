
/**
 * @param {Object} data The Diary Registration form data
 * @returns {Promise<string>} JSON
 */


export function trailuserReg(data){
    sendToAPI(data);
}

async function sendToAPI(info)
{
    const arg = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };

      try{
          const response = await fetch("/api/user/reg",arg);
          const result = await response.json();
          console.log("This is result");
          console.log(result.code);
          if(result.code===200)
          {
              const dUid = result.data.dUid;
              alert("User SucessFully Registered");
              window.location.replace(`../dairyDashboard/?token=${dUid}`);
          }
          else if(result.code===400)
          {
              alert("Something Went Wrong !! Please Try again later");
              window.location.replace(`../dairyDashboard/?token=${info.dairyId}`);
          }

      }catch(error){
          console.log(error);
          alert("Something Went Wrong !! Please Try again later");
          window.location.replace(`../dairyDashboard/?token=${info.dairyId}`);

      }
}