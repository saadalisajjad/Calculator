import { useState, useEffect } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [liveResult, setLiveResult] = useState(""); // Live preview add kiya

  // Har expression change par live calculate karo
  useEffect(() => {
    if (!expression) {
      setLiveResult("");
      return;
    }
    try {
      let finalExpr = expression;
      const openBrackets = (finalExpr.match(/\(/g) || []).length;
      const closeBrackets = (finalExpr.match(/\)/g) || []).length;
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        finalExpr += ")";
      }
      const evalResult = math.evaluate(finalExpr);
      if (!isFinite(evalResult)) {
        setLiveResult("");
      } else {
        const formatted = math.format(evalResult, { precision: 10 });
        setLiveResult(formatted.toString());
      }
    } catch {
      setLiveResult(""); // Error par khali rakho
    }
  }, [expression]);

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
    
    if (result === "Syntax Error" || result === "Math Error") {
        setResult("");
    }

    setExpression((prev) => prev + val);
  };

  const calculateResult = () => {
    if (!expression) return;
    
    try {
      let finalExpr = expression;
      const openBrackets = (finalExpr.match(/\(/g) || []).length;
      const closeBrackets = (finalExpr.match(/\)/g) || []).length;
      
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        finalExpr += ")";
      }

      const evalResult = math.evaluate(finalExpr);
      
      if (!isFinite(evalResult)) {
        setResult("Math Error");
      } else {
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
    setLiveResult(""); // Clear par liveResult bhi reset
  };

  const deleteLast = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  return { expression, result, liveResult, addToExpression, clearExpression, deleteLast, calculateResult };
};

export default useCalculator;