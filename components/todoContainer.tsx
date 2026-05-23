import { useState } from "react";

import type { Task } from "@/types/task";

import TaskItem from "./taskItem";

type TodoContainerProps = {
    tasks: Task[];
};

export default function TodoContainer({ tasks }: TodoContainerProps) {
    return (
        <div className="w-full border border-gray-500 bg-[rgb(224,224,220)] flex flex-col divide-y divide-gray-400">
            {tasks.map((task, index) => (
                <TaskItem task={task} key={index} />
            ))}

        </div>
    );
}