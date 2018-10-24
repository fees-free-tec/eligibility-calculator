moment().locale("en-nz")

// Variables
var result;
var submitButton = document.getElementById("submitButton");
var resultText = document.getElementById('result');

submitButton.addEventListener("click", function() {
  var dateOfBirth = document.getElementById("dateOfBirth").value;
  var date = moment(dateOfBirth, "D/MM/YYYY", true).format("MM/DD/YYYY");
  if (date == "Invalid date") {
    resultText.innerHTML = "<b>Please enter a valid date of birth</b>";
    return;
  }

  var schoolLeaveYear = Number(document.getElementById("schoolLeaveYear").value);
  if (!((schoolLeaveYear >= 1950) && (schoolLeaveYear <= 2019))) {
    resultText.innerHTML = "<b>Please enter a valid school leave year date</b>";
    return;
  }
  
  var creditsPre2018 = Number(document.getElementById("creditsPre2018").value);
  var credits2018 = Number(document.getElementById("credits2018").value);
  if (isNaN(creditsPre2018) || isNaN(credits2018)) {
    resultText.innerHTML = "<b>Please enter valid credits</b>";
    return;
  }

  resultText.innerHTML = "Result: <b>" + findResult(date, schoolLeaveYear, creditsPre2018, credits2018) + "</b>";
});

// Initial date parsing
var firstJan1998 = Date.parse("01 Jan 1998 00:00:00 GMT");
var firstJan1999 = Date.parse("01 Jan 1999 00:00:00 GMT");

function findResult(dateOfBirth, schoolLeaveYear, creditsPre2018, credits2018) {

  dateOfBirth = Date.parse(dateOfBirth);
  schoolLeaveYear = String(schoolLeaveYear);

  if (dateOfBirth < firstJan1998 && creditsPre2018 > 60.1) {
  	result = "Ineligible";
  } else if (dateOfBirth < firstJan1998 && creditsPre2018 <= 60.1) {
  	result = "Eligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear !== "2017" && schoolLeaveYear !== "2018" && schoolLeaveYear !== "2019" && creditsPre2018 > 60.1) {
  	result = "Ineligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear !== "2017" && schoolLeaveYear !== "2018" && schoolLeaveYear !== "2019" && creditsPre2018 <= 60.1) {
  	result = "Eligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear === "2017") {
  	result = "Eligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear === "2018" && credits2018 > 60.1) {
  	result = "Ineligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear === "2018" && credits2018 <= 60.1) {
  	result = "Eligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear === "2019" && credits2018 > 60.1) {
  	result = "Ineligible";
  } else if (dateOfBirth >= firstJan1998 && dateOfBirth < firstJan1999 && schoolLeaveYear == "2019" && credits2018 <= 60.1) {
    result = "Eligible";
  } else if (dateOfBirth >= firstJan1999 && schoolLeaveYear === "2017" || schoolLeaveYear === "2018" || schoolLeaveYear === "2019") {
    result = "Eligible";
  } else if (dateOfBirth >= firstJan1999 && (creditsPre2018 + credits2018) > 60.1) {
  	result = "Ineligible";
  } else if (dateOfBirth >= firstJan1999 && (creditsPre2018 + credits2018) <= 60.1) {
  	result = "Eligible";
  } else {
    result = "Unavailable"
  }
  return result;
}
