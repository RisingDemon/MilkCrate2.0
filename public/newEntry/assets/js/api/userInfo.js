const getUserInfo = async () => {
    document.querySelector(".loader").style.display="";
    document.getElementById("wrapper").style.opacity=0.4;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("dId");
    console.log(token);

    if(!token){
        window.location.replace("../dairyLogin/");
    }
    else{
        try{
            const response = await fetch("/api/credentials/dairyId", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: token,
                }),
              });
            const result = await response.json();
            if(result.code===200)
            {
              console.log(result.data);
              const element = document.getElementById("userName");
              element.innerHTML = "Welcome "+result.data.Fname;
              document.getElementById("dairyName").innerHTML =result.data.dairyName;
              document.querySelector(".loader").style.display="none";
              document.getElementById("wrapper").style.opacity=1;
              document.getElementById("dashId").href="../dairyDashboard/?token="+token;
              document.getElementById("calId").href="../dairyViewData/?token="+token;
              document.getElementById("farmId").href="../farmers/?token="+token;
              document.getElementById("transId").href="../transaction/?token="+token;
              // document.getElementById("profile").href="../dairyProfile/?token="+token;
              // document.getElementById("farmerSearch").href="../farmers/?token="+token;
          
            }

        }catch(error){
            console.log(error);
            window.location.replace("../dairyLogin/");
        }
    }
  
  };
  
  export { getUserInfo };