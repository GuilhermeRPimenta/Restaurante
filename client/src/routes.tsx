import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UserRegister from "./pages/user/UserRegister";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import ProductCreation from "./pages/admin/products/ProductCreation";
import NotFound from "./pages/NotFound";
import ProductUpdate from "./pages/admin/products/ProductUpdate";
import ProductsHome from "./pages/admin/products/ProductsHome";
import UserHome from "./pages/user/UserHome";
import Checkout from "./pages/Checkout";
import OrdersHome from "./pages/admin/orders/OrdersHome";
import UpdateOrder from "./pages/admin/orders/UpdateOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <UserHome /> },
      { path: "/user/register", element: <UserRegister /> },
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
      { path: "/admin/orders", element: <OrdersHome /> },
      { path: "/admin/orders/:orderId", element: <UpdateOrder /> },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
