import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UserCart({ cart, cartItems, fetchData }) {
    const [productDetails, setProductDetails] = useState([]);

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

    if (!cart || !cartItems || cartItems.length === 0) {
        return <h2 className='text-center my-5 text-warning'>No items in cart</h2>;
    }

    // Filter out undefined or null values from cartItems
    const validCartItems = cartItems.filter(item => item);

    const removeItemCart = async (itemId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${itemId}/remove-from-cart`,{
            method:'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === 'Product removed from cart') {
                Swal.fire({
                    title: "Product removed from cart",
					icon: 'success',
					text: "Product has been removed from your cart"
                })
                fetchData();
            }
            else {
                Swal.fire({
                    title: "Something went wrong",
					icon: 'error',
					text: "Try again"
                })
            }
        })
    }

    return (
        <Row className="mt-3 mb-3 d-block">
            {validCartItems.map((item, index) => (
                <Col key={index}>
                    <Card id={`ProductComponent${index + 1}`} className='mb-3'>
                        <Card.Body className='d-flex flex-column'>
                            <Card.Title className='mb-3'>{productDetails[index]?.name}</Card.Title>
                            <Card.Subtitle className='mb-3'>Quantity: {item.quantity}</Card.Subtitle>
                            <Card.Subtitle>Subtotal:</Card.Subtitle>
                            <Card.Text>Php {item.subtotal}</Card.Text>
                            <Button className='align-self-end' variant="warning" onClick={() => removeItemCart(item.productId)}>Remove Item</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
