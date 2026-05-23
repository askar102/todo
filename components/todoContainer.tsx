import { useState } from "react";

import type { Task } from "@/types/task";

type TodoContainerProps = {
    tasks: Task[];
};

export default function TodoContainer({ tasks }: TodoContainerProps) {
    return (
        <div className="w-full py-10 px-16 border border-gray-500 bg-[rgb(224,224,220)]">
            {tasks.map((task, index) => (
                <div key={index}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                </div>
            ))}

        </div>
    );
}