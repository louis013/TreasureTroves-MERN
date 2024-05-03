import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

export default function Order() {
    const { user } = useContext(UserContext);
    const [order, setOrder] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
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
    
        const fetchProductDetails = async () => {
            const promises = cartItems.map(item =>
                fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${item.productId}`)
                    .then(res => res.json())
                    .then(data => data.product)
            );
    
            const products = await Promise.all(promises);
            setProductDetails(products);
        };
    
        fetchProductDetails();
    }, [cartItems]);

    if (!order || !cartItems || cartItems.length === 0) {
        return <h3 className="text-center pt-5 text-warning">Please place an order first</h3>;
    }

    const validCartItems = cartItems.filter(item => item);

    return (
        <div style={{minHeight: "90vh"}} className="d-flex justify-content-center align-items-center">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>My Order</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
                    <Card.Text>
                    We received your order {order._id} on {format(order.orderedOn, 'dd/MM/yyyy')}
                    </Card.Text>
                    <ul>
                        {validCartItems.map((item, index) => (
                            <li id={`ProductComponent${index + 1}`}>
                                Product Name: {productDetails[index]?.name} <br />
                                Quantity: {item.quantity} <br />
                                Subtotal: Php {item.subtotal}
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex justify-content-end">
                        <p className="fs-4">Total Price: <span className="text-warning">&#8369;{order.totalPrice}</span> </p>
                    </div>
                    
                </Card.Body>
            </Card>
        </div>
    )
}