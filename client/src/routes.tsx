import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([{ path: "/", element: <MainLayout /> }]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
