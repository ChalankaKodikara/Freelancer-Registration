import React from "react";
import AuthRoute from "./AuthRoute";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/AdminUserProfile";
import TableList from "views/TableList.js";
import Notifications from "views/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "JOBS",
    icon: "nc-icon nc-chart-pie-35",
    component: () => <AuthRoute component={Dashboard} />,
    layout: "/admin",
  },

  // {
  //   path: "/user",
  //   name: "Send Job Request",
  //   icon: "nc-icon nc-bag",
  //   component: () => <AuthRoute component={UserProfile} />,
  //   layout: "/admin",
  // },
  {
    path: "/table",
    name: "Registered Users",
    icon: "nc-icon nc-notes",
    component: () => <AuthRoute component={TableList} />,
    layout: "/admin",
  },
];

export default dashboardRoutes;
