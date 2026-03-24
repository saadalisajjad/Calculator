import React from 'react';
import Button from "./Button"; 

const ScientificPanel = ({ onAction, onDelete, panelState, onToggle }) => {
    const advGroup1 = ['⌫', 'rnd', '!', '(', ')', 'e', 'ln', 'log', 'exp', '1/x', '^', 'sqrt', '+/-', '%', '^2', 'pi'];
    const advGroup2 = ['deg', 'rad', 'inv', 'sin', 'asin', 'mod', 'cos', 'acos', 'nPr', 'tan', 'atan', 'nCr'];

    return (
        <div className="flex h-full w-full ">

            {/* Peek Strip - sirf mobile par, hamesha visible */}
          <div 
    onClick={onToggle}
    className="md:hidden flex-shrink-0 w-10 h-full bg-[#00695c] flex items-center justify-center "
>
    {/* span hata diya - koi text nahi */}
</div>

            {/* Panel Content - onClick hata diya */}
            <div className="flex flex-col md:flex-row h-full w-full">

                {/* Group 1 */}
                <div className={`${panelState === 2 ? 'hidden md:grid' : 'grid'} grid-cols-3 w-full md:w-[57%]`}>
                    {advGroup1.map((f) => (
                        <Button 
                            key={f} 
                            label={f === 'sqrt' ? '√' : f === 'pi' ? 'π' : f === '!' ? 'x!' : f === '^2' ? 'x²' : f} 
                            variant="adv1" 
                            onclick={f === '⌫' ? onDelete : () => onAction(f)} 
                            className="border-r border-b border-[#00695c]/50 h-14 md:h-full text-base font-sans"
                        />
                    ))}
                </div>

                {/* Group 2 */}
                <div className={`${panelState === 1 ? 'hidden md:grid' : 'grid'} grid-cols-3 w-full md:w-[43%] md:border-l border-gray-600/30`}>
                    {advGroup2.map((f) => (
                        <Button 
                            key={f} 
                            label={f} 
                            variant="adv2" 
                            onclick={() => onAction(f)} 
                            className="border-r border-b border-[#16d1a4]/30 h-14 md:h-full text-base font-sans"
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ScientificPanel;