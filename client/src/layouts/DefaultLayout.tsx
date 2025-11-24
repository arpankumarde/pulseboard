import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
