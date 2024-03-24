import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BUSINESSPAGE_ROUTE,
  MEETINGSPAGE_ROUTE,
  MEETINGSTATISTICPAGE_ROUTE,
  SIGNIN_ROUTE,
} from "../utils/const";

import { UserLogout } from "../features/Users/apiSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(UserLogout());
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={BUSINESSPAGE_ROUTE}>Business Page</Nav.Link>
          <Nav.Link href={MEETINGSPAGE_ROUTE}>Meetings Page</Nav.Link>
          <Nav.Link href={MEETINGSTATISTICPAGE_ROUTE}>Statistics Page</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href={SIGNIN_ROUTE}>Signin-Signup</Nav.Link>
          <Nav.Link href={SIGNIN_ROUTE} onClick={handleLogout}>
            EXIT
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
