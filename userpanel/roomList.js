const roomContainer = document.querySelector(".room-list");

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
  let photo = document.createElement("img");
  let name = document.createElement("h3");
  let description = document.createElement("p");
  let size = document.createElement("p");
  let beds = document.createElement("p");
  let amenities = document.createElement("p");

  let rate = document.createElement("p");
  let delBtn = document.createElement("button");

  photo.src = `${room.photoURL}`;

  name.textContent = `${room.roomName}`;
  description.textContent = `${room.description}`;
  size.innerHTML = `<p><strong>Size:</strong> ${room.size} sq ft</p>`;
  beds.innerHTML = `<p><strong>Bed configuration:</strong> ${room.singleBeds} single, ${room.doubleBeds} double`;
  amenities.innerHTML = `<p><strong>Amenities:</strong> ${room.amenities}</p>`;

  rate.innerHTML = `<p><span>$${room.nightlyRate}</span>per night</p>`;
  delBtn.textContent = "Delete Room";

  delBtn.addEventListener("click", () => {
    allRooms.splice(index, 1);
    drawAllRooms(allRooms);
  });

  photoContainer.appendChild(photo);
  infoContainer.appendChild(name);
  infoContainer.appendChild(description);
  infoContainer.appendChild(size);
  infoContainer.appendChild(beds);
  infoContainer.appendChild(amenities);
  sideContainer.appendChild(rate);
  sideContainer.appendChild(delBtn);

  container.appendChild(photoContainer);
  container.appendChild(infoContainer);
  container.appendChild(sideContainer);
  target.appendChild(container);
}

function drawAllRooms(arr) {
  roomContainer.innerHTML = null;
  arr.forEach((element, index) => {
    drawRoom(element, roomContainer, index);
  });
}
window.addEventListener("load", () => {
  drawAllRooms(allRooms);
});
