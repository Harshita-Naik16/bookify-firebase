import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/login.jsx";
import { FirebaseProvider } from "./store/firebase.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register.jsx";
import List from "./pages/List.jsx";
import Home from "./pages/Home.jsx";
import DetailsPage from "./pages/Details.jsx";
import ViewOrders from "./pages/ViewOrders.jsx";
import ViewOrderDetail from "./pages/ViewOrderDetail.jsx";
import Purchases from "./pages/ViewPurchases.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "book/list",
        element: <List />,
      },
      {
        path: "book/view/:bookId",
        element: <DetailsPage />,
      },
      {
        path: "book/view/orders",
        element: <ViewOrders />,
      },
      {
        path: "book/view/purchases",
        element: <Purchases />,
      },
      {
        path: "book/view/order-detail/:bookId",
        element: <ViewOrderDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
);
