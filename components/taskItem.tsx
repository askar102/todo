import { useState } from "react";

import type { Task } from "@/types/task";

type TaskItemProp = {
    task: Task;
    onDone: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
};

export default function TaskItem({ task, onDone, onRemove, onEdit }: TaskItemProp) {

    const getTaskInformation = () => {
        if (task.status === "active") {
            return (
                <div>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                </div>
            );
        }


        if (task.status === "done") {
            return (
                <div className="bg-gray-400 opacity-50">
                    <h2 className="line-through">{task.title}</h2>
                    <p className="line-through">{task.description}</p>
                </div>
            );
        }

        if (task.status === "archived") {
            return (
                <div>
                    TODO: stub
                </div>
            );
        }
    };


    return (
        <div className="py-4 px-6 text-gray-500 flex justify-between items-start">
            {/* Left side */}
            <div>
                {getTaskInformation()}
            </div>

            {/* Right side */}
            <div className="flex flex-col">
                {/* Mark as done button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onDone(task.id)}>
                    Done
                </button>

                {/* Remove button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onRemove(task.id)}>
                    Remove
                </button>

                {/* Edit button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onEdit(task.id)}>
                    Edit
                </button>
            </div>
        </div>

        
    );
    
}