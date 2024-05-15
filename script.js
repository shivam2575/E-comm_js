//Implement your code here to make it a functional shopping website
const productContainerEle = document.getElementById("products");
const cartEle = document.getElementById("cart");
const cartBtnEle = document.getElementById("cartBtn");

function getAllProducts(url) {
  return fetch(url).then((response) => {
    if (!response.status) {
      throw new Error("error while fetching products");
    }
    return response.json();
  });
}

async function displayAllProducts() {
  const productsList = await getAllProducts("https://dummyjson.com/products");
  productsList.products.forEach((product) => {
    appendProduct(product.images[0], product.title, product.price);
  });
}

function appendProduct(imageUrl, title, price) {
  const product = `<div class="product">
    <div class="img-container">
        <img src="${imageUrl}" alt="">
    </div>
    <div class="details-container">
        <p class="p-title">${title}</p>
        <p class="p-price">Price: ${price}</p>
        <button class="p-btn">Add to cart</button>
    </div>
</div>`;

  productContainerEle.insertAdjacentHTML("beforeend", product);
}

function showCart() {
  cartEle.classList.toggle("show");
  productContainerEle.classList.toggle("no-show");
}

document.addEventListener("DOMContentLoaded", function () {
  displayAllProducts();
});

cartBtnEle.addEventListener("click", showCart);

// function addToCart() {
//   let addCartBtnEle = document.getElementsByClassName("p-btn");
//   addCartBtnEle.forEach(btn=>{
//     btn.addEventListener("click", ()=>{

//     })
//   })
// }
