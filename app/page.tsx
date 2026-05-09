import Header from "@/components/header";
import TodoContainer from "@/components/todoContainer";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
                <Header />
                <TodoContainer />

            </main>
        </div>
    );
}