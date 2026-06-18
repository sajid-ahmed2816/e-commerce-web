import { lazy } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51RNzw1PrjmeW2KXhD524f791YmlYGn1VzEOxcjYjs2yekdw3pmI1XbQgeHgdMOaHESf0Nrdgtd9jL3YsgHuWFjCx00fhD8uQvX");

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Product = lazy(() => import("../pages/Product"));
const Store = lazy(() => import("../pages/Store"));
const Cart = lazy(() => import("../pages/Cart"));

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
    component: (
      <Elements stripe={stripePromise}>
        <Cart />
      </Elements>
    )
  },
];

export default WebRoutes;