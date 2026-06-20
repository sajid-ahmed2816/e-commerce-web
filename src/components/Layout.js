import { Fragment, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

function Layout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Layout;