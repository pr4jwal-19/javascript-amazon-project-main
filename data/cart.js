// We load this dynamically
export let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(prodId) {
    
    let matchingProduct;

    cart.forEach((cartItem) => {
        // Check if the product is already in the cart
        if (prodId === cartItem.id){
            matchingProduct = cartItem;
        }
    });

    if (matchingProduct) {
        // If the product is already in the cart, we just increase the quantity by 1
        matchingProduct.quantity++;
    }else{
        cart.push({
            id: prodId,
            quantity: 1,
            deliveryOptionId: '1' // Default delivery option
        });
    }

    // Save the cart to local storage
    saveCartToLocalStorage();
}

export function removeFromCart(prodId) {
    // Create a new array
    const updatedCart = [];
    // Loop through the cart and find the product to remove
    cart.forEach((cartItem) => {

        // If the product ID is not equal to the one to remove, add it to the new array
        if (cartItem.id !== prodId) {
            // Add each prod except the one to remove to the new array
            updatedCart.push(cartItem);
        }
    }); 

    cart = updatedCart;

    // Save the cart to local storage
    saveCartToLocalStorage();
}

export function updateDeliveryOption(prodId, deliveryOptionId) {
    let matchingProduct;

    cart.forEach((cartItem) => {
        // Check if the product is already in the cart
        if (prodId === cartItem.id){
            matchingProduct = cartItem;
        }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;

    saveCartToLocalStorage();
}