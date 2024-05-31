// import{dairyRegInfo} from './dairyDetail.js';
// console.log(dairyRegInfo);



/**
 * @param {Object} data The Diary Registration form data
 */
export function trailing(data) {
  console.log(data);
  // console.log(dataUid);
  // xyz logic here
  sendToAPI(data);
}

 function sendToAPI(info) {
  // next xyz login here
  const arg = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  // const arg2 = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(infoUid),
  // };
  console.log(arg);
  fetch("/api/registration/dairy", arg);
  alert('Successfully Registered');
}
