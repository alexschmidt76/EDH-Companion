import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../../context/CurrentUser";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
    // for navigating user after submit
    const navigate = useNavigate();
    // import context provider
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    // make sure there isn't already a user signed in
    useEffect(() => {
        if (currentUser) navigate('/my-profile');
    }, []);

    // state variables to be used in this component
    const [errorMessages, setErrorMessages] = useState({
        invalidPasswordMessage: '',
        invalidUsernameMessage: '',
        invalidEmailMessage: '',
        databaseMessage: ''
    });
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [verifyPassword, setVerifyPassword] = useState('');

    // function to handle form submit
    // makes a POST request to the backend server
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check username and password validity with regex

        // these regex searches will ensure the passwrod and username adhere to the constraints presented in the form
        const passwordSearch = user.password.search(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#$%^&*()_\-+=[\]{}\\|:;"'<,>./?`~])[A-Za-z\d!@#$%^&*()_\-+=[\]{}\\|:;"'<,>./?`~]{8,20}$/);
        const usernameSearch = user.username.search(/^[a-zA-Z][a-zA-Z\d\-_]{0,15}$/);
        // check the email format with regex
        // before user creation in backend, a validation email will be sent
        // to the provided adress to ensure that the email exists
        const emailSearch = user.email.search(/^\S+@\S+\.+\S$/);
        
        if (passwordSearch === -1 || usernameSearch === -1 || emailSearch === -1) {
            if (passwordSearch === -1) {
                setErrorMessages({
                    ...errorMessages,
                    invalidPasswordMessage: "The password you entered is not valid."
                });
            }
            
            if (usernameSearch === -1) {
                setErrorMessages({
                    ...errorMessages,
                    invalidUsernameMessage: "The username you entered is not valid."
                });
            }

            if (emailSearch === -1) {
                setErrorMessages({
                    ...errorMessages,
                    invalidEmailMessage: "The email you entered is not valid."
                });
            }
            
            // break out of the submission before the fetch request
            return;
        }

        
        // make POST request
        const res = await fetch(`${process.env.BACKEND_URL}/users/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        // check for errors
        if (res.status === 200) {
            setCurrentUser(data.user);
            navigate('/');
        } else {
            if (data.error.invalidEmail) {
                setErrorMessages({
                    ...errorMessages,
                    invalidEmailMessage: data.error.message
                });
            }
            
            if (data.error.invalidUsername) {
                setErrorMessages({
                    ...errorMessages,
                    invalidUsernameMessage: data.error.message
                });
            }

            if (data.error.databaseError) {
                setErrorMessages({
                    ...errorMessages,
                    databaseMessage: data.error.message
                })
            }
        }
    }

    return (
        <div className="form">
            <h1>Sign Up for EDH Companion</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email here..."
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        id="email"
                        name="email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        placeholder="Enter your new username here..."
                        value={user.username}
                        onChange={e => setUser({ ...user, username: e.target.value })}
                        id="username"
                        name="username"
                    />
                    <Form.Text id="username-help-block" muted>
                        Your username must be 16 characters or less, start with a letter, and must only contain letters, numbers, - and _.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Create a Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        placeholder="Enter your new password here..."
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        id="password"
                        name="password"
                    />
                    <Form.Label>Confirm your Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        placeholder="Confirm your new password here..."
                        value={verifyPassword}
                        onChange={e => setVerifyPassword(e.target.value)}
                        id="verify-password"
                        name="verify-password"
                    />
                    <Form.Text id="password-help-block" muted>
                        Your password must be 8-20 characters long, must not contail spaces or emoji, and must contain at least one of each of the following:
                        <ul id="password-requirement-list">
                            <li>Uppercase Letter (A-Z)</li>
                            <li>Lowercase Letter (a-z)</li>
                            <li>Number (0-9)</li>
                            <li>Special Character (`{'!@#$%^&*()_-+=[]{}\|:;"\'<>,.?/`~'}`)</li>
                        </ul>
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SignUpForm;