import React from 'react'
import {Container} from 'react-bootstrap'
import { AiOutlinePhone } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'

{/* <footer class="footer bg-dark py-3 mt-auto">
    <div class="container">
        <span class="text-muted">&copy; YelpCamp 2021</span>
    </div>
</footer> */}

function Footer() {
  return (
    <Container className='mt-5 w-100 text-muted mb-3'>
        <hr align='center' style={{margin: "auto"}} />
        <div className='d-flex mt-4 justify-content-between mb-5'>
            <div>&copy; 2023 V12 Resole</div>
            <div>
                <div><AiOutlinePhone /> (123) 456-7891</div>
                <div><AiOutlineMail /> admin@v12resole.com</div>
            </div>
        </div>
    </Container>
  )
}

export default Footer