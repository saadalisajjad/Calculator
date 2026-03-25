const Display = ({ expression, result, liveResult }) => {
    const output = result || liveResult;

    return (
        <div className="flex flex-col justify-start overflow-hidden">

            {/* Expression - Sirf tab dikhegi jab result nahi aaya hoga */}
            <div className="text-[#202124] dark:text-white text-2xl font-normal w-full text-right break-all overflow-hidden px-4 pt-4 min-h-[1.5em]">
                {!result && (expression || "")}
            </div>

            {/* Line + Result - Jab expression khali ho toh ye section gaib ho jaye ga */}
            {expression && output && (
                <>
                    <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 mt-2 mb-2"></div>
                    <div className="text-[#0098aa] text-4xl font-normal w-full text-right overflow-hidden px-4">
                        {output}
                    </div>
                </>
            )}

        </div>
    );
};

export default Display;