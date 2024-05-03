import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditCourse({ product, fetchData }) {

	// States
	const [ productId, setProductId ] = useState("");
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0);
	// state for edit course modal to open/close
	const [ showEdit, setShowEdit ] = useState(false);

	// function for opening the modal
	const openEdit = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`,{
            method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
        })
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

		setShowEdit(true);
	}

	// function for closing the modal
	const closeEdit = () => {
		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);
	}

	// function to update the course
	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Product updated successfully") {
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Product successfully updated!"
				})
				closeEdit();
				fetchData();
			} else {
				Swal.fire({
					title: "Error!",
					icon: "error",
					text: "Please try again"
				})
				closeEdit();
				fetchData();
			}
		})
	}

	return (
		<>
			<Button variant="dark" size="sm" onClick={() => openEdit(product)}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
			        	<Modal.Title>Edit Product</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<Form.Group className="mb-3">
			        	        <Form.Label>Name</Form.Label>
			        	        <Form.Control 
			        	        	type="text" 
			        	        	required
			        	        	value={name}
			        	        	onChange={e => setName(e.target.value)}
			        	        />
		        	    </Form.Group>
	    	        	<Form.Group className="mb-3">
	    	        	        <Form.Label>Description</Form.Label>
	    	        	        <Form.Control 
	    	        	        	as="textarea"
	    	        	        	rows={5}
	    	        	        	required
	    	        	        	value={description}
	    	        	        	onChange={e => setDescription(e.target.value)}
	    	        	        />
	            	    </Form.Group>
	    	        	<Form.Group className="mb-3">
	    	        	        <Form.Label>Price</Form.Label>
	    	        	        <Form.Control 
	    	        	        	type="number" 
	    	        	        	required
	    	        	        	value={price}
	    	        	        	onChange={e => setPrice(e.target.value)}
	    	        	        />
	            	    </Form.Group>
			        </Modal.Body>
			        <Modal.Footer>
	                  	<Button variant="secondary" onClick={closeEdit}>Close</Button>
	                  	<Button variant="warning" type="submit">Submit</Button>
	                </Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}