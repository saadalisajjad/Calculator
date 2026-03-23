const Button = ({ label, onclick, variant = "default", className = "" }) => {
    const styles = {
        number: "bg-[#3c4043] hover:bg-[#4d5156] text-white border-[0.5px] border-gray-600",
        basicOp: "bg-[#5f6368] hover:bg-[#70757a] text-white border-[0.5px] border-gray-500",
        adv1: "bg-[#00796b] hover:bg-[#00897b] text-white border-[0.5px] border-[#00695c]",
        adv2: "bg-[#1de9b6] hover:bg-[#5df2cf] text-[#202124] border-[0.5px] border-[#16d1a4]",
    };

    return (
        <button 
            onClick={() => onclick(label)}
            // Arial Font + Responsive Padding + No Rounded Corners
            style={{ fontFamily: 'Arial, sans-serif' }}
            className={`
                ${styles[variant]} ${className} 
                flex items-center justify-center transition-all active:brightness-125 rounded-none 
                h-14 md:h-full w-full text-base md:text-lg lg:text-xl p-2
            `}
        >
            {label}
        </button>
    );
};
export default Button;