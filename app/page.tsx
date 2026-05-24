"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import TaskContainer from "@/components/taskContainer";
import TaskMaker from "@/components/taskMaker";

import { createTask, deleteTask, updateTask, fetchTasks } from "@/lib/taskApi";

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
        try 
        {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, data);
                setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? updated : t)));
            } else {
                const created = await createTask(data);
                setTasks((prev) => [created, ...prev]);
            }
        }
        catch(err)
        {
            console.error(err);
        }
        
        setIsTaskMakerOpen(false);
        setEditingTask(null);
    };


    useEffect(() => {
        async function loadTasks() 
        {
            try {
                const tasksFromDb: Task[] = await fetchTasks();
    
                setTasks(tasksFromDb);
            } 
            catch (err) {
                console.error(err);
            }
        }

        loadTasks();
        
    }, []);

    // Remove task by id
    const removeTask = async (id: string) => {
        try
        {
            await deleteTask(id);
            // filter - оставляет только те элементы которые проходят условие 
            setTasks((prev) => prev.filter((task) => task.id !== id));

            console.log("Task %s was removed", id);
        }
        catch (err)
        {
            console.error(err);
        }
    };

    // Change task status to "Done" by id
    const markAsDone = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        
        try 
        {
            // server
            const updated = await updateTask(id, {...task, status: "done" });
            // client
            setTasks((prev) => prev.map((t) => t.id === id ? updated : t ));

            console.log("Task %s marked as 'Done'", id);
        }
        catch (err)
        {
            console.error(err);
        }
    };

    // Change task status to "Active" by id
    const markAsActive = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        try 
        {
            // server
            const updated = await updateTask(id, {...task, status: "active" });
            // client
            setTasks((prev) => prev.map((t) => t.id === id ? updated : t ));

            console.log("Task %s marked as 'Active'", id);
        }
        catch (err)
        {
            console.error(err);
        }

        
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
                        onSave={saveTask}
                    />
                )}
            </main>
        </div>
    );
}
