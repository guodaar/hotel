///MAIN BUTTONS///
const addRoomsToggle = document.querySelector("#add-rooms-btn");
const mngRoomsToggle = document.querySelector("#mng-rooms-btn");

///FORM///
const form = document.querySelector(".admin-inputs");
const formContainer = document.querySelector(".form-container");
const roomName = document.querySelector("#room-name");
const roomCount = document.querySelector("#room-count");
const photoURL = document.querySelector("#room-photo");
const size = document.querySelector("#size");
const rate = document.querySelector("#nightly-rate");
const occupancy = document.querySelector("#sleeps");
const description = document.querySelector("#description");
const amenities = document.querySelector("#amenities");
const clearFields = document.querySelector("#clear-fields");

///ROOM LIST///
const roomList = document.querySelector(".room-list");

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
form.addEventListener("submit", () => {
  saveRoom().then((room) => {
    console.log(room);
  });
  form.reset();
  alert("Room added!");
});

const roomCode = Math.floor(Math.random() * 1000) + 1;

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
          occupancy: occupancy.value,
          description: description.value,
          amenities: amenities.value,
          roomCode: roomCode,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

///CLEAR FIELDS///
clearFields.addEventListener("click", () => {
  if (confirm(`This will clear all inputs. Proceed?`)) {
    form.reset();
  }
});
