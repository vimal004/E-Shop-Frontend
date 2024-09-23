import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./Pages/About";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Item from "./Pages/Item";
import Checkout from "./Pages/Checkout";

const App = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "electronics",
        element: <Product product={"electronics"} />,
      },
      {
        path: "kitchen",
        element: <Product product={"kitchen"} />,
      },
      {
        path: "sports",
        element: <Product product={"sports"} />,
      },
      {
        path: "clothing",
        element: <Product product={"clothing"} />,
      },
      {
        path: "electronics/:id",
        element: <Item />,
      },
      {
        path: "clothing/:id",
        element: <Item />,
      },
      {
        path: "kitchen/:id",
        element: <Item />,
      },
      {
        path: "sports/:id",
        element: <Item />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "cart/:id",
        element: <Item />,
      },
    ],
  },
]);

export default appRouter;
