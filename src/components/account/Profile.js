import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import {useUser} from '../../context/UserContext';
import {Link} from 'react-router-dom';

function Account() {
    const navigate = useNavigate();
    const {currentUser, logout} = useUser();
    //const {setFlash} = useFlashContext();

    const logoutUser = async () => {
      await logout();
      navigate('/account/login');  
    }

  return (
    <div>
    <Card style={{backgroundColor: "#fbfaee"}}>
        <Card.Body>
            <h2 style={{textAlign: "center"}}>Profile</h2>
            {currentUser && 
            <>
              <h4>Hello {currentUser?.name}!</h4>
              <p><b>Email:</b> {currentUser?.email}</p>
              <p><Link style={{color: "#6c757d"}}  to='/account/purchase-history'>Purchase History</Link></p>
            </>}
            <Button onClick={()=>navigate('/account/update')} style={{width: "auto"}} variant="secondary" type="submit">Update Profile</Button>
        </Card.Body>
    </Card>
    <Button style={{color: "#6c757d"}} onClick={logoutUser} variant="link">Log Out</Button>
    </div>
  )
}

export default Account;
