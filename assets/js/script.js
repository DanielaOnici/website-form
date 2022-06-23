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

  //Validating name to include it in the receipt. If false, an error message is included in the errors array
  if (!validateName(name)) {
    errors.push(
      "Invalid name. Numbers and special characters are not allowed."
    );
  } else {
    var txtName = document.getElementById("nameReceipt");
    var txt = document.createTextNode("Name: " + name);
    txtName.appendChild(txt);
  }
  //Validating the email to include it in the receipt. If false, an error message is included in the errors array
  if (!validateEmail(email)) {
    errors.push("Invalid email address.");
  } else {
    var txtEmail = document.getElementById("emailReceipt");
    var txt1 = document.createTextNode("Email: " + email);
    txtEmail.appendChild(txt1);
  }

  //Validating the Credit Card number to include it in the receipt. If false, an error message is included in the errors array
  if (!validateCreditCard(creditCardNumber)) {
    errors.push(
      "Invalid Credit Card number. Please follow the format XXXX-XXXX-XXXX-XXXX"
    );
  } else {
    var newNumber = creditCardNumber.slice(-4);
    var txtCreditCard = document.getElementById("creditCardReceipt");
    var txt2 = document.createTextNode(
      "Credit Card Number: XXXX-XXXX-XXXX-" + newNumber
    );
    txtCreditCard.appendChild(txt2);
  }

  //Validating the expiry month of the credit card. If false, an error message is included in the errors array
  if (!validateExpiryMonth(expiryMonth)) {
    errors.push(
      "Invalid Month. Please follow the format i.e. NOV. It is case sensitive."
    );
  }

  //Validating the year of the credit card. If false, an error message is included in the errors array
  if (!validateYear(expiryYear)) {
    errors.push(
      "Invalid Year. Please input numbers in the format e.g. 2022. Accepts only current year or future."
    );
  }

  if ((water == null) | (water == "")) {
    water = null;
  } else {
    if (!validateQuantities(water)) {
      errors.push("Invalid quantity of water. Please insert only numbers.");
    } else {
      cartItem.push("Water");
      cartQuantity.push(water);
      cartUnit.push("$5");
      cartTotal.push(water * 5);
    }
  }
  if ((caps == null) | (caps == "")) {
    caps = null;
  } else {
    if (!validateQuantities(caps)) {
      errors.push("Invalid quantity of caps. Please insert only numbers.");
    } else {
      cartItem.push("Caps");
      cartQuantity.push(caps);
      cartUnit.push("$20");
      cartTotal.push(caps * 20);
    }
  }

  if ((pens == null) | (pens == "")) {
    pens = null;
  } else {
    if (!validateQuantities(pens)) {
      errors.push("Invalid quantity of pens. Please insert only numbers.");
    } else {
      cartItem.push("Pens");
      cartQuantity.push(pens);
      cartUnit.push("$2");
      cartTotal.push(pens * 2);
    }
  }

  if ((candy == null) | (candy == "")) {
    candy = null;
  } else {
    if (!validateQuantities(candy)) {
      errors.push("Invalid quantity of candy. Please insert only numbers.");
    } else {
      cartItem.push("Candy Bag");
      cartQuantity.push(candy);
      cartUnit.push("$10");
      cartTotal.push(pens * 10);
    }
  }

  if ((cupcakes == null) | (cupcakes == "")) {
    cupcakes = null;
  } else {
    if (!validateQuantities(cupcakes)) {
      errors.push("Invalid quantity of cupcakes. Please insert only numbers.");
    } else {
      cartItem.push("Cupcakes");
      cartQuantity.push(cupcakes);
      cartUnit.push("$3");
      cartTotal.push(pens * 3);
    }
  }

  //Creating variable with the sum of prices
  var priceSum = total(cartTotal);

  //Calculating the quantity of donation
  var donation = 0;

  if (Math.round(priceSum / 10) > 10) {
    donation = priceSum / 10;
  } else {
    donation = 10;
  }

  var finalPrice = Math.round(priceSum + donation);
  if (cartQuantity == 0 || !validateName(name) && !validateEmail(email) && !validateCreditCard(creditCardNumber) && !validateExpiryMonth(expiryMonth) && !validateYear(expiryYear)) {
    errors.push("At least one item should be purchased.");
  } else {
    //Including a table into HTML <table id='table'>
    var tableEl = document.getElementById("table");

    //Creating the head of the table
    var rowTitleEl = tableEl.insertRow(0);

    //creating the cells of the table (Columns: Item, Quantity, Unit Price and Total)
    var cellItemEl = rowTitleEl.insertCell(0);
    var cellQuantityEl = rowTitleEl.insertCell(1);
    var cellUnitEl = rowTitleEl.insertCell(2);
    var cellTotalEl = rowTitleEl.insertCell(3);

    //Including the text (Columns: Item, Quantity, Unit Price and Total) to the cells
    cellItemEl.innerHTML = "Item";
    cellQuantityEl.innerHTML = "Quantity";
    cellUnitEl.innerHTML = "Unit Price";
    cellTotalEl.innerHTML = "Total";

    var rowEl;

    //Creating a loop to include more rows and the items that were selected by the user
    for (var i = 0; i < cartQuantity.length; i++) {
      //Creating rows below the head title of the table
      rowEl = tableEl.insertRow(i + 1);

      //Including the items selected by the user into the table
      cellItemEl = rowEl.insertCell(0);
      cellQuantityEl = rowEl.insertCell(1);
      cellUnitEl = rowEl.insertCell(2);
      cellTotalEl = rowEl.insertCell(3);

      //Including the items selected by the user into the table in HTML
      cellItemEl.innerHTML = `${cartItem[i]}`;
      cellQuantityEl.innerHTML = `${cartQuantity[i]}`;
      cellUnitEl.innerHTML = `${cartUnit[i]}`;
      cellTotalEl.innerHTML = `${cartTotal[i]}`;
    }

    //Including the text into the tags <p id='donation'> and <p id='finalPrice'
    var txtDonation = document.getElementById("donation");
    var txtFinalPrice = document.getElementById("finalPrice");
    var text1 = document.createTextNode("Donation: $" + donation);
    var text2 = document.createTextNode("Final Price: $" + finalPrice);

    txtDonation.appendChild(text1);
    txtFinalPrice.appendChild(text2);
  }

  //Creating a loop to read all the error inside the errors array
  for (var j = 0; j < errors.length; j++) {
    var txtErrors = document.getElementById("errorMessage");
    var txt3 = document.createTextNode(errors[j]);
    var br = document.createElement("br");
    txtErrors.appendChild(txt3);
    txtErrors.appendChild(br);
  }
}

