import { useState } from "react";

import type { Task } from "@/types/task";

import TaskItem from "./taskItem";

type TodoContainerProps = {
    tasks: Task[];
    onDone: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
    onBack: (id: string) => void;
};

export default function TodoContainer({ tasks, onDone, onRemove, onEdit, onBack }: TodoContainerProps) {
    return (
        <div className="w-full border border-gray-500 bg-[rgb(224,224,220)] flex flex-col divide-y divide-gray-400">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} 
                onDone={onDone}
                onRemove={onRemove}
                onEdit={() => onEdit(task)}
                onBack={onBack}
                />
            ))}
        </div>
    );
}