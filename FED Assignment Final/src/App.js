import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';

const App = () => {
    return (

        <Router>
            <Navbar className="text-center mt- mb-4" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home">
                        Countries of the World
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container bg="dark" variant="dark">

                <Row >
                    <Col>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/country/:name' element={<SingleCountry />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};

export default App;