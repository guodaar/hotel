const addRoomsToggle = document.querySelector("#add-rooms-btn");
const mngRoomsToggle = document.querySelector("#mng-rooms-btn");

const form = document.querySelector(".admin-inputs");
const formContainer = document.querySelector(".form-container");
const roomList = document.querySelector(".room-list");

const roomName = document.querySelector("#room-name");
const roomCount = document.querySelector("#room-count");
const photoURL = document.querySelector("#room-photo");
const size = document.querySelector("#size");
const rate = document.querySelector("#nightly-rate");
const singleBeds = document.querySelector("#single-beds");
const doubleBeds = document.querySelector("#double-beds");
const description = document.querySelector("#description");
const amenities = document.querySelector("#amenities");

const clearFields = document.querySelector("#clear-fields");

////TOGGLE BUTTONS////
addRoomsToggle.addEventListener("click", () => {
  if (window.getComputedStyle(formContainer).display === "none") {
    formContainer.style.display = "flex";
    roomList.style.display = "";
  } else {
    formContainer.style.display = "";
  }
});

mngRoomsToggle.addEventListener("click", () => {
  if (window.getComputedStyle(roomList).display === "none") {
    roomList.style.display = "flex";
    formContainer.style.display = "";
  } else {
    roomList.style.display = "";
  }
});

////NUMBERS INPUT/////
function onlyNumberKey(evt) {
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

/////SAVE ROOM INFO////
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveRoom().then((room) => {
    console.log(room);
  });
});

async function saveRoom() {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/sandstone",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName.value,
          numberOfRooms: roomCount.value,
          photoURL: photoURL.value,
          size: size.value,
          nightlyRate: rate.value,
          singleBeds: singleBeds.value,
          doubleBeds: doubleBeds.value,
          description: description.value,
          amenities: amenities.value,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

clearFields.addEventListener("click", () => {
  if (confirm(`This will clear all inputs. Proceed?`)) {
    form.reset();
  }
});

////DISPLAY ADDED ROOMS////
