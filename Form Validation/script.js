let form = document.getElementById("user-form");
let nameinput = document.getElementById("user-name");
let emailinput = document.getElementById("user-email");
let passwordinput = document.getElementById("user-password");
let confirmpassinput = document.getElementById("confirm-password");
let nameerror = document.getElementById("name-err");
let emailerror = document.getElementById("email-err");
let passworderror = document.getElementById("password-err");
let confirmerr = document.getElementById("confirm-err");
let submitbtn = document.getElementById("submit-btn");


let validname = false;
let validemail = false;
let validpassword = false;
let validconfirmpass = false;

function showError(element, error) {
  element.innerHTML = error;
}
function removeError(element) {
  element.innerHTML = "";
}

function validateName() {
  let name = nameinput.value.trim();

  if (name.length <= 3) {
    console.log("must be 3 character");
    showError(nameerror, "Name must be atleast 3 characters");

    validname = false;
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    showError(nameerror, "No Special Char Allowed Only Letters");
    validname = false;
  } else {
    removeError(nameerror);
    validname = true;
  }
  updateButton();
}

function validateEmail() {
  let email = emailinput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(emailerror, "Enter Valid Email");
    console.log("please enter valid email");
    validemail = false;
  } else {
    removeError(emailerror);
    console.log("email pass");
    validemail = true;
  }
  updateButton();
}

function validatePassword() {
  let password = passwordinput.value;
  if (password.length <= 7) {
    showError(passworderror, "Password Must be at least 8 character long");
    validpassword = false;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(password)
  ) {
    showError(passworderror, "nust be one upper,lower,and special char");
    validpassword = false;
  } else {
    removeError(passworderror);
    validpassword = true;
  }
  updateButton();
}

function validateConfirmpass() {
  let pass = passwordinput.value;
  let confirmpassword = confirmpassinput.value;
  if (confirmpassword !== pass) {
    showError(confirmerr, "password do not match");
    validconfirmpass = false;
  } else {
    removeError(confirmerr);
    validconfirmpass = true;
  }
  updateButton();
}

function validateForm() {
  let nameresult = validateName();
  let emailresult = validateEmail();
  let passwordresult = validatePassword();
  let confirmpassresult = validateConfirmpass();

  return nameresult && emailresult && passwordresult && confirmpassresult;
}



nameinput.addEventListener("input", () => {
  validateName();

});

emailinput.addEventListener("input", () => {
  validateEmail()

});
passwordinput.addEventListener("input", () => {
  validatePassword()

});
confirmpassinput.addEventListener("input", () => {
  validateConfirmpass()

});
submitbtn.disabled = true
function updateButton() {
  if (
    validname && validemail && validpassword && validconfirmpass) {
    submitbtn.disabled = false;
  } else {
    submitbtn.disabled = true;
  }
}

form.addEventListener("submit", (e) => {
   alert("Form Submitted Successfully!");

});

