const accountBtn = document.querySelector("#to-userpage");
const logoutBtn = document.querySelector("#log-out");
const savedUserInfo = JSON.parse(sessionStorage.getItem("currentlyLoggedIn"));

function checkIfLoggedIn() {
  window.onload = () => {
    if (savedUserInfo.isAdmin) {
      accountBtn.href = "/userpanel/adminpanel.html";
      accountBtn.textContent = "Admin Panel";
      logoutBtn.style.display = "block";
    } else {
      accountBtn.href = "/userpanel/userpage.html";
      accountBtn.textContent = `Hi, ${savedUserInfo.username}`;
      logoutBtn.style.display = "block";
    }
  };
}

checkIfLoggedIn();

logoutBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  sessionStorage.clear();
  location.reload();
  window.location.href = "/account/account.html";
});
