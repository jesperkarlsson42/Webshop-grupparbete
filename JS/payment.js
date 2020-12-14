$(function () {
  $("#payment-btn").one("click", function () {
    let fname = $("#form-fname").val();
    let lname = $("#form-lname").val();
    let cardNumber = $("#cardNumber").val();
    let month = $("#month").val();
    let year = $("#year").val();
    let cvc = $("#cvc").val();

    if (fname.length < 3 || fname == "") {
      $("#form-fname").addClass("errorValidator");
    }

    if (lname.length < 3 || lname == "") {
      $("#form-lname").addClass("errorValidator");
    }

    if (cardNumber.length < 16 || cardNumber == "" || cardNumber.length > 16) {
      $("#cardNumber").addClass("errorValidator");
    }
    if (month.length < 2 || month.length > 2 || month > 12) {
      $("#month").addClass("errorValidator");
    }
    if (year.length < 2 || year.length > 2 || year < 20) {
      $("#year").addClass("errorValidator");
    }

    if (cvc.length < 3 || cvc.length > 3 || !/^[0-9]+$/.test(cvc)) {
      $("#cvc").addClass("errorValidator");
    } else {
      window.location.assign("./../html/thanks.html");
    }
  });
});
