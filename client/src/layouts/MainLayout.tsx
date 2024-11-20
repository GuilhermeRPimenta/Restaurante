import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { CartProvider } from "../components/Global/CartProvider";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartProvider>
        <Main>
          <Outlet />
        </Main>
      </CartProvider>
    </div>
  );
};

export default MainLayout;
