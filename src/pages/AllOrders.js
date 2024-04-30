import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

export default function AllOrders() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (data.allOrders) {
                    const updatedOrders = await Promise.all(data.allOrders.map(async (order) => {
                        const updatedProducts = await Promise.all(order.productsOrdered.map(async (product) => {
                            try {
                                const productResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product.productId}`);
                                const productData = await productResponse.json();
                                return {
                                    ...product,
                                    productName: productData.product ? productData.product.name : "Product Not Found"
                                };
                            } 
                            catch (error) {
                                console.error('Error fetching product details:', error);
                                return {
                                    ...product,
                                    productName: "Product Not Found"
                                };
                            }
                        }));
                        return {
                            ...order,
                            productsOrdered: updatedProducts
                        };
                    }));
                    setOrders(updatedOrders);
                } 
                else {
                    setOrders([]);
                }
            } 
            catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]);
            }
        };

        fetchOrders();
    }, []);

    return (
        (user.isAdmin === true)
        ?
            <div style={{minHeight: "90vh"}} className="d-block justify-content-center align-items-center container">
                {orders.length === 0 ? (
                    <h3 className="text-center">No orders available</h3>
                ) : (
                    <div>
                        <h1 className="text-center">Customers' Orders</h1>
                        {orders.map(order => (
                            <Card key={order._id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>Order ID: {order._id}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
                                    <Card.Text>
                                        Ordered On: {format(new Date(order.orderedOn), 'dd/MM/yyyy')}
                                    </Card.Text>
                                    <ul>
                                        {order.productsOrdered.map((product, index) => (
                                            <li key={index}>
                                                Product Name: {product.productName} <br />
                                                Quantity: {product.quantity} <br />
                                                Subtotal: Php {product.subtotal}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="d-flex justify-content-end">
                                        <p className="fs-4">Total Price: <span className="text-warning">&#8369;{order.totalPrice}</span> </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        :
            <Navigate to="/orders"/>
    )
}