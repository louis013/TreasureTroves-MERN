import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import UserCart from "../components/UserCart";

export default function Cart() {

    const { user } = useContext(UserContext);

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.orders) {
                setCart(data.orders);
                setCartItems(data.orders.cartItems)
                console.log(cartItems)
            }
            else {
                setCart([])
            }
        })
    }, [user])

    return (
        <>
            <h1 className="text-center">My Cart</h1>
            <UserCart cart={cart} cartItems={cartItems}/>
            <h3>Total Price: {cart.totalPrice}</h3>
        </>
    )
}