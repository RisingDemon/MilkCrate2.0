const getFarmerProfileInfo = async () => {
    document.querySelector(".loader").style.display="";
    document.getElementById("wrapper").style.opacity=0.4;
    const urlParams = new URLSearchParams(window.location.search);
    const fId = urlParams.get("fId");
    const dId = urlParams.get("dId");
    console.log("dairy"+dId);
    console.log("farmer"+fId);
    


    if(!dId && !fId)
    {
      window.location.replace(`../farmers/?token=${dId}`);
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
          document.getElementById("profile_name").innerHTML=result.data.dairyName;
          document.getElementById("welcome").innerHTML="Welcome "+result.data.Fname;
          document.getElementById("first_name").placeholder=result.data.Fname;
          document.getElementById("last_name").placeholder=result.data.Lname;
          document.getElementById("contactNo").placeholder=result.data.phoneNumber;
          document.getElementById("aadhar").placeholder=result.data.aadharNo;
          document.getElementById("dairyName").placeholder=result.data.dairyName;
          document.getElementById("newEntry").href="../newEntry/?dId="+dId+"&fId="+fId;
          document.getElementById("dashboard").href="../dairyDashboard/?token="+dId;
          document.getElementById("farmerSearch").href="../farmers/?token="+dId;
          document.getElementById("viewdata").href="../farmerViewData/?dId="+dId+"&fId="+fId;
          document.getElementById("transaction").href="../transaction/?dId="+dId+"&fId="+fId;
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