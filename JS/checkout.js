let listOfTotalCheckout = [];

$(function () {
  getCartFromLocalStorage();
  updateCheckoutTotalPrice();

  $("#userInfoButton").on("click", function () {
    window.location.href = "./../html/userinfo.html";
  });
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

    let deleteButton = $("<button>Delete</button>")
      .addClass("deleteButton")
      .html('<i class="fas fa-trash-alt fa-lg"></i>')
      .appendTo(checkoutContainer);
    deleteButton.on("click", { c: checkoutProduct }, deleteFromCheckout);

    let counterdiv = $("<div>")
      .addClass("counterdiv")
      .appendTo(checkoutContainer);

    let displayCounter = $("<div>").addClass("counter").appendTo(counterdiv);
    $("<p>")
      .addClass("activeCount")
      .html(checkoutProduct.count)
      .appendTo(displayCounter);

    let minus = $("<button>-</button>")
      .addClass("subbtn")
      .html('<i class="fas fa-minus-circle"></i>')
      .on("click", { c: checkoutProduct }, subtractOneProduct);
    minus.appendTo(counterdiv);

    let add = $("<button>+</button>")
      .addClass("addbtn")
      .html('<i class="fas fa-plus-circle"></i>')
      .on("click", { c: checkoutProduct }, addOneProduct);
    add.appendTo(counterdiv);

    counterdiv.appendTo(checkoutContainer);
    checkoutContainer.appendTo($("#checkout-products"));
  });
}

function addOneProduct(e) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == e.data.c.id) {
      cartProducts[i].count++;
      createCheckoutProducts();
    }
    if (cartProducts[i].count > 1) {
      let tempsum = cartProducts[i].count * 1;
      let total = tempsum * parseInt(cartProducts[i].price);
      listOfTotalCheckout.push(total);
      updateCheckoutTotalPrice();
    } else {
      updateCheckoutTotalPrice();
    }
  }
}

function subtractOneProduct(e) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == e.data.c.id) {
      cartProducts[i].count--;
    }
    if (cartProducts[i].count < 1) {
      cartProducts.splice(i, 1);
    }
    createCheckoutProducts();
    updateCheckoutTotalPrice();
  }
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

function deleteFromCheckout(e) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == e.data.c.id) {
      cartProducts.splice(i, 1);
    }
    createCheckoutProducts();
    updateCheckoutTotalPrice();
  }
}
