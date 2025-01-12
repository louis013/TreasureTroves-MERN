import './App.css'
import {Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider } from './UserContext';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Error from './pages/Error';
import ProductView from './pages/ProductView'
import Order from './pages/Order';
import AllOrders from './pages/AllOrders';
import Profile from './pages/Profile';

function App() {

    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    })

    const unsetUser = () => {
        localStorage.clear();
    }

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.user) {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                })
            }
            else {
                setUser({
                    id: null,
                    isAdmin: null
                })
            }
        })
    }, [])

    return(
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <Container fluid>
                    <AppNavBar />
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/all-orders" element={<AllOrders />} />
                        <Route path="/products/:productId" element={<ProductView />} />
                        <Route path="/register" element ={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/logout" element={<Logout />}/>
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;