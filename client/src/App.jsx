import React from "react";


function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton theme="light" />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
