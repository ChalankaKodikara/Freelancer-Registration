import React, { useEffect } from "react";
import { useLocation, Switch, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import AuthRoute from "../AuthRoute";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  const isAuthenticated = Cookies.get("authToken");

  const handleSignOut = () => {
    // Implement your signout logic here, e.g., making an API request to the server
    // Clear user data, remove tokens, or perform any other required actions

    // After successful signout, navigate to the sign-in page
    // You can use the history object to navigate to the desired route
    history.push("/signin");
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={routes}
          handleSignOut={handleSignOut}
        />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar handleSignOut={handleSignOut} />
          <div className="content">
            <Switch>
              {routes.map((prop, key) => {
                if (prop.layout === "/admin") {
                  // Use AuthRoute to protect routes
                  return (
                    <AuthRoute
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
