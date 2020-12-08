let x = 0;

class Product {
  constructor(name, price, image) {
    this.id = x++;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

let products = [];
let cartProducts = [];

let p1 = new Product("Rolex", 14245, "<img src='./../img/rolexsilver.jpg'/>");
let p2 = new Product("Gant", 1145, "<img src='./../img/gantsilver.png'/>");
let p3 = new Product("Timex", 1395, "<img src='./../img/timexbrown.jpg'/>");
let p4 = new Product(
  "Longines",
  10725,
  "<img src='./../img/longinessilver.jpg'/>"
);
let p5 = new Product(
  "Hunters Race",
  2495,
  "<img src='./../img/huntersbrown.jpg'/>"
);
let p6 = new Product(
  "Tommy Hilfiger",
  1595,
  "<img src='./../img/tommyblack.jpg'/>"
);
let p7 = new Product(
  "Emporio Armani",
  2745,
  "<img src='./../img/armanisilver.jpg'/>"
);
let p8 = new Product("Fossil", 1295, "<img src='./../img/fossilsilver.jpg'/>");
let p9 = new Product(
  "Thomas Sabo",
  2625,
  "<img src='./../img/thomasblack.jpg'/>"
);
let p10 = new Product("Braun", 2495, "<img src='./../img/braunblack.jpg'/>");

$(function () {
  addProduct();
  createProduct();
  getFromLocalStorage();

  $("#dialog").dialog({
    autoOpen: false,
    position: { my: "right top", at: "right top", of: window },
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "blind",
      duration: 1000,
    },
  });

  $("#opener").on("click", function () {
    if (!$("#dialog").dialog("isOpen")) {
      $("#dialog").dialog("open");
    } else {
      $("#dialog").dialog("close");
    }
  });
});

function addProduct() {
  products.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
}

function createProduct() {
  $.each(products, (i, product) => {
    console.log(product);

    let container = $("<div>").addClass("product").attr("id", product.id);

    $("<div>").addClass("image").html(product.image).appendTo(container);
    $("<h3>").html(product.name).appendTo(container);
    $("<p>").html(product.price).appendTo(container);
    let addToCartButtons = $("<button>Add to Cart</button>")
      .addClass("AddToCartButton")
      .appendTo(container);
    addToCartButtons.on("click", { p: product }, clickedAddToCart);

    container.appendTo($("#product-container"));
  });
}

function createShoppingCart() {
  let shoppingcart = document.getElementById("shoppingCart-container");

  shoppingcart.innerHTML = "";

  $.each(cartProducts, (i, cartProduct) => {
    console.log(cartProduct);

    let shoppingCartContainer = $("<div>")
      .addClass("cartproduct")
      .attr("id", cartProduct.id);

    $("<div>")
      .addClass("image")
      .html(cartProduct.image)
      .appendTo(shoppingCartContainer);
    $("<h3>").html(cartProduct.name).appendTo(shoppingCartContainer);
    $("<p>").html(cartProduct.price).appendTo(shoppingCartContainer);
    let deleteButton = $("<button>Delete</button>")
      .addClass("deleteButton")
      .appendTo(shoppingCartContainer);
    deleteButton.on("click", { c: cartProduct }, deleteCartProduct);

    shoppingCartContainer.appendTo($("#shoppingCart-container"));
  });
}

function deleteCartProduct(e) {
  for (let i = 0; i < cartProducts.length; i++) {
    $(".cartproduct").html(e.data.c);
    console.log(e.data.c);
    if (cartProducts[i].id == e.data.c.id) {
      cartProducts.splice(i, 1);
    }
    createShoppingCart();
    updateCartTotalPrice();
    addToLocalStorage(cartProducts);
  }
}

function clickedAddToCart(e) {
  cartProducts.push(e.data.p);

  console.log(e.data.p);

  createShoppingCart();
  updateCartTotalPrice();
  addToLocalStorage(cartProducts);
}

// listOfTotal = [];

// for (let p = 0; p < cartProducts.length; p++) {
//   total = cartProducts[p].price;
//   listOfTotal.push(total);
// }

function updateCartTotalPrice() {
  let listOfTotal = [];

  for (let p = 0; p < cartProducts.length; p++) {
    total = parseInt(cartProducts[p].price);

    listOfTotal.push(total);

    console.log(listOfTotal);
  }

  let totalSum = listOfTotal.reduce(function (a, b) {
    return a + b;
  }, 0);

  let totalSum2 = totalSum;
  totalSum = "Total Price: " + totalSum + ":-";

  document.getElementById("totalPrice").innerHTML = totalSum;
  console.log(totalSum2);
  return totalSum2;
}

function addToLocalStorage(cartProducts) {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  createShoppingCart(cartProducts);
}

function getFromLocalStorage() {
  let cartProductFromLS = localStorage.getItem("cartProducts");
  if (cartProductFromLS) {
    cartProducts = JSON.parse(cartProductFromLS);
    createShoppingCart(cartProducts);
  }
}
