import React, { useState, useRef, useEffect } from 'react';
import { useCalculator } from './Hooks/useCalculator';
import Display from './Components/Display';
import Keypad from './Components/Keypad';
import ScientificPanel from './Components/ScientificPanel';
import gsap from 'gsap';

const App = () => {
  const { expression, result, liveResult, addToExpression, clearExpression, deleteLast, calculateResult } = useCalculator();

  // States for panel management
  const [panelState, setPanelState] = useState(0);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const displayAreaRef = useRef(null);
  const scientificPanelRef = useRef(null);

  // Initial setup for mobile peek (Positioning panel at the edge)
  useEffect(() => {
    if (scientificPanelRef.current && window.innerWidth < 768) {
      const panelWidth = scientificPanelRef.current.offsetWidth;
      gsap.set(scientificPanelRef.current, { x: panelWidth - 28 });
    }
  }, []);

  // Animation logic using GSAP
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

  const handleAction = (val) => {
    addToExpression(val);
    gsap.fromTo(displayAreaRef.current,
      { backgroundColor: "rgba(0, 121, 107, 0.1)" },
      { backgroundColor: "transparent", duration: 0.4, ease: "power1.out" }
    );
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
      className="w-full bg-white dark:bg-black flex flex-col font-[Arial]"
      style={{ height: '100dvh', overflow: 'hidden', maxWidth: '100vw' }}
    >
      {/* Display Area */}
      <div ref={displayAreaRef} className="flex-1 overflow-hidden transition-all">
        <Display expression={expression} result={result} liveResult={liveResult} />
      </div>

      {/* Controls Container */}
      <div className="w-full bg-[#3c4043] dark:bg-[#0a0a0a] flex-shrink-0">

        {/* MOBILE VIEW (Standard Keypad + Floating Scientific Panel) */}
        <div className="relative md:hidden border-t border-gray-600 dark:border-gray-800">
          <div className="pr-7"> {/* Padding for the peek strip */}
            <Keypad
              onAction={handleAction}
              onCalculate={calculateResult}
              onClear={clearExpression}
              onDelete={handleDeleteAction}
            />
          </div>
          <div
            ref={scientificPanelRef}
            className="absolute top-0 right-0 h-full w-[80%] bg-[#00796b] dark:bg-[#004d40] overflow-hidden z-50 shadow-2xl"
          >
            <ScientificPanel
              onAction={handleAction}
              onDelete={handleDeleteAction}
              panelState={panelState}
              onToggle={handlePanelToggle}
            />
          </div>
        </div>

        {/* DESKTOP VIEW (Side-by-Side Keypad and Scientific Panel) */}
        <div className="hidden md:flex w-full border-t border-gray-600 dark:border-gray-800">
          <div className="w-[40%]">
            <Keypad
              onAction={handleAction}
              onCalculate={calculateResult}
              onClear={clearExpression}
              onDelete={handleDeleteAction}
            />
          </div>
          <div className="w-[60%] border-l border-gray-600 dark:border-gray-800 bg-[#00796b] dark:bg-[#004d40]">
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