//Validating the name with regular expression (accepting only letters)
function validateName(name) {
  var trimmedName = name.trim();
  var regName = /^[a-zA-Z]*\s?[a-zA-Z]*$/;

  if (regName.test(trimmedName)) {
    return true;
  } else {
    return false;
  }
}

//Validating the email with regular expression (accepting some special characters before '@')
function validateEmail(email) {
  var trimmedEmail = email.trim();
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regEmail.test(trimmedEmail)) {
    return true;
  } else {
    return false;
  }
}

//Validating the credit card number with regular expression (accepting only numbers with the format XXXX-XXXX-XXXX-XXXX)
function validateCreditCard(creditCardNumber) {
  var trimmedNumber = creditCardNumber.trim();
  var regCreditCardNumber = /^(\d{4})\-(\d{4})\-(\d{4})\-(\d{4})$/;

  if (regCreditCardNumber.test(trimmedNumber)) {
    return true;
  } else {
    return false;
  }
}

//Validating the expiry month with regular expression (accepting only in the format MMM)
function validateExpiryMonth(expiryMonth) {
  var trimmedMonth = expiryMonth.trim();
  var regExpiryMonth = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;

  if (regExpiryMonth.test(trimmedMonth)) {
    return true;
  } else {
    return false;
  }
}

//Validating the year of the card (accepting only years in the format yyyy equals the current year or future)
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

//Validating the input quantity (accepting only numbers greater than 0)
function validateQuantities(quantity) {
  var trimmedQuantity = quantity.trim();
  var inputQuantity = parseInt(trimmedQuantity);

  if (!isFinite(inputQuantity) | (inputQuantity > 0)) {
    return true;
  } else {
    return false;
  }
}

//Creating a funtion to calculate the values into the array of cartTotal
function total(price) {
  var total = 0;

  //Creating a loop to add all the values inside the array
  for (var i = 0; i < price.length; i++) {
    total += price[i];
  }
  return total;
}
