import Product from "./Product"

/**
 * Interface representing an individual order containing order items.
 */
export interface Order {
    //The unique identifier of the order.
    id: number
    //An array of products representing the items in the order.
    orderItems: Product[]
    //The username of the user who placed the order.
    user: string
}

/**
 * Interface representing a collection of user orders and products ordered.
 */
export default interface MyOrders {
    //An array of order objects.
    orders: Order[]
    //An array of product IDs representing the products ordered.
    productsOrderd:number[]
}
