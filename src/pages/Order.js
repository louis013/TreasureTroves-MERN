import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"

export default function Order() {
    const { user } = useContext(UserContext);
    const [order, setOrder] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.userOrder) {
                setOrder(data.userOrder);
                setCartItems(data.userOrder.productsOrdered);
            } else {
                setOrder([]);
                setCartItems([]);
            }
        })
    }, [user])

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) return;
        
        cartItems.forEach((item, index) => {
            fetch(`${process.env.REACT_APP_API_URL}/products/${item.productId}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setProductDetails(prevState => [...prevState, data.product]);
                });
        });
    }, [cartItems]);

    if (!order || !cartItems || cartItems.length === 0) {
        return <p>You have not yet placed an order yet.</p>;
    }

    const validCartItems = cartItems.filter(item => item);

    return (
        <>
            <h1 className="text-center">My Orders</h1>
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Ordered on: {order.orderedOn}</p>
            <h4>Products Ordered</h4>
            <ul>
                {validCartItems.map((item, index) => (
                    <li id={`ProductComponent${index + 1}`}>
                        Product Name: {productDetails[index]?.name} <br />
                        Quantity: {item.quantity} <br />
                        Subtotal: Php {item.subtotal}
                    </li>
                ))}
            </ul>
            <h3>Total Price: &#8369;{order.totalPrice}</h3>
        </>
    )
}