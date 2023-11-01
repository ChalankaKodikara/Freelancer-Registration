import UserDashboard from "views/UserfDashboard";
import UserProfile from "views/AdminUserProfile";
const dashboardRoutes = [
  {
    path: "/UserfDashboard",
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
];

export default dashboardRoutes;
