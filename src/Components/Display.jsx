const Display = ({ expression, result }) => {
    return (
        // Chrome style: Light background (#f1f3f4) aur rounded corners ke baghair
        <div className="bg-[#f1f3f4] p-8 min-h-[180px] flex flex-col justify-end items-end overflow-hidden border-b border-gray-300">
            
            {/* Upper Expression (Grey Text) */}
            <div className="text-gray-500 text-2xl font-light truncate w-full text-right mb-2">
                {expression || ""}
            </div>

            {/* Divider Line (Chrome Style) */}
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>

            {/* Main Result (Dark/Black Text) */}
            <div className="text-[#202124] text-6xl font-normal truncate w-full text-right">
                {result || "0"}
            </div>
        </div>
    );
};

export default Display;