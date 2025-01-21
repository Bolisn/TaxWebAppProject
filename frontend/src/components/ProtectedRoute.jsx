import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // check token validity
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Retrieve the stored refresh token
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) { // If the refresh token request is successful, save the new access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false); 
            }
        } catch (error) {
            setIsAuthorized(false); // If an error occurs during refresh, mark as unauthorized
        }
    };

    const auth = async () => {     // check for access token
        const token = localStorage.getItem(ACCESS_TOKEN); 
        if (!token) {
            setIsAuthorized(false); 
            return;
        }
        const decoded = jwtDecode(token);    // Decode the JWT token to access its expiration
        const tokenExpiration = decoded.exp; // Get expiration timestamp from the decoded token
        const now = Date.now() / 1000;       // JWT stores expiration in seconds

        if (tokenExpiration < now) {
            await refreshToken(); // If the token is expired, refresh it
        } else {
            setIsAuthorized(true); 
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Display loading while checking the token status
    }

    return isAuthorized ? children : <Navigate to="/login" />; // Redirect to login if not authorized
}

export default ProtectedRoute;