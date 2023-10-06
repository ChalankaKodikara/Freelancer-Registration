import UserDashboard from "views/Dashboard.js";
import UserProfile from "views/AdminUserProfile";
import UserNotifications from "views/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: UserDashboard,
    layout: "/userdashbord",
  },
  {
    path: "/user",
    name: "Send Job Request",
    icon: "nc-icon nc-bag",
    component: UserProfile,
    layout: "/userdashbord",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: UserNotifications,
    layout: "/userdashbord",
  },
];

export default dashboardRoutes;
