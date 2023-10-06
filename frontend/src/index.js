import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "layouts/Login.jsx";
import Signup from "layouts/Signup.jsx";
import Userdashbord from "layouts/Userdashbord";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/userdashbord" component={Userdashbord} />
      <Route path="/admin" component={AdminLayout} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
