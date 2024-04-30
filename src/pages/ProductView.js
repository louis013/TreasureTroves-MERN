import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function CourseView() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();
	// useParams hook allows us to retrieve the courseId passed via the URL
	const { productId } = useParams()

    const [ quantity, setQuantity ] = useState(1)
	const [ name, setName ] = useState("");
	const [ description, setDescription] = useState("");
	const [ price, setPrice ] = useState(0);


	useEffect(() => {
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

	}, [productId]);

    

	const addToCart = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
                    productId,
                    quantity: quantity,
                    subtotal: price * quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.message)


			if(data.error === 'Admin is not allowed') {
				Swal.fire({
					title: "Admin enrollment error",
					icon: 'error',
					text: "You are an administrator. You may not enroll to a course."
				})
			} else if (data.message === 'Product added to cart successfully') {
				Swal.fire({
					title: "Successfully Added!",
					icon: 'success',
					text: "You have successfully added this product."
				})
				navigate("/products");

			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: 'error',
					text: "Please try again."
				})				
			}

		})
	}

    const addQuantity = () => {
        setQuantity(increment => increment + 1)
    }
    const subQuantity = () => {
        if(quantity > 1) {
            setQuantity(increment => increment - 1)
        }
    }

	return (
		<Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card className='bg-secondary text-light'>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            { user.id !== null
                            	?
                                <div className='d-flex justify-content-between gap-2'>
                                    <div className='d-flex gap-2'>
                                        <Button variant='light' className='text-secondary' onClick={() => subQuantity()}>-</Button>
                                        <div className='border px-3'>{quantity}</div>
                                        <Button variant='light' className='text-secondary' onClick={() => addQuantity()}>+</Button> 
                                    </div>
                                    <Button variant="light" className='text-secondary' onClick={() => addToCart(productId)}>Add to Cart</Button>
                                </div>
                            	
                            	:
                            	<Link className="btn btn-danger" to="/login">Log in</Link>
                        	}
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>

	)
}