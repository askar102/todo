"use client";

import { useState } from "react";
import Header from "@/components/header";
import TodoContainer from "@/components/todoContainer";
import TaskMaker from "@/components/taskMaker";

import type { Task } from "@/types/task";

export default function Home() {
    // Is TaskMaker open?
    const [open, setOpen] = useState(false);
    // Tasks list
    const [tasks, setTasks] = useState<Task[]>([]);
    // What task are we editing?
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const openCreateTask = () => {
        setEditingTask(null);
        setOpen(true);
    };

    const openEditTask = (task: Task) => {
        setEditingTask(task);
        setOpen(true);
    };

    const saveTask = (data: Omit<Task, "id">) => {
        if (editingTask) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id ? { ...editingTask, ...data } : task
                )
            );
        }
        else {
            setTasks((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    ...data
                },
            ]);
        }

        setOpen(false);
        setEditingTask(null);
    };

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
    };

    const markAsActive = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status: "active" } : task
            )
        );

        console.log("Task %s marked as 'Active'", id);
    };

    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header onNewTaskButton={openCreateTask}/>
                <TodoContainer 
                    tasks={tasks} 
                    onDone={markAsDone}
                    onRemove={removeTask}
                    onEdit={openEditTask}
                    onBack={markAsActive}
                />

                {open && <TaskMaker task={editingTask} 
                                    onClose={() => {
                                        setOpen(false);
                                        setEditingTask(null);
                                    }}
                                    onSave={saveTask}
                />}

            </main>
        </div>
    );
}