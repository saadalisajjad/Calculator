import React from 'react';
import Button from "./Button"; 

const ScientificPanel = ({ onAction, onDelete }) => {
    // Ye labels logic ke liye use honge
    const advGroup1 = ['⌫', 'rnd', '!', '(', ')', 'e', 'ln', 'log', 'exp', '1/x', '^', 'sqrt', 'nthRoot', '+/-', '%', '^2', 'pi'];
    const advGroup2 = ['deg', 'rad', 'inv', 'sin', 'asin', 'mod', 'cos', 'acos', 'nPr', 'tan', 'atan', 'nCr'];

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-[#00796b]">
            <div className="grid grid-cols-4 w-full md:w-[57%]">
                {advGroup1.map((f) => (
                    <Button 
                        key={f} 
                        // Visual display for user
                        label={f === 'sqrt' ? '√' : f === 'pi' ? 'π' : f === '!' ? 'x!' : f === '^2' ? 'x²' : f} 
                        variant="adv1" 
                        onclick={f === '⌫' ? onDelete : () => onAction(f)} 
                        className="border-r border-b border-[#00695c]/50 h-14 md:h-full text-base font-sans"
                    />
                ))}
            </div>

            <div className="grid grid-cols-3 w-full md:w-[43%] border-t md:border-t-0 md:border-l border-gray-600/30">
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
    );
};

export default ScientificPanel;