import { useState } from "react";

import type { Task } from "@/types/task";

type TaskMakerProps = {
    task: Task | null;
    onClose: () => void;
    onSave: (data: Omit<Task, "id">) => void;
};

export default function TaskMaker({ task, onClose, onSave }: TaskMakerProps) {
    // can get Null:
    // get title if is not Null (?.)
    // if left Null when "" (??)
    const [title, setTitle] = useState(task?.title ?? "");
    const [description, setDescription] = useState(task?.description ?? "");
    const [status] = useState(task?.status ?? "active");

    {
        /* Save button logic */
    }
    const handleSave = () => {
        onSave({
            title,
            description,
            status,
        });
    };

    return (
        /* Transparent background */
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            {/* Pop-up */}
            <div className="flex flex-col justify-start w-[400px] h-[400px] bg-[rgb(224,224,220)] rounded border-2 border-gray-500">
                {/* Header */}
                <div className="w-full flex justify-between">
                    {/* Title */}
                    <div className="text-base text-gray-500 px-2">
                        Make a task
                    </div>

                    {/* Close button */}
                    <button onClick={onClose}>
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
                        <input
                            type="text"
                            placeholder="Enter here"
                            className="border-0 border-b border-gray-500 focus:outline-none text-gray-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Description area */}
                    <div className="w-full flex flex-col py-2">
                        {/* Text */}
                        <div className="text-base text-gray-500 py-2">
                            Description:
                        </div>

                        {/* Input */}
                        <textarea
                            maxLength={300}
                            placeholder="Enter here"
                            className="h-40 resize-none border-0 border-b border-gray-500 focus:outline-none text-gray-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Control area */}
                    <div className="w-full flex flex-row  justify-end mt-auto pb-2">
                        {/* Save button */}
                        <button
                            onClick={handleSave}
                            className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
