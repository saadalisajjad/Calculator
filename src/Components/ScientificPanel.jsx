import React from 'react';
import Button from "./Button";

const ScientificPanel = ({ onAction, onDelete, panelState, onToggle }) => {
    const advGroup1 = ['rnd', '!', '(', ')', 'e', 'ln', 'log', 'exp', '1/x', '^', 'sqrt', 'pi'];

    return (
        <div className="flex h-full w-full overflow-hidden bg-black">

            {/* Teal Colored Arrow Strip - As per your Hex Code #0098aa */}
            <div 
                onClick={onToggle}
                className="md:hidden flex-shrink-0 w-10 h-full bg-[#0098aa] flex items-center justify-center cursor-pointer active:bg-[#007b8a] border-r border-black/20"
            >
                <span className="text-white text-3xl font-bold select-none transition-transform duration-300">
                    {/* Panel khula hai (1) toh back arrow, warna forward */}
                    {panelState === 1 ? '‹' : '›'}
                </span>
            </div>

            {/* Scientific Buttons Area - Pure Black */}
            <div className="grid grid-cols-2 w-full h-full bg-black">
                {advGroup1.map((f) => (
                    <Button 
                        key={f} 
                        label={f === 'sqrt' ? '√' : f === 'pi' ? 'π' : f} 
                        variant="adv1" 
                        onclick={() => onAction(f)}
                        // Black background with subtle grey borders
                        className="border-r border-b border-gray-800/60 h-full text-white bg-black active:bg-[#1c1c1c]" 
                    />
                ))}
            </div>
        </div>
    );
};

export default ScientificPanel;