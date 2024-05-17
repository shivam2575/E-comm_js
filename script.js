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
  const productEle = document.createElement("div");
  productEle.classList.add("product");

  const imgContainerEle = document.createElement("div");
  imgContainerEle.classList.add("img-container");

  const imgEle = document.createElement("img");
  imgEle.src = imageUrl;
  imgContainerEle.appendChild(imgEle);

  const detailsContainerEle = document.createElement("div");
  detailsContainerEle.classList.add("details-container");

  const productTitle = document.createElement("p");
  productTitle.classList.add("p-title");
  productTitle.textContent = title;
  detailsContainerEle.appendChild(productTitle);

  const productPrice = document.createElement("p");
  productPrice.classList.add("p-price");
  productPrice.textContent = `Price: ${price}`;
  detailsContainerEle.appendChild(productPrice);

  const cartBtn = document.createElement("button");
  cartBtn.classList.add("p-btn");
  cartBtn.textContent = "Add to cart";
  cartBtn.addEventListener("click");

  detailsContainerEle.appendChild(cartBtn);

  productEle.appendChild(imgContainerEle);
  productEle.appendChild(detailsContainerEle);
  productContainerEle.append(productEle);
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

function addToCart() {
  const detailsContainer = btn.closest(".details-container");
  if (!detailsContainer) return;
  const productNameEle = detailsContainer.querySelector(".p-title");
  const productPriceEle = detailsContainer.querySelector(".p-price");
  const productName = productNameEle.innerText.trim();
  const productPrice = parseFloat(
    productPriceEle.textContent.trim().replace("Price: ", "")
  );
  btn.addEventListener("click", updateCart(productName, productPrice));
}

function updateCart(productName, productPrice) {
  //check if the product already exist
  //get a list of elements with className cart_items
  console.log("inside update cart()");
  const cartItems = document.getElementsByClassName("cart_item");
  if (cartItems.length > 0) {
    let flag = false;
    cartItems.forEach((item) => {
      const itemName = item.selectQuery("span")[0];
      const itemQty = item.selectQuery("span")[2];
      if (productName === itemName.innerText) {
        let quantity = parseInt(
          itemQty.textContent.trim().replace("Qty: ", "")
        );
        itemQty.innerText = `Qty: ${quantity + 1}`;
        flag = true;
      }
    });
    if (!flag) {
      createNewItem(productName, productPrice);
    }
  } else {
    createNewItem(productName, productPrice);
  }
}

function createNewItem(productName, productPrice) {
  const cartItemEle = document.createElement("div");
  const nameEle = document.createElement("span");
  const priceEle = document.createElement("span");
  const qtyEle = document.createElement("span");
  const decreaseBtnEle = document.createElement("button");

  cartItemEle.classList.add("cart_item");
  decreaseBtnEle.classList.add("minus-btn");

  nameEle.textContent = productName;
  cartItemEle.appendChild(nameEle);

  priceEle.textContent = `Price: ${productPrice}`;
  cartItemEle.appendChild(priceEle);

  qtyEle.textContent = "Qty: 1";
  cartItemEle.appendChild(qtyEle);

  decreaseBtnEle.textContent = "-";
  cartItemEle.appendChild(decreaseBtnEle);

  //add event listner to decrease btn
  decreaseBtnEle.addEventListener("click", () => {
    const qty = parseInt(qtyEle.textContent.trim().replace("Qty: ", ""));
    if (qty === 1) {
      const itemToRemove = qtyEle.closest(".cart_item");
      cartEle.removeChild(itemToRemove);
    } else {
      qtyEle.textContent = `Qty: ${qty - 1}`;
    }
  });

  cartEle.appendChild(cartItemEle);
}

document.addEventListener("DOMContentLoaded", () => {
  displayAllProducts();
  addToCart();
  cartBtnEle.addEventListener("click", showCart);
});
