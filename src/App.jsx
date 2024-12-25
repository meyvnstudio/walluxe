import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/Home";
import Watchpage from "./pages/Watch";
import AuthLogin from "./auth/Login";
import DashboardLayout from "./admin/component/Layout";
import Dashboard from "./admin/pages/Home";
import AdminAccount from "./admin/pages/Account";
import AdminAnalytics from "./admin/pages/Analytics";
import AdminFiles from "./admin/pages/Files";
import AuthRegister from "./auth/Signup";

export const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Check localStorage directly if state is not set
    const storedAuth = localStorage.getItem("authKey");
    if (storedAuth === "authenticated") {
      return children; // Allow access if localStorage indicates authentication
    }
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Synchronize authentication state with localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("authKey");
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (credentials) => {
    const { email, username, password } = credentials;
    if (
      (email === "iwmvik@gmail.com" || username === "iwmvictor") &&
      password === "Iwm@2003"
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("authKey", "authenticated"); // Save auth state
      return true; // Login success
    }
    return false; // Login failed
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authKey"); // Remove auth state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="watch" element={<Watchpage />} />
          </Route>
          <Route path="/auth">
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="account" element={<AdminAccount />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="content" element={<AdminFiles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
