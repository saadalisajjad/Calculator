import Button from "./Button";

const Keypad = ({ onAction, onCalculate, onClear, onDelete }) => {
  const numericKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "="];
  const operatorKeys = ["⌫", "AC", "÷", "×", "−", "+"];

  return (
    <div className="flex h-full w-full gap-0 bg-black">
      
      {/* Numbers Section - Pure Black */}
      <div className="grid grid-cols-3 grid-rows-4 w-full bg-black">
        {numericKeys.map((num) => (
          <Button
            key={num}
            label={num}
            variant="number"
            onclick={num === "=" ? onCalculate : () => onAction(num)}
            // Full black background with subtle grey border
            className="border-gray-800/60 h-full text-white bg-black active:bg-[#1c1c1c]"
          />
        ))}
      </div>

      {/* Operators Section - ALSO Pure Black */}
      <div className="grid grid-cols-1 w-1/4 border-l border-gray-800/60 bg-black">
        {operatorKeys.map((op) => (
          <Button
            key={op}
            label={op}
            variant="basicOp"
            onclick={
              op === "AC" ? onClear : 
              op === "⌫" ? onDelete : 
              () => onAction(op)
            }
            // Same black theme for operators
            className="text-white bg-black border-gray-800/60 active:bg-[#1c1c1c] h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default Keypad;