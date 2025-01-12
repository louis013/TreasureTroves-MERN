import { useState, useEffect, useContext } from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {

	     if(email !== '' && password !== ''){
	         setIsActive(true);
	     }else{
	         setIsActive(false);
	     }

	 }, [email, password]);

	function authenticate(e) {

	    e.preventDefault();
	    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
	    method: 'POST',
	    headers: {
	        "Content-Type": "application/json"
	    },
	    body: JSON.stringify({
	
	        email: email,
	        password: password
	
	    })
	})
	.then(res => res.json())
	.then(data => {

		console.log(data.access)

	    if(data.access){
	    	localStorage.setItem('token', data.access);
	    	retrieveUserDetails(data.access)
	    	Swal.fire({
	    		title: "Login Successful",
	    		icon: "success",
	    		text: `Welcome user`
	    	})

	    } else if (data.error === "No Email Found") {

	    	Swal.fire({
	    		title: "Email not found",
	    		icon: "error",
	    		text: "Check your email and try again."
	    	})

	    } else {

	    	Swal.fire({
	    		title: "Authentication Failed",
	    		icon: "error",
	    		text: "Check your login credentials and try again."
	    	})
	    }
	})
	setEmail('');
	setPassword('');
	}

	const retrieveUserDetails = (token) => {

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
			})
		})
	}

    return (

		(user.id !== null)
		?
			<Navigate to="/products"/>
		: 
			<div className='min-vh-100 d-flex justify-content-center align-items-center'>
				<Form className='border w-50 p-4' onSubmit={(e) => authenticate(e)}>
					<h1 className='my-3 text-center'>Login</h1>
					<Form.Group className="mb-3" controlId="formGroupEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control 
						type="email" 
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formGroupPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control 
						type="password" 
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
					</Form.Group>
					{ isActive ? 
					<Button className='w-100' variant="dark" type="submit" id="submitBtn">
						Submit
					</Button>
					: 
					<Button className='w-100' variant="dark" type="submit" id="submitBtn" disabled>
						Submit
					</Button>
					}
				</Form>   
			</div>
    )   
}