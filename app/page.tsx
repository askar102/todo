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
    const saveTask = async (data: Omit<Task, "id">) => {
        if (editingTask) {
            await updateTask(editingTask.id, data)
        } else {
            await createTask(data);
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

    async function deleteTask(id: string) {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            console.error("Failed to delete task", id);
            return;
        }
        
        removeTaskLocal(id);
    }

    async function updateTask(id: string, data: Omit<Task, "id">) {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const updatedTask: Task = await response.json();

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? updatedTask : task
            )
        );

        return updatedTask;
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
    const removeTaskLocal = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));

        console.log("Task %s was removed", id);
    };

    // Change task status to "Done" by id
    const markAsDone = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        
        // For backend
        const updated = await updateTask(id, {
            ...task,
            status: "done",
        });
        
        // For client
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? updated : t))
        );
    
        console.log("Task %s marked as 'Done'", id);
    };

    // Change task status to "Active" by id
    const markAsActive = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const updated = await updateTask(id, {
            ...task,
            status: "active"
        });

        setTasks((prev) =>
            prev.map((t) => (t.id === id ? updated : t))
        );

        console.log("Task %s marked as 'Done'", id);
    };

    // Main component
    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header onNewTaskButton={openCreateTask} />
                <TaskContainer
                    tasks={tasks}
                    onDone={markAsDone}
                    onRemove={deleteTask}
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
                        onSave={saveTask}
                    />
                )}
            </main>
        </div>
    );
}
