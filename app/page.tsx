"use client";

import { useState } from "react";
import Header from "@/components/header";
import TodoContainer from "@/components/todoContainer";
import TaskMaker from "@/components/taskMaker";

import type { Task } from "@/types/task";

export default function Home() {
    const [open, setOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const createNewTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    const markAsDone = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status: "done" } : task
            )
        );

        console.log("Task %s marked as 'Done'", id);
    };


    const removeTask = (id: string) => {
        setTasks(prev =>
            prev.filter(task => task.id !== id)
        );

        console.log("Task %s was removed", id);
    }

    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header onNewTaskButton={() => setOpen(true)}/>
                <TodoContainer 
                    tasks={tasks} 
                    onDone={markAsDone}
                    onRemove={removeTask}
                />

                {open && <TaskMaker onClose={() => setOpen(false)} onNewTask={createNewTask} />}

            </main>
        </div>
    );
}