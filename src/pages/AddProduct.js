import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

    // const navigate = useNavigate();

    // const { user } = useContext(UserContext);

    //input states
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);

    function addProduct(e){

        //prevents submit event's default behavior
        e.preventDefault();

        let token = localStorage.getItem('token');

        fetch(`http://localhost:4006/b6/products/`, {

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

            } else if (data.error === "Error in adding product") {

                Swal.fire({
                    title: "Error in adding product",
                    icon: "error",
                    text: data.message

                })

            } else {

                Swal.fire({
                    title: "Product Added",
                    icon:"success"                  
                })

                // navigate("/courses");
            }

        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (

            // (user.isAdmin)
            // ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => addProduct(e)}>
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
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
            // :
            // <Navigate to="/" />

    )


}