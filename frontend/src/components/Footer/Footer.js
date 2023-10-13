import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    const footerStyle = {
      background: "rgba(0, 0, 0, 0.7)",
      color: "white",
    };

    const linkStyle = {
      color: "white",
      textDecoration: "none",
    };

    return (
      <footer className="footer px-0 px-lg-3" style={footerStyle}>
        <Container fluid>
          <nav>
            <ul className="footer-menu"></ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="https://talentfort.lk/" style={linkStyle}>
                Talentfort
              </a>
              , all rights reserved
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
