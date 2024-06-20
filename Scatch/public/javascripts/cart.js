let arr = [];

// plus btn:
function PlusAndMinusButton() {
  document.querySelectorAll(".plus").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let curr = Number(e.target.previousElementSibling.innerHTML);
      e.target.previousElementSibling.innerHTML = curr + 1;

      let amount = Number(
        e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".total-amt"
        ).id
      );

      e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".total-amt"
      ).innerHTML = "₹" + (curr + 1) * amount;
    });
  });

  // minus btn:
  document.querySelectorAll(".minus").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let curr = Number(e.target.nextElementSibling.innerHTML);
      if (curr > 1) {
        e.target.nextElementSibling.innerHTML = curr - 1;

        let amount = Number(
          e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".total-amt"
          ).id
        );

        e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".total-amt"
        ).innerHTML = "₹" + (curr - 1) * amount;
      }
    });
  });
}

function displayCart() {
  document.querySelector(".cart-items").innerHTML = "";
  arr.forEach((obj) => {
    if (obj !== null) {
      document.querySelector(".cart-items").innerHTML += `
     <div class="cart-item">
      <div class="left">
      <div
        class="top f-c"
        style="background-color:${obj.backgroundColor}"
      >
        <img src="./images/products/${obj.imageUrl}" alt="No Image" />
      </div>
      <div class="bottom" style="background-color: ${obj.panelColor}">
        <div class="name">${obj.name}</div>
        <div class="qty f-c">
          <div class="minus f-c">-</div>
          <div class="value f-c">1</div>
          <div class="plus f-c">+</div>
        </div>
      </div>
    </div>

    <div class="right">
      <p style="font-weight: 600">Price Breakdown</p>
      <div class="m-10 flex">
        <div class="d1">Total MRP</div>
        <div class="d2">${obj.price}</div>
      </div>
      <div class="m-10 flex">
        <div class="d1">Discount on MRP</div>
        <div class="d2">₹${obj.discount}</div>
      </div>
      <div class="m-10 flex">
        <div class="d1">Platform Fee</div>
        <div class="d2">₹50</div>
      </div>
      <div class="m-10 flex">
        <div class="d1">Shipping Fee</div>
        <div class="d2">FREE</div>
      </div>
      <div class="line1"></div>
      <div class="flex">
        <div class="d1">Total Amount</div>
        <div
          class="d2 total-amt"
          style="color: lightgreen; text-decoration: underline"
          id="${obj.price - obj.discount + 50}"
        >
          ₹${obj.price - obj.discount + 50}
        </div>
      </div>
      <div class="btns">
        <div class="place-order-btn f-c">Place Order</div>
        <div class="remove-btn f-c" id="${obj._id}">Remove</div>
      </div>
    </div>
  </div>
    `;
    }
  });
  removeButton();
  PlusAndMinusButton();
}

function removeButton() {
  document.querySelectorAll(".remove-btn").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(e.target.id);

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/removeCartItem", true);
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = xhr.response;
          arr = data;
          console.log("Received data:", data);
          displayCart(arr);
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

function loadCartItems() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/getCartItems", true);
  xhr.responseType = "json";

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

loadCartItems();
removeButton();
PlusAndMinusButton();
