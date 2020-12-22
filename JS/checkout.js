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
      .attr("id", checkoutProduct.product.id);

    $("<div>")
      .addClass("image")
      .html(checkoutProduct.product.image)
      .appendTo(checkoutContainer);
    $("<h3>").html(checkoutProduct.product.name).appendTo(checkoutContainer);
    $("<p>")
      .html(checkoutProduct.product.price + " " + "SEK")
      .appendTo(checkoutContainer);

    let deleteButton = $("<button>Delete</button>")
      .addClass("deleteButton")
      .html('<i class="fas fa-trash-alt fa-lg"></i>')
      .appendTo(checkoutContainer);
    deleteButton.on("click", () => {
      deleteFromCheckout(cartProducts[i]);
    });

    let counterdiv = $("<div>")
      .addClass("counterdiv")
      .appendTo(checkoutContainer);

    let displayCounter = $("<div>").addClass("counter").appendTo(counterdiv);
    $("<p>")
      .addClass("activeCount")
      .html(checkoutProduct.qty)
      .appendTo(displayCounter);

    let minus = $("<button>-</button>")
      .addClass("subbtn")
      .html('<i class="fas fa-minus-circle"></i>')
      .on("click", () => {
        subtractOneProduct(cartProducts[i]);
      });
    minus.appendTo(counterdiv);

    let add = $("<button>+</button>")
      .addClass("addbtn")
      .html('<i class="fas fa-plus-circle"></i>')
      .on("click", () => {
        addOneProduct(cartProducts[i]);
      });
    add.appendTo(counterdiv);

    counterdiv.appendTo(checkoutContainer);
    checkoutContainer.appendTo($("#checkout-products"));
  });
}

function addOneProduct(cartProduct) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id == cartProduct.product.id) {
      cartProducts[i].qty++;
      createCheckoutProducts();
    }
    if (cartProducts[i].qty > 1) {
      let tempsum = cartProducts[i].qty * 1;
      let total = tempsum * parseInt(cartProducts[i].product.price);
      listOfTotalCheckout.push(total);
      updateCheckoutTotalPrice();
      addCheckoutToLocalStorage(cartProducts);
    } else {
      updateCheckoutTotalPrice();
      addCheckoutToLocalStorage(cartProducts);
    }
  }
}

function subtractOneProduct(cartProduct) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id == cartProduct.product.id) {
      cartProducts[i].qty--;
    }
    if (cartProducts[i].qty < 1) {
      cartProducts.splice(i, 1);
      ifCheckoutIsEmpty();
    }
    createCheckoutProducts();
    updateCheckoutTotalPrice();
    addCheckoutToLocalStorage(cartProducts);
  }
}

function updateCheckoutTotalPrice() {
  let sum = 0;

  $.each(cartProducts, (i, cartProduct) => {
    sum += cartProducts[i].qty * cartProducts[i].product.price;
  });

  $("#totalCheckoutPrice").html("Total Price:" + " " + sum + " " + "SEK");

  return sum;
}

function deleteFromCheckout(cartProduct) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id == cartProduct.product.id) {
      cartProducts.splice(i, 1);
      cartProduct.product.inCart = false;
    }
    createCheckoutProducts();
    updateCheckoutTotalPrice();
    ifCheckoutIsEmpty();
    addCheckoutToLocalStorage(cartProducts);
  }
}

function ifCheckoutIsEmpty() {
  if (cartProducts.length == 0) {
    window.location.href = "./../html/products.html";
    localStorage.clear();
  } else {
    return false;
  }
}

function addCheckoutToLocalStorage(cartProducts) {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  createCheckoutProducts(cartProducts);
}

function getCartFromLocalStorage() {
  let cartCheckoutFromLS = localStorage.getItem("cartProducts");
  if (cartCheckoutFromLS) {
    cartProducts = JSON.parse(cartCheckoutFromLS);
    createCheckoutProducts(cartProducts);
  }
}
