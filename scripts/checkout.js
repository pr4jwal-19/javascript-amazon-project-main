import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

Promise.all([

    new Promise((resolve) => {
        loadProducts(() => {
            resolve('Products loaded');
        });
    
    }),
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