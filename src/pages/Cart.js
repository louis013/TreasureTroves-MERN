import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import UserCart from "../components/UserCart";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

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
                // console.log(cartItems)
            }
            else {
                setCart([])
                setCartItems([]);
            }
        })
    }, [user])

    const createOrder = () => {
        fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === 'Order placed successfully.') {
                Swal.fire({
                    title: "Successfully Ordered",
					icon: 'success',
					text: "You have successfully ordered the products."
                })
                navigate("/orders");
            }
            else {
                Swal.fire({
					title: "Something went wrong",
					icon: 'error',
					text: "Please try again."
				})			
            }
        })
    }

    return (
        <>
            <h1 className="text-center">My Cart</h1>
            <UserCart cart={cart} cartItems={cartItems}/>
            <h4>Total Price: &#8369;{cart.totalPrice}</h4>
            <Button variant="primary" onClick={createOrder}>Place Order</Button>
        </>
    )
}