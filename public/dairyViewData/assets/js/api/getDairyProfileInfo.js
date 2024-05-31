const getDairyProfileInfo = async () => {
    document.querySelector(".loader").style.display="";
    document.getElementById("wrapper").style.opacity=0.4;
    const urlParams = new URLSearchParams(window.location.search);
    const dId = urlParams.get("token");
    // const fId = urlParams.get("fId");
    console.log(dId);

    if(!dId){
      console.log("cannot go ahead");
      // window.location.replace(`../farmers/?token=${dId}`);
    }
    else{
        try{
          // console.log("in try block");
            const response = await fetch("/api/dairyProfile/dairyId", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: dId,
                  // farmerId: fId,
                }),
              });
            const result = await response.json();
            if(result.code===200)
            {
              // console.log(result);
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
              document.getElementById("tran").href="../transaction/?token="+dId;
              document.querySelector(".loader").style.display="none";
              document.getElementById("wrapper").style.opacity=1;
          
            }

        }catch(error){
            console.log(error);
            window.location.replace(`../farmers/?token=${dId}`);
        }
    }
  
  };
  
  export { getDairyProfileInfo };