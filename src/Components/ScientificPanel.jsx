import React from 'react';
import Button from "./Button"; // Yeh line missing thi jis se error aa raha tha

const ScientificPanel = ({ onAction, onDelete }) => {
    const advGroup1 = ['⌫', 'Rnd', 'x!', '(', 'e', 'ln', 'log', 'eⁿ', '1/x', 'yˣ', '√', 'ⁿ√y', '+/-', '%', 'x²', 'π'];
    const advGroup2 = ['Deg', 'Rad', 'inv', 'sin', 'asin', 'mod', 'cos', 'acos', 'nPr', 'tan', 'atan', 'nCr'];

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-[#00796b]">
            {/* Group 1: PC pe side-by-side, Mobile pe stack */}
            <div className="grid grid-cols-4 w-full md:w-[57%]">
                {advGroup1.map((f) => (
                    <Button 
                        key={f} 
                        label={f} 
                        variant="adv1" 
                        onclick={f === '⌫' ? onDelete : () => onAction(f)} 
                        className="border-r border-b border-[#00695c]/50 h-14 md:h-full text-base"
                    />
                ))}
            </div>

            {/* Group 2 */}
            <div className="grid grid-cols-3 w-full md:w-[43%] border-t md:border-t-0 md:border-l border-gray-600/30">
                {advGroup2.map((f) => (
                    <Button 
                        key={f} 
                        label={f} 
                        variant="adv2" 
                        onclick={() => onAction(f)} 
                        className="border-r border-b border-[#16d1a4]/30 h-14 md:h-full text-base"
                    />
                ))}
            </div>
        </div>
    );
};

export default ScientificPanel;