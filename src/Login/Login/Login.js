import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('')
    const { signIn, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const signInHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const email= form.email.value;
        const password = form.password.value;
        // console.log(email,password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                setError('')
                if (user.emailVerified) {
                    navigate(from,{replace:true})
                }
                else {
                    toast.error('your email is not verified, please verify email')
                }

            
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
           
       })
    }
    return (
        <Form onSubmit={signInHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" NAME='email' placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
            </Form.Group>
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
            <Button variant="primary" type="submit" className='d-block'>
                Log In
            </Button>
           
        </Form>
    );
};

export default Login;