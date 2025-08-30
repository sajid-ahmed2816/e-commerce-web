import Login from "../pages/Login";
import Signup from "../pages/Signup";

const PublicRoutes = [
  {
    path: "/login",
    component: <Login />
  },
  {
    path: "/signup",
    component: <Signup />
  },
];

export default PublicRoutes;