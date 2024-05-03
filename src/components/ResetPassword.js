import { useEffect, useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ showAdd, setShowAdd ] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(password !== null || confirmPassword !== null) {
            if(password === confirmPassword){
                setIsActive(true);
            }
            else {
                setIsActive(false);
            }
        }
        else {
            setIsActive(false);
        }
    },[password, confirmPassword])
    

    const openAddWindow = () => {

		setShowAdd(true)
	}

    const closeAddWindow = () => {
		setShowAdd(false);
		setPassword('');
        setConfirmPassword('');
	}

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                body: JSON.stringify({ newPassword: password }),
            });

            if(response.ok) {
                Swal.fire({
                    title: "Password reset success!",
                    icon: "success",
                    text: "Password has been reset",
                    willClose: () => {
                        closeAddWindow();
                    }
                })
            }
            else {
                Swal.fire({
                    title: "Password Reset Fail!",
                    icon: "error",
                    text: "Reseting password failed. Try again"
                })
            }
        }
        catch(error) {
            Swal.fire({
                title: "Something went wrong",
                icon: "error",
                text: "Error, contact us for help."
            })
        }
    };

    return (
        <>
            <Button variant='dark' size="sm" onClick={() => openAddWindow()}>Reset Password</Button>

            <Modal className='' show={showAdd} onHide={closeAddWindow} centered>
                <Form onSubmit={e => handleResetPassword(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="New Password" required value={password} onChange={e => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddWindow}>Close</Button>
                        {
                            (isActive === true)
                            ?
                            <Button variant="warning" type="submit">Confirm</Button>
                            :
                            <Button variant="warning" type="submit" disabled>Confirm</Button>
                        }

                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}