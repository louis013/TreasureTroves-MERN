import {Card, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserCart({cart, cartItems}) {

    if (!cart || cart.length === 0) {
        return <p>No items in cart</p>;
    }

    return (
        <Row className="mt-3 mb-3">
            {cartItems.map((item, index) => (
                <Col key={index}>
                    <Card id={`ProductComponent${index + 1}`}>
                        <Card.Body>
                            <Card.Title className='mb-3'>{item.productId}</Card.Title>
                            <Card.Subtitle className='mb-3'>Quantity: {item.quantity}</Card.Subtitle>
                            <Card.Subtitle>Subtotal:</Card.Subtitle>
                            <Card.Text>Php {item.subtotal}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )

}