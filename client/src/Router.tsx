import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import NotFound from "./pages/NotFound";
// import RegisterPage from "./pages/RegisterPage";
import React from "react";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={LandingPage} />
    </Routes>
  );
}
