import React from 'react'
import {useUser} from '../../context/UserContext';
// import { useFlashContext } from '../context/FlashContext';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {updateProfileSchema} from '../../schemas';
import {Formik} from 'formik';

function UpdateAccount() {
    // const {currentUser, updateProfileEmail, updateProfilePassword} = useUserContext(); //user contains user's email
    // const {setFlash} = useFlashContext();
    //const navigate = useNavigate();
    // const emailRef = React.useRef();
    // const passwordRef = React.useRef();
    // const passwordConfirmRef = React.useRef();

    const {currentUser, updateUser} = useUser();
    const [alert, setAlert] = React.useState(null);

    const disableButton = ({isSubmitting, isValid, values}) => {
        return isSubmitting || !(isValid) || 
        values.confirmPassword.length === 0 || values.oldPassword.length === 0;
    }
    
    const handleUpdate = async ({newPassword, oldPassword}) => {
        //e.preventDefault();
        try{
            // if(email.length && email !== currentUser.email){
            //     await updateUser({email});
            // }
            if(newPassword.length){
                await updateUser({newPassword, oldPassword});
                setAlert({message: "Successfully updated user!", variant: 'success'});
            }}
            catch(e){
            setAlert({message:`${e}`, variant: 'danger'});
        }

        //console.log(`updated profile: email ${emailRef.current.value} password: ${passwordRef.current.value} confirmPass: ${passwordConfirmRef.current.value}`);
        // if(emailRef.current.value.length && emailRef.current.value !== currentUser.email){
        //     try{
        //         await updateProfileEmail(emailRef.current.value);
        //         console.log('Email updated');
        //     }catch(e){
        //         setFlash({variant: "danger", message: e.message});
        //         return
        //     }
        // }
        // if(passwordRef.current.value.length){
        //     try{
        //         await updateProfilePassword(passwordRef.current.value);
        //         console.log('Password updated');
        //     }catch(e){
        //         setFlash({variant: "danger", message: e.message});
        //         return
        //     }
        // }
        // navigate('/');
        // setFlash({variant: "success", message: "User data updated!"});
    }

  return (
    <Formik
    style={{maxWidth: '400px'}}
    validationSchema={updateProfileSchema}
    onSubmit={handleUpdate}
    initialValues={{oldPassword: '', newPassword: '', confirmPassword: '',
    }}>
    {//
        ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isSubmitting}) => 
        (
            <div>
                {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
                <Card style={{backgroundColor: "#fbfaee", maxWidth: '400px'}}>
                <Card.Body style={{textAlign: "start"}}>
                    <h2 style={{textAlign: "center"}}>Update Profile</h2>
                    <Form className="d-grid mt-3" onSubmit={handleSubmit}>
                        {/* <Form.Group className="mb-3">
                            <Form.Label >Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={values.email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isInvalid={touched.email && errors.email} 
                                placeholder='Email'
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group> */}
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="oldPassword" 
                                value={values.oldPassword} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isInvalid={touched.oldPassword && errors.oldPassword} 
                                placeholder="Enter current password"
                            />
                            <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="newPassword" 
                                value={values.newPassword} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                isInvalid={touched.newPassword && errors.newPassword} 
                                placeholder="Enter new password"
                            />
                            <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control  
                                type="password" 
                                name="confirmPassword" 
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.confirmPassword && errors.confirmPassword}
                                placeholder="Enter new password again" 
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={disableButton({isSubmitting, isValid, values})} style={{width: "auto"}} variant="secondary" type="submit">Update</Button>
                    </Form>
                    </Card.Body>
                </Card>
                <Link style={{color: "#6c757d"}} to="/account/profile">Cancel</Link>
            </div>
        )
    }
    </Formik>
  )
}

export default UpdateAccount;
