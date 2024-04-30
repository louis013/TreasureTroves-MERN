import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Register() {

    const { user } = useContext(UserContext);

    // States to store values from input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {

            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword])

    function registerUser(e) {
        
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {

            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.message === "Registered Successfully") {
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: "Register Successfull",
                    icon: "success",
                    text: "User registered successfully"
                })
            }

            else if(data.message === "Email already taken"){
                Swal.fire({
                    title: "Registered Failed",
                    icon: "error",
                    text: "Email already exists"
                })
            }

            else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again"
                })
            }
         })
    }

    return (

        (user.id !== null)
        ?
            <Navigate to="/products"/>
        :
            <div className='my-5 min-vh-100 d-flex justify-content-center align-items-center'>
                <Form className='border w-50 p-4' onSubmit={(e) => registerUser(e)}>
                    <h1 className="text-center">Register</h1>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter First Name" 
                            required
                            value={firstName}
                            onChange={e => {setFirstName(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Last Name" 
                            required
                            value={lastName}
                            onChange={e => {setLastName(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email"
                            required 
                            value={email}
                            onChange={e => {setEmail(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobileNo">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter 11 Digit No."
                            required
                            value={mobileNo}
                            onChange={e => {setMobileNo(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Pasword</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={e => {setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={e => {setConfirmPassword(e.target.value)}}
                        />
                    </Form.Group>
                    {
                        isActive
                        ?
                        <Button variant="primary" type="submit" className="w-100">Submit</Button>
                        :
                        <Button variant="danger" type="submit" className="w-100" disabled>Submit</Button>
                    }
                </Form>
            </div>
    )
}