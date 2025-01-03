// import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton theme="light" />
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

export default App;
