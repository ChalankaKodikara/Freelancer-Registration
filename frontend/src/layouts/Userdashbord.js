import React, { useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import userRoutes from "userRoutes.js"; // Import user routes
import sidebarImage from "assets/img/sidebar-3.jpg";
import AuthRoute from "../AuthRoute";

function UserDashbord() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

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

  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={userRoutes}
        />{" "}
        {/* Use userRoutes */}
        <div className="main-panel" ref={mainPanel}>
          {/* <AdminNavbar /> */}
          <div className="content">
            <Switch>
              {userRoutes.map((prop, key) => {
                // Use userRoutes here
                if (prop.layout === "/userdashbord") {
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
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default UserDashbord;
