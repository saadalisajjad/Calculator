import Button from "./Button";

const Keypad = ({ onAction, onCalculate, onClear, onDelete }) => { // onDelete yahan add kiya
  const numericKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "="];
  const operatorKeys = ["⌫", "AC", "÷", "×", "−", "+"];

  return (
    <div className="flex h-full w-full gap-0 bg-[#3c4043]">
      {/* Numbers Section */}
      <div className="grid grid-cols-3 grid-rows-4 w-full">
        {numericKeys.map((num) => (
          <Button
            key={num}
            label={num}
            variant="number"
            onclick={num === "=" ? onCalculate : () => onAction(num)}
            className=" border-gray-600/50 h-full"
          />
        ))}
      </div>

      {/* Operators Section */}
      <div className="grid grid-cols-1 w-1/4 border-l border-gray-600">
        {operatorKeys.map((op) => (
          <Button
            key={op}
            label={op}
            variant="basicOp"
            // Yahan check karein: AC hai to clear, ⌫ hai to delete, baki to normal action
            onclick={
              op === "AC" ? onClear : 
              op === "⌫" ? onDelete : 
              () => onAction(op)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Keypad;