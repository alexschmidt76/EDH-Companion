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
    const [errorMessage, setErrorMessage] = useState(null);
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

        // check username length and regex

        // check password validity

        // make POST request
        const res = await fetch(`${process.env.BACKEND_URL}/users/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const resData = await res.json();

        // check for errors
        if (res.status === 200) {
            setCurrentUser(data.user);
            navigate('/');
        } else {
            setErrorMessage(data.message);
        }
    }

    return (
        <div className="form">
            <h1>Sign Up for EDH Companion</h1>
            
            {/* check to see if there is an error to display */}
            {
                errorMessage === null
                ? null
                : (
                    <div className="form-error">
                        {errorMessage}
                    </div>
                  )
            }

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
                        Your username must be 16 characters or less, start with a letter, and must not contain spaces or emojis.
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