import { Task } from "@/types/task"

export async function createTask(data: Omit<Task, "id">): Promise<Task> {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Cannot create new task");
    }
    
    return response.json();
} 

export async function deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}

export async function updateTask(id: string, data: Omit<Task, "id">): Promise<Task> {
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

    return response.json();
}

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}
