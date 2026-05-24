"use client";

import { useState } from "react";
import Header from "@/components/header";
import TaskContainer from "@/components/taskContainer";
import TaskMaker from "@/components/taskMaker";

import { useTasks } from "@/hooks/useTasks";

import type { Task } from "@/types/task";

export default function Home() {
    // Hook
    const { tasks, saveTask, removeTask, markAsDone, markAsActive } = useTasks();
    // Is TaskMaker open?
    const [isTaskMakerOpen, setIsTaskMakerOpen] = useState(false);
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

    const handleSave = async (data: Omit<Task, "id">) => {
        await saveTask(data, editingTask);

        setIsTaskMakerOpen(false);
        setEditingTask(null);
    } 
    
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
                        onSave={handleSave}
                    />
                )}
            </main>
        </div>
    );
}
