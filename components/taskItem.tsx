import { useState } from "react";

import type { Task } from "@/types/task";

type TaskItemProp = {
    task: Task;
};

export default function TaskItem({ task }: TaskItemProp) {
    return (
        <div className="bg-red-600">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
        </div>
    );
    
}