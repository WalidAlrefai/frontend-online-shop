import { Container, Navbar, Button,Nav } from 'react-bootstrap';
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { When } from "react-if";
import './header.scss'
function Header() {
    const auth = useContext(AuthContext);
    // bg="light"
    return (
        <div style={{ margin: '0 0 2% 0' }}>
            <Navbar style={{ backgroundColor: "#C4D7E0" }} sticky-top expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={{ fontSize: "35px" }}>Our Shop</Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Nav className="me-auto">
                        <Nav.Link style={{ fontSize: "25px" }} href="/favorite">Favorite</Nav.Link>
                    </Nav>
                </Container>
                <When condition={auth.isLoggedIn}>
                    <Button className="btn-signout" variant="danger" onClick={(e) => { auth.signOut() }}>Sign out</Button>
                </When>
            </Navbar>
        </div>
    );
}

export default Header;