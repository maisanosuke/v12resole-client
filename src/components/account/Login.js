import React from 'react';
import {Button, Form, Card, Alert} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {loginSchema} from '../../schemas';
import {useFormik} from 'formik';
import {useUser} from '../../context/UserContext';

function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = React.useState(null);
    const {login} = useUser();

    const onSubmit = async (values) => {
        try{
            //console.dir(`actions: ${actions}`)
            const data = await login({email: values.email, password: values.password});
            setLoginError({message: data, variant: 'success'})
            navigate('/account/profile');
        }catch(e){
            setLoginError({message: `${e}`, variant: 'danger'})
        }
    }
    //handleBlur validate input when user clicked out of it
    const {handleChange, handleBlur, values, handleSubmit, isValid, errors, touched, isSubmitting} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit
    })

  return (
    <div style={{maxWidth: '400px'}}>
    {loginError && <Alert variant={loginError.variant}>{loginError.message}</Alert>}
        <Card style={{backgroundColor: "#fbfaee"}}>
            <Card.Body>
                <h2 style={{textAlign: "center"}}>Log In</h2>
                <Form noValidate className="d-grid" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label >Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.email} 
                            isInvalid={touched.email && errors.email} 
                            placeholder="Enter E-mail" 
                            name="email"/>
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.password} 
                            isInvalid={touched.password && errors.password} 
                            placeholder="Password" 
                            name="password"/>
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button disabled={!isValid || isSubmitting} className="mb-3" style={{width: "auto"}} variant="secondary" type="submit">Log In</Button>
                    <Link style={{textAlign: "center", color: "#6c757d"}} to="/account/forgot-password">Forgot Password?</Link>
                </Form>
            </Card.Body>
        </Card>
        <p style={{textAlign: "center"}}>Need an account? <Link to="/account/create" style={{color: "#6c757d"}}>Create an Account</Link></p>
    </div>
  )
}

export default Login