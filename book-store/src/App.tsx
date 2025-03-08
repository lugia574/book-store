import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

import { BookStoreThemeProvider } from "./context/ThemContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/commom/Error";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import ResetPassword from "./pages/ResetPassword";
import ToastContainer from "./components/commom/toast/ToastContainer";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/rest",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BookStoreThemeProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </BookStoreThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
