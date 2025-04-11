import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct from "./layouts/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/new",
        element: <NewProduct />,
      },
    ],
  },
]);
