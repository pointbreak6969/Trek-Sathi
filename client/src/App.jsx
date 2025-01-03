import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";  
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import SignupPage from "./Pages/Signup";
function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton theme="light" />
      <Navbar />
      <Outlet />
      <SignupPage/>
      <UserProfile/>

    </>
  );
}

export default App;
