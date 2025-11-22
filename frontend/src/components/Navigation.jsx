import { useContext } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Container, Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
    const { currentUser } = useContext(CurrentUser);

    const navBar = (
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
                            <Nav.Link href="/login">Log In</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    )
                }
            </Container>
        </Navbar>
    );

    return navBar;
}

export default Navigation;