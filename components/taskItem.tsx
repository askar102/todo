import { useState } from "react";

import type { Task } from "@/types/task";

type TaskItemProp = {
    task: Task;
    onDone: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: () => void;
    onBack: (id: string) => void;
};

export default function TaskItem({ task, onDone, onRemove, onEdit, onBack }: TaskItemProp) {

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
                <div className="">
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
    
    const getTaskDoneButton = () => {
        if (task.status === "active") {
            return (
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onDone(task.id)}>
                    Done
                </button>
            );
        }


        if (task.status === "done") {
            return (
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onBack(task.id)}>
                    Active
                </button>
            );
        }

        // if (task.status === "archived") {
        //     return (
        //         <div>
        //             TODO: stub
        //         </div>
        //     );
        // }
    };

    const getBgClass = () => {
        if (task.status === "done") 
            return "opacity-50";
        // if (task.status === "archived") return "bg-yellow-100";


        return "bg-[rgb(224,224,220)]";
    }


    return (
        <div className={`py-4 px-6 text-gray-500 flex justify-between items-start ${getBgClass()}`}>
            {/* Left side */}
            <div>
                {getTaskInformation()}
            </div>

            {/* Right side */}
            <div className="flex flex-col">
                {/* Mark as done button */}
                {getTaskDoneButton()}

                {/* Remove button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={() => onRemove(task.id)}>
                    Remove
                </button>

                {/* Edit button */}
                <button className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500"
                        onClick={onEdit}>
                    Edit
                </button>
            </div>
        </div>

        
    );
    
}