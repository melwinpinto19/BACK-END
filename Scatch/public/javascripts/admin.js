let products = document.querySelector(".products");
let addProduct = document.querySelector(".add-product");
let successMsg = document.querySelector(".success");
let arr = [];

function displayLoadedProducts() {
  products.style.color = "grey";
  addProduct.style.color = "black";
  document.querySelector(".content").innerHTML = `
  <div class="wrapper">
  </div>
  `;

  arr.forEach((obj) => {
    document.querySelector(".wrapper").innerHTML += `
  <div class="eachProduct" style='color:${obj.textColor}'>
   <div class="top f-c" style='background-color:${
     obj.backgroundColor
   }'><img src="./images/products/${obj.imageUrl}"/></div>
   <div class="bottom" style='background-color:${obj.panelColor}'>
   <div class="left" ><p>${
     obj.name
   }</p><p><span style="text-decoration: line-through;margin-right:10px">₹${
      obj.price
    }</span>₹${obj.price - obj.discount}</p></div><div class="right f-c">
   <i class="ri-subtract-line removeBtn" id='${
     obj._id
   }' style='color:black'></i>
   </div>
   </div>
  </div>
    `;
  });

  document.querySelectorAll(".removeBtn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(e.target.id);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/removeProduct", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.responseType = "json"; // Ensure the response is parsed as JSON

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = xhr.response;
          console.log("Received data:", data);
          arr = arr.filter((obj) => {
            return obj._id != data._id;
          });
          displaySucessMsg("Product removed successfully");
        } else {
          console.error("Error:", xhr.statusText);
        }
      };

      xhr.onerror = function () {
        console.error("Request failed.");
      };

      let data = {
        id: e.target.id,
      };

      xhr.send(JSON.stringify(data));
    });
  });
}

products.addEventListener("click", () => {
  products.style.color = "grey";
  addProduct.style.color = "black";
  document.querySelector(".content").innerHTML = `
  <div class="wrapper">
  </div>
  `;

  arr.forEach((obj) => {
    document.querySelector(".wrapper").innerHTML += `
  <div class="eachProduct" style='color:${obj.textColor}'>
   <div class="top f-c" style='background-color:${
     obj.backgroundColor
   }'><img src="./images/products/${obj.imageUrl}"/></div>
   <div class="bottom" style='background-color:${obj.panelColor}'>
   <div class="left" ><p>${
     obj.name
   }</p><p><span style="text-decoration: line-through;margin-right:10px">₹${
      obj.price
    }</span>₹${obj.price - obj.discount}</p></div><div class="right f-c">
   <i class="ri-subtract-line removeBtn" id='${
     obj._id
   }' style='color:black'></i>
   </div>
   </div>
  </div>
    `;
  });

  document.querySelectorAll(".removeBtn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(e.target.id);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/removeProduct", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.responseType = "json"; // Ensure the response is parsed as JSON

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = xhr.response;
        } else {
          console.error("Error:", xhr.statusText);
        }
      };

      xhr.onerror = function () {
        console.error("Request failed.");
      };

      let data = {
        id: e.target.id,
      };

      xhr.send(JSON.stringify(data));
    });
  });
});

function loadProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/getProducts", true);
  xhr.responseType = "json"; // Ensure the response is parsed as JSON

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = xhr.response;
      arr = data;
      console.log("Received data:", data);
    } else {
      console.error("Error:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed.");
  };

  xhr.send();
}

function addProductFun(e) {
  // document.querySelector("input[type='submit']").click();
  let formData = new FormData(document.querySelector("form"));
  console.log(formData.get("name"));
  if (isNaN(formData.get("price"))) {
    display("Invalid Price Value");
  } else if (isNaN(formData.get("discount"))) {
    display("Invalid Discount Value");
  } else if (isNaN(formData.get("stock"))) {
    display("Invalid Stock Value");
  } else if (
    !isHexaDecimal(formData.get("panelColor")) ||
    !isHexaDecimal(formData.get("backgroundColor")) ||
    !isHexaDecimal(formData.get("textColor"))
  ) {
    display("Provide a valid hexadecimal value for the color");
  } else {
    // document.querySelector("input[type='submit']").click();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/addProduct", true);
    xhr.responseType = "json"; // Ensure the response is parsed as JSON

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = xhr.response;
        console.log("Received data:", data);
        arr.push(data);
        displaySucessMsg("Product added sucessfully");
      } else {
        console.error("Error:", xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error("Request failed.");
    };

    xhr.send(formData);
  }
}

function display(msg) {
  var a = document.querySelector(".error-msg");
  a.innerHTML = msg;
  a.style.display = "flex";
}

function displaySucessMsg(msg) {
  successMsg.innerHTML = msg;
  successMsg.style.display = "flex";
}

function isHexaDecimal(s) {
  if (!s.startsWith("#")) return 0;
  return 1;
}

addProduct.addEventListener("click", () => {
  addProduct.style.color = "grey";
  products.style.color = "black";
  document.querySelector(".content").innerHTML = `
        <h1>Create New Product</h1>
        <div class="line1"></div>
        <form action="/addProduct" method="post" enctype="multipart/form-data">
          <p class="heading">Product Details</p>
          <div class="select-img f-c">
            <p>Product Image</p>
            <label for="select-img" class="f-c" id="select-img-lbl"
              >Select file</label
            ><input
              type="file"
              name="file"
              id="select-img"
              style="display: none"
            />
          </div>
          <div class="product-name">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              required
            />
          </div>
          <div class="product-price-discount">
            <input
              type="text"
              class=""
              name="price"
              placeholder="Product Price"
              required
            />
            <input
              type="text"
              class=""
              name="discount"
              placeholder="Discount Amount"
              required
            />
            <input
              type="text"
              class=""
              name="category"
              placeholder="category(space separated)"
              required
            />
          </div>
          <div class="stock">
            <input
              type="text"
              name="stock"
              placeholder="stock available"
              required
            />
          </div>
          <p class="heading">Panel Details</p>
          <div class="panel-details">
            <input
              type="text"
              class=""
              name="backgroundColor"
              placeholder="Background Color"
              required
            />
            <input
              type="text"
              class=""
              name="panelColor"
              placeholder="Panel Color"
              required
            />
            <input
              type="text"
              class=""
              name="textColor"
              placeholder="Text Color"
              required
            />
          </div>
          <div class="f-c addBtn">Add Product</div>
        </form>
  `;
  document.querySelector(".addBtn").addEventListener("click", addProductFun);
  document.querySelector(".content").addEventListener("click", (e) => {
    if (!e.target.classList.contains("addBtn")) {
      successMsg.style.display = "none";
      document.querySelector(".error-msg").style.display = "none";
    }
  });
});

document.querySelector(".addBtn").addEventListener("click", addProductFun);

document.querySelector(".content").addEventListener("click", (e) => {
  if (!e.target.classList.contains("addBtn")) {
    document.querySelector(".error-msg").style.display = "none";
    successMsg.style.display = "none";
  }
});

loadProducts();
