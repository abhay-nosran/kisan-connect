import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuctionList from "./components/AuctionList";
import AuctionDetails from "./components/AuctionDetails";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Kisan Connect Auctions</h1>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route
            path="/"
            element={isAuthenticated ? <AuctionList /> : <Navigate to="/login" />}
          />
          <Route
            path="/auction/:id"
            element={isAuthenticated ? <AuctionDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}
