import React from 'react'
import {Container} from 'react-bootstrap';

function OrderCancelled() {
  return (
    <Container className='mt-5'>
    <h1>Sorry, We couldn't process your payment</h1>
    <p>Please try again later or use different payment. If problem persist please contact us.</p>
      
    </Container>
  )
}

export default OrderCancelled
