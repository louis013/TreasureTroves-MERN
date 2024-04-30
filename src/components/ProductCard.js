import {Card, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({products}) {

    const { _id, name, description, price } = products;

    return (
        <div className='col-4 p-3'>
                <Card id="productComponent1">
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>Description</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle>Price:</Card.Subtitle>
                        <Card.Text>Php {price}</Card.Text>
                        <Link className="btn btn-primary" to={`${_id}`}>Details</Link>
                    </Card.Body>
                </Card>
        </div>
    )
}