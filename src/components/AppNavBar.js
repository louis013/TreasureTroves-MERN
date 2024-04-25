import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

export default function AppNavBar() {

    return (
        <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand as={Link} to="/">SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}