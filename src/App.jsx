const Display = ({ expression, result, liveResult }) => {
    const output = result || liveResult;

    return (
        <div className="flex flex-col justify-start overflow-hidden">

            {/* Expression */}
            <div className="text-[#202124] text-2xl font-normal w-full text-right break-all overflow-hidden px-4 pt-4">
                {expression || ""}
            </div>

            {/* Line aur Result - sirf tab show ho jab output ho */}
            {output && (
                <>
                    {/* Full width line */}
                    <div className="w-full h-[1px] bg-gray-300 mt-2 mb-2"></div>

                    {/* Result - simple, no bold */}
                    <div className="text-[#202124] text-4xl font-normal w-full text-right overflow-hidden px-4">
                        {output}
                    </div>
                </>
            )}

        </div>
    );
};

export default Display;