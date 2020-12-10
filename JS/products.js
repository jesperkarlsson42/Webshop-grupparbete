let x = 0;
let y = 1;

class Product {
  constructor(name, price, image, description) {
    this.id = x++;
    this.count = y;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

let products = [];
let cartProducts = [];
let listOfTotal = [];

let p1 = new Product(
  "Rolex",
  14245,
  "<img src='./../img/rolexsilver.jpg'/>",
  "Rolex presents the new generation of its Oyster Perpetual watches and brings a new model to the range, the Oyster Perpetual 41, as well as versions of the Oyster Perpetual 36 displaying dials in vivid colours. The light reflections on the case sides highlight the elegant profile of the Oyster case, which is made from Oystersteel. Measuring 41 mm or 36 mm respectively, it is fitted with a domed bezel."
);
let p2 = new Product(
  "Gant",
  1145,
  "<img src='./../img/gantsilver.png'/>",
  "Classic Gant Time Mens watch W108411 . Colors > Dial: Black, Strap: Brown, Case: Rosé gold. Very comfortable Calf leather strap. The water resistance is 5 ATM. A scratch proove Mineral glass, hardened protects your watch from involuntary injuries."
);
let p3 = new Product(
  "Timex",
  1395,
  "<img src='./../img/timexbrown.jpg'/>",
  "Metropolitan R has all the functionality you need including up to 2 weeks of battery life. This sleek design boasts an impressive AMOLED display that you can customize with over 20+ dial designs. Plus, 24/7 activity and sleep tracking for your health and fitness goals, on-board GPS, optical heart rate sensor, notifications and much more. This is the perfect smartwatch to fit your busy lifestyle. The brown leather and silicone combination strap is complemented by a black metal case and scratch-resistant Gorilla Glass™ lens."
);
let p4 = new Product(
  "Longines",
  10725,
  "<img src='./../img/longinessilver.jpg'/>",
  "Conquest 24 has a simple yet appealing design. It features a robust package, with a 41 mm wide round steel case (with a screw-in back and a screw-in crown with protection) and a three-link bracelet (with the thickest central row) of the same material. The dial is available in three classic colors: black, silvered and blue; and it is dominated with two Roman numerals, a 24-hour scale and its attached red hand. For improved visibility, hands, numerals and indices are coated with luminescent SuperLuminova material. The watch includes a minute scale on the flange, and a date aperture, as well as a sapphire crystal with glare-proof coating on the underside as a protection for the dial."
);
let p5 = new Product(
  "Hunters Race",
  2495,
  "<img src='./../img/huntersbrown.jpg'/>",
  "Hunters Race is a curated collection of the finest timepieces designed in Auckland, New Zealand by father and son team Scott and Jack Ramsay.  Scott has over thirty years experience in the watch industry and ensures that their watches are of the highest quality, along with providing a very professional back up service. The watch has a 12 month guarantee and comes in a beautiful gift box along with a spare strap. "
);
let p6 = new Product(
  "Tommy Hilfiger",
  1595,
  "<img src='./../img/tommyblack.jpg'/>",
  "Make a premium mark of style on your outfit with a timeless Tommy Hilfiger watch. Whether you're looking for classic leather, smart stainless steel or dressy silver watch, why not indulge in our range of men's and ladies watches and discover luxurious high fashion, sophistication in enduring designs that will inevitably stand the test of time."
);
let p7 = new Product(
  "Emporio Armani",
  2745,
  "<img src='./../img/armanisilver.jpg'/>",
  "Emporio Armani, as a brand, is known for its ready-to-wear and runway collections. It focuses on current trends and modern traits."
);
let p8 = new Product(
  "Fossil",
  1295,
  "<img src='./../img/fossilsilver.jpg'/>",
  "This watch really does remind me of Omega’s moonwatch. It’s not a direct homage but is certainly very similar in its styling. And really, it’s the appearance that attracted me to this watch. It is a mid-sized, racing chronograph with real retro charm."
);
let p9 = new Product(
  "Thomas Sabo",
  2625,
  "<img src='./../img/thomasblack.jpg'/>",
  "Black and silver men's watch: The Statement chronograph from THOMAS SABO convinces with a rebellious design. The dial of the dial, the ring of the case, the crown and the buttons of the case and also the detailed bracelet in stainless steel attract the eye thanks to its pyramid design and typically THOMAS SABO DNA."
);
let p10 = new Product(
  "Braun",
  2495,
  "<img src='./../img/braunblack.jpg'/>",
  "A collaborative design project that partners German design with British fashion. Braun and Paul Smith have teamed up on a limited-edition clock and watch project. Paul Smith is one of Britain’s foremost designers, renowned for his creative spirit, which combines tradition and modernity."
);

$(function () {
  addProduct();
  createProduct();
  getFromLocalStorage();
  updateCartTotalPrice();

  $("#buyButton").on("click", function () {
    window.location.href = "./../html/checkout.html";
  });

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

  $(".description").hide();
  $(".show_hide").on("click", function () {
    let txt = $(".description").is(":visible") ? "Read More" : "Read Less";
    $(".show_hide").text(txt);
    $(this).next(".description").slideToggle(200);
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

    $("<a>")
      .attr("href", "javascript:;")
      .addClass("show_hide")
      .attr("data-content", "toggle-text")
      .text("Read More")
      .appendTo(container);
    $("<p>")
      .addClass("description")
      .html(product.description)
      .appendTo(container);
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
      notice ();
    } else {
      updateCartTotalPrice();
      notice ();
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
    notice ();
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
    notice ();
    addToLocalStorage(cartProducts);
  }
}

function clickedAddToCart(e) {
  cartProducts.push(e.data.p);

  createShoppingCart();
  updateCartTotalPrice();
  addToLocalStorage(cartProducts);
  notice ();
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

function notice () {
  let amount = 0;
  for (let i = 0; i <cartProducts.length; i++) {
    let total = amount +=  cartProducts[i].count;
    
    let totalamount = $('.notice');
    totalamount.html('');
    let noticeAmount = $('<p>').addClass('amount').html(total);
    noticeAmount.appendTo(totalamount);
  }
}
