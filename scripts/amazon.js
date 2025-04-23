// .. operator is used to go up one directory level
import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './util/money.js';

// JSON data for products
// This data is used to populate the product cards on the Amazon clone page

// const cart = []; -> naming conflict with the cart.js file

let productsHTML = '';

// products -> is an array from the products.json file
// Creating some HTML elements dynamically for each product
products.forEach((product) => {
  productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img
                    class="product-image"
                    src="${product.image}"
                    alt="Black and Gray Athletic Cotton Socks - 6 Pairs"
                    />
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img
                    class="product-rating-stars"
                    src="${product.getStarsUrl()}"
                    alt="Rating 4.5"
                    />
                    <div class="product-rating-count link-primary">${product.rating.count}</div>
                </div>

                <div class="product-price">${product.getPrice()}</div>

                <div class="product-quantity-container">
                    <select title="Select quantity">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png" alt="Checkmark Icon" />
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                    data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
    `;
   
});

// Selecting the products grid element and setting its inner HTML to the generated product cards
// Populating the products grid with the generated HTML
document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

// Manages the cart quantity in the header - webpage operator
function updateCartQuantity() {
    let cartQuantity = 0;

    // Update the cart count in the header
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

// Adding event listeners to the "Add to Cart" buttons - webpage operator
document.querySelectorAll('.js-add-to-cart')
    .forEach((btn) => {
        btn.addEventListener('click', () => {
            // We just accessed the data attribute of the button which gets the product name
            // data-product-name is converted to camel case as productName
            const prodId = btn.dataset.productId;
            addToCart(prodId);
            updateCartQuantity();
        });
    });