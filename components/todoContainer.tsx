import { useState } from "react";

import type { Task } from "@/types/task";

import TaskItem from "./taskItem";

type TodoContainerProps = {
    tasks: Task[];
    onDone: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
};

export default function TodoContainer({ tasks, onDone, onRemove, onEdit }: TodoContainerProps) {
    return (
        <div className="w-full border border-gray-500 bg-[rgb(224,224,220)] flex flex-col divide-y divide-gray-400">
            {tasks.map((task, index) => (
                <TaskItem key={task.id} task={task} 
                onDone={onDone}
                onRemove={onRemove}
                onEdit={onEdit}
                />
            ))}
        </div>
    );
}