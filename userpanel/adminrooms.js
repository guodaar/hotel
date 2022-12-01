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

////DRAW ROOM --> DELETE ROOM & EDIT ROOM////
function drawRoom(room, target, index) {
  const photoContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  const sideContainer = document.createElement("div");
  const btnContainer = document.createElement("div");
  const container = document.createElement("div");
  container.setAttribute("class", "room");
  photoContainer.setAttribute("class", "room-photo-box");
  infoContainer.setAttribute("class", "room-info-box");
  sideContainer.setAttribute("class", "room-side-box");
  btnContainer.setAttribute("class", "buttons");
  let name = document.createElement("h3");
  let photo = document.createElement("img");
  let size = document.createElement("p");
  let occupancy = document.createElement("p");
  let rate = document.createElement("p");
  let description = document.createElement("p");
  let amenities = document.createElement("p");
  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let roomCount = room.numberOfRooms;
  let roomCode = room.roomCode;

  size.setAttribute("class", "size-value");
  amenities.setAttribute("class", "amenities-value");
  rate.setAttribute("class", "rate-value");
  occupancy.setAttribute("class", "sleeps-value");

  name.textContent = `${room.roomName}`;
  photo.src = `${room.photoURL}`;
  occupancy.textContent = `${room.occupancy}`;
  size.textContent = `${room.size}`;
  rate.textContent = `${room.nightlyRate}`;
  description.textContent = `${room.description}`;
  amenities.textContent = `${room.amenities}`;
  delBtn.textContent = "Delete Room";
  editBtn.textContent = "Edit";

  ///DELETE ROOM///
  const id = room.id;
  delBtn.addEventListener("click", () => {
    deleteRoom(id).then((room) => {
      console.log(room);
    });
    allRooms.splice(index, 1);
    drawAllRooms(allRooms);
  });

  ///EDIT ROOM --> SAVE EDIT & CANCEL EDIT///
  editBtn.addEventListener("click", function () {
    const photoEdit = document.createElement("input");
    const nameEdit = document.createElement("input");
    const descriptionEdit = document.createElement("textarea");
    const amenitiesEdit = document.createElement("textarea");
    const sizeEdit = document.createElement("input");
    const rateEdit = document.createElement("input");
    const occupancyEdit = document.createElement("input");
    const saveBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    name.replaceWith(nameEdit);
    photo.replaceWith(photoEdit);
    description.replaceWith(descriptionEdit);
    amenities.replaceWith(amenitiesEdit);
    occupancy.replaceWith(occupancyEdit);
    size.replaceWith(sizeEdit);
    rate.replaceWith(rateEdit);
    nameEdit.value = room.roomName;
    photoEdit.value = room.photoURL;
    descriptionEdit.value = room.description;
    amenitiesEdit.value = room.amenities;
    occupancyEdit.value = room.occupancy;
    sizeEdit.value = room.size;
    rateEdit.value = room.nightlyRate;

    saveBtn.textContent = "Save Edits";
    cancelBtn.textContent = "Cancel";

    btnContainer.prepend(saveBtn);
    btnContainer.prepend(cancelBtn);

    ///SAVE EDITS///
    saveBtn.addEventListener("click", function () {
      saveBtn.remove();
      photoEdit.replaceWith(photo);
      nameEdit.replaceWith(name);
      descriptionEdit.replaceWith(description);
      amenitiesEdit.replaceWith(amenities);
      occupancyEdit.replaceWith(occupancy);
      sizeEdit.replaceWith(size);
      rateEdit.replaceWith(rate);
      editRoom(
        id,
        nameEdit,
        photoEdit,
        descriptionEdit,
        amenitiesEdit,
        occupancyEdit,
        sizeEdit,
        rateEdit,
        roomCode,
        roomCount
      ).then((room) => {
        console.log(room);
      });
      setTimeout(() => {
        location.reload();
      }, "500");
    });

    ///CANCEL EDITS///
    cancelBtn.addEventListener("click", () => {
      saveBtn.remove();
      cancelBtn.remove();
      photoEdit.replaceWith(photo);
      nameEdit.replaceWith(name);
      descriptionEdit.replaceWith(description);
      amenitiesEdit.replaceWith(amenities);
      occupancyEdit.replaceWith(occupancy);
      sizeEdit.replaceWith(size);
      rateEdit.replaceWith(rate);
    });
  });

  photoContainer.appendChild(photo);
  infoContainer.appendChild(name);
  infoContainer.appendChild(description);
  infoContainer.appendChild(size);
  infoContainer.appendChild(occupancy);
  infoContainer.appendChild(amenities);
  sideContainer.appendChild(rate);
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(delBtn);

  sideContainer.appendChild(btnContainer);
  container.appendChild(photoContainer);
  container.appendChild(infoContainer);
  container.appendChild(sideContainer);
  target.appendChild(container);
}

///DRAW LIST OF ROOMS///
function drawAllRooms(arr) {
  roomContainer.innerHTML = null;
  arr.forEach((element, index) => {
    drawRoom(element, roomContainer, index);
  });
}

window.addEventListener("load", () => {
  drawAllRooms(allRooms);
});

////DELETE ROOM FROM API///
async function deleteRoom(id) {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/sandstone/" + id,
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

////EDIT ROOM IN API////
async function editRoom(
  id,
  name,
  photo,
  description,
  amenities,
  occupancy,
  size,
  rate,
  roomCode,
  roomCount
) {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/sandstone/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: name.value,
          photoURL: photo.value,
          size: size.value,
          occupancy: occupancy.value,
          nightlyRate: rate.value,
          description: description.value,
          amenities: amenities.value,
          numberOfRooms: roomCount,
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
