const getProfileInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);

    if(!token)
    {
      window.location.replace(`../dairyDashboard/?token=${token}`);
    }
    else{
      try{
        const response = await fetch("/api/dairyProfile/dairyId", {
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
          document.getElementById("profile_name").innerHTML=result.data.dairyName;
          document.getElementById("welcome").innerHTML="Welcome "+result.data.Fname;
          document.getElementById("dairyName").placeholder=result.data.dairyName;
          document.getElementById("email").placeholder=result.data.email;
          document.getElementById("first_name").placeholder=result.data.Fname;
          document.getElementById("last_name").placeholder=result.data.Lname;
          document.getElementById("dairy_loc").placeholder=result.data.dairyLoc;
          document.getElementById("taluka").placeholder=result.data.taluka;
          document.getElementById("district").placeholder=result.data.district;
          document.getElementById("age").placeholder=result.data.age;
          document.getElementById("contactNo").placeholder=result.data.phoneNumber;
          document.getElementById("aadhar").placeholder=result.data.aadharNo;

        }

      }catch(error){
        console.log(error);
        window.location.replace(`../dairyDashboard/?token=${token}`);
      }
    }
  
  };
  
  export { getProfileInfo };