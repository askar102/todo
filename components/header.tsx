import { useState } from "react";


export default function Header({ onNewTaskButton }) {
    return (
        <div className="w-full flex justify-between items-center pt-1">
            {/* Title */}
            <h1 className="text-2xl text-gray-500">
                The todo list
            </h1>

            {/* 'New task' button */}
            <button onClick={onNewTaskButton} className="px-5 py-1 border border-gray-500 rounded text-xs text-gray-500">
                New task
            </button>
        </div>
    );
}