import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default MainLayout;
