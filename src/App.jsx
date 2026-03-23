import React, { useState } from 'react';
import { useCalculator } from './Hooks/useCalculator'; 
import Display from './Components/Display';
import Keypad from './Components/Keypad';
import ScientificPanel from './Components/ScientificPanel';

const App = () => {
  const { expression, result, addToExpression, clearExpression, deleteLast, calculateResult } = useCalculator();
  
  // Mobile drawer toggle state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-end font-[Arial]">
      
      {/* 1. Display Area */}
      <div className="flex-grow flex flex-col justify-end p-4">
        <Display expression={expression} result={result} />
      </div>

      {/* 2. Scientific Drawer Control (Mobile Only) */}
      <div className="md:hidden flex justify-center bg-[#00796b] border-t border-[#00695c]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 text-white flex justify-center items-center transition-all active:bg-[#00897b]"
        >
          {/* Arrow Icon based on state */}
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            {isOpen ? '▼' : '▲'}
          </span>
          <span className="ml-2 text-[10px] tracking-widest uppercase">
            {isOpen ? 'Hide Scientific' : 'Scientific'}
          </span>
        </button>
      </div>

      {/* 3. Main Controls Container */}
      <div className="flex flex-col md:flex-row w-full bg-[#3c4043] gap-0">
        
        {/* Scientific Panel: Mobile pe 'isOpen' check karega, Desktop pe hamesha 'block' rahega */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-[60%] border-t md:border-t-0 md:border-l border-gray-600`}>
          <ScientificPanel 
            onAction={addToExpression} 
            onDelete={deleteLast} 
          />
        </div>

        {/* Numbers Keypad: Hamesha visible rahega */}
        <div className="w-full md:w-[40%] border-t border-gray-600">
          <Keypad 
            onAction={addToExpression} 
            onCalculate={calculateResult} 
            onClear={clearExpression}
          />
        </div>

      </div>
    </div>
  );
};

export default App;