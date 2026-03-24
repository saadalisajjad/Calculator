const Display = ({ expression, result, liveResult }) => {
    return (
        <div className="bg-[#f1f3f4] p-6 flex flex-col justify-start items-end gap-3">

            {/* Section 1 - Input */}
            <div className="text-[#202124] text-2xl font-bold w-full text-right min-h-[40px] break-all">
                {expression || ""}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300"></div>

            {/* Section 2 - Live Dim Preview */}
            <div className="text-gray-400 text-3xl font-normal w-full text-right min-h-[40px]">
                {liveResult || ""}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300"></div>

            {/* Section 3 - Bold Final Output */}
            <div className="text-[#202124] text-5xl font-bold w-full text-right min-h-[60px]">
                {result || "0"}
            </div>

        </div>
    );
};

export default Display;