import About from "../pages/About";
import Product from "../pages/Product";
import Store from "../pages/Store";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Description from "../pages/Description";
import MenProducts from "../pages/Menproducts";
import Accessories from "../pages/Accessories";
import Electronics from "../pages/Electronics";
import Womenproducts from "../pages/Womenproducts";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Signin from "../pages/Signin";

const WebRoutes = [
  {
    path: "/about",
    component: <About />
  },
  {
    path: "/products",
    component: <Product />
  },
  {
    path: "/",
    component: <Home />
  },
  {
    path: "/store",
    component: <Store />
  },
  {
    path: "/cart",
    component: <Cart />
  },
  {
    path: "/description/:productId",
    component: <Description />
  },
  {
    path: "/category/menwear",
    component: <MenProducts />
  },
  {
    path: "/category/accessories",
    component: <Accessories />
  },
  {
    path: "/category/electronics",
    component: <Electronics />
  },
  {
    path: "/category/womenwear",
    component: <Womenproducts />
  },
];

export default WebRoutes;