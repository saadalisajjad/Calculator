import Button from "./Button";

const Keypad = ({ onAction, onCalculate, onClear }) => {
  const numericKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "="];
  const operatorKeys = ["⌫", "AC", "÷", "×", "−", "+"];

  return (
    <div className="flex h-full w-full gap-0 bg-[#3c4043]">
      {/* Numbers Section - grid-rows-4 add kiya, h-full button mein */}
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

      {/* Operators Section - 1 column, zero gap */}
      <div className="grid grid-cols-1 w-1/4  border-l border-gray-600">
        {operatorKeys.map((op) => (
          <Button
            key={op}
            label={op}
            variant="basicOp"
            onclick={op === "AC" ? onClear : () => onAction(op)}

          />
        ))}
      </div>
    </div>
  );
};

export default Keypad;