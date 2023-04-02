import React from 'react'
import Button from '../Button/Button';
import {Container, Alert, Form } from 'react-bootstrap';
import {Formik} from 'formik';
import {contactUsSchema} from '../../schemas';
import './ContactUs.css';
import {sendContactUsEmail} from '../../api/';

function ContactUs() {
  const [alert, setAlert] = React.useState(null);

  const handleSubmit = async ({name, email, message}, {resetForm}) => {
    try{
          console.log(`name: ${name}, email: ${email}, message: ${message}`);
          const res = await sendContactUsEmail({name: name, email: email,  message: message});
          resetForm(); // resets to initialValues
          setAlert({variant: 'success', message: res.data});

    }catch(e){
      console.log(e);
      setAlert({variant: 'danger', message: e.message});
    }
  }

  return (
    <Container>      
        <Formik
                validationSchema={contactUsSchema}
                onSubmit={handleSubmit}
                initialValues={{name: '', email: '',message: ''}}
        >
        {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting}) => 
            (
                <>
                {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
                <div className='input_container d-flex flex-column align-items-center mb-5'>
                    <h5>Contact Us</h5>
                    <p className='sub_heading text-muted mb-3' style={{fontSize: '13px'}}>
                        Let us know how we can help!
                    </p>

                    <Form className="input" noValidate onSubmit={handleSubmit}>
                        <Form.Group  className="mb-4">
                            <Form.Control 
                                type="text" 
                                name='name' 
                                value={values.name} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                placeholder="Name*"/>
                            <Form.Control.Feedback className='feedback' type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control 
                                type="email" 
                                name='email' 
                                value={values.email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isInvalid={!!errors.email}
                                isValid={touched.email && !errors.email}
                                placeholder="E-mail*"/>
                            <Form.Control.Feedback className='feedback' type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='message' 
                                value={values.message} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isValid={touched.message && !errors.message}
                                isInvalid={!!errors.message}
                                placeholder="Message*"/>
                            <Form.Control.Feedback className='feedback' type="invalid">{errors.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={isSubmitting} type='submit 'text='Submit'/>
                    </Form>
                </div>
                </>
            )
        }
      </Formik>
    </Container>
  )
}

export default ContactUs

  /* 
  const emailRef = React.useRef('');
  const nameRef = React.useRef('');
  const messageRef = React.useRef('');

  const handleSubmit = async () => {
    const res = await = sendContactUsEmail({
        name: nameRef.current.value, 
        email: emailRef.current.value, 
        message: messageRef.current.value})
  }

  return(
    <>
      <hr className='mb-5' align='center' style={{margin: "auto"}} />
    {alert!==null && 
      <Alert className='text-center' variant={alert.variant}>
        {alert.message}
    </Alert>}
    <div className='input_container d-flex flex-column align-items-center mb-5'>
      <h5>Contact Us</h5>
      <p className='sub_heading text-muted mb-3' style={{fontSize: '13px'}}>
          Let us know how we can help!
      </p>
          <input required ref={nameRef} className="input" type="text" id="name" name="name" placeholder='Name*'/>
          <input required ref={emailRef} className="input" type="email" id="email" name="email" placeholder='Email*'/>
          <textarea required ref={messageRef} className='input' rows="3" placeholder='Message*'></textarea>
          <Button text='Submit' onClickFunc={handleSubmit}/>
    </div> 
    </>
  )*/