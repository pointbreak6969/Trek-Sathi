import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Details from "./Pages/Details";
import Social from "./Pages/Social";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:name" element={<Details />} />
        <Route path="/social" element={<Social/>}/>
      </Routes>
    </Router>
  );
}

export default App;
