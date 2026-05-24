import type { Task } from "@/types/task";

import TaskItem from "@/components/taskItem";

type TaskContainerProps = {
    tasks: Task[];

    // Status
    onDone: (id: string) => void;
    onActive: (id: string) => void;

    // Controls
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
};

export default function TaskContainer({ tasks, onDone, onActive , onRemove, onEdit }: TaskContainerProps) {
    return (
        <div className="w-full border border-gray-500 bg-[rgb(224,224,220)] flex flex-col divide-y divide-gray-400">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDone={onDone}
                    onRemove={onRemove}
                    onEdit={() => onEdit(task)}
                    onActive={onActive}
                />
            ))}
        </div>
    );
}
