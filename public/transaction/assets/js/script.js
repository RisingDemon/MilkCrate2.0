// /**
//  *
//  *@returns {Promise<string>} JSON
//  */

// const mon = urlParams.get("month");

window.changeFunc = changeFunc;
function changeFunc(getMonth) {
  const urlParams = new URLSearchParams(window.location.search);
  const dId = urlParams.get("token");
  console.log(dId);
  console.log("in transaction");
  console.log(getMonth);
  if (dId) {

    const renderFarmers = async () => {
      const tbody = document.querySelector("#tranBody");
      // const month_val = document.querySelector("#sel_month").value;
      //   console.log(month_val);
      document.querySelector(".loader").style.display = "";
      document.getElementById("wrapper").style.opacity = 0.4;

      try {
        const response = await fetch("/api/getFarmers/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dairyId: dId,
            month: getMonth,
          }),
        });

        const result = await response.json();
        if (result.code === 200) {
          console.log(result);
          console.log(result.documents.length);
          document.getElementById("dash").href =
            "../dairyDashboard/?token=" + dId;
          document.getElementById("dcal").href =
            "../dairyViewData/?token=" + dId;
          document.getElementById("transaction").href =
            "../transaction/?token=" + dId;
          document.getElementById("farmer").href = "../farmers/?token=" + dId;
          let farmers = "";

          for (let i = 0; i < result.documents.length; i++) {
            farmers += `<tr>
            <td colspan="3px"><button id="${result.documents[i].farmerId}" class="butBorder" onclick="transactionFunction(this.id)"> ${result.documents[i].farmerName} </button></td>
            <td colspan="3px">${result.documents[i].phoneNo} </td>
        </tr>`;
          }

          tbody.innerHTML = farmers;
          //   document.getElementById("wrapper").style.opacity=1;
          document.querySelector(".loader").style.display = "none";
          document.getElementById("wrapper").style.opacity = 1;
        }
      } catch (error) {
        console.log(error);
        // window.location.replace(`../farmers/?token=${dId}`);
      }
      window.transactionFunction = transactionFunction;
      function transactionFunction(clicked_id) {
        window.location.replace(
          `../transactionFarmer/?dId=${dId}&fId=${clicked_id}&month=${getMonth}`
        );
      }
    };

    $("#input").keyup(function () {
      var value = this.value.toLowerCase();
      $("#tranBody").each(function () {
        var id = $(this).text().toLowerCase();
        $(this).toggle(id.indexOf(value) !== -1);
      });
    });

    renderFarmers();
  }
  // console.log(mon);

  // window.location.replace(`../transaction/?token=${dId}&month=${getMonth}`);
}
