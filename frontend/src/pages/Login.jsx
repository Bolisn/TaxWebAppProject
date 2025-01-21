import React from 'react';
import Form from '../components/Form';
import '../styles/LoginRegister.css'; 
import Footer from '../components/Footer';

function Login() {
    return (
        <div className="auth-container">
            <h1 className="auth-title">Taxculator</h1>
            <p className="auth-description">
                Welcome to Taxculator! With the help of our AI Agent you can easily calculate and manage 
                your taxes based on your income and expenses. With a user-friendly interface, you can track your 
                finances and prepare for tax season with ease.
            </p>
             <Form route="/api/token/" method="login" />
             <Footer />
        </div>
    );
}

export default Login;