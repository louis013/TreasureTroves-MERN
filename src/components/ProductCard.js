import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({products}) {

    const { _id, name, description, price } = products;

    return (
        <div className='col-4 p-3'>
                <Card id="productComponent1" style={{minHeight:"20rem"}} className='bg-secondary text-light'>
                    <Card.Body className='d-flex flex-column justify-content-between'>
                        <div>
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle className='pt-2'>Description</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>Php {price}</Card.Text>
                        </div>
                        <Link className="btn btn-light text-secondary align-self-end" to={`${_id}`}>Details</Link>
                    </Card.Body>
                </Card>
        </div>
    )
}