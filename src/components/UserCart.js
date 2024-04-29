import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function UserCart({ cart, cartItems }) {
    const [productDetails, setProductDetails] = useState([]);

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

    if (!cart || !cartItems || cartItems.length === 0) {
        return <p>No items in cart</p>;
    }

    // Filter out undefined or null values from cartItems
    const validCartItems = cartItems.filter(item => item);

    return (
        <Row className="mt-3 mb-3 d-block">
            {validCartItems.map((item, index) => (
                <Col key={index}>
                    <Card id={`ProductComponent${index + 1}`}>
                        <Card.Body>
                            <Card.Title>{productDetails[index]?.name}</Card.Title>
                            <Card.Subtitle>Quantity</Card.Subtitle>
                            <Card.Text>{item.quantity}</Card.Text>
                            <Card.Subtitle>Subtotal:</Card.Subtitle>
                            <Card.Text>Php {item.subtotal}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
