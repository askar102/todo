import Header from "./header"

export default function TaskMaker() {
    return (
        /* Transparent background */
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            { /* Pop-up */ }
            <div className="flex flex-col justify-start w-[400px] h-[400px] bg-[rgb(224,224,220)] rounded border-2 border-gray-500">
                {/* Header */}
                <div className="w-full flex justify-between">
                    {/* Title */}
                    <div className="text-base text-gray-500 px-2">
                        Make a task
                    </div>

                    {/* Close button */}
                    <button>
                        <img src="/close.svg" alt="close" className="" />
                    </button>
                    
                </div>

                {/* Body */}
                <div className="w-full h-full flex flex-col px-2">
                    {/* Title area */}
                    <div className="w-full flex flex-col">
                        {/* Text */}
                        <div className="text-base text-gray-500 py-2">
                            Title:
                        </div>

                        {/* Input */}
                        <input type="text" placeholder="Enter here" className="border-0 border-b border-gray-500 focus:outline-none text-gray-500" />
                        
                    </div>


                    {/* Description area */}
                    <div className="w-full flex flex-col py-2">
                        {/* Text */}
                        <div className="text-base text-gray-500 py-2">
                            Description:
                        </div>

                        {/* Input */}
                        <textarea maxLength={300} placeholder="Enter here" className="h-40 resize-none border-0 border-b border-gray-500 focus:outline-none text-gray-500" />

                    </div>


                    {/* Control area */}
                    <div className="w-full flex flex-row  justify-end mt-auto pb-2">
                        {/* Save button */}
                        <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500">
                            Save
                        </button>
                    </div>  

                </div> 

            </div>
        </div>  
    )
}