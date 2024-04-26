import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct({fetchData}){

    //input states
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ showAdd, setShowAdd ] = useState(false)

    const openAddWindow = () => {

		setShowAdd(true)
	}

	const closeAddWindow = () => {
		setShowAdd(false);
		setName("");
        setDescription("");
        setPrice(0);
	}

    function addProduct(e){

        //prevents submit event's default behavior
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/`, {

            method: 'POST',
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

            //data is the response of the api/server after it's been process as JS object through our res.json() method.
            console.log(data);

            if(data.error === "Product already exists"){
                
                Swal.fire({
                    title: "Product already exists",
                    icon: "error",                    
                    text: data.message
                })

                closeAddWindow();
                fetchData();

            } else if (data.error === "Error in adding product") {

                Swal.fire({
                    title: "Error in adding product",
                    icon: "error",
                    text: data.message

                })

                closeAddWindow();
                fetchData();

            } else {

                Swal.fire({
                    title: "Product Added",
                    icon:"success"                  
                })

                closeAddWindow();
                fetchData();

            }

        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (   
        <>  
            <div className='w-100 d-flex justify-content-center'>
            <Button variant='success' size="sm" onClick={() => openAddWindow()}>Add Product</Button>
            </div>
            

            <Modal className='' show={showAdd} onHide={closeAddWindow} centered>
                <Form onSubmit={e => addProduct(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddWindow}>Close</Button>
                        <Button variant="primary" type="submit">Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
           
        </>
    )
}