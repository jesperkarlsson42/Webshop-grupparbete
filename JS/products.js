let x = 0;

let products = [];
let cartProducts = [];
let listOfTotal = [];

class Product {
  constructor(name, price, image, description) {
    this.id = x++;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.inCart = false;
  }
}

class CartItem {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }
}

let p1 = new Product(
  "Rolex",
  86890,
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
  "Metropolitan R has all the functionality you need including up to 2 weeks of battery life. This sleek design boasts an impressive AMOLED display that you can customize with over 20+ dial designs. Plus, 24/7 activity and sleep tracking for your health and fitness goals, on-board GPS, optical heart rate sensor, notifications and much more. This is the perfect smartwatch to fit your busy lifestyle. "
);
let p4 = new Product(
  "Longines",
  10725,
  "<img src='./../img/longinessilver.jpg'/>",
  "Conquest 24 has a simple yet appealing design. It features a robust package, with a 41 mm wide round steel case (with a screw-in back and a screw-in crown with protection) and a three-link bracelet (with the thickest central row) of the same material. The dial is available in three classic colors: black, silvered and blue; and it is dominated with two Roman numerals, a 24-hour scale and its attached red hand. For improved visibility, hands, numerals and indices are coated with luminescent SuperLuminova material."
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

let p11 = new Product(
  "Omega",
  16305,
  "<img src='./../img/omega.jpg'/>",
  " The OMEGA Speedmaster is one of OMEGA’s most iconic timepieces. Having been a part of all six lunar missions, the legendary Speedmaster is an impressive representation of the brand’s adventurous pioneering spirit."
);

let p12 = new Product(
  "Oris",
  52900,
  "<img src='./../img/oris.jpg'/>",
  "The Aquis collection of diver’s watches offers real-world functionality in an innovative package, through a combination of considered design, high-performance materials and fit-for-purpose functions."
);

$(function () {
  addProduct();
  createProduct();
  getFromLocalStorage();
  updateCartTotalPrice();
  notice();

  let select = $(".form-control");

  $(select).on("change", function (e) {
    console.log($(this).val());
    if ($(this).val() == "l2h") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }

        if (a.price < b.price) {
          return -1;
        }

        return 0;
      });

      createProduct();
    } else if ($(this).val() == "h2l") {
      products.reverse();
    }
    createProduct();
  });

  $("#buyButton").on("click", function () {
    if (cartProducts.length <= 0) {
      alert("Shopping cart is empty");
    } else {
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts.length >= 0) {
          window.location.href = "./../html/checkout.html";
        }
      }
    }
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
});

function addProduct() {
  products.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
}

function createProduct() {
  let productlist = document.getElementById("product-container");

  productlist.innerHTML = "";

  $.each(products, (i, product) => {
    let container = $("<div>").addClass("product").attr("id", product.id);

    $("<div>").addClass("image").html(product.image).appendTo(container);
    $("<h3>").html(product.name).appendTo(container);
    $("<p>")
      .addClass("price")

      .html(product.price + " " + "SEK")

      .appendTo(container);

    $("<a>")
      .attr("href", "javascript:;")
      .addClass("show_hide")
      .attr("data-content", "toggle-text")
      .attr("id", "atag")
      .text("Read More")
      .appendTo(container);
    $("<p>")
      .addClass("description")
      .html(product.description)
      .appendTo(container);
    let addToCartButtons = $("<button>Add to Cart</button>")
      .addClass("AddToCartButton")
      .appendTo(container);
    addToCartButtons.on("click", () => {
      clickedAddToCart(products[i]);
    });

    container.appendTo($("#product-container"));
  });

  $(".description").hide();
  $(".show_hide").on("click", function () {
    let txt = $(".description").is(":visible") ? "Read More" : "Read Less";
    $(".show_hide").text(txt);
    $(this).next(".description").slideToggle(200);
  });
}

