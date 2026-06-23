import { lazy } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51RNzw1PrjmeW2KXhD524f791YmlYGn1VzEOxcjYjs2yekdw3pmI1XbQgeHgdMOaHESf0Nrdgtd9jL3YsgHuWFjCx00fhD8uQvX");

const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const Blogs = lazy(() => import("../pages/Blogs"));
const Blog = lazy(() => import("../pages/Blog"));
const Cart = lazy(() => import("../pages/Cart"));

const WebRoutes = [
  {
    path: "/products",
    component: <Product />
  },
  {
    path: "/",
    component: <Home />
  },
  {
    path: "/blogs",
    component: <Blogs />
  },
  {
    path: "/blogs/blog/:slug",
    component: <Blog />
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