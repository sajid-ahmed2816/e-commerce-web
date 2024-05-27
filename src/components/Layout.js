import Header from "./Header";
import Footer from "./Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Fragment>
      <Header />
      <main style={{ height: "100%" }}>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}

export default Layout;