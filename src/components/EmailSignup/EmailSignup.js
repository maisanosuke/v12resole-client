import React from 'react'
import Button from '../Button/Button';
import {Container, Alert} from 'react-bootstrap';
import './EmailSignup.css';
import {sendPostEmailSignup} from '../../api/index';

function EmailSignup() {

  const emailRef = React.useRef('');
  const [alert, setAlert] = React.useState(null);

  const handleSignUp = async () => {
    console.log(emailRef.current.value);
    try{
      const res = await sendPostEmailSignup({email: emailRef.current.value});
      console.log('res from server: ', res);
      emailRef.current.value = '';
      setAlert({variant: 'success', message: res.data});
    }catch(e){
      console.log(e);
      setAlert({variant: 'danger', message: e.message});
    } 
  }

  return (
    <Container>
      <hr className='mb-5' align='center' style={{margin: "auto"}} />
      {alert!==null && 
        <Alert className='text-center' variant={alert.variant}>
          {alert.message}
      </Alert>}
      <div className='d-flex flex-column align-items-center'>
      <h5>Sign up for our emails</h5>
      <p className='text-muted mb-3' style={{fontSize: '13px'}}>Newsletters, offers, events & more</p>
      <div className='email_container'>
        <input ref={emailRef} className="email_input" type="email" id="email" name="email" placeholder='Email'/>
        <Button text='Sign me up!' onClickFunc={handleSignUp}/>
      </div>
      </div>
    </Container>
  )
}

export default EmailSignup
