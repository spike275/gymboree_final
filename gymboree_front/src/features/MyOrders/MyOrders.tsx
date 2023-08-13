import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { Order } from '../../models/myOrders'
import Product from '../../models/Product'
import { selectOrders, userOrdersAsync } from './myOrdersSlice'

/**
 * Represents the component responsible for displaying the user's orders.
 */
const MyOrders = () => {
  // Fetch orders from Redux store
  const orders = useSelector(selectOrders)

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order: Order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>User: {order.user}</p>
          <ul>
            {order.orderItems.map((product: Product,i) => (
              <li key={i}>
                {/* <Product product={product} /> */}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                {/*  */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
