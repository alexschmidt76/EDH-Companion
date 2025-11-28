import { Navbar, Nav, Container } from "react-bootstrap";

const UserPageNavBar = ({ username }) => {
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