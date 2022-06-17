// index.html
//     PROG1800-22S-Sec3 - Assignment 2

//     Dynamic website that collects information from a form to generate a receipt.

//     Daniela Onici Student ID# 8754297, 2022.06.12: Created
//                                        2022.06.16: Finished

//Creating arrays to include the items, values, quantities and totals chosen by the user
let cartTotal = [];
let cartUnit = [];
let cartQuantity = [];
let cartItem = [];
let errors = [];

//Creating a function that generates the table receipt with the user's information, items chosen and total price of the purchase
function generateReceipt() {
  //Creating variables to get the values inserted in HTML
  var name = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var creditCardNumber = document.getElementById("creditCardNumber").value;
  var expiryMonth = document.getElementById("creditCardExpiryMonth").value;
  var expiryYear = document.getElementById("creditCardExpiryYear").value;
  var water = document.getElementById("water").value;
  var caps = document.getElementById("caps").value;
  var pens = document.getElementById("pens").value;
  var candy = document.getElementById("candy").value;
  var cupcakes = document.getElementById("cupcakes").value;
  console.log(errors);
  //Validating name to include it in the receipt
  if (!validateName(name)) {
    errors.push(
      "Invalid name. Numbers and special characters are not allowed."
    );
  } else {
    var txtName = document.getElementById("nameReceipt");
    var txt = document.createTextNode("Name: " + name);
    txtName.appendChild(txt);
  }
  //Validating the email to include it in the receipt
  if (!validateEmail(email)) {
    errors.push("Invalid email address.");
  } else {
    var txtEmail = document.getElementById("emailReceipt");
    var txt1 = document.createTextNode("Email: " + email);
    txtEmail.appendChild(txt1);
  }

  //Validating the Credit Card number to include it in the receipt
  if (!validateCreditCard(creditCardNumber)) {
    errors.push(
      "Invalid Credit Card number. Please follow the format XXXX-XXXX-XXXX-XXXX"
    );
  } else {
    var txtCreditCard = document.getElementById("creditCardReceipt");
    var txt2 = document.createTextNode(
      "Credit Card Number: " + creditCardNumber
    );
    txtCreditCard.appendChild(txt2);
  }

  //Validating the expiry month of the credit card
  if (!validateExpiryMonth(expiryMonth)) {
    errors.push(
      "Invalid Month. Please follow the format i.e. NOV. It is case sensitive."
    );
  }

  //Validating the year of the credit card
  if (!validateYear(expiryYear)) {
    errors.push(
      "Invalid Year. Please input numbers in the format i.e. 2022. Accepts only current year or future."
    );
  }

  console.log(errors);
  for (var j = 0; j < errors.length; j++) {
    var txtErrors = document.getElementById("errorMessage");
    var txt3 = document.createTextNode(errors[j] + "\n");
    txtErrors.appendChild(txt3);
  }

  //Including a table into HTML <table id='table'>
  var tableEl = document.getElementById("table");

  //Creating the head of the table
  var rowTitleEl = tableEl.insertRow(0);

  //creating the cells of the table (Columns: Item, Quantity, Unit Price and Total)
  var cellTotalEl = rowTitleEl.insertCell(0);
  var cellUnitEl = rowTitleEl.insertCell(1);
  var cellQuantityEl = rowTitleEl.insertCell(2);
  var cellItemEl = rowTitleEl.insertCell(3);

  //Including the text (Columns: Item, Quantity, Unit Price and Total) to the cells
  cellTotalEl.innerHTML = "Total";
  cellUnitEl.innerHTML = "Unit Price";
  cellQuantityEl.innerHTML = "Quantity";
  cellItemEl.innerHTML = "Item";

  var rowEl;

  //Creating a loop to include more rows and the items that were selected by the user
  for (var i = 0; i < cartQuantity.length; i++) {
    //Creating rows below the head title of the table
    rowEl = tableEl.insertRow(i + 1);

    //Including the items selected by the user into the table
    cellTotalEl = rowEl.insertCell(0);
    cellUnitEl = rowEl.insertCell(1);
    cellQuantityEl = rowEl.insertCell(2);
    cellItemEl = rowEl.insertCell(3);

    //Including the items selected by the user into the table in HTML
    cellTotalEl.innerHTML = `${cartTotal[i]}`;
    cellUnitEl.innerHTML = `${cartUnit[i]}`;
    cellQuantityEl.innerHTML = `${cartQuantity[i]}`;
    cellItemEl.innerHTML = `${cartItem[i]}`;
  }

  //Creating variables with the sum of prices
  var priceSum = total(cartTotal);

  //Calculating the quantity of donation
  var donation = 0;

  if (Math.round(priceSum / 10) > 10) {
    donation = priceSum / 10;
  } else {
    donation = 10;
  }

  var finalPrice = Math.round(priceSum + donation);

  //Including the text into the tags <p id='donation'> and <p id='finalPrice'
  var txtDonation = document.getElementById("donation");
  var txtFinalPrice = document.getElementById("finalPrice");
  var text1 = document.createTextNode("Donation: $" + donation);
  var text2 = document.createTextNode("Final Price: $" + finalPrice);

  txtDonation.appendChild(text1);
  txtFinalPrice.appendChild(text2);
}

function validateName(name) {
  var trimmedName = name.trim();
  var regName = /^[a-zA-Z]*[a-zA-Z]+$/;

  if (regName.test(trimmedName)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  var trimmedEmail = email.trim();
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regEmail.test(trimmedEmail)) {
    return true;
  } else {
    return false;
  }
}

function validateCreditCard(creditCardNumber) {
  var trimmedNumber = creditCardNumber.trim();
  var regCreditCardNumber = /^(\d{4})\-(\d{4})\-(\d{4})\-(\d{4})$/;

  if (regCreditCardNumber.test(trimmedNumber)) {
    return true;
  } else {
    return false;
  }
}

function validateExpiryMonth(expiryMonth) {
  var trimmedMonth = expiryMonth.trim();
  var regExpiryMonth = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;

  if (regExpiryMonth.test(trimmedMonth)) {
    return true;
  } else {
    return false;
  }
}

function validateYear(year) {
  var year = year.trim();
  var inputYear = parseInt(year);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (inputYear >= currentYear) {
    return true;
  } else {
    return false;
  }
}

function validateQuantities(quantity) {
  var trimmedQuantity = quantity.trim();
  var inputQuantity = parseInt(trimmedQuantity);

  if (isFinite(inputQuantity) | (inputQuantity > 0)) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode(
      "Invalid quantity. Please input only numbers greather than 0"
    );
    txtError.appendChild(txt);
    return false;
  }
}

//Creating a funtion to calculate the values into the array of cartPrices
//Each value added to the array is the product of quantity of cake by its price
function total(price) {
  var total = 0;

  //Creating a loop to add all the values inside the array
  for (var i = 0; i < price.length; i++) {
    total += price[i];
  }
  return total;
}
