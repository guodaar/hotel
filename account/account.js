// const adminInput = document.querySelector("#adminInput");
// const submitBtn = document.querySelector("#submitBtn");

const loginForm = document.querySelector("#loginForm");
const regForm = document.querySelector("#regForm");
const registerHere = document.querySelector(".register-here");
const backToLogin = document.querySelector(".back-to-login");

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

////TOGGLE REGISTRATION FORM////

registerHere.addEventListener("click", (event) => {
  event.preventDefault();
  loginForm.style.display = "none";
  regForm.style.display = "flex";
});

backToLogin.addEventListener("click", (event) => {
  event.preventDefault();
  loginForm.style.display = "flex";
  regForm.style.display = "none";
});

////REGISTRATION FORM////
regForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateInputs();
  console.log(isFormValid());

  if (isFormValid() == true) {
    registerUser().then((user) => {
      console.log(user);
    });
    regForm.style.display = "none";
    const thankYou = document.querySelector(".thank-you");
    thankYou.style.display = "block";
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    event.preventDefault();
  }
});

////SAVE USER////
async function registerUser() {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          password2: password2.value,
          isAdmin: false,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

////REGISTRATION FORM VALIDATION////
function isFormValid() {
  const inputContainers = regForm.querySelectorAll(".input-control");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords must match!");
  } else {
    setSuccess(password2);
  }
};

////GET USER////

const allUsers = [];

async function getUserInfo() {
  try {
    const response = await fetch(
      "https://testapi.io/api/guodaAr/resource/user"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

getUserInfo().then((user) => {
  allUsers.push(...user.data);
  allUsers.forEach((user) => {
    getUser(user);
  });
  console.log(allUsers);
});

const getUser = ({ username, password }) => {
  console.log(`${username}, ${password}`);
};

const [userN, passW] = allUsers;

////LOGIN FORM////

////SET UP ADMIN////
// async function registerAdmin() {
//   try {
//     const response = await fetch(
//       "https://testapi.io/api/guodaAr/resource/user",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: "admin",
//           email: "admin@admin.com",
//           password: "admin",
//           password2: "admin",
//           isAdmin: true,
//         }),
//       }
//     );
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }
// registerAdmin().then((admin) => {
//   console.log(admin);
// });
