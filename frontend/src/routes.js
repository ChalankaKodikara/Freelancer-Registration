import React from "react";
import AuthRoute from "./AuthRoute"; // Import the AuthRoute component
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/AdminUserProfile";
import TableList from "views/TableList.js";
import Notifications from "views/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: () => <AuthRoute component={Dashboard} />,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: () => <AuthRoute component={UserProfile} />,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: () => <AuthRoute component={TableList} />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: () => <AuthRoute component={Notifications} />,
    layout: "/admin",
  },
];

export default dashboardRoutes;
