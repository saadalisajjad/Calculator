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

  useEffect(() => {
    if (scientificPanelRef.current && window.innerWidth < 768) {
      const panelWidth = scientificPanelRef.current.offsetWidth;
      gsap.set(scientificPanelRef.current, { x: panelWidth - 28 });
    }
  }, []);

  useEffect(() => {
    if (!scientificPanelRef.current || window.innerWidth >= 768) return;
    const panelWidth = scientificPanelRef.current.offsetWidth;
    if (panelState === 0) {
      gsap.to(scientificPanelRef.current, { x: panelWidth - 28, duration: 0.35, ease: "power2.inOut" });
    } else {
      gsap.to(scientificPanelRef.current, { x: 0, duration: 0.4, ease: "power2.inOut" });
    }
  }, [panelState]);

  const handlePanelToggle = () => {
    setPanelState((prev) => (prev === 0 ? 1 : 0));
  };

  // Nayi logic: Jab number dabe ga
  const handleAction = (val) => {
    // Agar result pehle se maujood hai toh usay saaf kar ke naya shuru karo
    if (result) {
      clearExpression();
    }
    
    addToExpression(val);

    // Teal flash effect for feedback
    gsap.fromTo(displayAreaRef.current,
      { backgroundColor: "rgba(0, 152, 170, 0.15)" },
      { backgroundColor: "transparent", duration: 0.4, ease: "power1.out" }
    );
  };

  // Nayi logic: Jab '=' dabe ga
  const handleCalculate = () => {
    if (expression.length > 0) {
      calculateResult();
      // Yahan input ko foran gaib karne ke liye hum Display logic use karein ge 
      // jo pehle batayi thi, ya hook se expression clear kar dein
    }
  };

  const handleDeleteAction = () => {
    deleteLast();
    gsap.fromTo(displayAreaRef.current,
      { backgroundColor: "rgba(255, 0, 0, 0.05)" },
      { backgroundColor: "transparent", duration: 0.3, ease: "power1.out" }
    );
  };

  return (
    <div
      className="w-full bg-black flex flex-col font-[Arial]"
      style={{ height: '100dvh', overflow: 'hidden', maxWidth: '100vw' }}
    >
      {/* Display Area */}
      <div ref={displayAreaRef} className="flex-1 overflow-hidden transition-all bg-black">
        <Display expression={expression} result={result} liveResult={liveResult} />
      </div>

      {/* Controls Container */}
      <div className="w-full bg-black flex-shrink-0">

        {/* MOBILE VIEW */}
        <div className="relative md:hidden border-t border-gray-800">
          <div className="pr-7 bg-black"> 
            <Keypad
              onAction={handleAction}
              onCalculate={handleCalculate}
              onClear={clearExpression}
              onDelete={handleDeleteAction}
            />
          </div>
          <div
            ref={scientificPanelRef}
            className="absolute top-0 right-0 h-full w-[80%] bg-black overflow-hidden z-50 shadow-2xl"
          >
            <ScientificPanel
              onAction={handleAction}
              onDelete={handleDeleteAction}
              panelState={panelState}
              onToggle={handlePanelToggle}
            />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex w-full border-t border-gray-800">
          <div className="w-[40%] bg-black">
            <Keypad
              onAction={handleAction}
              onCalculate={handleCalculate}
              onClear={clearExpression}
              onDelete={handleDeleteAction}
            />
          </div>
          <div className="w-[60%] border-l border-gray-800 bg-black">
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