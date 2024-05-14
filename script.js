//Implement your code here to make it a functional shopping website
const productContainerEle = document.getElementById("products");

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
    const productEle = document.createElement("div");
    productEle.classList.add("product");
    console.log(product.title);
    productEle.innerText = product.title;
    productContainerEle.appendChild(productEle);
  });
}

// displayAllProducts();
