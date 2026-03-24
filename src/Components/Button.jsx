const Button = ({ label, onclick, variant = "default", className = "" }) => {
    const styles = {
        // Numbers - dark black (same)
        number: "bg-[#3c4043] hover:bg-[#4d5156] text-white border-[0.5px] border-gray-600",
        // Operators - iPhone orange
        basicOp: "bg-[#FF9500] hover:bg-[#FFB143] text-white border-[0.5px] border-[#e08600]",
        // Log section - iPhone light gray (function buttons)
        adv1: "bg-[#a5a5a5] hover:bg-[#b8b8b8] text-black border-[0.5px] border-[#929292]",
        // Sin section - teal (same)
        adv2: "bg-[#1de9b6] hover:bg-[#5df2cf] text-[#202124] border-[0.5px] border-[#16d1a4]",
    };

    return (
        <button
            onClick={() => onclick(label)}
            style={{ fontFamily: 'Arial, sans-serif' }}
            className={`
                ${styles[variant]} ${className} 
                flex items-center justify-center 
                h-14 md:h-full w-full text-base md:text-lg lg:text-xl p-2
            `}
        >
            {label}
        </button>
    );
};

export default Button;