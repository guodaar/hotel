const bookingsContainer = document.querySelector(".bookings-list");
const currentUser = JSON.parse(sessionStorage.getItem("currentlyLoggedIn"));

///GET ROOM INFO///
let allBookings = [];

async function getBookings() {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/userBooking"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

getBookings().then((booking) => {
  allBookings = booking.data;
  filterByUsername(allBookings);
  //   drawAllBookings(allBookings);
});

///FILTER BOOKINGS BY USER////
function filterByUsername(arr) {
  const userBookings = arr.filter(function (user) {
    if (user.username === currentUser.username) {
      return user;
    }
  });
  drawAllBookings(userBookings, userBookings);
  console.log(userBookings);
}

///DRAW BOOKING///
function drawBooking(booking, arr2, index) {
  const visibleContainer = document.createElement("div");
  const photoContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  const btnContainer = document.createElement("div");
  const detailsContainer = document.createElement("div");
  const container = document.createElement("div");
  container.setAttribute("class", "booking");
  photoContainer.setAttribute("class", "booking-photo-box");
  infoContainer.setAttribute("class", "booking-info-box");
  detailsContainer.setAttribute("class", "all-details-box");
  visibleContainer.setAttribute("class", "visible-box");
  btnContainer.setAttribute("class", "buttons");
  let photo = document.createElement("img");
  let roomName = document.createElement("h3");
  let dates = document.createElement("h5");
  let guestName = document.createElement("p");
  let guests = document.createElement("p");
  let price = document.createElement("p");
  let size = document.createElement("p");
  let description = document.createElement("p");
  let amenities = document.createElement("p");
  let showBtn = document.createElement("button");
  let cxlBtn = document.createElement("button");
  let totalPrice = Number(booking.nightlyRate) * Number(booking.totalNights);

  price.setAttribute("class", "price-value");
  cxlBtn.setAttribute("class", "cxl-btn");

  photo.src = `${booking.roomPhoto}`;
  roomName.textContent = `${booking.roomName}`;
  dates.textContent = `${booking.date}`;
  guestName.textContent = `Guest: ${booking.firstName} ${booking.lastName}`;
  guests.textContent = `Booked for: ${booking.totalGuests} guests`;
  price.textContent = `$${totalPrice}`;

  size.textContent = `Size: ${booking.size} sq ft`;
  description.textContent = `${booking.description}`;
  amenities.textContent = `Room amenities: ${booking.amenities}`;

  showBtn.textContent = "Show details";
  cxlBtn.textContent = "Cancel booking";

  ///CANCEL BOOKING///
  const id = booking.id;
  cxlBtn.addEventListener("click", () => {
    if (confirm(`Are you sure you want to cancel your booking?`)) {
      cxlBooking(id).then((booking) => {
        console.log(booking);
      });
      arr2.splice(index, 1);
      drawAllBookings(arr2);
    }
  });

  ///SHOW DETAILS///
  showBtn.addEventListener("click", () => {
    if (detailsContainer.style.display === "") {
      detailsContainer.style.display = "block";
      detailsContainer.appendChild(size);
      detailsContainer.appendChild(description);
      detailsContainer.appendChild(amenities);
    } else {
      detailsContainer.style.display = "";
    }
  });

  photoContainer.appendChild(photo);
  infoContainer.appendChild(roomName);
  infoContainer.appendChild(dates);
  infoContainer.appendChild(guestName);
  infoContainer.appendChild(guests);
  infoContainer.appendChild(price);

  btnContainer.appendChild(cxlBtn);
  btnContainer.appendChild(showBtn);
  visibleContainer.appendChild(photoContainer);
  visibleContainer.appendChild(infoContainer);
  visibleContainer.appendChild(btnContainer);
  container.appendChild(visibleContainer);
  container.appendChild(detailsContainer);
  bookingsContainer.appendChild(container);
}

///DRAW LIST OF BOOKINGS///
function drawAllBookings(arr, arr2) {
  bookingsContainer.innerHTML = null;
  arr.forEach((element, index) => {
    drawBooking(element, arr2, index);
  });
}

///CANCEL BOOKING FROM API////
async function cxlBooking(id) {
  try {
    const response = await fetch(
      "	https://testapi.io/api/guodaAr/resource/userBooking/" + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
