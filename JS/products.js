let x = 0;
let y = 1;

class Product {
  constructor(name, price, image) {
    this.id = x++;
    this.count = y;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

let products = [];
let cartProducts = [];
let listOfTotal = [];

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
  updateCartTotalPrice();

  $('#buyButton').on('click', function() {
    window.location.href = "./../html/checkout.html";
  })

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

    let counterdiv = $("<div>")
      .addClass("counterdiv")
      .appendTo(shoppingCartContainer);

    let displayCounter = $("<div>").addClass("counter").appendTo(counterdiv);
    $("<p>")
      .addClass("activeCount")
      .html(cartProduct.count)
      .appendTo(displayCounter);

    let minus = $("<button>-</button>")
      .addClass("subbtn")
      .on("click", { c: cartProduct }, subtractOneProduct);
    minus.appendTo(counterdiv);

    let add = $("<button>+</button>")
      .addClass("addbtn")
      .on("click", { c: cartProduct }, addOneProduct);
    add.appendTo(counterdiv);

    shoppingCartContainer.appendTo($("#shoppingCart-container"));
  });
}

function addOneProduct(e) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == e.data.c.id) {
      cartProducts[i].count++;
      createShoppingCart();
    }
    if (cartProducts[i].count > 1) {
      let tempsum = cartProducts[i].count * 1;
      let total = tempsum * parseInt(cartProducts[i].price);
      listOfTotal.push(total);
      updateCartTotalPrice();
      addToLocalStorage(cartProducts);
    } else {
      updateCartTotalPrice();
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
    createShoppingCart();
    updateCartTotalPrice();
    addToLocalStorage(cartProducts);
  }
}

function deleteCartProduct(e) {
  for (let i = 0; i < cartProducts.length; i++) {
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

  createShoppingCart();
  updateCartTotalPrice();
  addToLocalStorage(cartProducts);
}

function updateCartTotalPrice() {
  let sum = 0;

  $.each(cartProducts, (i, cartProduct) => {
    sum += cartProducts[i].count * cartProducts[i].price;
  });

  $("#totalPrice").html("Total Price:" + " " + sum + " " + ":-");

  return sum;
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
