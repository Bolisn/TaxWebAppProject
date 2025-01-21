import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {              // Logout component clears localStorage and redirects to the login page
  localStorage.clear() 
  return <Navigate to="/login" /> 
}

function RegisterAndLogout() {   // RegisterAndLogout clears localStorage before navigating to the Register page
  localStorage.clear() 
  return <Register /> 
}

function App() {
  return (
    <BrowserRouter>              {/* Wrap the entire app with the Router to enable routing */}
      <Routes> 
        <Route
          path="/"               // Define the home route
          element={
            <ProtectedRoute>     {/* Protect home page, only accessible if user is authenticated */}
              <Home />           {/* Render the Home component if authorized */}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<RegisterAndLogout />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="*" element={<NotFound />} />    {/* Catch-all route for undefined paths (404) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
