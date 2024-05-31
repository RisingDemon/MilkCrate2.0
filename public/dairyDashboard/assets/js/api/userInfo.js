const getUserInfo = async () => {
    document.querySelector(".loader").style.display="";
    document.getElementById("wrapper").style.opacity=0.4;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);

    const d = new Date();
    const date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    const month =( d.getMonth()+1)+"-"+d.getFullYear();

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
                  date :date,
                  month:month,
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
              document.getElementById("farmerReg").href="../farmerRegister/?token="+token;
              document.getElementById("profile").href="../dairyProfile/?token="+token;
              document.getElementById("farmerSearch").href="../farmers/?token="+token;
              document.getElementById("dash").href="../dairyDashboard/?token="+token;
              document.getElementById("dairyCalendar").href="../../dairyViewData/?token="+token;
              document.getElementById("transaction").href="../../transaction/?token="+token;


              var ctxD = document.getElementById("dough1").getContext('2d');
              var myLineChart = new Chart(ctxD, {
                  type: 'doughnut',
                  data: {
                      labels: ["Cow Milk","Buffalo Milk"],
                      datasets: [{
                          data: [result.data.dailyCmilk,result.data.dailyBmilk],
                          backgroundColor: ["#4e73df", "#1cc88a"],
                          borderColor :["#ffffff","#ffffff","#ffffff"],
                      }],
                  options :{
                      maintainAspectRatio:false,
                      legend:{
                          display:true,
                          labels:{
                              fontStyle:"normal",
                          }
                      },
                title:{
                    fontStyle:"normal",
                    display :false,
                }
            }
          },
          options: {
            responsive: true,
          }
        });
        

        var ctxD2 = document.getElementById("dough2").getContext('2d');
        var myLineChart = new Chart(ctxD2, {
            type: 'doughnut',
            data: {
                labels: ["Cow Milk","Buffalo Milk"],
                datasets: [{
                    data: [result.data.monthlyCmilk,result.data.monthlyBmilk],
                    backgroundColor: ["#4e73df", "#1cc88a"],
                    borderColor :["#ffffff","#ffffff","#ffffff"],
                }],
            options :{
                maintainAspectRatio:false,
                legend:{
                    display:true,
                    labels:{
                        fontStyle:"normal",
                    }
                },
          title:{
              fontStyle:"normal",
              display :false,
          }
      }
    },
    options: {
      responsive: true,
    }
  });
          
        }

        }catch(error){
            console.log(error);
            window.location.replace("../dairyLogin/");
        }
    }
    document.querySelector(".loader").style.display="none";
    document.getElementById("wrapper").style.opacity=1;
  };
  
  export { getUserInfo };