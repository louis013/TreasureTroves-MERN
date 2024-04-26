import {Card, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({products}) {

    const { _id, name, description, price } = products;

    return (
        <Row className="mt-3 mb-3">
            <Col>
                <Card id="productComponent1">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Description</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>Php {price}</Card.Text>
                    <Link className="btn btn-primary">Details</Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}