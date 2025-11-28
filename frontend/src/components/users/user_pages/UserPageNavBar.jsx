import { Navbar, Nav, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserPageNavBar = () => {
    const { username } = useParams();

    return (
        <Navbar expand='lg'>
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href={`/user-page/${username}/games`}>Games</Nav.Link>
                        <Nav.Link href={`/user-page/${username}/pods`}>Pods</Nav.Link>
                        <Nav.Link href={`/user-page/${username}/stats`}>Stats</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default UserPageNavBar;