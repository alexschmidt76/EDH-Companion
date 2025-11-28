import { useContext } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    const { currentUser } = useContext(CurrentUser);

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href='/home'>EDH Companion</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <Nav.Link href='/tracker'>Tracker</Nav.Link>
                        {
                            currentUser
                            ? (
                                <Nav.Link href={`/user-page/:${currentUser.username}`}>{currentUser.username}</Nav.Link>
                            ) : (
                                <div>
                                    <Nav.Link href="/log-in-form">Log In</Nav.Link>
                                    <Nav.Link href="/sign-up-form">Sign Up</Nav.Link>
                                </div>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;