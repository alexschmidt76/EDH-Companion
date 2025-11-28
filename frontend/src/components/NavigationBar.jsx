import { useContext } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    const { currentUser } = useContext(CurrentUser);

    return (
        <Navbar expand="lg">
            <Container>
                {
                    // check for a currently logged in user to decide which navbar to show
                    currentUser
                    ? (
                        <Nav>
                            <Nav.Link href="/my-pods">Pods</Nav.Link>
                            <Nav.Link href="/log-new-game">Log a Game</Nav.Link>
                            <Nav.Link href="/my-profile">{currentUser.username}</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/log-in-form">Log In</Nav.Link>
                            <Nav.Link href="/sign-up-form">Sign Up</Nav.Link>
                        </Nav>
                    )
                }
            </Container>
        </Navbar>
    );
}

export default NavigationBar;