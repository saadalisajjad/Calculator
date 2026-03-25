import { useState, useEffect } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [liveResult, setLiveResult] = useState("");

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
      setLiveResult("");
    }
  }, [expression]);

  const addToExpression = (value) => {
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
    const operators = ['+', '-', '*', '/', '^', ' mod '];
    const isOperator = operators.includes(val);

    if (result && result !== "Syntax Error" && result !== "Math Error") {
      if (isOperator) {
        setExpression(result + val);
      } else {
        setExpression(val);
      }
      setResult("");
      setLiveResult("");
      return;
    }

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
    setLiveResult("");
  };

  const deleteLast = () => {
    // Agar result show ho raha hai toh ek click mein sab clear
    if (result) {
      setResult("");
      setExpression("");
      setLiveResult("");
      return;
    }
    setExpression((prev) => prev.slice(0, -1));
  };

  return { expression, result, liveResult, addToExpression, clearExpression, deleteLast, calculateResult };
};

export default useCalculator;