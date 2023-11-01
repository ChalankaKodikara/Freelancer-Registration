import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import Logout from "layouts/Logout";

function Sidebar({ color, image, routes }) {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

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

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{ backgroundImage: "url(" + image + ")" }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a className="simple-text logo-mini mx-1">
            <div className="logo-img">{/* Your logo */}</div>
          </a>
          <p className="simple-text">Welcome</p>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
          <Logout />
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
