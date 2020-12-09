$(function () {
  getCartFromLocalStorage();
  updateCheckoutTotalPrice();
  
  $('#userInfoButton').on('click', function() {
    window.location.href = "./../html/userinfo.html";
  })
});

function createCheckoutProducts() {
  let checkoutpage = document.getElementById("checkout-products");

  checkoutpage.innerHTML = "";

  $.each(cartProducts, (i, checkoutProduct) => {
    let checkoutContainer = $("<div>")
      .addClass("checkoutproduct")
      .attr("id", checkoutProduct.id);

    $("<div>")
      .addClass("image")
      .html(checkoutProduct.image)
      .appendTo(checkoutContainer);
    $("<h3>").html(checkoutProduct.name).appendTo(checkoutContainer);
    $("<p>").html(checkoutProduct.price).appendTo(checkoutContainer);
    

    let counterdiv = $("<div>")
      .addClass("counterdiv")
      .appendTo(checkoutContainer);

    let displayCounter = $("<div>").addClass("counter").appendTo(counterdiv);
    $("<p>")
      .addClass("activeCount")
      .html(checkoutProduct.count)
      .appendTo(displayCounter);

    checkoutContainer.appendTo($("#checkout-products"));
  });
}

function updateCheckoutTotalPrice() {
  let sum = 0;

  $.each(cartProducts, (i, cartProduct) => {
    sum += cartProducts[i].count * cartProducts[i].price;
  });

  $("#totalCheckoutPrice").html("Total Price:" + " " + sum + " " + ":-");

  return sum;
}

function getCartFromLocalStorage() {
  let cartCheckoutFromLS = localStorage.getItem("cartProducts");
  if (cartCheckoutFromLS) {
    cartProducts = JSON.parse(cartCheckoutFromLS);
    createCheckoutProducts(cartProducts);
  }
}

