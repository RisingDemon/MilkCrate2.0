// import { json } from "express/lib/response";

/**
 * @param {Object} data The Diary Registration form data
 * @returns {Promise<string>} JSON
 */
 export function trailLogin(data) {
   document.querySelector(".loader").style.display="";
   document.getElementById("opa").style.opacity=0.4;
    console.log(data);
    // xyz logic here
    sendToAPI(data);
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
      const responce = await fetch("/api/login/dairy", arg);
      // console.log(responce.json().code);
      const result=await responce.json();
      console.log(result.code);
      if (result.code === 200) {
        const uid = result.data.uid;
        document.querySelector(".loader").style.display="none";
        document.getElementById("opa").style.opacity=1;
        alert("Login SuccessFull Welcome "+ result.data.email);
        // window.location.replace(`../${data.role}/?token=${token}`);
        window.location.replace(`../dairyDashboard/?token=${uid}`);

      }
      else if(result.code ===400){
        document.querySelector(".loader").style.display="none";
        document.getElementById("opa").style.opacity=1;
        alert(result.message);
      } 
      else{
        throw new Error(result.message);
        
      }

    }catch (error) {
      console.log(error);
      alert("Login Failed...\nPlease try again later!");
      // M.toast({html: result.message,classes:"red"})
    }

  }
  