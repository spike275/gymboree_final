import Product from "./Product"

/**
 * Interface representing a cart containing a list of products.
 */
export interface Cart {
    //An array of products added to the cart.
    products: Product[],
}
