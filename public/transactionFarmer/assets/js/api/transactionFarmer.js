const getFarmerTransactionInfo = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dId = urlParams.get("dId");
  const fId = urlParams.get("fId");
  const mon = urlParams.get("month");

  if (!dId && !fId) {
    window.location.replace(`../transactionFarmer/?token=${dId}`);
  } else {
    try {
      const response = await fetch("/api/transaction/transactionFarmer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dairyId: dId,
          farmerId: fId,
          month: mon,
        }),
      });

      const result = await response.json();
      if (result.code === 200) {
        console.log(result.documents);
        const store = document.querySelector("#container-data");
        document.getElementById("fname").innerHTML = result.data.fname;

        let farmerData = "";
        console.log(result.documents.length);
        for (let i = 0; i < result.documents.length - 1; i += 2) {
          farmerData += `<div class="dataPdf"><strong class="dataPdf">${
            result.documents[i]
          }</strong></div><br><div class="dataPdf">Amount : ${
            result.documents[i + 1].Money
          }<br>Total Buffalo Milk Quantity : ${
            result.documents[i + 1].totalBuffMilkQuantity
          }<br>Total Cow Milk Quantity :  ${
            result.documents[i + 1].totalCowMilkQuantity
          }</div><br><br>`;
        }
        farmerData += `<div><button id="payBtn" type="button" data-toggle="modal" data-target="#modalPayment">Pay Now</button></div> `;
        farmerData += `<div><div id="editor"><button class="btns" id="cmd" type="button">PDF</button></div><div><button class="btns" id="print" type="button">Print</button></div></div>`;
        // farmerData += `<div><button class="btns" id="print" type="button">Print</button></div>`;
        store.innerHTML = farmerData;

        var doc = new jsPDF();
        var specialElementHandlers = {
          "#editor": function (element, renderer) {
            return true;
          },
        };
        $("#cmd").click(function () {
          doc.fromHTML($("#container-data").html(), 15, 15, {
            width: 170,
            elementHandlers: specialElementHandlers,
          });
          doc.save("sample-file.pdf");
        });

        // $("#print").click(function () {
        //   $("#container-data").printThis();
        // });

        $("#print").click(function () {
          //Hide all other elements other than printarea.
          $("#container-data").show();
          window.print();
      });
      }
    } catch (error) {
      console.log(error);
      //   window.location.replace(`../farmers/?token=${dId}`);
    }
  }
};
export { getFarmerTransactionInfo };