function createShoppingCart() {
  let shoppingcart = document.getElementById("shoppingCart-container");

  shoppingcart.innerHTML = "";

  $.each(cartProducts, (i, cartProduct) => {
    let shoppingCartContainer = $("<div>")
      .addClass("cartproduct")
      .attr("id", cartProducts[i].product.id);

    $("<div>")
      .addClass("image")
      .html(cartProducts[i].product.image)
      .appendTo(shoppingCartContainer);
    $("<h3>")
      .html(cartProducts[i].product.name)
      .appendTo(shoppingCartContainer);
    $("<p>")
      .html(cartProducts[i].product.price + " " + "SEK")
      .appendTo(shoppingCartContainer);
    let deleteButton = $("<button>Delete</button>")
      .addClass("deleteButton")
      .appendTo(shoppingCartContainer);
    deleteButton.on("click", () => {
      deleteCartProduct(cartProducts[i]);
    });

    let counterdiv = $("<div>")
      .addClass("counterdiv")
      .appendTo(shoppingCartContainer);

    let displayCounter = $("<div>").addClass("counter").appendTo(counterdiv);
    $("<p>")
      .addClass("activeCount")
      .html(cartProducts[i].qty)
      .appendTo(displayCounter);

    let minus = $("<button>-</button>")
      .html('<i class="fas fa-minus-circle"></i>')
      .addClass("subbtn")
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

    shoppingCartContainer.appendTo($("#shoppingCart-container"));
  });
}

function addOneProduct(cartProduct) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id == cartProduct.product.id) {
      cartProducts[i].qty++;
      createShoppingCart();
    }
    if (cartProducts[i].qty > 1) {
      let tempsum = cartProducts[i].qty * 1;
      let total = tempsum * parseInt(cartProducts[i].product.price);
      listOfTotal.push(total);
      updateCartTotalPrice();
      addToLocalStorage(cartProducts);
      notice();
    } else {
      updateCartTotalPrice();
      notice();
      addToLocalStorage(cartProducts);
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
      cartProduct.product.inCart = false;
    }
    createShoppingCart();
    updateCartTotalPrice();
    notice();
    addToLocalStorage(cartProducts);
  }
}

function deleteCartProduct(cartProduct) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id == cartProduct.product.id) {
      cartProducts.splice(i, 1);
      cartProduct.product.inCart = false;
    }
    createShoppingCart();
    updateCartTotalPrice();
    notice();
    addToLocalStorage(cartProducts);
  }
}

function clickedAddToCart(product) {
  for (let i = 0; i < products.length; i++) {
    if (product.id === products[i].id) {
      if (product.inCart == false) {
        cartProducts.push(new CartItem(product, 1));
        product.inCart = true;

        createShoppingCart();
        updateCartTotalPrice();
        addToLocalStorage(cartProducts);
        notice();
      } else if (product.inCart == true) {
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i].product.id === product.id) {
            cartProducts[i].qty++;
            createShoppingCart();
            updateCartTotalPrice();
            addToLocalStorage(cartProducts);
            notice();
          }
        }
      }
    }
  }
}

function updateCartTotalPrice() {
  let sum = 0;

  $.each(cartProducts, (i, cartProduct) => {
    sum += cartProducts[i].qty * cartProducts[i].product.price;
  });

  $("#totalPrice").html("Total Price:" + " " + sum + " " + "SEK");

  return sum;
}

function notice() {
  let amount = 0;
  if (cartProducts.length <= 0) {
    let total = 0;
    let totalamount = $(".notice");
    totalamount.html("");
    let noticeAmount = $("<p>").addClass("amount").html(total);
    noticeAmount.appendTo(totalamount);
  } else {
    for (let i = 0; i < cartProducts.length; i++) {
      let total = (amount += cartProducts[i].qty);

      let totalamount = $(".notice");
      totalamount.html("");
      let noticeAmount = $("<p>").addClass("amount").html(total);
      noticeAmount.appendTo(totalamount);
    }
  }
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
