import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
// import { UserProvider } from './UserContext';
import Login from './pages/Login'
function App() {
  return (
    <Router>
            <Container fluid>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </Container>
        </Router>
  );
}

export default App;
