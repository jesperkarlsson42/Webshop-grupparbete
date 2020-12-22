$(function () {
  $("#payment-btn").on("click", function () {
    let fname = $("#form-fname").val();
    let lname = $("#form-lname").val();
    let cardNumber = $("#cardNumber").val();
    let month = $("#month").val();
    let year = $("#year").val();
    let cvc = $("#cvc").val();

    if (fname.length < 3 || fname == "") {
      $("#form-fname").addClass("errorValidator");
      alert("Please enter your name");
    }

    else if (lname.length < 3 || lname == "") {
      $("#form-lname").addClass("errorValidator");
      alert("Please enter your lastname");
    }

    else if (cardNumber.length < 16 || cardNumber == "" || cardNumber.length > 16) {
      $("#cardNumber").addClass("errorValidator");
      alert("Please enter your cardnumber correctly");
    }
    else if (month.length < 2 || month.length > 2 || month > 12) {
      $("#month").addClass("errorValidator");
      alert("Please enter the expiration month");
    }
    else if (year.length < 2 || year.length > 2 || year < 20) {
      $("#year").addClass("errorValidator");
      alert("Please enter the expiration year");
    }

    else if (cvc.length < 3 || cvc.length > 3 || !/^[0-9]+$/.test(cvc)) {
      $("#cvc").addClass("errorValidator");
      alert ("Please enter the cvc");
    } else {
      window.location.assign("./../html/thanks.html");
    }
  });
});
