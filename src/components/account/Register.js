import React from 'react'
import {Button, Form, Card, Row, Col, Alert} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {registerSchema} from '../../schemas';
//import {useUserContext} from '../context/AuthContext';
import {useUser} from "../../context/UserContext";

function Register() {
    const navigate = useNavigate();
    const [alert, setAlert] = React.useState(null);
    const {signup} = useUser();

    const signupUser = async (values) => {
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        //const {email, firstName, lastName, password} = values;
            try {
                // const data = await signup(values);
                // console.log('data in Register.js: ', data);
                // console.log('user signed up: ', data.user);
                // console.log('set alsert to :', data.message);
                const message = await signup(values);
                setAlert({variant: 'success', message: message});
                navigate('/account/profile');
            }catch(e){
                //console.log('error signup: ', e);
                setAlert({variant: 'danger', message: `${e}`});
            }
    }

  return (
    <Formik
        style={{maxWidth: '400px'}}
        validationSchema={registerSchema}
        onSubmit={signupUser}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
      }}>
        {
            ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting}) => 
            (
                <>
                {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
                <Card style={{backgroundColor: "#fbfaee"}}>
                <Card.Body>
                    <h3 className='mb-4' style={{textAlign: "center"}}>Create an Account</h3>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Control 
                                type="email" 
                                name='email' 
                                value={values.email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isInvalid={touched.email && errors.email}
                                placeholder="Enter E-mail"/>
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} className="mb-4">
                                <Form.Control 
                                    type='text'
                                    name='firstName'
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    isInvalid={touched.firstName && errors.firstName}
                                    placeholder="First Name"/>
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-4">
                                <Form.Control 
                                    name='lastName'
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    isInvalid={touched.lastName && errors.lastName}
                                    placeholder="Last Name" />
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} className="mb-4">
                            <Form.Control  
                                type="password" 
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                isInvalid={touched.password && errors.password}
                                placeholder="Password"
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-4">
                            <Form.Control 
                                type="password" 
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                isInvalid={touched.confirmPassword && errors.confirmPassword}
                                placeholder="Confirm Password"/>
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={!isValid || isSubmitting} className='w-100' variant="secondary" type="submit">Sign Up</Button>
                    </Form>
                    </Card.Body>
                </Card>
                <p style={{textAlign: "center"}} >Already have an account? <Link style={{color: "#6c757d"}} to="/account/login">Log In</Link></p>
                </>
            )
        }
      </Formik>
  )
}

export default Register;
