"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import TaskContainer from "@/components/taskContainer";
import TaskMaker from "@/components/taskMaker";

import type { Task } from "@/types/task";

export default function Home() {
    // Is TaskMaker open?
    const [isTaskMakerOpen, setIsTaskMakerOpen] = useState(false);
    // Tasks list
    const [tasks, setTasks] = useState<Task[]>([]);
    // What task are we editing?
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Opens TaskMaker in new task mode
    const openCreateTask = () => {
        setEditingTask(null);
        setIsTaskMakerOpen(true);
    };

    // Opens TaskMaker in task editing mode
    const openEditTask = (task: Task) => {
        setEditingTask(task);
        setIsTaskMakerOpen(true);
    };


    // TaskMaker save handle
    const saveTask = (data: Omit<Task, "id">) => {
        if (editingTask) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id
                        ? { ...editingTask, ...data }
                        : task
                )
            );
        } else {
            setTasks((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    ...data,
                },
            ]);
        }

        setIsTaskMakerOpen(false);
        setEditingTask(null);
    };

    async function createTask(data: Omit<Task, "id">) {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const createdTask: Task = await response.json();

        setTasks((prev) => [createdTask, ...prev]);

        setIsTaskMakerOpen(false);
    }

    useEffect(() => {
        async function loadTasks() {
            const response = await fetch("/api/tasks");
            const tasksFromDb: Task[] = await response.json();

            setTasks(tasksFromDb);
        }

        loadTasks();
    }, []);

    // Remove task by id
    const removeTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));

        console.log("Task %s was removed", id);
    };

    // Change task status to "Done" by id
    const markAsDone = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, status: "done" } : task
            )
        );

        console.log("Task %s marked as 'Done'", id);
    };

    // Change task status to "Active" by id
    const markAsActive = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, status: "active" } : task
            )
        );

        console.log("Task %s marked as 'Active'", id);
    };

    // Main component
    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header onNewTaskButton={openCreateTask} />
                <TaskContainer
                    tasks={tasks}
                    onDone={markAsDone}
                    onRemove={removeTask}
                    onEdit={openEditTask}
                    onActive={markAsActive}
                />

                {isTaskMakerOpen && (
                    <TaskMaker
                        task={editingTask}
                        onClose={() => {
                            setIsTaskMakerOpen(false);
                            setEditingTask(null);
                        }}
                        onSave={createTask}
                    />
                )}
            </main>
        </div>
    );
}
