"use client";

import { useState } from "react";
import Header from "@/components/header";
import TodoContainer from "@/components/todoContainer";
import TaskMaker from "@/components/taskMaker";

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header onNewTask={() => setOpen(true)}/>
                <TodoContainer />

                {open && <TaskMaker onClose={() => setOpen(false)} />}

            </main>
        </div>
    );
}