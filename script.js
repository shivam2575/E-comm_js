//Implement your code here to make it a functional shopping website
const productContainerEle = document.getElementById("products");
const cartContainerEle = document.getElementById("cart");
const cartBtnEle = document.getElementById("cartBtn");

const cartItems = [];
let prod;
let totalPrice = 0;
//event listner to toggle between cart and homepage
cartBtnEle.addEventListener("click", () => {
  cartContainerEle.classList.toggle("show");
  productContainerEle.classList.toggle("no-show");
  displayCart();
});
//to have a list of products in global variable "prod"
async function getAllProducts() {
  prod = await fetch("https://dummyjson.com/products");
  prod = await prod.json();
  prod = prod.products;
}
getAllProducts();
//to add to cartItems list
function addToCart(id) {
  const index = cartItems.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    cartItems[index].quantity += 1;
  } else {
    cartItems.push({
      id: id,
      name: prod[id - 1].title,
      price: prod[id - 1].price,
      quantity: 1,
    });
  }
}
//to display products in cart
function displayCart() {
  console.log("inside display cart");
  cartContainerEle.innerHTML = "";
  totalPrice = 0;
  for (let i of cartItems) {
    const cartDiv = document.createElement("div");
    totalPrice += i.price * i.quantity;
    cartDiv.innerHTML = `<div class="cart_item">
    <span style="font-size:18px">${i.name}</span>
    <span>Price: ${i.price}</span>
    <span>Quant: ${i.quantity}</span>
    <button class="remove" onClick = "removeItem(${i.id})">-</button>
    </div>`;
    cartContainerEle.append(cartDiv);
  }
}
//to decrease count in cart
function removeItem(id) {
  const index = cartItems.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    cartItems[index].quantity -= 1;
    if (cartItems[index].quantity == 0) {
      cartItems.splice(index, 1);
    }
  }
  displayCart();
}
//event listner for checkout button to display total price and thank you message
document.getElementById("checkoutBtn").addEventListener("click", () => {
  window.alert(`Thankyou for shopping. Your total price is ${totalPrice}`);
});
//to populate all products on homepage
async function populateProduct() {
  let productsList = await fetch("https://dummyjson.com/products");
  productsList = await productsList.json();
  productsList = productsList.products;
  for (let product of productsList) {
    let prodDiv = document.createElement("div");
    prodDiv.classList.add("main_div");
    prodDiv.innerHTML = `<div class="product" style = "height:400px; " id=${product.id}>
    <div class="img_con">
    <button class="previous" onClick= "prevImage(${product.id})"> << </button>
    <img src=${product.images[0]} style = "height:200px; width:200px;" id="0"></img>
    <button id="next" onClick = "nextImage(${product.id})"> >> </button>
    </div>
    <div class="card_footer">
    <h3>${product.title}</h3>
    <p>Price: $${product.price}</p>
    <button class="addToCartBtn" onClick ="addToCart(${product.id})">Add to Cart</button>
    </div>`;
    document.querySelector(".products").append(prodDiv);
  }
}
populateProduct();
//for prev image
async function prevImage(id) {
  const product = document.getElementById(id);
  const img = product.querySelector("img");
  let imgId = img.getAttribute("id");
  const res = await fetch("https://dummyjson.com/products");
  const result = await res.json();
  const images = result.products[id - 1].images;
  if (imgId == 0) {
    imgId = images.length - 1;
  } else {
    imgId--;
  }
  img.setAttribute("src", images[imgId]);
  img.setAttribute("id", imgId);
}
//for next image
async function nextImage(id) {
  const product = document.getElementById(id);
  const img = product.querySelector("img");
  let imgId = img.getAttribute("id");
  const res = await fetch("https://dummyjson.com/products");
  const result = await res.json();
  const images = result.products[id - 1].images;
  if (imgId == images.length - 1) {
    imgId = 0;
  } else {
    imgId++;
  }
  img.setAttribute("src", images[imgId]);
  img.setAttribute("id", imgId);
}
