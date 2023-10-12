import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../store/firebase";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const firebase = useFirebase();

  const navigate = useNavigate();

  const handleSignOut = () => {
    firebase.signOutUser();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add List</Nav.Link>
            <Nav.Link href="/book/view/purchases">Purchases</Nav.Link>
            <Nav.Link href="/book/view/orders">Orders</Nav.Link>
          </Nav>
          {firebase.isLoggedIn ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {firebase.userState.displayName}
              </Navbar.Text>
              <Button
                style={{ margin: "0 0 0 16px" }}
                variant="secondary"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Navbar.Collapse>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
