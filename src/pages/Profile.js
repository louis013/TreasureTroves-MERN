import { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

export default function Profile() {

    const { user } = useContext(UserContext);

    const [ details, setDetails ] = useState([]);

    // const handleUpdateProfile = (updateData) => {
    //     setDetails(prevDetails => ({
    //         ...prevDetails,
    //         ...updateData
    //     }))
    // }

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(data.user._id) {
                setDetails(data.user);
            }

            else if(data.error === "User not found") {
                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            }
            else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                });
            }
        });
    }, [])

    return (
        (user.id === null)
        ?
        <Navigate to="/products" />
        :
        <>
        <Container>
            <Row>
                    <Col>
                        <h1 className="mt-5 mb-3 ">Profile</h1>
                        <img src="/profile.png" alt="" width={'200px'} height={'auto'} className="border border-3 border-dark" />
                        <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                        <hr />
                        <h4>Contacts</h4>
                        <ul>
                            <li>Email: {details.email}</li>
                            <li>Mobile No: {details.mobileNo}</li>
                        </ul>
                    </Col>
                </Row>
        </Container>
            
        </>
    )
}