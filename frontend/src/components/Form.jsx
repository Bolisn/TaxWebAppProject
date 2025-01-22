import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

/*for more usabillity, i created this component to handle the login and register form
as they have the same functionality with almost no differences */

function Form({ route, method }) {
    const [username, setUsername] = useState(""); // ("") is NULL, because we await input
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false); // State to show loading indicator
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); // React Router hook for navigation

    const handleSubmit = async (e) => {
        setLoading(true); 
        e.preventDefault(); // Prevent default form submission
        setError(""); // Reset error message on each submit attempt
        try {
            const res = await api.post(route, { username, password }); // Send API request with user credentials
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/"); // Redirect to the home page
            } else {
                navigate("/login"); // If the form is for registration, redirect to the login page
            }
        } catch (error) {
            if (method === "login") {
                setError("Wrong username or password. Please try again!"); 
            } else {
                setError("Username already taken. Try another one!");
            }
        } finally {
            setLoading(false); // Hide loading indicator after processing
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message if present */}

            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                placeholder="Password"
            />

            {loading && <LoadingIndicator />} {/* Show loading indicator when loading state is true */}

            <button className="form-button" type="submit">
                {method === "login" ? "Login" : "Register"} {/* Button text changes based on the method */}
            </button>

            <div className="additional-links"> {/* Create links to login and register pages */}
                {method === "login" ? (
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="form-link">Register</a> 
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="form-link">Login</a> 
                    </p>
                )}
            </div>
        </form>
    );
}

export default Form;
