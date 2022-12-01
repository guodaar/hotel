const roomContainer = document.querySelector(".room-list");
const form = document.querySelector(".dateSelection");
let bookingBtn = document.querySelector(".book-now-btn");
let dateRange;
// let userBookingInfo = JSON.parse(localStorage.getItem("userSelection")) || [];
let userBookingInfo = [];
const currentUser = JSON.parse(sessionStorage.getItem("currentlyLoggedIn"));

///GET ROOM INFO///
const allRooms = [];

async function getRoom() {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/sandstone"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

getRoom().then((room) => {
  allRooms.push(...room.data);
  allRooms.forEach((room) => {
    room;
  });
  console.log(allRooms);
  drawAllRooms(allRooms);
});

function drawRoom(room, target, index) {
  const photoContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  const sideContainer = document.createElement("div");
  const container = document.createElement("div");
  container.setAttribute("class", "room");
  photoContainer.setAttribute("class", "room-photo-box");
  infoContainer.setAttribute("class", "room-info-box");
  sideContainer.setAttribute("class", "room-side-box");
  let name = document.createElement("h3");
  let photo = document.createElement("img");
  let size = document.createElement("p");
  let occupancy = document.createElement("p");
  let rate = document.createElement("p");
  let description = document.createElement("p");
  let amenities = document.createElement("p");
  let bookNow = document.createElement("button");

  size.setAttribute("class", "size-value");
  amenities.setAttribute("class", "amenities-value");
  rate.setAttribute("class", "rate-value");
  occupancy.setAttribute("class", "sleeps-value");
  bookNow.setAttribute("class", "book-now-btn");

  name.textContent = `${room.roomName}`;
  photo.src = `${room.photoURL}`;
  occupancy.textContent = `${room.occupancy}`;
  size.textContent = `${room.size}`;
  rate.textContent = `${room.nightlyRate}`;
  description.textContent = `${room.description}`;
  amenities.textContent = `${room.amenities}`;
  bookNow.textContent = "Book Now";

  bookNow.addEventListener("click", () => {
    let code = { roomCode: room.roomCode };
    let user = { username: currentUser.username };

    userBookingInfo.push(code);
    userBookingInfo.push(user);
    addItem(code);
    window.location.href = "/rates/bookingpage.html";
  });

  photoContainer.appendChild(photo);
  infoContainer.appendChild(name);
  infoContainer.appendChild(description);
  infoContainer.appendChild(size);
  infoContainer.appendChild(occupancy);
  infoContainer.appendChild(amenities);
  sideContainer.appendChild(rate);
  sideContainer.appendChild(bookNow);
  container.appendChild(photoContainer);
  container.appendChild(infoContainer);
  container.appendChild(sideContainer);
  target.appendChild(container);
}

////DRAW ALL ROOMS////
function drawAllRooms(arr) {
  roomContainer.innerHTML = null;
  arr.forEach((element, index) => {
    drawRoom(element, roomContainer, index);
  });
}
window.addEventListener("load", () => {
  drawAllRooms(allRooms);
});

////DATE SELECTION////
flatpickr("#dateSelect", {
  mode: "range",
  dateFormat: "Y-m-d",
  minDate: "today",
  onClose: function (selectedDates, dateStr, instance) {
    let daysInRange = document.getElementsByClassName("inRange");
    let nightsLengthTotal = daysInRange.length + 1;
    dateRange = nightsLengthTotal;
  },
});

const fp = document.querySelector("#dateSelect")._flatpickr;

////GUEST SELECTIONS////
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let selectedDate = { date: document.querySelector("#dateSelect").value };
  let selectedAdults = { adults: document.querySelector("#adults").value };
  let selectedKids = { kids: document.querySelector("#children").value };
  let selectedRange = { nights: dateRange };
  let totalGuests = Number(selectedAdults.adults) + Number(selectedKids.kids);

  filterRooms(allRooms, totalGuests);
  userBookingInfo = [];
  userBookingInfo.push(selectedDate);
  userBookingInfo.push(selectedAdults);
  userBookingInfo.push(selectedKids);
  userBookingInfo.push(selectedRange);
});

function addItem() {
  sessionStorage.setItem("userSelection", JSON.stringify(userBookingInfo));
  let results = JSON.parse(sessionStorage.getItem("userSelection"));
}

////FILTER ROOMS BY OCCUPANCY////
function filterRooms(arr, keyword) {
  const searchResults = arr.filter(function (room) {
    if (Number(room.occupancy) >= keyword) {
      return room;
    }
  });
  drawAllRooms(searchResults);
}
