import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import '../styles/NotFound.css';
import Footer from '../components/Footer';

const NotFoundPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleBackToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <button className="back-to-login" onClick={handleBackToLogin}>
                Back to Login
            </button>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
