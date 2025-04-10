// We load this dynamically
export const cart = [
    {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }
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