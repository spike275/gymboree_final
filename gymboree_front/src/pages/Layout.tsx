import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../app/hooks";
import { getAllProductsAsync } from "../features/Home/manyProductsSlice";
import { load_user, logoutAsync, refreshAsync, selectUser } from "../features/login/loginSlice";
import "./layout.css"
import jwt_decode from "jwt-decode"
import { getReviewsAsync } from "../features/review/reviewSlice";
import { userOrdersAsync } from "../features/MyOrders/myOrdersSlice";
import SearchBar from "./SearchBar";

const Layout = () => {

    const currentUser: string = useSelector(selectUser)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getAllProductsAsync())
        dispatch(getReviewsAsync())
        dispatch(userOrdersAsync())
    }, [])

    //  refreshes users tokens - 
    useEffect(() => {
        const token = localStorage.getItem('axx')
        const refresh = localStorage.getItem('refresh')

        if (token) {
            const decodedToken: any = jwt_decode(token);
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = decodedToken.exp - now;

            // check if token is about to expire within next 60 minutes
            if (expiresIn <= 3600 && expiresIn > 0) { // check if token is about to expire or has already expired
                dispatch(refreshAsync(refresh));
            } else if (expiresIn <= 0) { // check if token has already expired
                dispatch(logoutAsync(token)); // dispatch a logout action to clear the expired token and log the user out
            } else {
                dispatch(load_user(decodedToken));
            }
        }
    }, [])


    return (
        <>
            <div style={{}}>
                <ToastContainer />

                <nav className="navigator">
                    <Link className="navBarLink mainLogo" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                        </svg>
                        Welcome to "GymboRee"
                    </Link>
                    <Link className="navBarLink" to="/departments">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                        </svg>
                        categories</Link>
                    <SearchBar />
                    <div className=" dropDownBtn navBarLink">
                        <Link className="navBarLink" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            </svg>
                            {currentUser ? " Hi " + currentUser : "Account"}
                        </Link>
                        {currentUser && <div className="dropContent">
                            <Link className="myacount" to="/myorders">My Orders</Link>
                            <br /><br />
                            <Link className="myacount" to="/logout">Logout</Link>
                        </div>}
                    </div>
                    <Link className="navBarLink" to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        </svg>
                        MyCart</Link>
                </nav>
                <br />

                <Outlet />
            </div>
        </>
    )
};

export default Layout;
