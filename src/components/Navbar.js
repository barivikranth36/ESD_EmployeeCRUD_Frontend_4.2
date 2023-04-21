import { Button } from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const registerEmployee =()=>{

  }
  return (
    <>
      <div className='row'>
      <div className='col'>
      <Navbar bg="dark" variant="dark">
        
        {/* <Container> */}
          <Navbar.Brand href="#home">Employee Portal</Navbar.Brand>
          {/* <Nav className="me-auto">
          </Nav> */}
        {/* </Container> */}
      </Navbar>
      </div>
      
      </div>
    </>
  );
}

export default NavBar;