import { evaluate } from "mathjs";
import { useState, useEffect } from "react";

export const useCalculator = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        if (expression) {
            try {
                // Symbols ko mathjs compatible banane ke liye advanced replacement
                const mathExpression = expression
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*")
                    .replace(/−/g, "-")
                    .replace(/π/g, "PI")
                    .replace(/e/g, "E")
                    .replace(/x²/g, "^2")     // Square logic
                    .replace(/yˣ/g, "^")      // Power logic
                    .replace(/√/g, "sqrt")    // Square root
                    .replace(/log/g, "log10") // Common log
                    .replace(/ln/g, "log");   // Natural log

                const solved = evaluate(mathExpression);
                
                // Agar result valid number hai toh hi set karein
                if (typeof solved === 'number' || typeof solved === 'object') {
                    setResult(String(solved));
                }
            } catch {
                // User jab type kar raha hota hai toh expression incomplete ho sakta hai
                setResult(""); 
            }
        } else {
            setResult("");
        }
    }, [expression]);

    const addToExpression = (val) => {
        // Special cases for buttons with complex labels
        let valToAdd = val;
        if (val === "x²") valToAdd = "²";
        if (val === "yˣ") valToAdd = "^";
        if (val === "sin") valToAdd = "sin(";
        if (val === "cos") valToAdd = "cos(";
        if (val === "tan") valToAdd = "tan(";

        if (expression === "Error") {
            setExpression(valToAdd);
        } else {
            setExpression((prev) => prev + valToAdd);
        }
    };

    const clearExpression = () => {
        setExpression("");
        setResult("");
    };

    const deleteLast = () => {
        if (expression.length > 0) {
            setExpression(expression.slice(0, -1));
        }
    };

    const calculateResult = () => {
        if (result && result !== "Error") {
            // Chrome style: Jab = dabe, toh result hi expression ban jaye
            setExpression(result);
            setResult("");
        }
    };

    return { 
        expression, 
        result, 
        addToExpression, 
        clearExpression, 
        deleteLast, 
        calculateResult 
    };
};
export default useCalculator;