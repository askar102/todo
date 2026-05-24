import { useState, useEffect } from "react";

import { createTask, deleteTask, updateTask, fetchTasks } from "@/lib/taskApi";

import { Task } from "@/types/task";

export function useTasks() {
    // Tasks list
    const [tasks, setTasks] = useState<Task[]>([]);

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

    // TaskMaker save handle
    const saveTask = async (data: Omit<Task, "id">, editingTask: Task | null) => {
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
    };

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

    return {
        tasks,
        saveTask,
        removeTask,
        markAsDone,
        markAsActive,
    };

}

