// slider starting
let slider = 1;
let maxSlides = 4;
let output = document.getElementById("output");
let intervalId;

function previousSlide() {
  if (slider > 1) {
    slider = slider - 1;
  } else {
    slider = maxSlides;
  }
  updateSlide();
}

function nextSlide() {
  if (slider < maxSlides) {
    slider = slider + 1;
  } else {
    slider = 1;
  }
  updateSlide();
}

function updateSlide() {
  output.src = "images/hotel" + slider + ".jpeg";
}

function startInterval() {
  intervalId = setInterval(nextSlide, 3000); // 3000ms (3 seconds)
}

startInterval();

output.addEventListener("mouseover", () => {
  clearInterval(intervalId);
});

output.addEventListener("mouseout", () => {
  startInterval();
});

// cards starts
const data = [
  {
    title: "Idly",
    price: "99",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/image3.jpeg"
  },
  {
    title: "Pulihora",
    price: "119",
    rating: "&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/image5.jpeg",
  },
  {
    title: "Dosa",
    price: "99",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/image2.jpeg",
  },
  {
    title: "Puri",
    price: "119",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/image4.jpeg",
  },
  {
    title: "frons",
    price: "499",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/frans.jpeg",
  },
  
  {
    title: "biryani",
    price: "199",
    rating: "&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/img2.jpeg",
  },
  {
    title: "mutton",
    price: "399",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/img5.jpeg",
  },
  {
    title: "Fish",
    price: "249",
    rating: "&bigstar;&bigstar;&bigstar;&bigstar;&star;",
    image: "./images/img6.jpeg",
  },
];
const productcontainer = document.getElementById("product-container");
const htmlconent = data.map((item) => {
  return `
        <div class="row flex">
        <div class="card">
        <img src="${item.image}" alt="" >
        <h3>${item.title}</h3>
        <div class="product-info">
        <p class="product-price">${item.price}</p>
         <p class=colo>${item.rating}</p>
        <button class="add-to-cart-btn">Add to card</button>
        </div>
        

        
        
        
        </div>
        </div>
     `;
});
productcontainer.innerHTML = htmlconent;

// function to load all the items
document.addEventListener("DOMContentLoaded", () => {
  const addtocartBtn = document.querySelectorAll(".add-to-cart-btn");
  console.log(addtocartBtn);
  // adding addeventlistner to buton elements
  addtocartBtn.forEach((ele) => {
    console.log(ele);
    ele.addEventListener("click", (e) => {
      // console.log(e.target);
      // accessing all the  items detalis(price,)
      const row = ele.parentElement.parentElement;
      console.log(row);
      const productName = row.querySelector(".product-title").innerText;
      const productprice = row.querySelector(".product-price").innerText;
      const productImage = row.querySelector("img").src;
      console.log(productName);
      console.log(productprice);
      console.log(productImage);
      // to sending the empty ele
      const Selectedproducts = {
        name: productName,
        price: productprice,
        ImgUrl: productImage,
      };
      // console.log(Selectedproducts)
      Addtocart(Selectedproducts);
    });
  });
});

// empty array to store the items selected and existing items to increase quantity
const cartItems = [];
console.log(cartItems);

// function to check weather the items already present in carts
function Addtocart(products) {
  console.log(products);
  const existingItems = cartItems.find((item) => item.name === products.name);
  if (existingItems) {
    existingItems.quantity++;
  } else {
    cartItems.push({ ...products, quantity: 1 });
  }
  // function to display items in the cart
  UpdateCartUI();
  cartCountIcon();
  localStorage.setItem("cartItem", JSON.stringify(cartItems));
}

// function to update the cartuo
function UpdateCartUI() {
  const cartItem = document.querySelector(".cart_items");
  cartItem.innerHTML = "";
  // accessing the elements from the array to display the item in the ui

  cartItems.forEach((ele) => {
    const cartprod = document.createElement("li");
    cartprod.innerHTML = `<div class="row flex">
    <div class="card">
        <img src="${ele.ImgUrl}" alt="">
        <h3>${ele.title}</h3>
        <div class="product-info">
            <p class="product-title">${ele.name}</p>
            <p class="product-price">${ele.price}</p>
            <span>Quantity:${ele.quantity}</span>
            <div class="quantity-container">
                <button class="increase-quantity">+</button>
                <span class="quantity-value">${ele.quantity}</span>
                <button class="decrease-quantity">-</button>
            </div>
            <button class="remove-from-cart">Remove</button>
        </div>`;

    const quantityconEle = cartprod.querySelector(".quantity-container");
    const QuantityVal = cartprod.querySelector(".quantity-value");
    const IncreaseQueEle = quantityconEle.querySelector(".increase-quantity");
    const decreaseQueEle = quantityconEle.querySelector(".decrease-quantity");
    const removeItem = cartprod.querySelector(".remove-from-cart");

    // adding event lister to increase the quantity btn
    IncreaseQueEle.addEventListener("click", () => {
      handleincreaseQuantity(ele, QuantityVal);
    });
    // adding event lister to decrease quantity btn
    decreaseQueEle.addEventListener("click", () => {
      handleDecreaseQuantity(ele, QuantityVal);
    });
    // adding event lister to remove qunatity btn
    removeItem.addEventListener("click", () => {
      RemoveItem(ele);
    });

    cartItem.appendChild(cartprod);
    cartCountIcon();
  });
}
// function to increase the quantity
function handleincreaseQuantity(ele, QuantityVal) {
  ele.quantity++;
  QuantityVal.textContent = ele.quantity;
  UpdateCartUI();
  cartTotal();
  cartCountIcon();
}
// function to decrease the quantity
function handleDecreaseQuantity(ele, QuantityVal) {
  if (ele.quantity > 1) ele.quantity--;
  QuantityVal.textContent = ele.quantity;
  UpdateCartUI(cartItems);
  cartTotal();
  cartCountIcon();
}

// function to remove the quantity
function RemoveItem(ele) {
  const index = cartItems.findIndex((product) => product.name === ele.name);
  if (index !== -1) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      cartItems.splice(index, 1);
    }
  }
  UpdateCartUI();
  cartTotal();
  cartCountIcon();
}

// function to update cart
function cartTotal() {
  const cartContainerEle = document.querySelector(".cart_total");
  const CartTotalval = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartContainerEle.textContent = `Total:${CartTotalval}`;
}

// function to increase the cart count
function cartCountIcon() {
  const CartIconVal = document.getElementById("cart-item_count");
  const cartIconTotal = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  CartIconVal.textContent = cartIconTotal;
}

function LoadCartUi() {
  const storeItems = localStorage.getItem("cartItem");
  if (storeItems) {
    cartItems.push(...JSON.parse(storeItems));
    UpdateCartUI();
    cartTotal();
    cartCountIcon();
  }
}
LoadCartUi();

// cartsection
const cartItemsContainer = document.querySelector(".");
cartItemsContainer.style.display = "none";
// getting the icon value
const cartIcon = document.querySelector("#cart-icon");

cartIcon.addEventListener("click", () => {
  // Hide all other elements except the cart items container
  const elementsToHide = document.querySelectorAll("body > :not(.)");
  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });

  // Show the cart items container
  cartItemsContainer.style.display = "block";

  // Move the cart items container to the top of the document
  document.body.insertBefore(cartItemsContainer, document.body.firstChild);
});
