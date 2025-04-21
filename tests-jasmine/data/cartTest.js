import { addToCart, cart, loadCartFromLocalStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("Adds an existing product to the cart", () => {

    // Creating a mock of localStorage.setItem()
    spyOn(localStorage, "setItem");
    // Creating a mock of localStorage.getItem()
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadCartFromLocalStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("Adds a new product to the cart", () => {
    // Creating a mock of localStorage.setItem()
    spyOn(localStorage, "setItem");
    // Creating a mock of localStorage.getItem()
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadCartFromLocalStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
