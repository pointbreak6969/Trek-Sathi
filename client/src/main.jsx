import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import Home from "./Pages/LandingPage";
import Details from "./Pages/Details";
import SignupPage from "./Pages/Signup";
import Login from "./Pages/Login";
import Social from "./Pages/Social";
import Protected from "./components/Protected";
import GroupFormation from "./Pages/GroupFormation";
import "./index.css";
import UsersHomePage from "./Pages/UsersHomePage";
import ChatBot from "./components/ChatBot";
import TrekDetails from "./Pages/TrekDetails";
const publicRoutes = [
  {
    path: "/",
    element: (
      <Protected authentication={false} redirectPath="/usershomepage">
        <Home />
      </Protected>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <Protected authentication={false} redirectPath="/details">
        <Details />
      </Protected>
    ),
  },
  {
    path: "/groupformation/:id",
    element: (
      <Protected authentication={false}>
        <GroupFormation />
      </Protected>
    ),
  },
];

const authRoutes = [
  {
    path: "/login",
    element: (
      <Protected authentication={false} redirectPath="/usershomepage">
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authentication={false} redirectPath="/usershomepage">
        <SignupPage />
      </Protected>
    ),
  },
];

const protectedRoutes = [
  {
    path: "/details/:name",
    element: (
      <Protected authentication={true}>
        <Details />
      </Protected>
    ),
  },
  {
    path: "/social",
    element: (
      <Protected authentication={true}>
        <Social />
      </Protected>
    ),
  },
  {
    path: "/usershomepage",
    element: (
      <Protected authentication={true}>
        <UsersHomePage />
      </Protected>
    ),
  },
  {
    path: "/chatbot",
    element: (
      <Protected authentication={true}>
        <ChatBot />
      </Protected>
    ),
  },
  {
    path: "/group",
    element: (
      <Protected authentication={true}>
        <GroupFormation  />
      </Protected>
    ),
  },
  {
    path: "/trekd",
    element: (
      <Protected authentication={true}>
        <TrekDetails  />
      </Protected>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...publicRoutes, ...authRoutes, ...protectedRoutes],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
