import React from 'react'
import {Navbar as NavbarBS, Nav, Offcanvas, NavLink} from 'react-bootstrap';

function NavbarOffcanvas() {

    const [show, setShow] = React.useState(false);
    const toggleOffCanvas = () => setShow(show => !show);
    const handleClose = () => setShow(false);

  return (
      <>
        <NavbarBS.Toggle onClick={toggleOffCanvas} aria-controls="offcanvasNavbar-expand" className="me-auto" />
        <NavbarBS.Offcanvas show={show} onHide={handleClose} bg="light" id="offcanvasNavbar-expand" placement="end" className="me-auto">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbar-expand"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav style={{fontWeight: '600'}} className='align-items-center'>
                    <Nav.Link onClick={handleClose} as={NavLink} to='/' className='me-2'>Home</Nav.Link>
                    <Nav.Link onClick={handleClose} as={NavLink}  to="/how-it-works" className='me-2'>How&nbsp;it&nbsp;works</Nav.Link>
                    <Nav.Link onClick={handleClose} as={NavLink}  to="/about" className='me-2'>About</Nav.Link>
                    <Nav.Link onClick={handleClose} as={NavLink}  to="/shop" className='me-2'>Shop</Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </NavbarBS.Offcanvas>
    </>
  )
}

export default NavbarOffcanvas
