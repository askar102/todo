type TaskStatus = "active" | "done" | "archived"

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
};