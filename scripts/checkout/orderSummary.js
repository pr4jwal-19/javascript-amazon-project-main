import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../util/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  // We load the cart dynamically
  cart.forEach((cartItem) => {
    // Find the product in the products array that matches the cart item ID
    const prodId = cartItem.id;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === prodId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
        <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">

            <div class="delivery-date">
                Delivery date: ${deliveryDateFormatted}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}" 
                    alt="Black and Gray Athletic Cotton Socks - 6 Pairs">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${
                              cartItem.quantity
                            }</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                          matchingProduct.id
                        }">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
         </div>   
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const deliveryDateFormatted = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option" 
            data-product-id="${matchingProduct.id}" data-delivery-option-id="${
        deliveryOption.id
      }">
            <input type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" />
            <div>
                <div class="delivery-option-date">
                    ${deliveryDateFormatted}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
            </div>
        </div>
        `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      // Remove the product from the cart
      const prodId = deleteLink.dataset.productId;
      removeFromCart(prodId);
      // Remove the product from the page
      const cartContainerHTML = document.querySelector(
        `.js-cart-item-container-${prodId}`
      );
      cartContainerHTML.remove();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((elem) => {
    elem.addEventListener("click", () => {
      const { productId, deliveryOptionId } = elem.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

