import React from 'react';
import Form from '../components/Form';
import Footer from '../components/Footer';
import '../styles/LoginRegister.css';

function Register() {
    return (
        <div className="auth-container">
            <h1 className="auth-title">Taxculator</h1>
            <p className="auth-description">
                Welcome to Taxculator! Please register to start calculating your taxes and managing your finances.
            </p>
            <Form route="/api/user/register/" method="register" />
            <Footer />
        </div>
    );
}

export default Register;
