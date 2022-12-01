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
  localStorage.clear();
  location.reload();
  window.location.href = "/account/account.html";
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}
