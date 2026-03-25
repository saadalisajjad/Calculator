import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Display = ({ expression, result, liveResult }) => {
  const resultRef = useRef(null);
  const expressionRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current && expressionRef.current) {
      // Expression area ki position lo
      const exprBox = expressionRef.current.getBoundingClientRect();
      const resultBox = resultRef.current.getBoundingClientRect();
      
      // Kitna upar jana hai calculate karo
      const distance = -(resultBox.top - exprBox.top);

      // Result ko expression wali jagah par le jao
      gsap.fromTo(resultRef.current,
        { y: 0, opacity: 0, scale: 0.8 },
        { y: distance, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [result]);

  return (
    <div className="h-full w-full flex flex-col p-6 text-right font-sans bg-black">
      
      {/* 1. Expression Area */}
      <div className="flex-1 overflow-y-auto break-all scrollbar-hide">
        {!result && (
          <div ref={expressionRef} className="text-white/70 text-2xl md:text-3xl min-h-[1.5em] leading-tight pt-2">
            {expression || '0'}
          </div>
        )}
        {/* Jab result aa jaye toh expression yahan invisible rakho taake position mile */}
        {result && (
          <div ref={expressionRef} className="text-white/70 text-2xl md:text-3xl min-h-[1.5em] leading-tight pt-2 opacity-0">
            {expression}
          </div>
        )}
      </div>

      {/* 2. Output Area */}
      <div className="mt-4 flex flex-col justify-end">
        {expression !== "" && (
          <>
            {/* Live Result */}
            {!result && liveResult && (
              <div className="text-[#0098aa]/60 text-xl md:text-2xl">
                {liveResult}
              </div>
            )}

            {/* Final Result - expression wali jagah par jaega */}
            {result && (
              <div
                ref={resultRef}
                className="text-[#0098aa] text-5xl md:text-7xl font-medium"
              >
                {result}
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default Display;