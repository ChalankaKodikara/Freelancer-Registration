import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import axios from "axios";
import routes from "routes.js"; // Import your routes configuration

function Header() {
  const location = useLocation(); // Initialize useLocation

  const handleSignOut = () => {
    axios
      .post("https://backfreelance.tfdatamaster.com/api/auth/signout")
      .then((response) => {
        // Handle successful signout
        window.location.href = "/login"; // Redirect to the sign-in page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // const getBrandText = () => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  return (
    <Navbar bg="transparent" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          {/* <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
            style={{ color: "white" }}
          >
            {getBrandText()}
          </Navbar.Brand> */}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                style={{ color: "white" }}
              >
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item> */}
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                // href="#pablo"
                onClick={handleSignOut}
                style={{ color: "white" }}
              >
                <span className="no-icon">Signout</span>
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
