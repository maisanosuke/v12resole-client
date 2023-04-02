import React from 'react'
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Sidebar() {
  return (
      
    <div style={{marginTop: "50px", textAlign: "left"}}>
        <p style={{width: '200px'}}><b>Browse by Category</b></p>
        <Nav style={{fontWeight: '500'}} defaultActiveKey="/shop" className="flex-column">
            <Nav.Link as={Link} to="/shop?category=repair" style={{ padding: '0', color: '#4d4d4d'}}>Repair Service</Nav.Link>
            <Nav.Link as={Link} to="/shop?category=chalkbags" style={{padding: '1em 0', color: '#4d4d4d'}}>Chalk Bags</Nav.Link>
        </Nav>
    </div>
  )
}

export default Sidebar
