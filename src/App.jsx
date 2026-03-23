import React, { useState } from 'react';
import { useCalculator } from './Hooks/useCalculator'; 
import Display from './Components/Display';
import Keypad from './Components/Keypad';
import ScientificPanel from './Components/ScientificPanel';

const App = () => {
  const { expression, result, addToExpression, clearExpression, deleteLast, calculateResult } = useCalculator();
  
  // State for toggling Scientific Panel on mobile
  const [isScientificOpen, setIsScientificOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f1f3f4] flex flex-col justify-end" style={{ fontFamily: 'Arial, sans-serif' }}>
      
      <div className="flex-grow flex flex-col justify-end overflow-hidden">
        <Display expression={expression} result={result} />
      </div>

      {/* Toggle Button for Mobile Only */}
      <button 
        onClick={() => setIsScientificOpen(!isScientificOpen)}
        className="md:hidden w-full py-2 bg-[#5f6368] text-white text-xs border-t border-gray-600 uppercase tracking-widest active:bg-gray-700"
      >
        {isScientificOpen ? '↑ Close Scientific' : '↓ Open Scientific'}
      </button>

      <div className="flex flex-col md:flex-row w-full bg-[#3c4043] gap-0">
        
        {/* Scientific Panel: Mobile pe toggle state pe depend karega, Desktop pe hamesha dikhega */}
        <div className={`${isScientificOpen ? 'block' : 'hidden'} md:block w-full md:w-[60%] border-t md:border-t-0 md:border-l border-gray-600`}>
          <ScientificPanel 
            onAction={addToExpression} 
            onDelete={deleteLast} 
          />
        </div>

        {/* Main Keypad (Numbers) */}
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