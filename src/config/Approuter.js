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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Approuter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/category/menwear" element={<MenProducts />} />
        <Route path="/category/accessories" element={<Accessories />} />
        <Route path="/category/electronics" element={<Electronics />} />
        <Route path="/category/womenwear" element={<Womenproducts />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/description/:productId" element={<Description />} />
      </Routes>
    </Router>
  )
}

export default Approuter