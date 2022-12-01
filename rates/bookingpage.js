const bookingDetails = document.querySelector(".booking-info");

///FORM///
const form = document.querySelector(".booking-details");
const confirmBtn = document.querySelector("#submit-btn");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const phoneNumber = document.querySelector("#phone-number");
let specialReq = document.querySelector("#special-request");
const thankYouMsg = document.querySelector(".thank-you");
const formContainer = document.querySelector(".form-wrapper");

///DATA FROM SESSIONS STORAGE///
let bookingInfo = JSON.parse(sessionStorage.getItem("userSelection"));
let date = bookingInfo[0].date;
let adults = bookingInfo[1].adults;
let kids = bookingInfo[2].kids;
let nights = bookingInfo[3].nights;
let roomCode = bookingInfo[4].roomCode;
let username = bookingInfo[5].username;
let guestsTotal = Number(adults) + Number(kids);

console.log(date, adults, kids, nights, roomCode, username, guestsTotal);

///GET ROOM DETAILS FROM API///
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
  let result = room.data.filter((obj) => {
    return obj.roomCode === roomCode;
  });
  drawRoom(...result);
});

///SHOW ROOM DETAILS///
function drawRoom(room) {
  const photoContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  const pricingContainer = document.createElement("div");
  photoContainer.setAttribute("class", "room-photo-box");
  infoContainer.setAttribute("class", "room-info-box");
  pricingContainer.setAttribute("class", "pricing-box");
  let name = document.createElement("h4");
  let photo = document.createElement("img");
  let size = document.createElement("p");
  let occupancy = document.createElement("p");
  let totalNights = document.createElement("p");
  let rate = document.createElement("p");
  let dates = document.createElement("p");
  let totalPrice = Number(room.nightlyRate) * Number(nights);

  size.setAttribute("class", "size-value");
  occupancy.setAttribute("class", "guests-value");
  dates.setAttribute("class", "dates-value");
  totalNights.setAttribute("class", "nights-value");
  rate.setAttribute("class", "rate-value");

  name.textContent = `${room.roomName}`;
  photo.src = `${room.photoURL}`;
  dates.textContent = `${date}`;
  occupancy.textContent = `${guestsTotal} (${adults} adults, ${kids} children)`;
  totalNights.textContent = `${nights}`;
  rate.textContent = `$${room.nightlyRate} x ${nights} nights = $${totalPrice}`;

  photoContainer.appendChild(photo);
  infoContainer.appendChild(name);
  infoContainer.appendChild(size);
  infoContainer.appendChild(dates);
  infoContainer.appendChild(occupancy);
  infoContainer.appendChild(totalNights);
  pricingContainer.appendChild(rate);
  pricingContainer.appendChild(confirmBtn);
  bookingDetails.appendChild(photoContainer);
  bookingDetails.appendChild(infoContainer);
  bookingDetails.appendChild(pricingContainer);
}

///CONFIRM BOOKING///
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getRoom().then((room) => {
    let result = room.data.filter((obj) => {
      return obj.roomCode === roomCode;
    });
    saveBooking(result[0]).then((booking) => {
      console.log(booking);
      alert(
        "You booking is confirmed. You'll find your booking in your account. Have a nice day!"
      );
      sessionStorage.removeItem("userSelection");
      window.location.href = "/rates/rates.html";
    });
  });
});

async function saveBooking(room) {
  if (specialReq.value === "") {
    specialReq.value = "No special requests";
  } else {
    specialReq.value = document.querySelector("#special-request").value;
  }
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/userBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          firstName: firstName.value,
          lastName: lastName.value,
          phoneNumber: phoneNumber.value,
          roomName: room.roomName,
          nightlyRate: room.nightlyRate,
          totalGuests: guestsTotal,
          date: date,
          description: room.description,
          amenities: room.amenities,
          size: room.size,
          roomPhoto: room.photoURL,
          totalNights: nights,
          specialRequest: specialReq.value,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
