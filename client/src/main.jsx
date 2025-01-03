import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store} from "./store/store.js";
import Home from "./Pages/LandingPage";
import Details from "./Pages/Details";
import SignupPage from "./Pages/Signup";
import Login from "./Pages/Login";
import Protected from "./components/Protected";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Social from "./Pages/Social";
const publicRoutes = [
  {
    path: "/", 
    element: (
      <Protected authentication={false}>
        {" "}
        <Home />
      </Protected>
    ),
  }
]
const authRoutes = [
  {
    path: "/login",
    element: (
      <Protected authentication={false} redirectPath="/">
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authentication={false} redirectPath="/">
        <SignupPage/>
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
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...publicRoutes, ...authRoutes, ...protectedRoutes],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
