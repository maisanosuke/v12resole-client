import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import {passwordSchema} from '../../schemas';
import {useFormik} from 'formik'
//import {useUserContext} from '../context/AuthContext';


function ForgotPassword() {
    //const {sendForgotPasswordEmail} = useUserContext();
    
    const resetPassword = async (values, actions) => {
        console.log("user email ", values.email);
        // try{
        //     await sendForgotPasswordEmail(emailRef.current.value);
        //     setFlash({variant: "success", message: "Check your inbox to reset your password!"});
        //     // The link was successfully sent. Inform the user.
        //     // Save the email locally so you don't need to ask the user for it again
        //     // if they open the link on the same device.
        // }catch(e){
        //     setFlash({variant: "danger", message: e.code});
        // }
    }

    const {handleChange, handleSubmit, handleBlur, errors, values, touched} = useFormik({
        initialValues: {email: ''},
        validationSchema: passwordSchema,
        onSubmit: resetPassword
    })

  return (
    <div style={{maxWidth: '400px'}}>
        <Card style={{backgroundColor: "#fbfaee"}}>
            <Card.Body>
            <h2 className='text-center'>Reset Password</h2>
            <Form className="d-grid mb-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control 
                        name="email"
                        type="email" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={touched.email && errors.email}
                        placeholder="Enter E-mail" />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Button style={{width: "auto"}} variant="secondary" type="submit">Reset Password</Button>
            </Form>
            <Link style={{color: "#6c757d"}} to="/account/login">Log In</Link>
            </Card.Body>
        </Card>
        <div className='text-center'>Need an account? <Link style={{color: "#6c757d"}} to="/account/create">Create an Account</Link></div>
    </div>
  )
}

export default ForgotPassword
