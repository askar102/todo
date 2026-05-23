import { useState } from "react";

import type { Task } from "@/types/task";

type TaskItemProp = {
    task: Task;
    onRemoveTask: () => void;
};

export default function TaskItem({ task, onRemoveTask }: TaskItemProp) {
    return (
        <div className="py-4 px-6 text-gray-500 flex justify-between items-start">
            {/* Left side */}
            <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>


            {/* Right side */}
            <div className="flex flex-col">
                {/* Mark as done button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={}>
                    Done
                </button>

                {/* Remove button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500">
                    Remove
                </button>

                {/* Edit button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500">
                    Edit
                </button>
            </div>
        </div>

        
    );
    
}