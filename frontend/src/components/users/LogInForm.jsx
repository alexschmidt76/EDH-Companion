import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../context/CurrentUser";

const LogInForm = () => {
    // imports
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUser);
    
    // check if a user is already logged in
    useEffect(() => {
        if (currentUser) navigate('/home');
    }, []);

    // state variables for this component
    const [errorMessages, setErrorMessages] = useState({
        invalidCredentialsMessage: '',
        invalidUsernameMessage: '',
        invalidPasswordMessage: '',
        databaseMessage: ''
    });
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check for empty fields
        if (!credentials.username.length || !credentials.password.length) {
            if (!credentials.username.length) {
                setErrorMessages({ 
                    ...errorMessages, 
                    invalidUsernameMessage: 'This field cannot be left blank.' 
                });
            }
            
            if (!credentials.password.length) {
                setErrorMessages({ 
                    ...errorMessages, 
                    invalidPasswordMessage: 'This field cannot be left blank.' 
                });
            }

            return;
        }

        // make POST request
        const res = await fetch(`${import.meta.env.BACKEND_URL}/auth/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await res.json();

        // check for errors
        if (res.status === 200) {
            setCurrentUser(data.user);
            navigate('/');
        } else {
            if (data.error.invalidCredentials) {
                setErrorMessages({
                    ...errorMessages,
                    invalidCredentialsMessage: data.error.message
                });
            }

            if (data.error.databaseError) {
                setErrorMessages({
                    ...errorMessages,
                    databaseMessage: data.error.message
                });
            }
        }
    }

    return (
        <div className="form">
            <h1>Log In to EDH-Companion</h1>
            {
                errorMessages.databaseMessage.length
                ? (
                    <Alert key={'danger'} variant={'danger'}>
                        {errorMessages.databaseMessage}
                    </Alert>
                ) : null
            }
            {
                errorMessages.invalidCredentialsMessage.length
                ? (
                    <Alert key={'danger'} variant={'danger'}>
                        {errorMessages.invalidCredentialsMessage}
                    </Alert>
                ) : null
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email/Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter your Username or Email here..."
                        value={credentials.username}
                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                        id="username"
                        name="username"
                    />
                    {
                        errorMessages.invalidUsernameMessage.length
                        ? (
                            <Alert key="danger" variant="danger">
                                {errorMessages.invalidUsernameMessage}
                            </Alert>
                        ) : null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter your password here..."
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password })}
                        id="password"
                        name="password"
                    />
                    {
                        errorMessages.invalidPasswordMessage.length
                        ? (
                            <Alert key="danger" variant="danger">
                                {errorMessages.invalidPasswordMessage}
                            </Alert>
                        ) : null
                    }
                </Form.Group>
                <Button variant="primary" type="submit">Log In</Button>
            </Form>
        </div>
    )
}

export default LogInForm;