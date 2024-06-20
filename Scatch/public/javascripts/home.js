let arr = [];
let successMsg = document.querySelector(".success");
let availability = document.querySelector(".availability");
let discount = document.querySelector(".discount");

function display(msg) {
  successMsg.innerHTML = msg;
  successMsg.style.display = "flex";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 1300);
}

function loadProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/getProducts", true);
  xhr.responseType = "json"; // Ensure the response is parsed as JSON

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = xhr.response;
      arr = data;
      console.log("Received data:", data);
      displayProducts(arr);
    } else {
      console.error("Error:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed.");
  };

  xhr.send();
}

function displayProducts(arr) {
  document.querySelector(".productSection").innerHTML = "";
  arr.forEach((obj) => {
    let code =
      obj.discount === 0
        ? `<p><span style="margin-right:10px">₹${obj.price}</span></p>`
        : `<p><span style="text-decoration: line-through;margin-right:10px">₹${
            obj.price
          }</span>₹${obj.price - obj.discount}</p>`;

    document.querySelector(".productSection").innerHTML += `
      <div class="eachProduct" style='color:${obj.textColor}'>
       <div class="top f-c" style='background-color:${obj.backgroundColor}'><img src="./images/products/${obj.imageUrl}"/></div>
       <div class="bottom" style='background-color:${obj.panelColor}'>
       <div class="left" ><p>${obj.name}</p>${code}</div><div class="right f-c">
       <i class="ri-add-fill addBtn" id='${obj._id}' style='color:black'></i>
       </div>
       </div>
      </div>
        `;
  });

  document.querySelectorAll(".addBtn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(e.target.id);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/addToCart", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = xhr.responseText;
          display(data);
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

loadProducts();

availability.addEventListener("click", () => {
  console.log("click1");
  availability.style.color = "grey";
  discount.style.color = "black";

  let filtered = arr.filter((ele) => {
    return ele.stock > 0;
  });
  displayProducts(filtered);
});

discount.addEventListener("click", () => {
  console.log("click2");
  availability.style.color = "black";
  discount.style.color = "grey";

  let filtered = arr.filter((ele) => {
    return ele.discount > 0;
  });
  displayProducts(filtered);
});
