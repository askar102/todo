import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-[rgb(224,224,224)]  font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">

        {/* Header of main */}
        <div className="w-full flex justify-center pt-1">
          <h1 className="text-2xl text-gray-500">
            The todo list
          </h1>
        </div>

        {/* To-do list container */}
        <div className="w-full py-10 px-16 border border-gray-500">

        </div>

      </main>
    </div>
  );
}
