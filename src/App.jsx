import React, { useState, useRef, useEffect } from 'react';
import { useCalculator } from './Hooks/useCalculator'; 
import Display from './Components/Display';
import Keypad from './Components/Keypad';
import ScientificPanel from './Components/ScientificPanel';
import gsap from 'gsap';

const App = () => {
  const { expression, result, liveResult, addToExpression, clearExpression, deleteLast, calculateResult } = useCalculator();
  const [panelState, setPanelState] = useState(0);
  
  const displayAreaRef = useRef(null);
  const scientificPanelRef = useRef(null);

  // Mount par initial position set karo
  useEffect(() => {
    if (scientificPanelRef.current && window.innerWidth < 768) {
      const panelWidth = scientificPanelRef.current.offsetWidth;
      gsap.set(scientificPanelRef.current, { x: panelWidth - 28 });
    }
  }, []);

  // Panel state change par animation
  useEffect(() => {
    if (!scientificPanelRef.current || window.innerWidth >= 768) return;

    const panelWidth = scientificPanelRef.current.offsetWidth;

    if (panelState === 0) {
      gsap.to(scientificPanelRef.current, { 
        x: panelWidth - 28,
        duration: 0.35, 
        ease: "power2.inOut",
      });
    } else {
      gsap.to(scientificPanelRef.current, { 
        x: 0,
        duration: 0.4, 
        ease: "power2.inOut",
      });
    }
  }, [panelState]);

  const handlePanelToggle = () => {
    setPanelState((prev) => (prev + 1) % 3);
  };

  const handleAction = (val) => {
    addToExpression(val);
    gsap.fromTo(displayAreaRef.current, 
      { backgroundColor: "rgba(0, 121, 107, 0.1)" }, 
      { backgroundColor: "white", duration: 0.4, ease: "power1.out" }
    );
  };

  const handleDeleteAction = () => {
    deleteLast();
    gsap.fromTo(displayAreaRef.current, 
      { backgroundColor: "rgba(255, 0, 0, 0.05)" }, 
      { backgroundColor: "white", duration: 0.3, ease: "power1.out" }
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-end font-[Arial] overflow-hidden">
      
      {/* Display Area - Top par */}
      <div ref={displayAreaRef} className="flex-grow flex flex-col justify-start p-4 transition-all">
        <Display expression={expression} result={result} liveResult={liveResult} />
      </div>

      {/* Controls Container */}
      <div className="w-full bg-[#3c4043]">

        {/* MOBILE LAYOUT */}
        <div className="relative md:hidden border-t border-gray-600">
          
          {/* Keypad - full width hamesha */}
          <Keypad 
            onAction={handleAction}
            onCalculate={calculateResult} 
            onClear={clearExpression}
          />

          {/* Scientific Panel - upar overlay, right se peek */}
          <div 
            ref={scientificPanelRef}
            className="absolute top-0 right-0 h-full w-[80%] bg-[#00796b] overflow-hidden z-50"
          >
            <ScientificPanel 
              onAction={handleAction}
              onDelete={handleDeleteAction}
              panelState={panelState}
              onToggle={handlePanelToggle}
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:flex w-full border-t border-gray-600">
          <div className="w-[40%]">
            <Keypad 
              onAction={handleAction}
              onCalculate={calculateResult} 
              onClear={clearExpression}
            />
          </div>
          <div className="w-[60%] border-l border-gray-600 bg-[#00796b]">
            <ScientificPanel 
              onAction={handleAction}
              onDelete={handleDeleteAction}
              panelState={panelState}
              onToggle={handlePanelToggle}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;