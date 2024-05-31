import{trailFarmerData} from "./api/getFarmerInfo.js"

const urlParams = new URLSearchParams(window.location.search);
    // const fId = urlParams.get("fId");
    const dId = urlParams.get("dId");

    // console.log(fId);
    console.log(dId);

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<button class="Dbtn" type="button" data-toggle="modal" data-target="#exampleModalCenter"><div class="today dateClick"  id="${i}" onclick="myFunction(this.id)">${i}</div></button>`;
    } else {
      days += `<button class="Dbtn" type="button" data-toggle="modal" data-target="#exampleModalCenter"><div class="dateClick" id="${i}" onclick="myFunction(this.id)">${i}</div></button>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

window.myFunction= myFunction;
function myFunction(clicked_id) {
  // alert(clicked_id);
  const day =
    clicked_id + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  console.log(day);
  let dayObj = {
    dayId: day,
    CaldId: dId,
    // CalfId: fId,
  }
  console.log(dayObj);
  trailFarmerData(dayObj);
}

renderCalendar();
