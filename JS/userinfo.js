class UserInfo {
  constructor(email, fname, lname, address, post, town) {
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.address = address;
    this.post = post;
    this.town = town;
  }
}

$(function () {
  $("#userform").on("submit", function (e) {
    e.preventDefault();

    // get input value from form, as an array type
    let valueArray = $(this).serializeArray();

    // Pick each key and value in array
    let valueObject = {};

    $.each(valueArray, (i, element) => {
      valueObject[element.name] = element.value;
    });

    // LocalStorage
    localStorage.setItem("user", JSON.stringify(valueObject));

    let valuesFromLS = localStorage.getItem("user");
    let userValue = JSON.parse(valuesFromLS);

    // Create a user in a new object
    new UserInfo(
      valueObject.email,
      valueObject.fname,
      valueObject.lname,
      valueObject.address,
      valueObject.post,
      valueObject.town
    );

    // Link to the next payment
    window.location.href = "./../html/payment.html";
  });
});
