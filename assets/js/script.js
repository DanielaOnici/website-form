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

  //Validating name to include in the receipt
  if (!validateName(name)) {
    return;
  }
  var txtName = document.getElementById("name");
  var txt = document.createTextNode("Name: " + name);
  txtName.appendChild(txt);

  if (!validateEmail(email)) {
    return;
  }
  var txtEmail = document.getElementById("email");
  var txt1 = document.createTextNode("Email: " + email);
  txtEmail.appendChild(txt1);

  if (!validateCreditCard(creditCardNumber)) {
    return;
  }
  var txtCreditCard = document.getElementById("creditCardNumber");
  var txt2 = document.createTextNode("Credit Card Number: " + creditCardNumber);
  txtCreditCard.appendChild(txt2);

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
  var txtDonation = document.getElementById("doantion");
  var txtFinalPrice = document.getElementById("finalPrice");
  var text1 = document.createTextNode("Donation: $" + donation);
  var text2 = document.createTextNode("Final Price: $" + finalPrice);

  txtDonation.appendChild(text1);
  txtFinalPrice.appendChild(text2);
}

function validateName(name) {
  var regName = /^[a-zA-Z]*[a-zA-Z]+$/;

  if (regName.test(name)) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode(
      "Invalid name. Numbers and special characters are not allowed."
    );
    txtError.appendChild(txt);
    return false;
  }
}

function validateEmail(email) {
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regEmail.test(email)) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode("Invalid email address.");
    txtError.appendChild(txt);
    return false;
  }
}

function validateCreditCard(creditCardNumber) {
  var creditCardNumber = creditCardNumber.trim();
  var regCreditCardNumber = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/;

  if (regCreditCardNumber.test(creditCardNumber)) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode(
      "Invalid Credit Card number. Please follow the format XXXX-XXXX-XXXX-XXXX"
    );
    txtError.appendChild(txt);
    return false;
  }
}

function validateExpiryMonth(expiryMonth) {
  var expiryMonth = expiryMonth.trim();
  var regExpiryMonth = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;

  if (regExpiryMonth.test(expiryMonth)) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode(
      "Invalid Month. Please follow the format i.e. NOV"
    );
    txtError.appendChild(txt);
    return false;
  }
}

function validateYear(year) {
  var year = year.trim();
  var inputYear = parseInt(year);
  const currentDate = new Date();
  const currentYear = currentYear.getFullYear();

  if (inputYear >= currentYear) {
    return true;
  } else {
    var txtError = document.getElementById("errorMessage");
    var txt = document.createTextNode(
      "Invalid Year. Please input numbers in the format i.e. 2021. Accepts only current year or future."
    );
    txtError.appendChild(txt);
    return false;
  }
}

function validateQuantities(quantity) {
  var quantity = quantity.trim();
  var inputQuantity = parseInt(quantity);

  if (isFinite(quantity) | (quantity > 0)) {
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
