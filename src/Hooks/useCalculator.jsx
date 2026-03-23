import { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const addToExpression = (value) => {
    // Mapping symbols to MathJS format
    const mapping = {
      '×': '*', 
      '÷': '/', 
      '−': '-', 
      'π': 'pi', 
      'e': 'e',
      'log': 'log10(', 
      'ln': 'log(', 
      'sin': 'sin(', 
      'cos': 'cos(',
      'tan': 'tan(', 
      '√': 'sqrt(', 
      'x!': '!',
      'exp': 'exp(',
      'x²': '^2',
      'yˣ': '^',
      'mod': ' mod ',
      'rnd': 'random()'
    };

    const val = mapping[value] || value;
    
    // Agar result pehle se error show kar raha hai, toh naya type karne par clear kar do
    if (result === "Syntax Error" || result === "Math Error") {
        setResult("");
    }

    setExpression((prev) => prev + val);
  };

  const calculateResult = () => {
    if (!expression) return;
    
    try {
      // Step 1: Automatically close brackets agar user bhool gaya hai
      let finalExpr = expression;
      const openBrackets = (finalExpr.match(/\(/g) || []).length;
      const closeBrackets = (finalExpr.match(/\)/g) || []).length;
      
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        finalExpr += ")";
      }

      // Step 2: Evaluate using mathjs
      const evalResult = math.evaluate(finalExpr);
      
      // Step 3: Handle Infinity or NaN
      if (!isFinite(evalResult)) {
        setResult("Math Error");
      } else {
        // Limit decimals for clean look
        const formatted = math.format(evalResult, { precision: 10 });
        setResult(formatted.toString());
      }
    } catch (error) {
      setResult("Syntax Error");
      console.error("MathJS Error:", error);
    }
  };

  const clearExpression = () => {
    setExpression("");
    setResult("");
  };

  const deleteLast = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  return { expression, result, addToExpression, clearExpression, deleteLast, calculateResult };
};

export default useCalculator;