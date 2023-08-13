import Product from "./Product";

/**
 * Interface representing a collection of products and their categories.
 */
export default interface Products {
    //An array containing product objects.
    products: any
    //An array of category names associated with the products.
    categories:string[]
}
