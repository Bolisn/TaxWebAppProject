import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../styles/Home.css";
import LoadingIndicator from "../components/LoadingIndicator";
import AiAgent from "../components/AiAgent";
import Footer from "../components/Footer";

function Home() {
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [calculationResult, setCalculationResult] = useState(null); 
    const [isAIAgentVisible, setIsAIAgentVisible] = useState(false); // AI Agent button visibility

   
    const { createCalculation, isLoading } = AiAgent({
        onCalculationComplete: setCalculationResult, // Pass handler for results
    });

    // Toggle AI Agent visibility
    const toggleAIAgentVisibility = () => {
        setIsAIAgentVisible(!isAIAgentVisible);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Taxculator</h1>

            {/* Navigation Button */}
            <div className="nav-buttons">
                <Link to="/logout" className="nav-button">
                    Logout
                </Link>
            </div>

            {/* Calculation Form */}
            <div className="create-calculation-section">
                <h2 className="section-title">Enter Your Income and Expenses</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createCalculation(income, expenses);
                    }}
                    className="calculation-form"
                >
                    <label htmlFor="income" className="form-label">
                        Annual Income (€) <br />
                        Insert the total of every source of income you have(salary, rent, etc.):
                    </label>
                    <input
                        type="number"
                        id="income"
                        name="income"
                        className="form-input"
                        required
                        step="any"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                    <label htmlFor="expenses" className="form-label">
                        Annual Expenses (€) <br />
                        Insert the total of all your expenses(mortgage, bills, etc.): 
                    </label>
                    <input
                        type="number"
                        id="expenses"
                        name="expenses"
                        className="form-input"
                        required
                        step="any"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                    />
                    <button type="submit" className="form-button" disabled={isLoading}>
                        {isLoading ? "Calculating..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* Loading Indicator */}
            {isLoading && <LoadingIndicator/>}

            {/* Display Calculation Result */}
            {calculationResult && (
                <div className="result-section">
                    <h3 className="result-title">Based on the information you provided, your tax is:</h3>
                    <p className="result-value">Tax: €{calculationResult.calculatedTax}</p>
                    <h3 className="result-title">Allow our AI Agent to Advice you:</h3>
                    {/* Button to display AI tips */}
                    <button
                        className="form-button"
                        onClick={toggleAIAgentVisibility}
                    >
                        {isAIAgentVisible ? "Hide Advice" : "Show Advice"}
                    </button>

                    {/* AI Tips Section */}
                    {isAIAgentVisible && (
                        <div className="ai-tips">
                            <ul>
                                {(calculationResult.tips || "")
                                    .split("\n")
                                    .map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;
