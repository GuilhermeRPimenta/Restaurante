import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import User from "./pages/User";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/admin/Admin";
import ProductCreation from "./pages/admin/products/ProductCreation";
import NotFound from "./pages/NotFound";
import ProductUpdate from "./pages/admin/products/ProductUpdate";
import ProductsHome from "./pages/admin/products/ProductsHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <User /> },
      { path: "/about", element: <About /> },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/products",
        element: <ProductsHome />,
      },
      {
        path: "/admin/products/ProductCreation",
        element: <ProductCreation />,
      },
      {
        path: "/admin/products/:productId",
        element: <ProductUpdate />,
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
