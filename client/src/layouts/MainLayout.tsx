import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { CartProvider } from "../components/Global/CartProvider";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartProvider>
        <Main>
          <Outlet />
        </Main>
        {(location.pathname === "/" || location.pathname === "/checkout") && (
          <Footer />
        )}
      </CartProvider>
    </div>
  );
};

export default MainLayout;
