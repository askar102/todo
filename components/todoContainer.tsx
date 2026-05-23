import { useState } from "react";

import type { Task } from "@/types/task";

import TaskItem from "./taskItem";

type TodoContainerProps = {
    tasks: Task[];
};

export default function TodoContainer({ tasks }: TodoContainerProps) {
    return (
        <div className="w-full py-10 px-16 border border-gray-500 bg-[rgb(224,224,220)]">
            {tasks.map((task, index) => (
                <TaskItem task={task} key={index} />
            ))}

        </div>
    );
}