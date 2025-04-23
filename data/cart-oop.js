// Its like a Constructor in Java or C#
// It is a function that returns an object
function Cart(localStorageKey) {
    const cart = {
        // We load this dynamically
        cartItems : undefined, // products in the cart
    
        loadCartFromLocalStorage() {
            // this -> reference to the cart object
            this.cartItems = localStorage.getItem(localStorageKey)
            ? JSON.parse(localStorage.getItem(localStorageKey))
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
        },
    
        saveCartToLocalStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(prodId) {
        
            let matchingProduct;
        
            this.cartItems.forEach((cartItem) => {
                // Check if the product is already in the cart
                if (prodId === cartItem.id){
                    matchingProduct = cartItem;
                }
            });
        
            if (matchingProduct) {
                // If the product is already in the cart, we just increase the quantity by 1
                matchingProduct.quantity++;
            }else{
                this.cartItems.push({
                    id: prodId,
                    quantity: 1,
                    deliveryOptionId: '1' // Default delivery option
                });
            }
        
            // Save the cart to local storage
            this.saveCartToLocalStorage();
        },
    
        removeFromCart(prodId) {
            // Create a new array
            const updatedCart = [];
            // Loop through the cart and find the product to remove
            this.cartItems.forEach((cartItem) => {
        
                // If the product ID is not equal to the one to remove, add it to the new array
                if (cartItem.id !== prodId) {
                    // Add each prod except the one to remove to the new array
                    updatedCart.push(cartItem);
                }
            }); 
        
            this.cartItems = updatedCart;
        
            // Save the cart to local storage
            this.saveCartToLocalStorage();
        },
    
        updateDeliveryOption(prodId, deliveryOptionId) {
            let matchingProduct;
        
            this.cartItems.forEach((cartItem) => {
                // Check if the product is already in the cart
                if (prodId === cartItem.id){
                    matchingProduct = cartItem;
                }
            });
        
            matchingProduct.deliveryOptionId = deliveryOptionId;
        
            this.saveCartToLocalStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business-oop'); // Create a new instance of the cart

cart.loadCartFromLocalStorage();

businessCart.loadCartFromLocalStorage();

console.log(cart);
console.log(businessCart);