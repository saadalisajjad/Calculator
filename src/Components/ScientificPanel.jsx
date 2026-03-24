import React from 'react';
import Button from "./Button";

const ScientificPanel = ({ onAction, onDelete, panelState, onToggle }) => {
    const advGroup1 = ['rnd', '!', '(', ')', 'e', 'ln', 'log', 'exp', '1/x', '^', 'sqrt', 'pi'];
    const advGroup2 = ['sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'nPr', 'nCr', 'mod', 'deg', 'rad', '+/-'];

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#00796b]">

            {/* Simple Toggle Arrow (Only for Mobile) */}
            <div 
                onClick={onToggle}
                className="md:hidden flex-shrink-0 w-10 h-full bg-[#00695c] flex items-center justify-center cursor-pointer active:bg-[#004d40] border-r border-[#004d40]/40"
            >
                <span className="text-white text-3xl font-bold transition-all duration-300 select-none">
                    {/* Panel khula hai (1) toh back arrow, warna forward */}
                    {panelState === 1 ? '‹' : '›'}
                </span>
            </div>

            {/* Panel Content Area */}
            <div className="flex flex-col md:flex-row h-full w-full">
                
                {/* Interface 1: Mobile par State 1 par dikhega, Web par hamesha dikhega */}
                <div className={`grid grid-cols-2 w-full md:w-[60%] gap-0`}>
                    {advGroup1.map((f) => (
                        <Button 
                            key={f} 
                            label={f === 'sqrt' ? '√' : f === 'pi' ? 'π' : f} 
                            variant="adv1" 
                            onclick={() => onAction(f)}
                            className="border-r border-b border-[#00695c]/50 h-14 md:h-full" 
                        />
                    ))}
                </div>

                {/* Interface 2: MOBILE PAR HIDE (hidden), WEB PAR SHOW (md:grid) */}
                <div className="hidden md:grid grid-cols-3 w-full md:w-[40%] gap-0 border-l border-gray-600/30">
                    {advGroup2.map((f) => (
                        <Button 
                            key={f} 
                            label={f} 
                            variant="adv2" 
                            onclick={() => onAction(f)}
                            className="border-r border-b border-[#16d1a4]/20 h-14 md:h-full" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScientificPanel;