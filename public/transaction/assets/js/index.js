document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const urlParams = new URLSearchParams(window.location.search);
  const dId = urlParams.get("token");
  console.log(dId);
  if(dId){
    document.getElementById("dash").href = "../dairyDashboard/?token=" + dId;
    document.getElementById("dcal").href = "../dairyViewData/?token=" + dId;
    document.getElementById("transaction").href = "../transaction/?token=" + dId;
    document.getElementById("farmer").href = "../farmers/?token=" + dId;
  }

});
