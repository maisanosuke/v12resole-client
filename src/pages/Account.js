import React from 'react'
import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';

function Account() {
  return (
    <Container className="d-flex mt-5 justify-content-center" style={{minHeight: "100vh"}}>
        <div style={{textAlign: "center", minWidth: '350px'}}>
        <Outlet />
        </div>
    </Container>
  )
}

export default Account
