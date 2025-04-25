import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// async returns a promise
// async functions wraps the code into a Promise
async function loadPage() {
  console.log("Loading page...");

  await loadProductsFetch(); // like -> loadProductsFetch().then(() => {})
  const message = await new Promise((resolve) => {
    loadCart(() => {
      resolve("Cart loaded");
    });
  });

  console.log(message); // Cart loaded
  renderOrderSummary();
  renderPaymentSummary();
  
  return "200 OK";
}
loadPage().then((value) => {
  console.log("Page loaded");
  console.log(value); // 200 OK
});

/* This is the old way of loading the page using promises
function loadPage() {
    return new Promise((resolve) => {
        console.log('Loading page...');
        resolve('Page loaded');
    });
}
*/

// Promises and fetch
/*
Promise.all([

    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('Cart loaded');
        })
    })

]).then((values) => {
    console.log(values); // Products loaded
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// resolve -> similar to the done() function
// lets us control when to go to the next step
new Promise((resolve) => {
    loadProducts(() => {
        resolve('Products loaded');
    });

}).then((value) => {
    // load products and then load cart
    console.log(value); // Products loaded
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    });

}).then(() => {
    // finally render the order summary and payment summary
    // after the cart is loaded
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// Callbacks method
// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
