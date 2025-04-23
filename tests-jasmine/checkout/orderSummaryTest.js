import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadCartFromLocalStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  // How the page should look like when the test is run
  it("displays the cart", () => {
    document.querySelector(".js-test-container").innerHTML = `
              <div class="js-order-summary"></div>
          `;

    const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    // Creating a mock of localStorage.getItem()
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: prodId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          id: prodId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadCartFromLocalStorage();

    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    
    expect(
      document.querySelector(`.js-product-quantity-${prodId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${prodId2}`).innerText
    ).toContain('Quantity: 1');

  });
  // How the page should behave when the test is run
});
