import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import Details from "./Pages/Details";
import SignupPage from "./Pages/Signup";
import Login from "./Pages/Login";
import Social from "./Pages/Social";
import Protected from "./components/Protected";
import DetailedItinerary from "./Pages/DetailedItinerary";
import TrekDetails from "./Pages/TrekDetails";
import GroupFormation from "./Pages/GroupFormation";
import "./index.css";
import UsersHomePage from "./Pages/UsersHomePage";
import ChatBot from "./components/ChatBot";
import UserProfile from "./Pages/UserProfile";
import JoinGroups from "./Pages/JoinGroups";
import { ThemeProvider } from "./components/theme-provider";
import MapComponent from "./components/MapComponent";

import Home from "./Pages/Landing/Home";

const publicRoutes = [
  {
    path: "/",
    element: (
      <Protected authentication={false} redirectPath="/usershomepage">
        <Home />
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
    path: "/userprofile",
    element: (
      <Protected authentication={true}>
        <UserProfile />
      </Protected>
    ),
  },
  {
    path: "/journal",
    element: (
      <Protected authentication={true}>
        <MapComponent />
      </Protected>
    ),
  },
  {
    path: "/groupformation/:id",
    element: (
      <Protected authentication={true}>
        <GroupFormation />
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
    path: "/TrekDetails",
    element: (
      <Protected authentication={true}>
        <TrekDetails />
      </Protected>
    ),
  },
  {
    path: "/DetailedItinerary",
    element: (
      <Protected authentication={true}>
        <DetailedItinerary />
      </Protected>
    ),
  },
  {
    path: "/group",
    element: (
      <Protected authentication={true}>
        <GroupFormation />
      </Protected>
    ),
  },
  {
    path: "/trekdetails/:name",
    element: (
      <Protected authentication={true}>
        <TrekDetails />
      </Protected>
    ),
  },
  {
    path: "/joingroups",
    element: (
      <Protected authentication={true}>
        <JoinGroups />
      </Protected>
    ),
  },
  {
    path: "/GroupChat",
    element: (
      <Protected authentication={true}>
        <GroupChat />
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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
