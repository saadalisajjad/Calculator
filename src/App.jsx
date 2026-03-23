import React, { useState } from 'react';
import { useCalculator } from './Hooks/useCalculator'; 
import Display from './Components/Display';
import Keypad from './Components/Keypad';
import ScientificPanel from './Components/ScientificPanel';

const App = () => {
  const { expression, result, addToExpression, clearExpression, deleteLast, calculateResult } = useCalculator();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-end font-[Arial]">
      
      {/* 1. Display Area */}
      <div className="flex-grow flex flex-col justify-end p-4">
        <Display expression={expression} result={result} />
      </div>

      {/* 2. Scientific Toggle (Mobile Only) */}
      <div className="md:hidden flex justify-center bg-[#00796b] border-t border-[#00695c]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 text-white flex justify-center items-center active:bg-[#00897b]"
        >
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▲</span>
          <span className="ml-2 text-xs font-bold">SCIENTIFIC</span>
        </button>
      </div>

      {/* 3. Controls Container */}
      {/* 'flex-col' for mobile, 'flex-row' for desktop (No reverse classes) */}
      <div className="flex flex-col md:flex-row w-full bg-[#3c4043] gap-0">
        
        {/* A. Keypad (Numbers) - Ab ye Left side par rahega (Desktop pe) */}
        <div className="w-full md:w-[40%] border-t border-gray-600">
          <Keypad 
            onAction={addToExpression} 
            onCalculate={calculateResult} 
            onClear={clearExpression}
          />
        </div>

        {/* B. Scientific Panel - Ab ye Right side par rahega (Desktop pe) */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-[60%] border-t md:border-t-0 md:border-l border-gray-600`}>
          <ScientificPanel 
            onAction={addToExpression} 
            onDelete={deleteLast} 
          />
        </div>

      </div>
    </div>
  );
};

export default App;