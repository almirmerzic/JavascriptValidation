// Contact form validation

let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let company = document.getElementById("company");
let emailContact = document.getElementById("emailcontact");
let country = document.getElementById("country");
let policy = document.getElementById("policy");
let message = document.getElementById("message");

let policyMessage = document.getElementById("policyMessage");
let firstNameMessage = document.getElementById("firstNameMessage");
let lastNameMessage = document.getElementById("lastNameMessage");
let companyMessage = document.getElementById("companyMessage");
let emailMessage = document.getElementById("emailMessage");
let countryMessage = document.getElementById("countryMessage");
let successMessage = document.getElementById("successMessage");

// let selectCountry  = document.getElementById("selectCountry");

sendcontact.addEventListener("click", validationContactForm);
firstName.addEventListener("focus", clear);
lastName.addEventListener("focus", clear);
company.addEventListener("focus", clear);
emailContact.addEventListener("focus", clear);
country.addEventListener("focus", clear);
policy.addEventListener("click", hideMessage);

function validationContactForm() {
  // var selected = selectCountry.options[selectCountry.selectedIndex].value;

  if (policy.checked == false) {
    policyMessage.style.display = "block";
  } 
  
  if (firstName.value == "" || validateNames(firstName.value) == false)
    showErrorMessage(firstName.name);
  if (lastName.value == "" || validateNames(lastName.value) == false)
    showErrorMessage(lastName.name);
  if (company.value == "") showErrorMessage(company.name);
  if (emailContact.value == "" || emailIsValid(emailContact.value) == false)
    showErrorMessage(emailContact.name);
  if (country.value == "") showErrorMessage(country.name);
  else {
    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        company: company.value,
        email: emailContact.value,
        country: country.value,
        message: message.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      success: function (data) {
        reset();
        console.log(data);
        successMessage.innerHTML = "Your message has been successfully sent";
      },
      error: function (result) {
        reset();
        console.log(result);
      }
    });
  }
}


function hideMessage() {
 return policyMessage.style.display = "none";
}

function showErrorMessage(value) {
  if (value == "firstName") {
    firstNameMessage.innerHTML = "Please enter a valid First Name";
    firstName.classList.add("is-invalid");
  }

  if (value == "lastName") {
    lastNameMessage.innerHTML = "Please enter a valid Last Name";
    lastName.classList.add("is-invalid");
  }

  if (value == "company") {
    companyMessage.innerHTML = "Please enter a valid Company Name";
    company.classList.add("is-invalid");
  }

  if (value == "emailContact") {
    emailMessage.innerHTML = "Please enter a valid Email";
    emailContact.classList.add("is-invalid");
  }

  if (value == "country") {
    countryMessage.innerHTML = "Please enter a valid Country";
    country.classList.add("is-invalid");
  }
}

function reset() {
  lastName.value = "";
  firstName.value = "";
  country.value = "";
  company.value = "";
  emailContact.value = "";
  message.value = "";
  policy.checked = false;
}

function clear() {
  clearMessage(this.name);
  this.style.border = "1px solid black";
  this.style.padding = "0px";
  this.style.background = "none";
  this.style.boxShadow = "none";
  this.style.color = "black";
}

function clearMessage(value) {
  if (value == "firstName") {
    firstNameMessage.innerHTML = "";
  }
  if (value == "lastName") {
    lastNameMessage.innerHTML = "";
  }
  if (value == "company") {
    companyMessage.innerHTML = "";
  }
  if (value == "emailContact") {
    emailMessage.innerHTML = "";
  }
  if (value == "country") {
    countryMessage.innerHTML = "";
  }
}

function emailIsValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateNames(value) {
  return /^[a-zA-Z ]{2,30}$/.test(value);
}
