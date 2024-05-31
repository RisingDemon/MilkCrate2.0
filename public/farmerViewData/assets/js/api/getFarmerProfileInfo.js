const getFarmerProfileInfo = async () => {
    document.querySelector(".loader").style.display="";
    document.getElementById("wrapper").style.opacity=0.4;
    const urlParams = new URLSearchParams(window.location.search);
    const dId = urlParams.get("dId");
    const fId = urlParams.get("fId");
    console.log(dId);

    if(!dId){
      // window.location.replace(`../farmers/?token=${dId}`);
    }
    else{
        try{
            const response = await fetch("/api/farmerProfile/dairyId/farmerId", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  dairyId: dId,
                  farmerId: fId,
                }),
              });
            const result = await response.json();
            if(result.code===200)
            {
              console.log(result.data);
              const element = document.getElementById("userName");
              element.innerHTML = "Welcome "+result.data.Fname;
              document.getElementById("dairyName").innerHTML =result.data.dairyName;

              // window.location.replace(`../dairyDashboard/?token=${uid}`);
              // document.getElementById("farmerReg").href="../../farmerRegister/?token="+dId;
              document.getElementById("profile").href="../dairyProfile/?token="+dId;
              document.getElementById("farmerSearch").href="../farmers/?token="+dId;
              document.getElementById("dash").href="../dairyDashboard/?token="+dId;
              document.getElementById("dCal").href="../dairyViewData/?token="+dId;
              document.querySelector(".loader").style.display="none";
              document.getElementById("wrapper").style.opacity=1;
              
          
            }

        }catch(error){
            console.log(error);
            window.location.replace(`../farmers/?token=${dId}`);
        }
    }
  
  };
  
  export { getFarmerProfileInfo };