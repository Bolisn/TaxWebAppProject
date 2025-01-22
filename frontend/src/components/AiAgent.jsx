import React, { useState } from "react" ;
import api from "../api";

const AiAgent = ({ onCalculationComplete }) => {
    const [isLoading, setIsLoading] = useState(false); 

    const createCalculation = (income, expenses) => {   // Submit income and expenses for tax calculation
        const incomeValue = parseFloat(income);         // Convert income, expences to a float, in order to prevent errors
        const expensesValue = parseFloat(expenses);     

        if (isNaN(incomeValue) || isNaN(expensesValue)) {    // Check if input values are valid numbers
            alert("Income and expenses must be valid numbers."); 
            return;
        }

        if (incomeValue < 0 || expensesValue < 0) {      // Ensuring income and expenses are positive numbers
            alert("Income and expenses must be positive values."); 
            return;
        }

        setIsLoading(true);

        api                                             // Send data to the API for tax calculation
            .post("/api/calculate/taxes/", { income: incomeValue, expenses: expensesValue })
            .then((res) => {
                if (res.status === 200) {       // Pass calculation results to the parent component
                    onCalculationComplete({
                        calculatedTax: res.data.calculated_tax || 0,  
                        tips: res.data.tips || "",           // Default values (0 and "") ensure fallback behavior if the server doesn't return those fields.
                    });
                } else {
                    alert("Failed to calculate taxes. Please check your input."); // Handle unexpected API response
                }
            })
            .catch((err) => {                       // Log and display error in case of API failure
                console.error("API Error:", err);
                alert(err.response?.data?.error || "An unexpected error occurred.");
            })
            .finally(() => {
                setIsLoading(false); 
            });
    };

    return {
        createCalculation, 
        isLoading,         // Expose loading state for UI feedback
    
    };
};

export default AiAgent;
