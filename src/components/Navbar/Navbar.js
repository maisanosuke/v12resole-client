import React from 'react'
import {Nav, Navbar as NavbarBS, Container, Offcanvas} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useShoppingCart } from '../../context/ShoppingCartContext';
import NavbarOffcanvas from './NavbarOffcanvas';
import './Navbar.css';

function Navbar() {
    const {cartQty} = useShoppingCart(); 
    const navigate = useNavigate();

    const [show, setShow] = React.useState(false);
    const toggleOffCanvas = () => setShow(show => !show);
    const handleClose = () => setShow(false);

  return (
    <NavbarBS className="shadow-sm" expand='lg'>
        <Container className="flexContainer">
            <div className="flexItems">
            <NavbarBS.Toggle onClick={toggleOffCanvas} aria-controls="offcanvasNavbar-expand" className="me-auto" />
            <NavbarBS.Offcanvas show={show} onHide={handleClose} bg="light" id="offcanvasNavbar-expand" placement="end" className="me-auto">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbar-expand"></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav style={{fontWeight: '800'}} className='navElements align-items-center'>
                        <Nav.Link onClick={handleClose} as={NavLink} to='/' className='navElement'>Home</Nav.Link>
                        <Nav.Link onClick={handleClose} as={NavLink}  to="/how-it-works" className='navElement me-2'>How&nbsp;it&nbsp;works</Nav.Link>
                        <Nav.Link onClick={handleClose} as={NavLink}  to="/about" className='navElement me-2'>About</Nav.Link>
                        <Nav.Link onClick={handleClose} as={NavLink}  to="/shop" className='navElement me-2'>Shop</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </NavbarBS.Offcanvas>
            </div>
            <NavbarBS.Brand className="flexItems" href="/"> 
                <img as={NavLink} src="/imgs/logo/V12ResoleLogo.jpg" width='65' height='auto'/>
            </NavbarBS.Brand>
            <div className="flexItems">
                <MdOutlineAccountCircle className="icon ms-auto me-2" onClick={()=>navigate('/account/profile')}/>
                <HiOutlineShoppingBag className="icon" onClick={()=>navigate('/cart')}/>
                {cartQty > 0 && <div className="rounded-circle bg-secondary d-flex align-self-center" onClick={()=>navigate('/cart')}>
                    <span>{cartQty}</span>
                </div>}
            </div>
        </Container>
    </NavbarBS>
  )
}

export default Navbar

