import { Provider } from 'react-redux';
import { store } from './app/store';

import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./features/Home/Home";
import Login from "./features/login/Login";
import Cart from './features/cart/Cart';
import Admin from './features/admin/Admin';
import Logout from './features/login/Logout';
import "./index.css"
import MyOrders from './features/MyOrders/MyOrders';
import Departments from './features/Home/Departments';
import Checkout from './features/cart/Checkout';
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="admin" element={<Admin />} />
            <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="cart" element={<Cart />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path="departments" element={<Departments />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
const container = document.getElementById('root')!;
const root = createRoot(container)
root.render(<App />);





