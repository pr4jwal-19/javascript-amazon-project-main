// We load this dynamically
export const cart = [
    
]

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
        });
    }
}