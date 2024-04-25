import './App.css'
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {

    return(
        <Router>
            <Container fluid>
                <AppNavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element ={<Register />}/>
                </Routes>
            </Container>
        </Router>
    )
}

export default App;