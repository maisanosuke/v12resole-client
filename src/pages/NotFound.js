import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Container} from 'react-bootstrap'

function NotFound() {
    const navigate = useNavigate();

    React.useEffect(()=>{
        setTimeout(()=>navigate('/'), 3000);
    }, [])
  return (
      <Container className='mt-5'>
        <h1>
        Page Not Found
        </h1>
    </Container>
  )
}

export default NotFound
