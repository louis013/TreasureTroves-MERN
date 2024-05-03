import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
        <Container fluid>
        <Navbar.Brand as={Link} to="/">SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>

                    {(user.id !== null)
                        ?
                            (user.isAdmin === true)
                            ?
                            <>
                                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                                <Nav.Link as={NavLink} to="/all-orders">Orders</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                                <Nav.Link as={NavLink} to="/cart">MyCart</Nav.Link>
                                <Nav.Link as={NavLink} to="/orders">MyOrders</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                            </>
                        :
                        <>
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </>
                        
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}